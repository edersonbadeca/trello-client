#-*- coding:utf-8 -*-
from trello.base.read import ReadBase

class Read(ReadBase):
  def __init__(self, configFileName):
    super(Read, self).__init__(configFileName)
    self.baseUrl = self.config.getApi('boards', 'item')

  def info(self, boardId):
    info = self.trello.getData(
      '%s/%s' % (self.baseUrl, boardId),
      '&fields=name,desc,closed,pinned,url'
    )
    if info:
      print(
        '名称：%s（%s）：%s' %
        (info['name'], info['id'], '已加入' if info['pinned'] else '未加入')
      )
      print('关闭：%s' % ('是' if info['closed'] else '否'))
      print('链接：%s' % info['url'])
      print('描述：%s' % info['desc'])

  def members(self, boardId):
    super(Read, self).members(
      '%s/%s/members' % (self.baseUrl, boardId)
    )
