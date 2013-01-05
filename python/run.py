#-*- coding:utf-8 -*-

def auth():
  from trello.oauth import Oauth
  oauth = Oauth(getConfigFileName())
  try:
    oauth.oauth()
  except:
    print('用户信息验证失败。')

def printOrgList():
  from trello import getOrgs
  orgs = getData(getOrgs)
  if orgs:
    for org in orgs:
      print(org['displayName'] + '（' + org['name'] + '）')

def printOrgMembers(orgName):
  from trello import getOrgMembers
  members = getData(getOrgMembers, orgName)
  if members:
    for member in members:
      print(member['fullName'] + '（' + member['username'] + '）')

def printOrgInfo(orgName):
  from trello import getOrgInfo
  orgInfo = getData(getOrgInfo, orgName)
  if orgInfo:
    print('名称：%s（%s）' % (orgInfo['displayName'], orgInfo['name']))
    print('Trello链接：%s' % orgInfo['url'])
    print('官网：%s' % orgInfo['website'])
    print('描述：%s' % orgInfo['desc'])

def getData(function, *arg):
  try:
    dataSet = function(getConfigFileName(), *arg)
    return dataSet
  except:
    from os import path
    print(
      '数据获取失败：请检查您的网络是否正常。\n' +
      '如果网络正常请执行%s auth进行用户信息验证'
      % path.abspath(__file__ + '/../trello_client')
    )
    return None

def getConfigFileName():
  from os import path
  return path.abspath(__file__ + '/../../config.json')
