import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

/** True when wallet is connected on the app's primary chain (BSC). */
export function useWalletReady() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains } = useSwitchNetwork();

  const targetChainId = chains[0]?.id;
  const isCorrectNetwork = chain?.id === targetChainId;

  return Boolean(isConnected && address && isCorrectNetwork);
}
