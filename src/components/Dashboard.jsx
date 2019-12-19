import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import UserAutoComplete from './UserAutoComplete';
import { TextField, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { store } from 'react-notifications-component';
import { useStateValue } from '../context';
import { useAuth } from '../hooks/useAuth';
import { ENOUGH_FOUNDS_MESSAGE } from '../configs/constants';

const Dashboard = () => {
  const [{ user }] = useStateValue();
  const { createTransaction } = useTransactions();
  const { getUserInfo } = useAuth();

  const [amount, setAmount] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const showNotification = () => {
    store.addNotification({
      title: 'Success!',
      message: `${amount}$ send to  user ${selectedUser}`,
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 3000
      }
    });
  };

  const resetFields = () => {
    setAmount(null);
    setSelectedUser(null);
  };

  const handleSubmit = async () => {
    try {
      await createTransaction(selectedUser, amount);
      await getUserInfo();
      showNotification();
      resetFields();
    } catch (e) {}
  };

  const amountError = amount > user.balance;

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}
    >
      <UserAutoComplete
        onChange={username => setSelectedUser(username)}
        value={setSelectedUser}
      />
      <TextField
        style={{ width: '40%' }}
        label="Amount"
        helperText={
          amountError ? ENOUGH_FOUNDS_MESSAGE : `Max $${user.balance}`
        }
        error={amountError}
        fullWidth
        value={amount}
        variant="outlined"
        InputProps={{
          type: 'number',
          onChange: ({ target }) => setAmount(target.value)
        }}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={amountError || !selectedUser || !amount}
        style={{ margin: 20 }}
        onClick={handleSubmit}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
    </div>
  );
};

export default Dashboard;
