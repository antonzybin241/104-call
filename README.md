# Global Real Estate Marketplace

**Global Real Estate Marketplace** is a blockchain-powered real estate platform that enables users to buy, sell, rent, lease, and invest in real-world properties through tokenized assets and NFT-based ownership solutions. By combining blockchain technology, smart contracts, and decentralized finance (DeFi), **Global Real Estate Marketplace** provides a secure, transparent, and accessible ecosystem for global real estate transactions and investments.

The platform aims to democratize property investment by reducing traditional barriers to entry and creating new opportunities for fractional ownership, asset liquidity, and cross-border participation in real estate markets.

---

## How to run

### Prerequisites

| Tool | Version |
|------|---------|
| [Git](https://git-scm.com/) | Latest |
| [Node.js](https://nodejs.org/) | >= 22 |
| npm | >= 10 (included with Node.js) |

Check your versions:

```bash
node -v
npm -v
```

### 1. Clone the repository

```bash
git clone <repository-url>
cd global-real-estate-marketplace
```

Replace `<repository-url>` with your Git remote (HTTPS or SSH).

### 2. Install dependencies

```bash
npm install
```

### 3. Start the project

```bash
npm start
```

This starts **both** the React app and the Express API. Wait until you see the dev server ready, then open:

| URL | Service |
|-----|---------|
| http://localhost:3000 | React frontend |
| http://localhost:3344 | Express API |

**Run services separately (optional):**

---

## Project structure

```
global-real-estate-marketplace/
├── public/                      # Static assets (index.html, images)
├── src/                         # React frontend
│   ├── App.js                   # Routes and layout
│   ├── index.js                 # App entry point
│   ├── hooks/
│   │   └── useWalletReady.js    # Wallet connection state
│   └── Components/
│       ├── Home_page/           # Landing (tokenomics, roadmap, FAQ, …)
│       ├── AirDrops/            # Airdrop registration + social tasks
│       ├── Smart_token_staking/ # Staking page
│       ├── WalletLogin/         # Wallet connect gate
│       ├── Header/ / Footer/    # Layout
│       └── …                    # Newsletter, Partners, NFT, etc.
│
├── scripts/
│   ├── start-web.js             # Start CRA on first free port
│   ├── start-api.js             # Start API with file watch
│   └── lib/find-port.js         # Port availability helper
│
├── Server/                      # Express API (ESM)
│   ├── server.js                # Entry point, port fallback
│   ├── app.js                   # Express app + middleware
│   ├── config/                  # Env, CORS, constants
│   ├── routes/
│   │   ├── legacyRoutes.js      # /addPoints, /getByAddress, …
│   │   └── v1/                  # /api/v1/* REST routes
│   ├── controllers/             # HTTP request handlers
│   ├── services/                # Business logic
│   ├── middleware/              # Validation, rate limit, errors
│   ├── models/                  # In-memory data models
│   ├── store/memoryStore.js     # In-memory persistence
│   ├── utils/                   # ApiResponse, wallet helpers, …
│   ├── scripts/seed.js          # Sample data seeder
│   └── tests/smoke.test.js      # API smoke tests
│
├── package.json                 # All dependencies (web + API)
├── .env.example                 # Environment template
├── PROJECT_JD.md                # Project job description
└── README.md
```

### Frontend routes

| Path | Page |
|------|------|
| `/` | Home — wallet login + marketing sections |
| `/Earn-rewards-staking` | Smart token staking |
| `/Earn-free-reals-tokens-airdrops` | Airdrop registration |

### API overview

| Type | Base path | Used for |
|------|-----------|----------|
| Legacy | `/addPoints`, `/getByAddress`, `/getAllAddress` | Airdrop UI |
| v1 REST | `/api/v1/*` | Users, newsletter, staking, stats, presale |

See [Server/README.md](./Server/README.md) for the full endpoint list.

---

## License

Private project (`"private": true` in `package.json`).
