var Optparse = {
  init: function(title)
  {
    Optparse.title = title;
    Optparse.options = {};
    Optparse.options['help'] = {
      name: '--help',
      shortName: '-h',
      help: '显示帮助信息',
      callback: Optparse.printHelp
    };
  },

  addOption: function(name, shortName, help, callback)
  {
    for (var key in Optparse.options) {
      if (Optparse.options[key].name == name
         || Optparse.options[key].shortName == name
      ) {
        throw('Option: ' + name + ' has token');
      }

      if (Optparse.options[key].name == shortName
          || Optparse.options[key].shortName == shortName
      ) {
        throw('Option: ' + shortName + ' has token');
      }
    }
    var optionId = name.indexOf('--') == 0 ? name.substr(2) : name;
    Optparse.options[optionId] = {
      name: name,
      shortName: shortName,
      help: help,
      callback: callback
    };
  },

  run: function()
  {
    argv = process.argv.splice(2);
    if(argv.length <= 0) {
      return Optparse.printHelp();
    }

    var command = [];
    for (var index in argv) {
      if(argv[index] == '-h' || argv[index] == '--help'
        || argv[index] == 'help'
      ) {
        return Optparse.printHelp();
      }
      for (var optionId in Optparse.options) {
        if (optionId == argv[index]
          || Optparse.options[optionId].name == argv[index]
          || Optparse.options[optionId].shortName == argv[index]
        ) {
          argv.splice(index, 1);
          command.push(Optparse.options[optionId].callback);
        }
      }
    }

    if(command.length == 0) {
      return Optparse.printHelp();
    }

    for (index in command) {
      command[index](argv);
    }
  },

  printHelp: function()
  {
    console.log('Usage: %s  [options]\n', Optparse.title);
    console.log('Options:');
    for (var optionId in Optparse.options) {
      console.log(
        '  %s,  %s  %s',
        Optparse.options[optionId].shortName,
        Optparse.options[optionId].name,
        Optparse.options[optionId].help
      );
    }
  }
};

module.exports = Optparse;
