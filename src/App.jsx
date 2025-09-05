import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import TokenSwapABIArtifact from "./abis/TokenSwap.json";
import TokenAABIArtifact from "./abis/TokenA.json";
import TokenBABIArtifact from "./abis/TokenB.json";

const swapAddress = import.meta.VITE_SWAP_ADDRESS
const tokenAAddress = "0x32DdFA7332E813CB36cf97c4EE29466084e35234";
const tokenBAddress = "0xffAEcBA766A9b9376735cB698D3e1F2979e6f5CB";

const TokenAABI = TokenAABIArtifact.output.abi;
const TokenBABI = TokenBABIArtifact.output.abi;
const TokenSwapABI = TokenSwapABIArtifact.output.abi;

export default function App() {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [swapDirection, setSwapDirection] = useState("AtoB");
  const [message, setMessage] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    }
  }

  async function swap() {
    if (!amount) return;
    try {
      setMessage("⏳ Processing transaction...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const swap = new ethers.Contract(swapAddress, TokenSwapABI, signer);

      // Debug reserves before swap
      const reserveA = await swap.reserveA();
      const reserveB = await swap.reserveB();
      console.log("Reserve A:", reserveA.toString(), "Reserve B:", reserveB.toString());

      if (swapDirection === "AtoB") {
        const tokenA = new ethers.Contract(tokenAAddress, TokenAABI, signer);

        const tx1 = await tokenA.approve(swapAddress, ethers.parseUnits(amount, 18));
        await tx1.wait();

        const tx2 = await swap.swapAforB(ethers.parseUnits(amount, 18));
        const receipt = await tx2.wait();

        if (receipt.status === 1) {
          setMessage(`✅ Swapped ${amount} TKA for TKB`);
        } else {
          setMessage("⚠️ Swap reverted on-chain");
        }
      } else {
        const tokenB = new ethers.Contract(tokenBAddress, TokenBABI, signer);

        const tx1 = await tokenB.approve(swapAddress, ethers.parseUnits(amount, 18));
        await tx1.wait();

        const tx2 = await swap.swapBforA(ethers.parseUnits(amount, 18));
        const receipt = await tx2.wait();

        if (receipt.status === 1) {
          setMessage(`✅ Swapped ${amount} TKB for TKA`);
        } else {
          setMessage("⚠️ Swap reverted on-chain");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Swap failed. Check console for details.");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md text-center">
      <h1 className="text-xl font-bold mb-4">🔄 Token Swap DApp</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Connect Wallet
        </button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <div className="mt-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full rounded-lg"
        />

        <select
          className="border p-2 w-full rounded-lg mt-2"
          value={swapDirection}
          onChange={(e) => setSwapDirection(e.target.value)}
        >
          <option value="AtoB">Swap TKA → TKB</option>
          <option value="BtoA">Swap TKB → TKA</option>
        </select>

        <button
          onClick={swap}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Swap
        </button>
      </div>

      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
