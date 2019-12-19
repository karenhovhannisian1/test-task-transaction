import React from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import {
  AttachMoney,
  ChevronLeft,
  HistoryRounded,
  ExitToApp,
  EmailOutlined,
  VerifiedUser
} from '@material-ui/icons';
import {
  DASHBOARD_PATH,
  SIGN_IN_PATH,
  TRANSACTIONS_PATH
} from '../configs/constants';
import { withRouter } from 'react-router-dom';

const LeftMenu = ({ open, setOpen, classes, location, history, account }) => {
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push(SIGN_IN_PATH);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '80%', padding: 15 }}>
          {
            <Avatar
              alt="Remy Sharp"
              className={open ? classes.avatarLarge : {}}
            >
              {account.name && account.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          {open && (
            <Typography
              style={{
                fontSize: 14,
                marginTop: 10,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <VerifiedUser style={{ color: '#787878', marginRight: '5px' }} />
              {account.name}
            </Typography>
          )}

          {open && (
            <Typography
              style={{
                fontSize: 14,
                marginTop: 10,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <EmailOutlined style={{ color: '#787878', marginRight: '5px' }} />
              {account.email}
            </Typography>
          )}
        </div>

        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
      </div>
      <Divider />
      <List>
        <>
          <ListItem
            button
            onClick={() => history.push(DASHBOARD_PATH)}
            selected={location.pathname === DASHBOARD_PATH}
          >
            <ListItemIcon>
              <AttachMoney />
            </ListItemIcon>
            <ListItemText primary="Create transaction" />
          </ListItem>
          <ListItem
            button
            onClick={() => history.push(TRANSACTIONS_PATH)}
            selected={location.pathname === TRANSACTIONS_PATH}
          >
            <ListItemIcon>
              <HistoryRounded />
            </ListItemIcon>
            <ListItemText primary="Transactions list" />
          </ListItem>
        </>
      </List>
      <Divider />
      <ListItem button onClick={() => handleLogout()}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Drawer>
  );
};

export default withRouter(LeftMenu);
