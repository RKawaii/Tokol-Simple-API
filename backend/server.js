const express = require('express');
const app = express();
const PORT = 5000;

const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const Route = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use('/api', Route);
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
