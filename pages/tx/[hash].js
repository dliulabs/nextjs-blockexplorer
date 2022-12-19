import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { ethers } from "ethers";
import { utils } from "ethers";
import { _getTransaction } from "../../helpers/sdk-utils";

function BlockPage(props) {
  const transaction = props.txInfo;

  if (!transaction) {
    return (
      <>
        <p>No transaction found.</p>
      </>
    );
  }

  return (
    <main className={styles.main}>
      <Container className={styles.description}>
        <Row>
          <Col sm>
            <span>Transaction Hash: {transaction.hash}</span>
          </Col>
          <Col sm>
            <div className={styles.grid}>
              Block Number:
              <div>
                <Link href={`/block/${transaction.blockNumber}`} passHref>
                  {transaction.blockNumber}
                </Link>
              </div>
            </div>
            {/* <span>Block Number: {transaction.blockNumber}</span> */}
          </Col>
          <Col sm>
            <div className={styles.grid}>
              From:
              <div>
                <Link href={`/balance/${transaction.from}`} passHref>
                  {transaction.from}
                </Link>
              </div>
            </div>
          </Col>
          <Col sm>
            <div className={styles.grid}>
              To:
              <div>
                <Link href={`/balance/${transaction.to}`} passHref>
                  {transaction.to}
                </Link>
              </div>
            </div>
          </Col>
          <Col sm>
            <span>Value: {transaction.value} ETH</span>
          </Col>
          <Col sm>
            <span>Gas Price: {transaction.gasPrice} ETH</span>
          </Col>
          <Col sm>
            <span>
              Gas Limit: {transaction.gasLimit && transaction.gasLimit} ETH
            </span>
          </Col>
          <Col sm>
            <span>
              Max Priority Fee Per Gas:{" "}
              {transaction?.maxPriorityFeePerGas &&
                transaction?.maxPriorityFeePerGas}{" "}
              ETH
            </span>
          </Col>
          <Col sm>
            <span>
              Max Fee Per Gas:{" "}
              {transaction?.maxFeePerGas && transaction?.maxFeePerGas} ETH
            </span>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default BlockPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const txHash = params.hash;
  const transaction = await _getTransaction(txHash);

  if (!transaction) {
    return { notFound: true };
  }

  const {
    gasPrice,
    maxPriorityFeePerGas,
    value,
    gasLimit,
    gasUsed,
    maxFeePerGas,
    wait,
    ...newTransaction
  } = transaction;

  return {
    props: {
      txInfo: {
        ...newTransaction,
        gasPrice: utils.formatEther(gasPrice),
        maxPriorityFeePerGas: utils.formatEther(maxPriorityFeePerGas),
        value: utils.formatEther(value),
        gasLimit: utils.formatEther(gasLimit),
        // gasUsed: utils.formatEther(gasUsed),
        maxFeePerGas: utils.formatEther(maxFeePerGas),
      },
    },
    revalidate: 10,
    notFound: !transaction,
  };
}
