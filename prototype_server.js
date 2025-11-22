import express from 'express';
import morgan from 'morgan';
import {Web3} from 'web3';
import dotenv from 'dotenv';
import {voting_abi} from "./abi.js";

dotenv.config();
const app = express();
const web3 = new Web3(`${process.env.PROVIDER_URL}`);

const voting_contract= new web3.eth.Contract(voting_abi,process.env.CONTRACT_ADDRESS)

const owner_account = web3.eth.accounts.wallet.add(`${process.env.OWNER_PRIVATE_KEY}`);
const ownerAddress = web3.eth.accounts.wallet[0].address
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
const block_number=await web3.eth.getBlockNumber();
app.get('/', (req, res) => {
  res.send(`hello world!`);
});

app.get('/candidates',async (req,res)=>{
 try {
    const raw = await voting_contract.methods.getCandidates().call();
    console.log("OWNER:", process.env.OWNER_PRIVATE_KEY);
console.log("ADDED ADDRESS:", ownerAddress);
    const candidates = raw.map((c) => ({
      name: c.name,
      voteCount: Number(c.votes), // ensure number
    }));

    return res.json({ candidates });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});
app.post('/candidates',async (req,res)=>{
   try {const {candidate_name,privatekey} = req.body;
    if(privatekey!==process.env.OWNER_PRIVATE_KEY){
     return res.status(403).json({error:'Only owner can add candidates'});
    }
    const txReceipt = await voting_contract.methods.addCandidate(candidate_name).send({ from: ownerAddress });
    return  res.json({message:'Candidate added successfully',transactionHash:txReceipt.transactionHash});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add candidate' });
    }
});
app.post('/vote',async (req,res)=>{
   try {const {candidate_index,address} = req.body;
    const txReceipt = await voting_contract.methods.vote(candidate_index).send({ from: address });
    return  res.json({message:'Vote cast successfully',transactionHash:txReceipt.transactionHash});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to cast vote' });
    }
});
app.get('/winner',async(req,res)=>{
    try {
        const winnerIndex = await voting_contract.methods.getWinner().call();
        return res.json({winner:winnerIndex});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch winner' });
    }
});




  app.listen(process.env.PORT || 4000,console.log('Express started on port 4000'));
