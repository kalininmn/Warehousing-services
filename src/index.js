const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// import middleware from './utils/Middleware.js';
global.rootPath = path.resolve(__dirname);

const MainAPI = require('./API/MainAPI.js');
const TariffAPI = require('./API/TariffAPI.js');
const AboutCompanyAPI = require('./API/AboutCompanyAPI.js');
const PhotosAPI = require('./API/PhotosAPI.js');
const NewsAPI = require('./API/NewsAPI.js');
const ResponsibleStorageAPI = require('./API/ResponsibleStorageAPI.js');
const WarehouseRentAPI = require('./API/WarehouseRentAPI.js');
const CrossDockingAPI = require('./API/CrossDockingAPI.js');
const ServicesAPI = require('./API/ServicesAPI.js');
const DocumentsAPI = require('./API/DocumentsAPI.js');
const BenefitsAPI = require('./API/BenefitsAPI.js');


const app = express();
const port = 8082;

app.use(express.json());
app.use(cookieParser());
// app.use(middleware);
app.use('/css', express.static(`${rootPath}/styles/css`));
app.use('/file/src/assets/', express.static('./src/assets'));

app.use(MainAPI);
app.use(TariffAPI);
app.use(AboutCompanyAPI);
app.use(PhotosAPI);
app.use(NewsAPI);
app.use(ResponsibleStorageAPI);
app.use(WarehouseRentAPI);
app.use(CrossDockingAPI);
app.use(ServicesAPI);
app.use(DocumentsAPI);
app.use(BenefitsAPI);

app.listen(port, () => {
  console.log(`http server running on ${port} port`);
});
