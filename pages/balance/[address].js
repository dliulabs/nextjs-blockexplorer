import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { _getBalance } from "../../helpers/sdk-utils";

function BalancePage(props) {
  const { data } = props;

  if (!data) {
    return (
      <>
        <p>No balance found.</p>
      </>
    );
  }

  return (
    <main className={styles.main}>
      <Container className={styles.description}>
        <Row>
          <Col sm>
            <span>Address: {data.address.toLowerCase()}</span>
          </Col>
          <Col sm>
            <span>Balance: {data.balance} ETH</span>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default BalancePage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const address = params.address;
  const balance = await _getBalance(address);

  if (!balance) {
    return { notFound: true };
  }
  return {
    props: {
      data: {
        address: address,
        balance: balance,
      },
    },
    revalidate: 10,
    notFound: !balance,
  };
}
