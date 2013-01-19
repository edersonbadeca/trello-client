#-*- coding:utf-8 -*-

class Base(object):
  def __init__(self, configFileName):
    from trello.trello import Trello
    self.trello = Trello(configFileName)
    self.config = self.trello.getConfig()
