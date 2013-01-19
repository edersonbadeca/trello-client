var Read = {
  init: function(configFileName)
  {
    require('../base/read').init(Read, configFileName);
    Read.key = 'organization';
  },

  orgs: function()
  {
    Read.trello.getData(
      Read.config.getApi(Read.key, 'list'), '&fields=displayName,name',
      function(orgs) {
        if (orgs) {
          for(var index in orgs) {
            console.log('%s（%s）', orgs[index].displayName, orgs[index].name);
          }
        }
      }
    );
  },

  members: function(name)
  {
    Read.super_callback.members(
      Read.config.getApi(Read.key, 'item') + '/' + name + '/members'
    );
  },

  info: function(name)
  {
    Read.trello.getData(
      Read.config.getApi(Read.key, 'item') + '/' + name, '&members=admins',
      function(info) {
        if (info) {
          console.log('名称：%s（%s）', info.displayName, info.name);
          console.log('Trello链接：%s', info.url);
          console.log('官网：%s', info.website);
          console.log('描述：%s', info.desc);
          if (info.members) {
            var admins = [];
            for (var index in info.members) {
              admins.push(
                info.members[index].fullName + '（' +
                info.members[index].username + '）'
              )
            }
            console.log('管理员：%s', admins.join('，'));
          }
        }
      }
    );
  },

  boards: function(name)
  {
    Read.trello.getData(
      Read.config.getApi(Read.key, 'item') + '/' + name + '/boards',
      '&filter=organization&fields=name,pinned',
      function(boards) {
        if (boards) {
          for (var index in boards) {
            console.log(
              '%s（%s）：%s',
              boards[index].name, boards[index].id,
              boards[index].pinned ? '已加入' : '未加入'
            );
          }
        }
      }
    );
  }
};

module.exports = Read;
