#-*- coding:utf-8 -*-
from base import Base

class Read(Base):
  def __init__(self, configFileName):
    super(Read, self).__init__(configFileName)

  def members(self, value):
    members = self.trello.getData(
      '%s/%s/members' % (self.baseUrl, value)
    )
    if members:
      for member in members:
        print(member['fullName'] + '（' + member['username'] + '）')
