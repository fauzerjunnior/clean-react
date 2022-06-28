const fallback = require('express-history-api-fallback');
const express = require('express');
const csrf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
const root = `${__dirname}/dist`;
app.use(express.static(root));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(helmet.hidePoweredBy());
app.use(fallback('index.html', { root }));
app.listen(process.env.PORT || 3000);
