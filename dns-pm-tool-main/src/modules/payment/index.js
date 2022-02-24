const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');

module.exports = {
  configure({ app }) {
    router.get('/', validator.list, controller.list);
    router.post('/', validator.create, controller.create);

    return router;
  }
};