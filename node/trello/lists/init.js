var Init = {
  run: function(configFileName, options, arguments)
  {
    var read = require('./read');
    read.init(configFileName);

    if(options.card) {
      return read.cards(arguments[0]);
    }

    return read.info(arguments[0]);
  }
};

module.exports = Init;
