const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');

global.rootPath = path.resolve(__dirname);
const AuthenticationAPI = require('./API/AuthenticationAPI.js');
const MainAPI = require('./API/MainAPI.js');
const ApplicationStorageAPI = require('./API/ApplicationStorageAPI.js');
const OnlineBookingAPI = require('./API/OnlineBookingAPI.js');
const orderCallAPI = require('./API/OrderCallAPI.js');
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

// app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(`${rootPath}/styles/css`));
app.use('/assets', express.static(`${rootPath}/assets`));
app.use('/utils', express.static(`${rootPath}/utils`));
app.use('/scripts', express.static(`${rootPath}/scripts`));

app.use(AuthenticationAPI);
app.use(MainAPI);
app.use(ApplicationStorageAPI);
app.use(OnlineBookingAPI);
app.use(orderCallAPI);
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