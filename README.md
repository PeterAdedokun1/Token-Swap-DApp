# 🔄 Token Swap DApp (ERC20)

A simple decentralized application (DApp) that allows users to **swap between two ERC20 tokens** (TokenA and TokenB) on the Ethereum Sepolia Testnet.  
Built with **Solidity, React, and Ethers.js**.

---

## 📌 Features
- Deployable ERC20 tokens (**TokenA** & **TokenB**) using OpenZeppelin.
- Swap contract to handle **TokenA ↔ TokenB** conversions.
- Frontend built in **React** with wallet integration via **MetaMask**.
- Real-time wallet connection and balances.
- Testnet-ready (Sepolia ETH required for gas).

---

## 🛠 Tech Stack
- **Solidity** (Smart Contracts)
- **OpenZeppelin** (ERC20 standard)
- **Remix** (for deployment)
- **React.js** (Frontend)
- **Ethers.js v6** (Blockchain interaction)
- **MetaMask** (Wallet connection)

---

## ⚡️ Setup & Installation

1. **Clone repo**
   ```bash
   git clone https://github.com/your-username/tokenswap-dapp.git
   cd tokenswap-dapp

Install dependencies

npm install

Add contract ABIs
Make sure the following ABI files exist in src/abis/:

TokenA.json

TokenB.json

TokenSwap.json

Update contract addresses
Inside App.jsx, replace these with your deployed contract addresses:

const swapAddress = "YOUR_SWAP_CONTRACT_ADDRESS";
const tokenAAddress = "YOUR_TOKENA_ADDRESS";
const tokenBAddress = "YOUR_TOKENB_ADDRESS";

Start frontend

npm run dev


Visit 👉 http://localhost:5173