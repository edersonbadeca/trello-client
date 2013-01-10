#-*- coding:utf-8 -*-
from trello.base import Base

class Read(Base):
  def __init__(self, configFileName):
    super(Read, self).__init__(configFileName)
    self.key = 'organization'

  def orgs(self):
    orgs = self.trello.getData(
      self.config.getApi(self.key, 'list'), '&fields=displayName,name'
    )
    if orgs:
      for org in orgs:
        print(org['displayName'] + '（' + org['name'] + '）')

  def members(self, name):
    members = self.trello.getData(
      '%s/%s/members' % (self.config.getApi(self.key, 'item'), name)
    )
    if members:
      for member in members:
        print(member['fullName'] + '（' + member['username'] + '）')

  def info(self, name):
    info = self.trello.getData(
      '%s/%s' % (self.config.getApi(self.key, 'item'), name),
      '&members=admins'
    )
    if info:
      print('名称：%s（%s）' % (info['displayName'], info['name']))
      print('Trello链接：%s' % info['url'])
      print('官网：%s' % info['website'])
      print('描述：%s' % info['desc'])
      if info['members']:
        admins = [
          '%s（%s）' % (member['fullName'], member['username'])
          for member in info['members']
        ]
        print('管理员：%s' % '，'.join(admins))

  def boards(self, name):
    boards = self.trello.getData(
      '%s/%s/boards' % (self.config.getApi(self.key, 'item'), name),
      '&filter=organization&fields=name,pinned'
    )
    if boards:
      for board in boards:
        print(
          '%s（%s）' %
          (board['name'], '已加入' if board['pinned'] else '未加入' )
        )
