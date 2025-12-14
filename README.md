# Voting dApp

A decentralized voting application built on the Base Sepolia network, enabling transparent and secure blockchain-based voting.

## Features

- 🔒 **Secure & Transparent**: All votes are recorded on-chain with complete immutability
- ⚡ **Fast & Efficient**: Built on Base network for low gas fees
- 👥 **Decentralized**: No central authority, managed by smart contracts
- 📊 **Real-time Results**: Live vote counts and countdown timers
- ✅ **One Vote Per Person**: Blockchain ensures each wallet can only vote once
- 🎯 **Time-Based Voting**: Set voting periods with automatic end times

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Web3**: Ethers.js 6, Reown AppKit
- **Testing**: Jest, React Testing Library

### Smart Contract
- **Language**: Solidity ^0.8.14
- **Framework**: Hardhat
- **Network**: Base Sepolia

## Project Structure

```
Voting/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions and helpers
│   └── types/        # TypeScript type definitions
└── smartcontract/    # Hardhat smart contract project
    ├── contracts/    # Solidity contracts
    ├── test/         # Contract tests
    └── scripts/      # Deployment scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- MetaMask or compatible Web3 wallet
- Base Sepolia testnet ETH

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Voting
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install smart contract dependencies:
```bash
cd ../smartcontract
npm install
```

### Environment Setup

1. Create `.env` file in `frontend/`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0c8cF958759f547a9Cc53Edceb428a8244aF4586
```

2. Create `.env` file in `smartcontract/`:
```env
PRIVATE_KEY=your_private_key
BASE_SEPOLIA_RPC_URL=your_rpc_url
```

### Development

#### Frontend
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

#### Smart Contract
```bash
cd smartcontract
npx hardhat compile
npx hardhat test
```

## Usage

### For Election Owners

1. **Connect Wallet**: Connect your wallet to Base Sepolia network
2. **Register Contenders**: Use the Admin Panel to register up to 3 contenders with unique codes
3. **Start Voting**: Set a duration and start the voting session
4. **Monitor Results**: Watch real-time vote counts and results

### For Voters

1. **Connect Wallet**: Connect your Web3 wallet
2. **View Contenders**: Browse registered contenders and their current vote counts
3. **Cast Vote**: Select your preferred contender and submit your vote
4. **View Results**: See live results and final winner after voting ends

## Testing

### Frontend Tests
```bash
cd frontend
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Smart Contract Tests
```bash
cd smartcontract
npx hardhat test
REPORT_GAS=true npx hardhat test  # With gas reporting
```

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run tests
- `npm run test:coverage` - Generate coverage report

### Smart Contract
- `npx hardhat compile` - Compile contracts
- `npx hardhat test` - Run tests
- `npx hardhat deploy` - Deploy contracts
- `npx hardhat verify` - Verify contracts on block explorer

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## License

MIT

## Security

This is a testnet application. Do not use in production without proper security audits.

## Support

For issues and questions, please open an issue on the repository.

