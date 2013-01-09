var Init = {
  run: function(configFileName, options, arguments)
  {
    var read = require('./read');
    read.init(configFileName);

    if(arguments.length == 0) {
      return read.orgs();
    }

    if(options.member) {
      return read.members(arguments[0]);
    }

    return read.info(arguments[0]);
  }
};

module.exports = Init;
