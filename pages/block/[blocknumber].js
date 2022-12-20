import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { utils } from "ethers";
import { _getBlock } from "../../helpers/sdk-utils";

function BlockPage(props) {
  const { blockInfo } = props;
  const block = blockInfo;

  if (!block) {
    return (
      <>
        <p>No block found.</p>
      </>
    );
  }

  return (
    <main className={styles.main}>
      <Container className={styles.description}>
        <Row>
          <Col sm>
            <span>Block Number: {block.number}</span>
          </Col>
          <Col sm>
            <span>Block Hash: {block?.hash}</span>
          </Col>
          <Col sm>
            <span>Gas Fee Per Gas: {block?.baseFeePerGas}</span>
          </Col>
          <Col sm>
            <span>Difficulty: {block?._difficulty}</span>
          </Col>
          <Col sm>
            <span>Transaction count: {block?.transactions?.length} </span>
            <Container className={styles.description}>
              <Col>
                {block?.transactions?.map((txHash, i) => (
                  <div className={styles.grid}>
                    <Row key={i}>
                      {i + 1}
                      <div>
                        <Link href={`/tx/${txHash}`} passHref>
                          {txHash}
                        </Link>
                      </div>
                    </Row>
                  </div>
                ))}
              </Col>
            </Container>
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
  const blocknumber = params.blocknumber;
  const blockInfo = await _getBlock(blocknumber);

  if (!blockInfo) {
    return { notFound: true };
  }
  const { gasLimit, gasUsed, baseFeePerGas, _difficulty, ...newBlockInfo } =
    blockInfo;

  const toBigNumber = (v) => (v ? utils.formatEther(v) : 0);

  return {
    props: {
      blockInfo: {
        ...newBlockInfo,
        gasLimit: toBigNumber(gasLimit),
        gasUsed: toBigNumber(gasUsed),
        baseFeePerGas: toBigNumber(baseFeePerGas),
        _difficulty: toBigNumber(_difficulty),
      },
    },
    revalidate: 10,
    notFound: !blockInfo,
  };
}
