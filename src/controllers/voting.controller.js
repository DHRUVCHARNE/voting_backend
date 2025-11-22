import { contract, ownerAddress, web3 } from "../config/web3.js";
export const getCandidates = async (req, res) => {
  try {
    const raw = await contract.methods.getCandidates().call();
    const candidates = raw.map(c => ({
      name: c.name,
      voteCount: Number(c.votes),
    }));
    res.json({ candidates });
    console.log("getCandidates success:", candidates);
  } catch (err) {
    console.error("getCandidates error:", err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};

export const addCandidate = async (req, res) => {
  try {
    const { candidate_name } = req.body;
    
    const receipt = await contract.methods
      .addCandidate(candidate_name)
      .send({ from: ownerAddress });

    res.json({
      message: "Candidate added",
      txHash: receipt.transactionHash,
    });
    console.log("addCandidate success:", candidate_name);
  } catch (err) {
    console.error("addCandidate error:", err);
    res.status(500).json({ error: "Failed to add candidate" });
  }
};

export const castVote = async (req, res) => {
  try {
    const { candidate_index, address } = req.body;
    const receipt = await contract.methods
      .vote(candidate_index)
      .send({ from: address });

    res.json({
      message: "Vote cast",
      txHash: receipt.transactionHash,
    });
    console.log("castVote success:", candidate_index, address);
  } catch (err) {
    console.error("castVote error:", err);
    res.status(500).json({ error: "Failed to cast vote" });
  }
};

export const getWinner = async (req, res) => {
  try {
    const winnerName = await contract.methods.getWinner().call();
    res.json({ winner: winnerName });
    console.log("getWinner success:", winnerName);
  } catch (err) {
    console.error("getWinner error:", err);
    res.status(500).json({ error: "Failed to fetch winner" });
  }
};