#-*- coding:utf-8 -*-

class Config:
  def __init__(self, fileName):
    from json import load
    with file(fileName) as fp:
      self.config = load(fp)

  def getDeveloperKeys(self):
    return self.config['developerKeys']

  def getApi(self, section, option):
    return self.config['api'][section][option]

