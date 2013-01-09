var Optparse = {
  init: function(title)
  {
    Optparse.title = title;
    Optparse.options = {};
    Optparse.options['help'] = {
      name: '--help',
      shortName: '-h',
      help: '显示帮助信息'
    };
  },

  addOption: function(name, shortName, help)
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
      help: help
    };
  },

  run: function(callback)
  {
    argv = process.argv.splice(2);
    if(argv.length <= 0) {
      return Optparse.printHelp();
    }

    for (var index in argv) {
      if (argv[index].length > 2 && /^-[^-]*$/.test(argv[index])) {
        argv[index] = argv[index].substr(1);
        for (var charIndex in argv[index]) {
          argv.push('-' + argv[index][charIndex]);
        }
        argv.splice(index, 1);
      }
    }

    var command = [];
    var arguments = {};
    for (index in argv) {
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
          command.push(optionId);
        } else if(!/^-{1,2}[^-]*$/.test(argv[index])) {
          arguments[argv[index]] = argv[index];
        }
      }
    }

    if(command.length == 0) {
      return Optparse.printHelp();
    }

    var options = {};
    for (index in command) {
      options[command[index]] = true;
    }

    var argumentsTemp = [];
    for (index in arguments) {
      argumentsTemp.push(arguments[index]);
    }
    arguments = argumentsTemp;

    callback(options, arguments);
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
