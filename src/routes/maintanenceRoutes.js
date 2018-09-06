const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('infoboard_v3');

const maintanenceRouter = express.Router();

function router(nav) {
/*    const maintanence = [{
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
  ];  */
  maintanenceRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'maintanenceApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to Server');
          const db = client.db(dbName);

          const col = await db.collection('requests');

          const maintanence = await col.find().toArray();
          res.render(
            'maintanence', {
              nav,
              title: 'Infoboard',
              maintanence
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  maintanenceRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'maintanenceApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to Server');
          const db = client.db(dbName);

          const col = await db.collection('requests');

          const request = await col.findOne({ _id: new ObjectID(id) });
          debug(request);
          res.render(
            'request', {
              nav,
              title: 'Infoboard',
              request
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return maintanenceRouter;
}

module.exports = router;
