#-*- coding:utf-8 -*-

def getOrgs(configFileName):
  from trello.config import Config
  config = Config(configFileName)
  developerKeys = config.getDeveloperKeys()
  api = config.getApi('organization', 'list')
  return getData(
    config.getApi('organization', 'list'), config.getDeveloperKeys()
  )

def getData(api, developerKeys):
  from urllib2 import urlopen
  data = urlopen(
    '%s?key=%s&token=%s' % (api, developerKeys['key'], developerKeys['token'])
  ).read()
  import json
  return json.loads(data)
