#-*- coding:utf-8 -*-
from trello.base.read import Read as ReadBase

class Read(ReadBase):
  def __init__(self, configFileName):
    super(Read, self).__init__(configFileName)
    self.baseUrl = self.config.getApi('card', 'item')

  def info(self, id):
    info = self.trello.getData(
      '%s/%s' % (self.baseUrl, id),
      '&fields=name,desc,due,dateLastActivity,closed,subscribed,url,labels'
    )
    if info:
      print('名称：%s（%s）' % (info['name'], info['id']))
      print('关闭：%s' % ('是' if info['closed'] else '否'))
      print('订阅：%s' % ('是' if info['subscribed'] else '否'))
      if info['labels']:
        labels = [label['name'] for label in info['labels']]
        print('标签：%s' % '，'.join(labels))
      print('链接：%s' % info['url'])
      print('过期时间：%s' % info['due'])
      print('最后活动时间：%s' % info['dateLastActivity'])
      print('描述：%s' % info['desc'])

  def members(self, id):
    super(Read, self).members(
      '%s/%s/members' % (self.baseUrl, id)
    )
