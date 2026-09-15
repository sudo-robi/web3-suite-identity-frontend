import { useState, useEffect, useCallback } from 'react';

interface WalletState {
  connected: boolean;
  address: string | null;
  network: string | null;
  loading: boolean;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    connected: false,
    address: null,
    network: null,
    loading: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      // Dynamic import for Freighter
      const Freighter = await import('@stellar/freighter-api');
      const isConnected = await Freighter.isConnected();
      if (!isConnected) {
        throw new Error('Freighter wallet not installed');
      }
      const { address } = await Freighter.getAddress();
      const network = await Freighter.getNetwork();
      setState({
        connected: true,
        address,
        network,
        loading: false,
        error: null,
      });
      localStorage.setItem('stellar_address', address);
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      connected: false,
      address: null,
      network: null,
      loading: false,
      error: null,
    });
    localStorage.removeItem('stellar_address');
  }, []);

  useEffect(() => {
    // Check if already connected
    const savedAddress = localStorage.getItem('stellar_address');
    if (savedAddress) {
      setState((prev) => ({
        ...prev,
        connected: true,
        address: savedAddress,
      }));
    }
  }, []);

  return { ...state, connect, disconnect };
}
