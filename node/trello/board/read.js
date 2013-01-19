var Read = {
  init: function(configFileName)
  {
    require('../base/read').init(Read, configFileName);
    Read.baseUrl = Read.config.getApi('board', 'item');
  },

  info: function(id)
  {
    Read.trello.getData(
      Read.baseUrl + '/' + id, '&fields=name,desc,closed,pinned,url',
      function(info) {
        if (info) {
          console.log(
            '名称：%s（%s）：%s', info.name, info.id,
            info.pinned ? '已加入' : '未加入'
          );
          console.log('关闭：%s', info.closed ? '是' : '否');
          console.log('链接：%s', info.url);
          console.log('描述：%s', info.desc);

        }
      }
    );
  },

  members: function(id)
  {
    Read.super_callback.members(
      Read.baseUrl + '/' + id + '/members'
    );
  },

  lists: function(id)
  {
    Read.trello.getData(
      Read.baseUrl + '/' + id + '/lists',
      '&fields=name,closed',
      function(lists) {
        if (lists) {
          for (var index in lists) {
            console.log(
              '%s（%s）',
              lists[index].name,
              lists[index].closed ? '已关闭' : '未关闭'
            );
          }
        }
      }
    );
  }
};

module.exports = Read;
