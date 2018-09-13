const express = require('express');
const maintanenceController = require('../controllers/maintanenceController');

const maintanenceRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleware } = maintanenceController(nav);
  maintanenceRouter.use(middleware);
  maintanenceRouter.route('/')
    .get(getIndex);

  maintanenceRouter.route('/:id')
    .get(getById);
  return maintanenceRouter;
}

module.exports = router;
