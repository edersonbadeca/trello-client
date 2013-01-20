var Read = {
  init: function(obj, configFileName)
  {
    require('./base').init(obj, configFileName);
    Read.obj = obj;
    obj.members = Read.members;
  },

  members: function(value)
  {
    Read.obj.trello.getData(
      Read.obj.baseUrl + '/' + value + '/members', null,
      function(members) {
        if (members) {
          for (var index in members) {
            console.log(
              '%s（%s）', members[index].fullName, members[index].username
            );
          }
        }
      }
    );
  }
};

module.exports = Read;
