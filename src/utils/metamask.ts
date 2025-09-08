import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      isMetaMask?: boolean;
    };
  }
}

export const checkMetaMaskAvailability = (): boolean => {
  return typeof window !== 'undefined' && !!window.ethereum && !!window.ethereum.isMetaMask;
};

export const connectMetaMask = async (): Promise<string> => {
  if (!checkMetaMaskAvailability()) {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  try {
    const accounts = await window.ethereum!.request({
      method: 'eth_requestAccounts'
    });
    
    if (accounts.length === 0) {
      throw new Error('No accounts found. Please check your MetaMask connection.');
    }
    
    return accounts[0];
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('Connection rejected. Please approve the connection request in MetaMask.');
    }
    throw new Error(`Failed to connect to MetaMask: ${error.message}`);
  }
};

export const validateEthereumAddress = (address: string): boolean => {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
};

export const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};