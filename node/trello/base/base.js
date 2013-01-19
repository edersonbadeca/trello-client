var Base = {
  init: function(obj, configFileName)
  {
    obj.trello = require('../trello');
    obj.trello.init(configFileName);
    obj.config = obj.trello.getConfig();
  }
};

module.exports = Base;
