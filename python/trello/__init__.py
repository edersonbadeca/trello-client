#-*- coding:utf-8 -*-

def getOrgs(configFileName):
  from config import Config
  config = Config(configFileName)
  return getData(
    config.getApi('organization', 'list'), getAccessKey(configFileName)
  )

def getAccessKey(configFileName):
  from os import path
  with open(path.abspath(configFileName + '/../token'), 'a+') as fp:
    data = fp.readlines()
    if len(data) != 2:
      return dict(key = '', token = '')
    return dict(key = data[0].strip(), token = data[1].strip())

def getData(api, accessKeys):
  if not accessKeys['key'] or not accessKeys['token']:
    raise Exception('无效的用户验证信息')

  from urllib2 import urlopen
  data = urlopen(
    '%s?key=%s&token=%s' % (api, accessKeys['key'], accessKeys['token'])
  ).read()
  import json
  return json.loads(data)
