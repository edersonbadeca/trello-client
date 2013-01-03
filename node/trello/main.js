var Main = {
  getOrgs: function(configFileName, callback, errorCallback)
  {
    var config = require('./config');
    config.init(configFileName);
    Main.getData(
      config.getApi('organization', 'list'),
      Main.getAccessKey(configFileName),
      callback, errorCallback
    );
  },

  getAccessKey: function(configFileName)
  {
    var data = require('fs').readFileSync(
      require('path').dirname(configFileName) + '/token'
    ).toString().split('\n');

    if(data.length == 2) {
      return {key: data[0], token: data[1]};
    }

    return {key: null, token: null}
  },

  getData: function(api, accessKeys, callback, errorCallback)
  {
    if (!accessKeys['key'] || !accessKeys['token']) {
      throw('无效的用户验证信息。');
    }

    api += '?key=' + accessKeys['key'] + '&token=' + accessKeys['token'];
    require('https').get(api, function(response) {
      response.on('data', function(data) {
        callback(JSON.parse(data.toString()));
      });
    }).on('error', errorCallback);
  }
};

module.exports = Main;
