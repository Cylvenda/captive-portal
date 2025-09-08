import { create } from 'zustand';

export interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  setAddress: (address: string | null) => void;
  setConnecting: (connecting: boolean) => void;
  setConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  isConnecting: false,
  isConnected: false,
  error: null,
  setAddress: (address) => set({ address }),
  setConnecting: (isConnecting) => set({ isConnecting }),
  setConnected: (isConnected) => set({ isConnected }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    address: null, 
    isConnecting: false, 
    isConnected: false, 
    error: null 
  }),
}));