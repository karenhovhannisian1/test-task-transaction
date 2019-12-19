import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { AVATAR_IMAGE_URL } from '../configs/constants';
import clsx from 'clsx';

export default function Bar({ handleDrawerOpen, open, classes, account }) {
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        ></Typography>
        <IconButton color="inherit" className={classes.avatar}>
          ${account.balance}
          <img className={classes.avatarImg} src={AVATAR_IMAGE_URL} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
