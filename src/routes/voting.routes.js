import express from "express";
import { getCandidates, addCandidate, castVote, getWinner } from "../controllers/voting.controller.js";
import { ownerAuth } from "../middlewares/ownerAuth.js";

const router = express.Router();

// API root
router.get("/", (req, res) => {
  res.json({ message: "Voting API v1 is live" });
});

router.get('/candidates', getCandidates);
router.post('/candidates', ownerAuth, addCandidate);
router.post('/vote', castVote);
router.get('/winner', getWinner);

export default router;
