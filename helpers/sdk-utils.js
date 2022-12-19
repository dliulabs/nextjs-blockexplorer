import { Alchemy, Network } from "alchemy-sdk";
import { utils } from "ethers";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function _getBlockNumber() {
  const blockNumber = await alchemy.core.getBlockNumber("latest");
  return Number(blockNumber);
}

export async function _getBlock(blockNumber) {
  const block = await alchemy.core.getBlock(Number(blockNumber));
  // console.log(block);
  return block;
}

export async function _getTransaction(txHash) {
  const tx = await alchemy.transact.getTransaction(txHash);
  // console.log(tx);
  return tx;
}

export async function _getBalance(address) {
  const balance = await alchemy.core.getBalance(address);
  const eth = utils.formatEther(balance);
  // console.log(`\nETH Balance of ${address} --> ${eth} ETH\n`);
  return eth;
}
