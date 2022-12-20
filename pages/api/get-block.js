import { _getBlockNumber } from "../../helpers/sdk-utils";

async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      _getBlockNumber().then((blockNumber) => {
        res.status(200).json({ blockNumber: blockNumber });
        resolve();
      });
    } else {
      res.status(405);
      res.end();
      resolve();
    }
  });
}

export default handler;
