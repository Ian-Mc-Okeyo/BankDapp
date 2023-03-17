// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Loans{
    struct LoanAccount{
        uint id;
        uint loanBalance;
    }

    mapping(uint => LoanAccount) loanAccounts;

    mapping(uint => bool) existingLoanAccounts;

    function createLoanAccount(uint _id) public{
        //check if the account exists in normal user accounts
        LoanAccount memory _newLoanAccount = LoanAccount(_id, 0);
        loanAccounts[_id] = _newLoanAccount;
        existingLoanAccounts[_id] = true;
    }

    function borrow(uint256 _amount, uint _account_number) public{
        //check if the borrower is elligible
        require(existingLoanAccounts[_account_number] == true, "Loan account does not exist");
        require(loanAccounts[_account_number].loanBalance == 0, "Outstanding loan balance");
        loanAccounts[_account_number].loanBalance += _amount;
        //update the user balance from the Accounts contract
    }

    function repay(uint256 _amount, uint _account_number) public{
        //requre account balance to be greater than amount to be repayed
        require(existingLoanAccounts[_account_number] == true, "Loan Account does not exist");
        require(loanAccounts[_account_number].loanBalance >= _amount, "Excessive Payment");
        loanAccounts[_account_number].loanBalance -= _amount;
        //deduct the money from the user account balance.
    }
}