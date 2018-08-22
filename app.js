const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('infoboard_v3');
const morgan = require('morgan');
const path = require('path');
// "$Env:DEBUG=\"infoboard_v3\"; ", [Environment]::SetEnvironmentVariable("DEBUG","express:*");
const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/Security',); // what is this

bookRouter.route('/')
  .get((req, res) => {
    res.send('hello maintanence');
  });

bookRouter.route('/request')
  .get((req, res) => {
    res.send('hello first maintanence request');
  });
  
app.use('/Maintanence', bookRouter);
app.get('/', (req, res) => {
  res.render(
    'index', {
      nav: [{ link: '/home', title: 'Home' },
        { link: '/security', title: 'Security' },
        { link: '/maintanence', title: 'Maintanence' },
        { link: '/map', title: 'Map' }],
      title: 'Infoboard'
    }
  );
});


app.listen(port, () => {
  debug(`Listening at port ${chalk.green(port)}`);
});
