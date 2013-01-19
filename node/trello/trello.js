var Trello = {
  init: function(configFileName)
  {
    Trello.configFileName = configFileName;
  },

  auth: function()
  {
    try {
      require('./oauth').oauth(Trello.configFileName);
    } catch(e) {
      console.log('用户信息验证失败');
    }
  },

  getConfig: function()
  {
    var config = require('./config');
    config.init(Trello.configFileName);
    return config;
  },

  getData: function(api, queryString, callback)
  {
    function printErrorMessage()
    {
      console.log(
        '数据获取失败：网络异常或相关资源不存在。\n' +
        '如果网络正常且存在相关资源请执行%s auth进行用户信息验证',
        require('path').dirname(__dirname) + '/trello_client'
      );
    }

    var accessKeys = Trello._getAccessKey();
    if (!accessKeys['key'] || !accessKeys['token']) {
      return printErrorMessage();
    }

    queryString = queryString ? queryString : '';
    api += '?key=' + accessKeys['key'] + '&token=' + accessKeys['token'] + queryString;
    require('https').get(api, function(response) {
      response.on('data', function(data) {
        try {
          callback(JSON.parse(data.toString()));
        } catch(e) {
          printErrorMessage();
        }
      });
    }).on('error', printErrorMessage);
  },

  _getAccessKey: function()
  {
    try {
      var data = require('fs').readFileSync(
        require('path').dirname(Trello.configFileName) + '/token'
      ).toString().split('\n');
      if (data.length == 2) {
        return {key: data[0], token: data[1]};
      }
      return {key: null, token: null};
    } catch(e) {
      return {key: null, token: null};
    }
  }
};

module.exports = Trello;
