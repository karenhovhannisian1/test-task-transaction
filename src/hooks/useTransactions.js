import React from "react";
import API from "../api";

export function useTransactions() {
    const [transactions, setTransactions] = React.useState([]);
    async function getTransactionsList() {
        const {data} = await API.getTransactionsList();
        setTransactions(data.trans_token)
    }

    async function createTransaction(selectedUser, amount) {
        await API.createTransaction(selectedUser, amount);
    }

    return {
        createTransaction,
        getTransactionsList,
        transactions
    }
}
