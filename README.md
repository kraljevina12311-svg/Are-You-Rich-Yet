# 💸 Are You Rich Yet? ($RICH)

Minimal Solana meme site that tells you how rich you are, with brutally funny ranks.

## What is this, really?

AreYouRichYet is a tiny mirror for your crypto soul. You press "Connect Wallet," and the site looks your SOL balance dead in the eye and assigns you a vibe. No sermons. No charts. Just raw, memetic truth.

Are you ready to find out who you really are on-chain?

* If you're a **brokie** today — grind.
* If you're a **chad** — don't fumble.
* If you're a **RUGGER** — we're not mad, just… impressed and slightly afraid.

It's a joke, it's a vibe, it's a ritual. Bring your bags and your coping skills.

## Rank ladder (by SOL balance)

* **brokie 💀** — < 0.01 SOL
* **noob 🥲** — < 0.1 SOL
* **Exit liquidity 🚪** — < 0.5 SOL
* **kiddie 🧒** — < 1 SOL
* **trader 📈** — < 5 SOL
* **chad 🗿** — < 10 SOL
* **professional trader 🧠** — < 50 SOL
* **RUGGER 🏴‍☠️** — ≥ 50 SOL

## 🚀 Run locally

```bash
npm install
npm start
```

Then open: **http://localhost:3000**

## 📡 API Endpoints

### `GET /auth/nonce`
Get a unique nonce for wallet authentication.

### `POST /auth/verify`
Verify wallet signature and receive JWT token.

### `GET /me`
Protected endpoint - returns authenticated user's public key.

## 🔗 Links

* **X (Twitter)**: https://twitter.com/areyourichyett
* **GitHub**: https://github.com/kraljevina12311-svg/Are-You-Rich-Yet
* **Live Demo**: http://localhost:3000

## 📝 Notes

* Wallet connect is **Phantom-only** and uses secure signature verification
* Balance fetched via **Solana mainnet RPC**
* Uses **JWT authentication** with nonce system
* Every connection requires signature verification for security
* This is a **meme**. Not financial advice. Touch grass and drink water.

## 🛠️ Tech Stack

* **Frontend**: Vanilla HTML/CSS/JS
* **Backend**: Node.js + Express
* **Blockchain**: Solana Web3.js
* **Auth**: JWT + ED25519 signature verification
* **Wallet**: Phantom wallet adapter

## 🔐 Security Features

* ✅ Nonce-based authentication (prevents replay attacks)
* ✅ ED25519 signature verification
* ✅ JWT tokens with expiry
* ✅ CORS protection
* ✅ Server-side validation

## 📦 Production Deployment

For production, consider:

1. Use **Redis** for nonce storage (multi-instance support)
2. Add **HTTPS** (nginx + Let's Encrypt)
3. Implement **rate limiting**
4. Use environment variables for secrets
5. Add monitoring and logging

## 🎨 Features

* 💚⬜ Clean green & white meme aesthetic
* 🔐 Secure wallet authentication
* 💰 Real-time SOL balance
* 🐦 "Brag on X" tweet generator
* 📱 Fully responsive design
* ✨ Smooth animations

---

Made with 💚 for the Solana meme community
