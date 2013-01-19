var Read = {
  init: function(configFileName)
  {
    require('../base/base').init(Read, configFileName);
    Read.baseUrl = Read.config.getApi('lists', 'item');
  },

  info: function(id)
  {
    Read.trello.getData(
      Read.baseUrl + '/' + id,
      '&fields=name,closed',
      function(info) {
        if (info) {
          console.log('名称：%s（%s）：%s', info.name, info.id);
          console.log('关闭：%s', info.closed ? '是' : '否');
        }
      }
    );
  },

  cards: function(id)
  {
    Read.trello.getData(
      Read.baseUrl + '/' + id + '/cards',
      '&fields=name,closed',
      function(cards) {
        if (cards) {
          for (var index in cards) {
            console.log(
              '%s（%s）：%s',
              cards[index].name, cards[index].id,
              cards[index].closed ? '已关闭' : '未关闭'
            );
          }
        }
      }
    );
  }
};

module.exports = Read;
