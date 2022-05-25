const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// import middleware from './utils/Middleware.js';
global.rootPath = path.resolve(__dirname);

const MainPage = require('./API/MainPage.js');


const app = express();
const port = 8082;

app.use(express.json());
app.use(cookieParser());
// app.use(middleware);
app.use('/css', express.static(`${rootPath}/styles/css`));
app.use('/file/src/assets/', express.static('./src/assets'));

app.use(MainPage);

app.listen(port, () => {
  console.log(`http server running on ${port} port`);
});
