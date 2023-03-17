import React from 'react';
import { AccountsABI } from './resources';
import { LoansABI } from './resources';
import { ethers } from 'ethers'



export async function getAccountsContract(){
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const address = process.env.REACT_APP_ACCOUNTS_ADDRESS;
    const Accounts = new ethers.Contract(address, AccountsABI, provider);
    const createAccountTxn = await Accounts.createAccount("mathematics100")
    createAccountTxn.wait(1)
    return Accounts
}

export async function getLoansContract(){
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const address = process.env.REACT_APP_LOANS_ADDRESS;
    const Loans = new ethers.Contract(address, LoansABI, provider);
    return Loans
}