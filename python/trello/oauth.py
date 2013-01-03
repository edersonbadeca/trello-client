#-*- coding: utf-8 -*-

class Oauth:
  def __init__(self, configFileName):
    self.configFileName = configFileName
    from config import Config
    config = Config(configFileName)
    self.developerKeys = config.getDeveloperKeys()
    self.urls = dict(
      request_token = config.getApi('oauth', 'request_token'),
      authorize = config.getApi('oauth', 'authorize'),
      access_token = config.getApi('oauth', 'access_token')
    )

  def oauth(self):
    import oauth2 as oauth
    consumer = oauth.Consumer(
      self.developerKeys['key'],
      self.developerKeys['oauth_secret']
    )
    client = oauth.Client(consumer)
    response, content = client.request(self.urls['request_token'], 'GET')
    if response['status'] != '200':
      raise Exception('用户信息验证失败。')

    import urlparse
    requestToken = dict(urlparse.parse_qsl(content))
    print('请通过以下地址获取verifier信息：')
    print('%s?oauth_token=%s&expiration=%s&scope=read,write' %
      (
        self.urls['authorize'], requestToken['oauth_token'],
        self.developerKeys['expiration']
      )
    )
    verifier = raw_input('请输入您的verifier信息：')
    token = oauth.Token(
      requestToken['oauth_token'], requestToken['oauth_token_secret']
    )
    token.set_verifier(verifier)
    client = oauth.Client(consumer, token)
    response, content = client.request(self.urls['access_token'], 'POST')
    accessToken = dict(urlparse.parse_qsl(content))

    from os import path
    with open(path.abspath(self.configFileName + '/../token'), 'w') as fp:
      fp.write(self.developerKeys['key'] + '\n' + accessToken['oauth_token'])
