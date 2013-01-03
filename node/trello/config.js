var Config = {
  init: function(fileName)
  {
    Config.config = JSON.parse(
      require('fs').readFileSync(fileName).toString()
    );
  },

  getDeveloperKeys: function()
  {
    return Config.config.developerKeys;
  },

  getApi: function(section, option)
  {
    return Config.config.api[section][option]
  }
};

module.exports = Config;
