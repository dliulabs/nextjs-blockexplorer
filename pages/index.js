// import { Alchemy, Network } from "alchemy-sdk";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { _getBlockNumber } from "../helpers/sdk-utils";

function Home() {
  const [blockNumber, setBlockNumber] = useState([]);
  _getBlockNumber().then((bn) => setBlockNumber(() => bn));

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        The Most Recent Block:
        <div>
          <Link href={`/block/${blockNumber}`} passHref>
            {blockNumber}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
