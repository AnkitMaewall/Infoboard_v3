const express = require('express');
const debug = require('debug');
const todoListService = require('../services/todoistService');

const homeRouter = express.Router();

function router(nav) {
  const details = todoListService;
  homeRouter.route('/')
    .get((req, res) => {
      res.render('home', {
        nav,
        title: 'Home',
        todo: details
      });
    });
  return homeRouter;
}

module.exports = router;
