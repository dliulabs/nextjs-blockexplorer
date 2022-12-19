import { _getBlock } from "../../helpers/sdk-utils";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

function BlockPage() {
  const router = useRouter();
  const [block, setBlock] = useState();
  const [isLoading, setLoading] = useState(false);
  const blockNumber = router.query.blocknumber;
  useEffect(() => {
    setLoading(true);
    _getBlock(blockNumber).then((data) => {
      setBlock(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!block) return <p>No block data</p>;

  return (
    <main className={styles.main}>
      <Container className={styles.description}>
        <Row>
          <Col sm>
            <span>Block Number: {blockNumber}</span>
          </Col>
          <Col sm>
            <span>Block Hash: {block?.hash}</span>
          </Col>
          <Col sm>
            <span>Transaction count: {block?.transactions?.length} </span>
            <Container className={styles.description}>
              <Col>
                {block?.transactions?.map((txHash, i) => (
                  <div className={styles.grid}>
                    <Row sm key={i}>
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
