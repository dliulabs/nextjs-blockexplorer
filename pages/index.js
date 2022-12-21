// import { Alchemy, Network } from "alchemy-sdk";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { darkTheme, lightTheme, Theme, SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
const fetcher = (url) => fetch(url).then((res) => res.json());

const myLightTheme = {
  ...lightTheme, // Extend the lightTheme
  accent: "#FF007A",
  primary: "#000000",
  secondary: "#565A69",
};

const myDarkTheme = {
  ...darkTheme, // Extend the darkTheme
  accent: "#2172E5",
  primary: "#FFFFFF",
  secondary: "#888D9B",
};

function Home() {
  const [blockNumber, setBlockNumber] = useState();
  const { data, error } = useSWR("/api/get-block", fetcher, {
    onSuccess: (data) => {
      setBlockNumber(() => data.blockNumber);
    },
  });

  if (error) return <div>Failed to load</div>;
  if (!data && !blockNumber) return <div>Loading...</div>;
  let darkMode = true;
  const jsonRpcUrlMap = {
    1: [`https://mainnet.infura.io/v3/demo`],
    5: [`https://goerli.infura.io/v3/demo`],
  };
  if (data) {
    return (
      <main className={styles.main}>
        <div className={styles.grid}>
          The Most Recent Block:
          <div>
            <Link href={`/block/${blockNumber}`} passHref>
              {blockNumber}
            </Link>
          </div>
          <div className="Uniswap">
            <SwapWidget
              theme={darkMode ? myDarkTheme : myLightTheme}
              jsonRpcUrlMap={jsonRpcUrlMap}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
