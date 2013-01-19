var Read = {
  init: function(obj, configFileName)
  {
    Read.obj = obj;
    require('./base').init(obj, configFileName);
    obj.super_callback = {
      members: Read.members
    };
  },

  members: function(api)
  {
    Read.obj.trello.getData(
      api, null,
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
