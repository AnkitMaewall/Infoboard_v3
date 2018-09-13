const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('infoboard_v3');

function maintanenceController(nav) {
  function getIndex(req, res) {
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
  }

  function getById(req, res) {
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
  }
  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = maintanenceController;
