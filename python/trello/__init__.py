#-*- coding:utf-8 -*-

def getOrgs(configFileName):
  return getData(
    getConfig(configFileName).getApi('organization', 'list'),
    getAccessKey(configFileName)
  )

def getOrgMembers(configFileName, orgName):
  return getData(
    '%s/%s/members' %
    (getConfig(configFileName).getApi('organization', 'item'), orgName),
    getAccessKey(configFileName)
  )

def getOrgInfo(configFileName, orgName):
  return getData(
    '%s/%s' %
    (getConfig(configFileName).getApi('organization', 'item'), orgName),
    getAccessKey(configFileName), '&members=admins'
  )

def getConfig(configFileName):
  from config import Config
  return Config(configFileName)

def getAccessKey(configFileName):
  from os import path
  with open(path.abspath(configFileName + '/../token'), 'r') as fp:
    data = fp.readlines()
    if len(data) != 2:
      return dict(key = '', token = '')
    return dict(key = data[0].strip(), token = data[1].strip())

def getData(api, accessKeys, queryString = ''):
  if not accessKeys['key'] or not accessKeys['token']:
    raise Exception('无效的用户验证信息')

  from urllib2 import urlopen
  data = urlopen(
    '%s?key=%s&token=%s%s' %
    (api, accessKeys['key'], accessKeys['token'], queryString)
  ).read()

  import json
  return json.loads(data)
