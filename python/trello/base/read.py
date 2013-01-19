#-*- coding:utf-8 -*-
from base import Base

class Read(Base):
  def __init__(self, configFileName):
    super(Read, self).__init__(configFileName)

  def members(self, api):
    members = self.trello.getData(api)
    if members:
      for member in members:
        print(member['fullName'] + '（' + member['username'] + '）')
