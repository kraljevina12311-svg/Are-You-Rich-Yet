require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bs58 = require('bs58');
const nacl = require('tweetnacl');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Simple in-memory store for nonces (nonce -> expiresAt)
// For production, replace with Redis/DB so it works across instances.
const nonces = new Map();

function cleanupNonces() {
  const now = Date.now();
  for (const [k, v] of nonces) {
    if (v < now) nonces.delete(k);
  }
}
setInterval(cleanupNonces, 60 * 1000);

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint: get nonce
app.get('/auth/nonce', (req, res) => {
  const nonce = uuidv4();
  const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes
  nonces.set(nonce, expiresAt);
  res.json({ nonce });
});

// Endpoint: verify signature
app.post('/auth/verify', (req, res) => {
  try {
    const { publicKey, message, signature } = req.body;
    if (!publicKey || !message || !signature) return res.status(400).json({ ok: false, error: 'missing_fields' });

    // Extract nonce from message - expects format with 'Nonce: <nonce>'
    const nonceMatch = message.match(/Nonce:\s*(\S+)/);
    if (!nonceMatch) return res.status(400).json({ ok: false, error: 'missing_nonce_in_message' });
    const nonce = nonceMatch[1];

    const expiresAt = nonces.get(nonce);
    if (!expiresAt || Date.now() > expiresAt) return res.status(400).json({ ok: false, error: 'nonce_invalid_or_expired' });

    // Verify signature
    const messageBytes = Buffer.from(message, 'utf8');
    const signatureBytes = bs58.decode(signature);
    const pubKeyBytes = bs58.decode(publicKey);

    const verified = nacl.sign.detached.verify(messageBytes, signatureBytes, pubKeyBytes);
    if (!verified) return res.status(401).json({ ok: false, error: 'invalid_signature' });

    // Success: remove nonce and issue JWT
    nonces.delete(nonce);
    const tokenPayload = { sub: publicKey };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ ok: true, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
});

// Simple protected endpoint to test token
app.get('/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ ok: false, error: 'no_auth_header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ ok: false, error: 'bad_auth_format' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return res.json({ ok: true, publicKey: payload.sub });
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'invalid_token' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

