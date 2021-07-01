// In your routes configuration file
const path = require('path');
module.exports = [
  {
    path: '/',
    component: path.resolve(`src/index.jsx`)
  },
  {
    path: '/*',
    component: path.resolve(`src/index.jsx`)
  },
  {
    path: '/404/',
    component: path.resolve(`src/containers/404.js`)
  }
];