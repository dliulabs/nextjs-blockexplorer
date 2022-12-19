import { _getTransaction } from "../../helpers/sdk-utils";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { Container, Row, Col } from "reactstrap";
import { ethers } from "ethers";

function BlockPage() {
  const router = useRouter();
  const [transaction, setTransaction] = useState();
  const [isLoading, setLoading] = useState(false);
  const hash = router.query.hash;
  useEffect(() => {
    setLoading(true);
    _getTransaction(hash).then((data) => {
      setTransaction(data);
      setLoading(false);
    });
  }, []);

  if (!hash) return <p>No Tx Hash</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!transaction) return <p>No transaction data</p>;

  return (
    <main className={styles.main}>
      <Container className={styles.description}>
        <Row>
          <Col sm>
            <span>Transaction Hash: {hash}</span>
          </Col>
          <Col sm>
            <span>Block Number: {transaction.blockNumber}</span>
          </Col>
          <Col sm>
            <span>From: {transaction.from}</span>
          </Col>
          <Col sm>
            <span>To: {transaction.to}</span>
          </Col>
          <Col sm>
            <span>Value: {Number(transaction.value._hex)}</span>
          </Col>
          <Col sm>
            <span>
              Gas Price:
              {Number(transaction.gasPrice._hex)}
            </span>
          </Col>
          <Col sm>
            <span>
              Gas Limit:
              {transaction.gasLimit && Number(transaction.gasLimit._hex)}
            </span>
          </Col>
          <Col sm>
            <span>
              Max Priority Fee Per Gas:
              {transaction?.maxPriorityFeePerGas &&
                Number(transaction?.maxPriorityFeePerGas?._hex)}
            </span>
          </Col>
          <Col sm>
            <span>
              Max Fee Per Gas:
              {transaction?.maxFeePerGas &&
                Number(transaction?.maxFeePerGas?._hex)}
            </span>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default BlockPage;
