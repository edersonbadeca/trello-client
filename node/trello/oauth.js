var Oauth = {
  oauth: function(configFileName)
  {
    var config = require('./config');
    config.init(configFileName);
    var developerKeys = config.getDeveloperKeys();

    var oauth = require('oauth').OAuth;
    oauth = new oauth(
      config.getApi('oauth', 'request_token'),
      config.getApi('oauth', 'access_token'),
      developerKeys['key'], developerKeys['oauth_secret'],
      '2.0', null, 'HMAC-SHA1'
    );
    oauth.getOAuthRequestToken(
      function(error, oauth_token, oauth_token_secret, results) {
        if (error) {
          throw('用户信息验证失败。');
        }
        console.log('请通过以下地址获取verifier信息：');
        console.log(
          '%s?oauth_token=%s&expiration=%s&scope=read,write',
          config.getApi('oauth', 'authorize'),
          oauth_token, developerKeys.expiration
        );
        var readLine = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        console.log('请输入您的verifier信息：');
        readLine.question('', function(oauth_verifier) {
          readLine.close();
          oauth.getOAuthAccessToken(
            oauth_token, oauth_token_secret, oauth_verifier,
            function(error, oauth_access_token, oauth_access_token_secret, accessResults) {
              if(error) {
                throw('用户信息验证失败。');
              }
              require('fs').writeFileSync(
                require('path').dirname(configFileName) + '/token',
                developerKeys['key'] + '\n' + oauth_access_token
              );
            }
          )
        });
      }
    );
  }
};

module.exports = Oauth;
