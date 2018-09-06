const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('infoboard_v3:adm');

const adminRouter = express.Router();

const maintanence = [{
  id: '1',
  tenant: 'John Doe',
  workorder: 'Appliance',
  email: 'John.Doe@gmail.com',
  completed: true
},
{
  id: '2',
  tenant: 'Sally Mae',
  workorder: 'Bathroom',
  email: 'Sally.Mae@yahoo.com',
  completed: true
},
{
  id: '200',
  tenant: '!Zobile',
  workorder: 'Outdoor',
  email: 'prince@microsoft.com',
  completed: false
}
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'maintanenceApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to Server');
          const db = client.db(dbName);

          const response = await db.collection('requests'); // .insertMany(maintanence);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
