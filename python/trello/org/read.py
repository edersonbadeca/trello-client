#-*- coding:utf-8 -*-
from trello.base.read import Read as ReadBase

class Read(ReadBase):
  def __init__(self, configFileName):
    super(Read, self).__init__(configFileName)
    self.key = 'organization'
    self.baseUrl = self.config.getApi(self.key, 'item')

  def orgs(self):
    orgs = self.trello.getData(
      self.config.getApi(self.key, 'list'), '&fields=displayName,name'
    )
    if orgs:
      for org in orgs:
        print(org['displayName'] + '（' + org['name'] + '）')

  def info(self, name):
    info = self.trello.getData(
      '%s/%s' % (self.baseUrl, name),
      '&members=admins'
    )
    if info:
      print('名称：%s（%s）' % (info['displayName'], info['name']))
      print('链接：%s' % info['url'])
      print('官网：%s' % info['website'])
      if info['members']:
        admins = [
          '%s（%s）' % (member['fullName'], member['username'])
          for member in info['members']
        ]
        print('管理员：%s' % '，'.join(admins))
      print('描述：%s' % info['desc'])

  def boards(self, name):
    boards = self.trello.getData(
      '%s/%s/boards' % (self.baseUrl, name),
      '&filter=organization&fields=name,pinned'
    )
    if boards:
      for board in boards:
        print(
          '%s（%s）：%s' %
          (
            board['name'], board['id'],
            '已加入' if board['pinned'] else '未加入'
          )
        )
