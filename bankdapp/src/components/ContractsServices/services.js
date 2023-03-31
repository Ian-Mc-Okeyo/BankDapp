import React from 'react';
import { AccountsABI } from './resources';
import { LoansABI } from './resources';
import { ethers } from 'ethers'



export function getAccountsContract(){
    //connect to the smart contract
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const address = process.env.REACT_APP_ACCOUNTS_ADDRESS
    const accounts = new ethers.Contract("0xc5a5C42992dECbae36851359345FE25997F5C42d", AccountsABI, provider)

    //signer
    const accountsSigner = provider.getSigner()
    const accountsContract = accounts.connect(accountsSigner)
    return accountsContract
}

export function getLoansContract(){
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
    const address = process.env.REACT_APP_LOANS_ADDRESS;
    const loans = new ethers.Contract("0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690", LoansABI, provider);

    //signer
    const loansSigner = provider.getSigner()
    const loansContract = loans.connect(loansSigner)

    return loansContract
}