#-*- coding:utf-8 -*-

def run(configFileName, options, arguments):
  from read import Read
  read = Read(configFileName)

  if options.card:
    return read.cards(arguments[0])

  return read.info(arguments[0])
