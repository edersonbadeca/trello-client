#概况

一个用python（node）实现的Trello客户端。

#安装配置

```shell
cd ~/
wget https://nodeload.github.com/NanJingBoy/trello-client/zip/master
unzip master
cd trello-client-master
cp config_example.json config.json
vim config.json //修改developerKeys节点中key和oauth_secret的值;并删除文件中所有注释语句
```

#命令列表（此处仅以python版为例，node命令列表相同）

```shell
python/trello_client -a //用户验证
python/trello_client -o //获取organizations列表信息
python/trello_client -o demo //获取名称为demo的organization信息
python/trello_client -om demo //获取名称为demo的organization中member列表信息
python/trello_client -ob demo //获取名称为demo的organization中board列表信息
```
