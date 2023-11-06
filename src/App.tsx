import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import "./App.css";
import { AccountList } from "./components/AccountList";
import { Balance } from "./components/Balance";
import { Button } from "./components/Button";
import { Heading, Title } from "./components/Typography";
import { getAccounts, getBalance, getChainId } from "./metamask/api";
import { Loading } from "./components/Loading";

type Wallet = {
  chainId: string;
  accounts: string[];
  balance: string;
};

function App() {
  const { sdk, provider, connected } = useSDK();
  const [wallet, setWallet] = useState<Wallet>({
    chainId: "",
    accounts: [],
    balance: "",
  });
  const [account, setAccount] = useState<string>();
  const [loading, setLoading] = useState(false);

  const terminate = () => {
    sdk?.terminate();
  };

  const connect = () => {
    sdk?.connect();
  };

  useEffect(() => {
    const updateBalance = async () => {
      if (!provider || !account) {
        return;
      }

      setLoading(true);

      try {
        const balance = (await getBalance(provider, account)) || "0x0";
        setWallet((wallet) => ({ ...wallet, balance }));
        setLoading(false);
      } catch (e) {
        console.log("Update balance error: ", e);
        setLoading(false);
      }
    };

    updateBalance();
  }, [account, provider]);

  useEffect(() => {
    if (!provider) {
      return;
    }

    const updateWallet = async (accounts: string[]) => {
      if (!provider) {
        throw new Error("Ethereum Provider not found");
      }

      let activeAccount = account;
      if (!activeAccount || !accounts.includes(activeAccount)) {
        setAccount(accounts[0]);
        activeAccount = accounts[0];
      }

      try {
        const balance = (await getBalance(provider, activeAccount)) || "0x0";
        const chainId = await getChainId(provider);
        setWallet({ accounts, balance, chainId: chainId! });
      } catch (e) {
        console.log("Get balance error", e);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet!, chainId }));
    };

    const init = async () => {
      const accounts = await getAccounts(provider);

      if (Array.isArray(accounts)) {
        refreshAccounts(accounts);
      } else {
        console.log("No accounts found");
      }

      provider.on("accountsChanged", refreshAccounts);
      provider.on("chainChanged", refreshChain);
    };

    init();

    return () => {
      provider.removeListener("accountsChanged", refreshAccounts);
      provider.removeListener("chainChanged", refreshChain);
    };
  }, [provider, account]);

  return (
    <div className="App">
      {connected ? (
        <Button onClick={terminate}>Disconnect</Button>
      ) : (
        <Button onClick={connect}>Connect</Button>
      )}
      {connected && (
        <>
          <Title>
            {wallet?.chainId && `Connected chain: ${wallet.chainId}`}
          </Title>
          <Heading>Accounts</Heading>
          <AccountList
            accounts={wallet?.accounts}
            listClassName="w-fit mx-auto"
            listItemRender={(accountId) => (
              <li
                key={accountId}
                onClick={() => setAccount(accountId)}
                className={`p-1 px-4 cursor-pointer rounded-md hover:bg-slate-200${
                  account === accountId ? " bg-blue-200" : ""
                }`}
              >
                {accountId}
              </li>
            )}
          />
          {loading ? (
            <Loading className={`mx-auto mt-4 w-fit`} />
          ) : (
            wallet?.balance && (
              <Balance balance={wallet.balance} className="p-1 mt-4 text-3xl" />
            )
          )}
        </>
      )}
    </div>
  );
}

export default App;
