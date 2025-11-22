# Voting Backend (Express + Web3.js)

A lightweight Node.js/Express backend that interacts with the **Voting.sol** smart contract deployed via Hardhat. It provides REST APIs for fetching candidates, adding candidates (owner-only), casting votes, and retrieving the winner. It is the backend service for the voting_hardhat project [here](https://github.com/DHRUVCHARNE/voting_hardhat), and also a complete explanation of the whole project with tests and live demo are [here](https://www.youtube.com/watch?v=Mkg2qdqj4YE).


This backend communicates with the blockchain using **Web3.js** and the contract ABI.

---

## 🚀 Features

* Connects to an Ethereum RPC provider (Hardhat, Ganache, Anvil, etc.)
* Reads and writes from/to the deployed Voting smart contract
* Owner-protected candidate creation
* Endpoints for:

  * Fetching candidates
  * Adding candidates (owner only)
  * Casting votes
  * Getting election winner
* Logging & centralized error handling
* Clean route/controller structure

---

## 📂 Project Structure

```
voting_backend/
│
├── server.js
├── abi.js
├── .env
├── .env.example
├── package.json
│
└── src/
    ├── config/
    │   └── web3.js
    ├── controllers/
    │   └── voting.controller.js
    ├── middlewares/
    │   └── ownerAuth.js
    ├── routes/
    │   └── voting.routes.js
    └── utils/
        └── errorHandler.js
```

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone <your_repo_url>
cd voting_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```bash
cp .env.example .env
```

Edit values inside `.env`:

```
PROVIDER_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=0x...
OWNER_PRIVATE_KEY=0x...
PORT=4000
```

> Ensure the contract is deployed and CONTRACT_ADDRESS matches your Hardhat deployment.

---

## ▶️ Running the Server

```bash
node server.js
```

The API will start on:

```
http://localhost:4000
```

---

## 📡 API Endpoints (Base: `/api/v1`)

### 🟦 1. Check API Status

**GET /**

```
Response: { "message": "Voting API v1 is live" }
```

---

### 🟩 2. Get All Candidates

**GET /candidates**

```
Response:
{
  "candidates": [
    { "name": "Alice", "voteCount": 0 },
    { "name": "Bob", "voteCount": 3 }
  ]
}
```

---

### 🟧 3. Add Candidate (Owner Only)

**POST /candidates**

Required JSON body:

```json
{
  "candidate_name": "Charlie",
  "privatekey": "<OWNER_PRIVATE_KEY>"
}
```

Response:

```json
{
  "message": "Candidate added",
  "txHash": "0x..."
}
```

---

### 🟨 4. Cast Vote

**POST /vote**

Required JSON body:

```json
{
  "candidate_index": 1,
  "address": "0xYourWalletAddress"
}
```

Response:

```json
{
  "message": "Vote cast",
  "txHash": "0x..."
}
```

---

### 🟪 5. Get Winner

**GET /winner**

```
Response:
{
  "winner": "Alice"
}
```

---

## 🔐 Owner Authentication

The backend uses a simple middleware:

```
ownerAuth → verifies req.body.privatekey === process.env.OWNER_PRIVATE_KEY
```

Only the contract owner can add new candidates.

---

## 🔌 Web3.js Integration

The file `src/config/web3.js`:

* Initializes Web3 provider
* Loads ABI
* Creates contract instance
* Loads owner wallet into Web3

```javascript
const contract = new web3.eth.Contract(voting_abi, process.env.CONTRACT_ADDRESS);
```

---

## 🛠 Error Handling

All errors are handled centrally by:

```
src/utils/errorHandler.js
```

Ensures clean, consistent 500 responses.

---

## 📝 Notes

* This backend assumes your Voting smart contract is deployed and running.
* Uses **Web3.js v4**, which requires ESM imports (`type: module`).
* Ensure Hardhat node is running before calling the API.

---

## 👤 Author

**Dhruv Charne (Dhruv4ne)**

---

## 📜 License

MIT
