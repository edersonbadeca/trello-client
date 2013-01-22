#-*- coding:utf-8 -*-

class Base(object):
  def __init__(self, configFileName):
    from trello.trello import Trello
    self.trello = Trello(configFileName)
    self.config = self.trello.getConfig()

  def utctimeFormat(self, utctime, timeFormat = '%Y-%m-%d %H:%M:%S'):
    from dateutil import parser, tz
    return parser.parse(utctime).astimezone(
      tz.tzoffset('China', 60*60*8)
    ).strftime(timeFormat)
