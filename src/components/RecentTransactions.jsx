import React, {useEffect} from 'react';
import {TableBody, Table, TableCell , TableHead, TableRow,Typography } from '@material-ui/core';
import {useTransactions} from "../hooks/useTransactions";


export default function RecentTransactions() {

    const {transactions, getTransactionsList} = useTransactions();

    const getAmount = (amount) => <TableCell style={{color: amount < 0 ? "red": "green"}}>{amount} $</TableCell>;

    useEffect(() => {
        getTransactionsList()
    }, [])

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
               Transaction history
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Send to(username)</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.length ? transactions.map(row => (
                        <TableRow key={row.date}>
                            <TableCell style={{padding: "15px 24px 15px 16px"}}>{row.id}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.username}</TableCell>
                               {getAmount(row.amount)}
                            <TableCell>{row.balance}</TableCell>
                        </TableRow>
                    )) :
                        <Typography variant="h5" component="h3" style={{padding: 30}}>
                           No any transactions yet!
                        </Typography>
                    }
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
