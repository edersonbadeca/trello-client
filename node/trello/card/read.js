var Read = {
  init: function(configFileName)
  {
    require('../base/read').init(Read, configFileName);
    Read.baseUrl = Read.config.getApi('card', 'item');
  },

  info: function(id)
  {
    Read.trello.getData(
      Read.baseUrl + '/' + id,
      '&fields=name,desc,due,dateLastActivity,closed,subscribed,url,labels',
      function(info) {
        if (info) {
          console.log('名称：%s（%s）', info.name, info.id);
          console.log('关闭：%s', info.closed ? '是' : '否');
          console.log('订阅：%s', info.subscribed ? '是' : '否');
          if(info.labels) {
            var labels = [];
            for (var index in info.labels) {
              labels.push(info.labels[index].name);
            }
            console.log('标签：%s', labels.join('，'));
          }
          console.log('链接：%s', info.url);
          console.log('过期时间：%s', info.due);
          console.log('最后活动时间：%s', info.dateLastActivity);
          console.log('描述：%s', info.desc);
        }
      }
    );
  }
};

module.exports = Read;
