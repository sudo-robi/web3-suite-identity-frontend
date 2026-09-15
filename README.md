[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Stellar](https://img.shields.io/badge/Stellar-Ready-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

# Web3 Suite — Identity Frontend

A modern React application for managing decentralized identity on the Stellar network. This frontend provides an intuitive interface for DID management, verifiable credential wallets, and KYC verification — all powered by Soroban smart contracts.

<!-- Screenshot placeholders -->
![Dashboard](https://via.placeholder.com/800x450/0a0a0a/14b8e6?text=Dashboard+Screenshot)
![DID Management](https://via.placeholder.com/800x450/0a0a0a/14b8e6?text=DID+Management+Screenshot)
![Credential Wallet](https://via.placeholder.com/800x450/0a0a0a/14b8e6?text=Credential+Wallet+Screenshot)
![KYC Verification](https://via.placeholder.com/800x450/0a0a0a/14b8e6?text=KYC+Verification+Screenshot)

## Features

### Dashboard
- Overview of DID count, credential count, and KYC status
- Recent activity feed
- Quick action buttons for common tasks
- Network status indicator

### DID Management
- Create new decentralized identifiers
- View all your DIDs with status indicators
- Update DID documents
- Deactivate DIDs
- Transfer DID ownership

### Credential Wallet
- View all credentials issued to you
- Issue new credentials (if you're an issuer)
- Verify credentials by ID
- Revoke credentials you've issued
- View detailed credential information

### KYC Verification
- Submit KYC applications with tiered levels
- Track verification progress with visual steps
- View current KYC status and expiry
- Admin panel for verifiers

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Styling |
| React Router 6 | Navigation |
| Stellar SDK | Blockchain interaction |
| Freighter API | Wallet connection |
| Axios | HTTP client |
| Lucide React | Icons |

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Browser                                     │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    React Application                          │  │
│  │                                                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │  │
│  │  │   Pages     │  │  Components  │  │      Hooks          │  │  │
│  │  │             │  │              │  │                     │  │  │
│  │  │ Dashboard   │  │ Layout       │  │ useWallet           │  │  │
│  │  │ DID Mgmt    │  │ Card         │  │ useDID              │  │  │
│  │  │ Credentials │  │ Button       │  │ useCredentials      │  │  │
│  │  │ KYC         │  │ StatusBadge  │  │ useKYC              │  │  │
│  │  └──────┬──────┘  └─────────────┘  └──────────┬──────────┘  │  │
│  │         │                                       │             │  │
│  │         └───────────────┬───────────────────────┘             │  │
│  │                         │                                     │  │
│  │  ┌──────────────────────▼──────────────────────────────────┐  │  │
│  │  │                    Services                              │  │  │
│  │  │                                                          │  │  │
│  │  │  api.ts  │  did.service.ts  │  credential.service.ts    │  │  │
│  │  │          │  kyc.service.ts   │  wallet.service.ts        │  │  │
│  │  └──────────────────────┬──────────────────────────────────┘  │  │
│  │                         │                                     │  │
│  └─────────────────────────┼─────────────────────────────────────┘  │
│                            │                                        │
│  ┌─────────────────────────▼─────────────────────────────────────┐  │
│  │              @stellar/freighter-api                           │  │
│  │              (Wallet Integration)                             │  │
│  └─────────────────────────┬─────────────────────────────────────┘  │
│                            │                                        │
└────────────────────────────┼────────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Freighter      │
                    │  Extension      │
                    │  (Stellar       │
                    │   Wallet)       │
                    └─────────────────┘
```

## Getting Started

### Prerequisites

- Node.js ≥ 18.0.0
- npm or yarn
- [Freighter](https://freighter.app/) browser extension

### Installation

```bash
# Clone the repository
git clone https://github.com/sudo-robi/web3-suite-identity-frontend.git
cd web3-suite-identity-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

The app uses the following environment variables (create a `.env` file):

```env
# API Backend URL (default: proxied through Vite)
VITE_API_URL=http://localhost:3000

# Stellar Network
VITE_STELLAR_NETWORK=testnet
```

### Development

```bash
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
```

## Project Structure

```
web3-suite-identity-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Root component with routing
│   ├── index.css                # Global styles (Tailwind)
│   ├── components/
│   │   ├── layout/
│   │   │   └── Layout.tsx       # App shell with sidebar
│   │   └── common/
│   │       ├── Button.tsx       # Reusable button
│   │       ├── Card.tsx         # Card container
│   │       ├── Loading.tsx      # Loading spinner
│   │       └── StatusBadge.tsx  # Status indicator
│   ├── pages/
│   │   ├── Dashboard.tsx        # Home dashboard
│   │   ├── DIDManagement.tsx    # DID CRUD operations
│   │   ├── CredentialWallet.tsx # Credential viewer
│   │   ├── KYCVerification.tsx  # KYC flow
│   │   └── NotFound.tsx         # 404 page
│   ├── hooks/
│   │   └── useWallet.ts         # Freighter wallet hook
│   ├── services/
│   │   ├── api.ts               # Axios instance
│   │   ├── did.service.ts       # DID API calls
│   │   ├── credential.service.ts
│   │   └── kyc.service.ts
│   └── types/
│       └── index.ts             # TypeScript types
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── README.md
```

## Wallet Integration

This app uses [Freighter](https://freighter.app/) for Stellar wallet integration:

1. Install the Freighter browser extension
2. Create or import a Stellar account
3. Switch to Testnet (for development)
4. Click "Connect Wallet" in the app sidebar

```typescript
import * as Freighter from '@stellar/freighter-api';

// Check if Freighter is installed
const isInstalled = await Freighter.isConnected();

// Get connected address
const { address } = await Freighter.getAddress();

// Sign a transaction
const signedTx = await Freighter.signTransaction(txXDR, {
  networkPassphrase: StellarSdk.Networks.TESTNET,
});
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

Built with ❤️ for the Stellar ecosystem.
