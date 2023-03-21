import React from 'react';
import { AccountsABI } from './resources';
import { LoansABI } from './resources';
import { ethers } from 'ethers'



export function getAccountsContract(){
    //connect to the smart contract
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const address = process.env.REACT_APP_ACCOUNTS_ADDRESS
    const accounts = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", AccountsABI, provider)

    //signer
    const accountsSigner = provider.getSigner()
    const accountsContract = accounts.connect(accountsSigner)
    return accountsContract
}

export function getLoansContract(){
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const address = process.env.REACT_APP_LOANS_ADDRESS;
    const Loans = new ethers.Contract(address, LoansABI, provider);
    return Loans
}