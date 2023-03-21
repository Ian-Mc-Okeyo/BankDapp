import React from 'react'
export const AccountsABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_middleName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_IDNumber",
        "type": "string"
      }
    ],
    "name": "createAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_account_number",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_IDNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "getAccountDetails",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_account_number",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_IDNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "login",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sender_account_number",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "receiver_account_number",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      }
    ],
    "name": "send",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_account_number",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const LoansABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_account_number",
          "type": "uint256"
        }
      ],
      "name": "borrow",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "createLoanAccount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_account_number",
          "type": "uint256"
        }
      ],
      "name": "repay",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]