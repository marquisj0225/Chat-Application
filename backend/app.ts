import { NextFunction, Request, Response } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const morgan = require('morgan');
const knexConfig = require('./knex');

// Initialize knex.
const knex = Knex(knexConfig[process.env.NODE_ENV]);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex() method.
Model.knex(knex);

const indexRouter = require('./routes/index');

const port = process.env.PORT || '8000';
const corsOptions = {
  origin: '*',
  allowedHeaders: 'Content-Type,Authorization,Accept,OPP-CONTAINS-FILE',
  credentials: true,
};
app.set('port', port);

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.use('/v1', indexRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500);
  res.json({ error_code: err.status, message: err.message });
});

module.exports = app;
