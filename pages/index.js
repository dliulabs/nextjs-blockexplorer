// import { Alchemy, Network } from "alchemy-sdk";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

function Home() {
  const [blockNumber, setBlockNumber] = useState();
  const { data, error } = useSWR("/api/get-block", fetcher, {
    onSuccess: (data) => {
      setBlockNumber(() => data.blockNumber);
    },
  });

  if (error) return <div>Failed to load</div>;
  if (!data && !blockNumber) return <div>Loading...</div>;
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
        </div>
      </main>
    );
  }
}

export default Home;
