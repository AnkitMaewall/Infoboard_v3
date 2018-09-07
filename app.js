const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('infoboard_v3');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// "$Env:DEBUG=\"infoboard_v3\"; ", [Environment]::SetEnvironmentVariable("DEBUG","express:*");
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  debug('my middleware');
  next();
});
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'request' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/home', title: 'Home' },
  { link: '/security', title: 'Security' },
  { link: '/maintanence', title: 'Maintanence' },
  { link: '/map', title: 'Map' }
];

const maintanenceRouter = require('./src/routes/maintanenceRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/maintanence', maintanenceRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

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
