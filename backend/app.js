//importing packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

//check if in prod checking env key
const { environment } = require('./config');
const isProduction = environment === 'production';
//init express
const app = express();


//morgan middleware that logs info about reqs and resp
app.use(morgan('dev'));
//cookie-parser middleware for parsing cookies
app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
      helmet.crossOriginResourcePolicy({
          policy: "cross-origin"
        })
        );

        // Set the _csrf token and create req.csrfToken method
        app.use(
            csurf({
                cookie: {
                    secure: isProduction,
                    sameSite: isProduction && "Lax",
                    httpOnly: true
                }
            })
            );

app.use(routes);




//checking for update


module.exports = app;
