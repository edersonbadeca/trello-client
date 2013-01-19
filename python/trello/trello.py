#-*- coding:utf-8 -*-

class Trello:
  def __init__(self, configFileName):
    self.configFileName = configFileName

  def auth(self):
    from oauth import Oauth
    oauth = Oauth(self.configFileName)
    try:
      oauth.oauth()
    except:
      print('用户信息验证失败')

  def getConfig(self):
    from config import Config
    return Config(self.configFileName)

  def getData(self, api, queryString = ''):
    def printErrorMessage():
      from os import path
      print(
        '数据获取失败：网络异常或相关资源不存在。\n' +
        '如果网络正常且存在相关资源请执行%s auth进行用户信息验证'
        % path.abspath(__file__ + '/../../trello_client')
    )

    accessKeys = self._getAccessKey()
    if not accessKeys['key'] or not accessKeys['token']:
      printErrorMessage()
      return None

    from urllib2 import urlopen
    try:
      data = urlopen(
        '%s?key=%s&token=%s%s' %
        (api, accessKeys['key'], accessKeys['token'], queryString)
      ).read()

      import json
      return json.loads(data)
    except:
      printErrorMessage()
      return None

  def _getAccessKey(self):
    from os import path
    tokenFile = path.abspath(self.configFileName + '/../token')
    if not path.exists(tokenFile):
      return dict(key = '', token = '')

    with open(path.abspath(tokenFile), 'r') as fp:
      data = fp.readlines()
      if len(data) != 2:
        return dict(key = '', token = '')
      return dict(key = data[0].strip(), token = data[1].strip())
