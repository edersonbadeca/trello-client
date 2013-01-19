#-*- coding:utf-8 -*-
from trello.base.base import Base

class Read(Base):
  def __init__(self, configFileName):
    super(Read, self).__init__(configFileName)
    self.baseUrl = self.config.getApi('lists', 'item')

  def info(self, id):
    info = self.trello.getData(
      '%s/%s' % (self.baseUrl, id),
      '&fields=name,closed'
    )
    if info:
      print(
        '名称：%s（%s）' % (info['name'], info['id'])
      )
      print('关闭：%s' % ('是' if info['closed'] else '否'))

  def cards(self, id):
    cards = self.trello.getData(
      '%s/%s/cards' % (self.baseUrl, id),
      '&fields=name,closed'
    )
    if cards:
      for card in cards:
        print(
          '%s（%s）：%s' %
          (
            card['name'], card['id'],
            '已关闭' if card['closed'] else '未关闭'
          )
        )
