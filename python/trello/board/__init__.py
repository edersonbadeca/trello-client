#-*- coding:utf-8 -*-

def run(configFileName, options, arguments):
  from read import Read
  read = Read(configFileName)

  if options.lists:
    return read.lists(arguments[0])

  if options.member:
    return read.members(arguments[0])

  return read.info(arguments[0])
