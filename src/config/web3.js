import {Web3} from 'web3';
import dotenv from 'dotenv';
import {voting_abi} from "../../abi.js";
dotenv.config();
const web3 = new Web3(`${process.env.PROVIDER_URL}`);

const contract= new web3.eth.Contract(voting_abi,process.env.CONTRACT_ADDRESS)

const owner_account = web3.eth.accounts.wallet.add(`${process.env.OWNER_PRIVATE_KEY}`);
const ownerAddress = web3.eth.accounts.wallet[0].address

export {ownerAddress,web3,contract};