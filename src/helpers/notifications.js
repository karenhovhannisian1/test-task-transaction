import React from 'react';

const CORE_NOTIFICATION_PROPS = {
  insert: 'top',
  container: 'top-right',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000
  }
};

export default class Notification {
  static getSuccessTransactionMessage(amount, selectedUser) {
    return {
      title: 'Success!',
      message: `${amount}$ send to  user ${selectedUser}`,
      ...CORE_NOTIFICATION_PROPS
    };
  }
}
