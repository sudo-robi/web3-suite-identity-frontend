# Web3 Suite — Identity Frontend

> Modern React application for managing decentralized identity on the Stellar network — DID management, verifiable credential wallets, and KYC verification with Freighter wallet integration.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Stellar](https://img.shields.io/badge/Stellar-Ready-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/sudo-robi/web3-suite-identity-frontend)](https://github.com/sudo-robi/web3-suite-identity-frontend/issues)
[![Stars](https://img.shields.io/github/stars/sudo-robi/web3-suite-identity-frontend)](https://github.com/sudo-robi/web3-suite-identity-frontend/stargazers)
[![Freighter](https://img.shields.io/badge/Wallet-Freighter-14b8e6?style=for-the-badge)](https://freighter.app)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running](#running)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Wallet Integration](#wallet-integration)
- [Pages](#pages)
- [Components](#components)
- [Services](#services)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

### The Problem

Managing decentralized identity on Stellar requires direct interaction with Soroban smart contracts — constructing XDR transactions, managing keypairs, and handling blockchain-specific error cases. This creates a poor user experience for end users who just want to manage their DIDs, store credentials, and complete KYC verification through a familiar web interface.

### The Solution

This frontend provides an intuitive, production-quality React application that wraps all identity operations behind a clean UI. Users connect their Freighter wallet and can:

- Create and manage multiple DIDs
- Browse and verify credentials in a wallet-style interface
- Submit KYC applications and track verification progress
- View dashboard statistics and recent activity

### Target Audience

- **End users** managing their Stellar identity
- **Developers** using this as a reference implementation for identity UIs
- **Enterprise teams** deploying identity solutions for their users
- **DAOs** providing member verification interfaces

---

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
│  │  │ DID Mgmt    │  │ Card         │  │                     │  │  │
│  │  │ Credentials │  │ Button       │  │                     │  │  │
│  │  │ KYC         │  │ StatusBadge  │  │                     │  │  │
│  │  │ NotFound    │  │ Loading      │  │                     │  │  │
│  │  └──────┬──────┘  └─────────────┘  └──────────┬──────────┘  │  │
│  │         │                                       │             │  │
│  │         └───────────────┬───────────────────────┘             │  │
│  │                         │                                     │  │
│  │  ┌──────────────────────▼──────────────────────────────────┐  │  │
│  │  │                    Services                              │  │  │
│  │  │                                                          │  │  │
│  │  │  api.ts  │  did.service.ts  │  credential.service.ts    │  │  │
│  │  │          │  kyc.service.ts   │                           │  │  │
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
                    │  Browser        │
                    │  Extension      │
                    └─────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Identity       │
                    │  Backend API    │
                    │  (REST)         │
                    └─────────────────┘
```

### Data Flow

```
┌──────────┐    HTTP     ┌──────────┐    RPC     ┌──────────┐
│ Frontend │────────────►│ Backend  │───────────►│ Stellar  │
│ (React)  │◄────────────│ (Express)│◄───────────│ Network  │
└──────────┘   JSON      └──────────┘   XDR      └──────────┘
     │
     │ Freighter API
     ▼
┌──────────┐
│ Freighter│
│ Extension│
│ (Wallet) │
└──────────┘
```

---

## Features

### Dashboard (5 features)

1. **Overview Statistics** — At-a-glance view of DID count, credential count, KYC status, and network
2. **Recent Activity Feed** — Timeline of recent identity operations (created, issued, approved)
3. **Quick Action Buttons** — One-click access to common tasks (Create DID, Issue Credential, Submit KYC)
4. **Network Status Indicator** — Visual indicator of current Stellar network (Testnet/Mainnet)
5. **Wallet Connection Prompt** — Friendly prompt to connect Freighter when not connected

### DID Management (5 features)

6. **Create DID** — Form to create new decentralized identifiers with document content
7. **View All DIDs** — List of all DIDs owned by the connected wallet with status indicators
8. **Update DID** — Edit DID document content
9. **Deactivate DID** — Permanently deactivate a DID with confirmation
10. **Transfer DID** — Transfer DID ownership to another Stellar address

### Credential Wallet (5 features)

11. **View Credentials** — Browse all credentials issued to the connected wallet
12. **Issue Credentials** — Create new credentials (for issuers) with type, claims, and expiry
13. **Verify Credentials** — Verify any credential by ID with instant result
14. **Revoke Credentials** — Revoke credentials you've issued
15. **Credential Details** — View full credential information including issuer, claims, and status

### KYC Verification (5 features)

16. **Submit KYC Application** — Multi-step form for KYC submission with level selection
17. **Track Verification Progress** — Visual step indicator showing application status
18. **View KYC Status** — Current verification level, expiry date, and verifier info
19. **Admin Verifier Panel** — Interface for registered verifiers to approve/reject applications
20. **Level Comparison** — Visual comparison of required vs achieved KYC levels

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI framework with hooks |
| TypeScript | 5.3 | Type-safe development |
| Vite | 5.0 | Build tool and dev server |
| Tailwind CSS | 3.3 | Utility-first styling |
| React Router | 6.20 | Client-side routing |
| Stellar SDK | 12.0 | Blockchain interaction |
| Freighter API | 10.0 | Wallet connection and signing |
| Axios | 1.6 | HTTP client for API calls |
| Lucide React | 0.29 | Icon library |
| clsx | 2.0 | Conditional classname utility |
| date-fns | 2.30 | Date formatting and manipulation |
| Vitest | 1.1 | Unit testing framework |
| ESLint | 8.55 | Code quality enforcement |

---

## Project Structure

```
web3-suite-identity-frontend/
├── public/
│   └── favicon.svg                     # App favicon
│
├── src/
│   ├── main.tsx                        # Entry point — renders App
│   ├── App.tsx                         # Root component with BrowserRouter
│   │                                   #   - Route definitions
│   │                                   #   - Layout wrapper
│   ├── index.css                       # Global styles (Tailwind imports)
│   ├── vite-env.d.ts                   # Vite type declarations
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── Layout.tsx              # App shell with sidebar navigation
│   │   │                               #   - Responsive sidebar
│   │   │                               #   - Wallet connection button
│   │   │                               #   - Navigation links
│   │   │
│   │   ├── Header.tsx                  # Top header bar
│   │   │
│   │   └── common/
│   │       ├── Button.tsx              # Reusable button component
│   │       │                           #   - Variants: primary, secondary, danger
│   │       │                           #   - Sizes: sm, md, lg
│   │       │                           #   - Loading state
│   │       ├── Card.tsx                # Card container component
│   │       │                           #   - Optional title prop
│   │       │                           #   - Consistent padding and styling
│   │       ├── Loading.tsx             # Loading spinner component
│   │       └── StatusBadge.tsx         # Status indicator component
│   │                                   #   - Variants: active, inactive, pending
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx               # Home dashboard
│   │   │                               #   - Stats grid (DIDs, Credentials, KYC, Network)
│   │   │                               #   - Recent activity feed
│   │   │                               #   - Quick action buttons
│   │   ├── DIDManagement.tsx           # DID CRUD operations
│   │   │                               #   - Create DID form
│   │   │                               #   - DID list with status
│   │   │                               #   - Update/deactivate/transfer actions
│   │   ├── CredentialWallet.tsx        # Credential viewer and manager
│   │   │                               #   - Credential list
│   │   │                               #   - Issue credential form
│   │   │                               #   - Verify credential by ID
│   │   │                               #   - Revoke credential
│   │   ├── KYCVerification.tsx         # KYC flow
│   │   │                               #   - Submit KYC form
│   │   │                               #   - Status tracker
│   │   │                               #   - Admin verifier panel
│   │   └── NotFound.tsx                # 404 catch-all page
│   │
│   ├── hooks/
│   │   └── useWallet.ts                # Freighter wallet hook
│   │                                   #   - Connection state
│   │                                   #   - Address retrieval
│   │                                   #   - Transaction signing
│   │                                   #   - Network switching
│   │
│   ├── services/
│   │   ├── api.ts                      # Axios instance configuration
│   │   │                               #   - Base URL from env
│   │   │                               #   - Request/response interceptors
│   │   ├── did.service.ts              # DID API calls
│   │   │                               #   - create, resolve, update
│   │   │                               #   - deactivate, transfer, check
│   │   ├── credential.service.ts       # Credential API calls
│   │   │                               #   - issue, get, verify
│   │   │                               #   - revoke, list by issuer/subject
│   │   └── kyc.service.ts              # KYC API calls
│   │                                   #   - submit, approve, reject
│   │                                   #   - status, register verifier, verify
│   │
│   └── types/
│       └── index.ts                    # TypeScript type definitions
│                                       #   - DIDRecord, CredentialRecord
│                                       #   - KYCRecord, KYCLevel, KYCStatus
│                                       #   - API response types
│
├── index.html                          # HTML entry point
├── tailwind.config.js                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── vite.config.ts                      # Vite build configuration
├── tsconfig.json                       # TypeScript configuration
├── tsconfig.node.json                  # TypeScript config for Node.js
├── package.json                        # Dependencies and scripts
├── .gitignore                          # Git ignore rules
├── LICENSE                             # MIT License
├── CONTRIBUTING.md                     # Contribution guidelines
└── README.md                           # This file
```

---

## Screenshots

### Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Your DIDs│ │Credentials│ │ KYC Level│ │ Network  │      │
│  │    2     │ │    5     │ │ Enhanced │ │ Testnet  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
│  ┌─────────────────────┐ ┌─────────────────────┐           │
│  │ Recent Activity     │ │ Quick Actions       │           │
│  │                     │ │                     │           │
│  │ DID Created  2h ago │ │ > Create New DID    │           │
│  │ Cred Issued 1d ago  │ │ > Issue Credential  │           │
│  │ KYC Approved 3d ago │ │ > Submit KYC        │           │
│  └─────────────────────┘ └─────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### DID Management
```
┌─────────────────────────────────────────────────────────────┐
│  DID Management                                             │
│                                                             │
│  ┌─ Create New DID ─────────────────────────────────────┐  │
│  │ Document URL: [________________________________]     │  │
│  │                                        [Create DID]  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Your DIDs                                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ a1b2c3...  │ Active  │ 2024-01-15 │ [Update] [More] │  │
│  │ d4e5f6...  │ Active  │ 2024-02-20 │ [Update] [More] │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Credential Wallet
```
┌─────────────────────────────────────────────────────────────┐
│  Credential Wallet                                          │
│                                                             │
│  ┌─ Issue Credential ───────────────────────────────────┐  │
│  │ Subject DID: [________________________________]      │  │
│  │ Type: [ProofOfIdentity________]                      │  │
│  │ Claims: [{"name": "Alice"}___________________]      │  │
│  │                                        [Issue Cred]  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Your Credentials                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ b2c3d4... │ ProofOfIdentity │ Valid  │ Issued 2d ago │  │
│  │ e5f6a1... │ ProofOfAddress  │ Valid  │ Issued 5d ago │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.0.0
- npm or yarn
- [Freighter](https://freighter.app/) browser extension (Chrome/Firefox)
- A Stellar account on testnet (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/sudo-robi/web3-suite-identity-frontend.git
cd web3-suite-identity-frontend

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
# API Backend URL
VITE_API_URL=http://localhost:3000

# Stellar Network
VITE_STELLAR_NETWORK=testnet
```

### Running

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Other Commands

```bash
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
```

---

## Testing

```bash
# Run all tests
npm test

# Run tests once
npm run test:run

# Run specific test file
npm test -- Dashboard.test.tsx
```

---

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory. Serve them with any static file server:

```bash
# Using Vite preview
npm run preview

# Or deploy dist/ to any static host (Vercel, Netlify, etc.)
```

### Environment Variables for Production

Update `VITE_API_URL` to point to your production backend:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_STELLAR_NETWORK=mainnet
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | No | `http://localhost:3000` | Backend API base URL |
| `VITE_STELLAR_NETWORK` | No | `testnet` | Stellar network to connect to |

All environment variables prefixed with `VITE_` are exposed to the client bundle.

---

## Wallet Integration

This app uses [Freighter](https://freighter.app/) for Stellar wallet integration.

### Setup

1. Install the Freighter browser extension from [freighter.app](https://freighter.app/)
2. Create or import a Stellar account
3. Switch to Testnet (for development) or Mainnet (for production)
4. Click "Connect Wallet" in the app sidebar

### useWallet Hook

The `useWallet` hook provides wallet connection state and methods:

```typescript
import { useWallet } from './hooks/useWallet';

function MyComponent() {
  const {
    address,       // Connected Stellar address (or null)
    connected,     // boolean — is wallet connected?
    connect,       // () => Promise<void> — initiate connection
    disconnect,    // () => void — disconnect wallet
    signTransaction, // (xdr: string) => Promise<string> — sign XDR
  } = useWallet();

  return (
    <div>
      {connected ? (
        <p>Connected: {address}</p>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
```

### Freighter API Usage

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

---

## Pages

| Page | Route | Description | Auth Required |
|------|-------|-------------|---------------|
| Dashboard | `/` | Overview with stats, activity, and quick actions | No (shows connect prompt) |
| DID Management | `/did` | Create, view, update, deactivate, and transfer DIDs | Yes |
| Credential Wallet | `/credentials` | Issue, view, verify, and revoke credentials | Partial |
| KYC Verification | `/kyc` | Submit KYC applications and track status | Yes |
| Not Found | `*` | 404 catch-all page | No |

---

## Components

### Layout

The `Layout` component provides the app shell with:
- Responsive sidebar navigation
- Wallet connection button in the header
- Main content area with proper spacing
- Active route highlighting

### Card

Reusable card container with optional title:

```tsx
<Card title="My Section">
  <p>Card content goes here</p>
</Card>
```

### Button

Flexible button with variants and sizes:

```tsx
<Button variant="primary" size="md" loading={false} onClick={handleClick}>
  Click Me
</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Shows spinner when true |
| `disabled` | `boolean` | `false` | Disables the button |

### StatusBadge

Status indicator with color coding:

```tsx
<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="inactive" />
```

---

## Services

All services follow the same pattern — they call the backend API and return typed responses.

### api.ts

Configured Axios instance:

```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});
```

### did.service.ts

```typescript
didService.createDID(owner, document)    // POST /api/v1/did
didService.resolveDID(id)                // GET /api/v1/did/:id
didService.updateDID(id, caller, doc)    // PUT /api/v1/did/:id
didService.deactivateDID(id, caller)     // DELETE /api/v1/did/:id?caller=
didService.transferDID(id, caller, new)  // POST /api/v1/did/:id/transfer
didService.checkActive(id)               // GET /api/v1/did/check/:id
```

### credential.service.ts

```typescript
credentialService.issueCredential(data)       // POST /api/v1/credentials/issue
credentialService.getCredential(id)           // GET /api/v1/credentials/:id
credentialService.verifyCredential(id)        // POST /api/v1/credentials/:id/verify
credentialService.revokeCredential(id, caller) // POST /api/v1/credentials/:id/revoke
credentialService.getIssuerCredentials(addr)  // GET /api/v1/credentials/issuer/:address
credentialService.getSubjectCredentials(did)  // GET /api/v1/credentials/subject/:did
```

### kyc.service.ts

```typescript
kycService.submitKYC(data)                    // POST /api/v1/kyc/submit
kycService.approveKYC(data)                   // POST /api/v1/kyc/approve
kycService.rejectKYC(data)                    // POST /api/v1/kyc/reject
kycService.getStatus(address)                 // GET /api/v1/kyc/status/:address
kycService.registerVerifier(admin, verifier)  // POST /api/v1/kyc/verifier/register
kycService.checkVerification(address, level)  // GET /api/v1/kyc/verify/:address?level=
```

---

## Contributing

### Branch Naming

| Prefix | Use Case |
|--------|----------|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `refactor/` | Code restructuring |
| `test/` | Adding or updating tests |
| `chore/` | Maintenance tasks |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(did): add batch DID creation UI
fix(credentials): handle expired credential display
test(kyc): add KYC submission flow tests
style(dashboard): improve stat card spacing
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`npm test`)
5. Ensure linting passes (`npm run lint`)
6. Commit your changes (`git commit -m 'feat: add my feature'`)
7. Push to the branch (`git push origin feat/my-feature`)
8. Open a Pull Request with a clear description

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

Built with ❤️ for the Stellar ecosystem.
