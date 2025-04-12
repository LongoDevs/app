const userManagement = require('./userManagement');
const serviceManagement = require('./serviceManagement');

module.exports = {
  ...userManagement,
  ...serviceManagement
};
