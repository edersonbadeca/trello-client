var Base = {
  init: function(obj, configFileName)
  {
    obj.trello = require('../trello');
    obj.trello.init(configFileName);
    obj.config = obj.trello.getConfig();
    obj.dateFormat = Base.dateFormat;
  },

  dateFormat: function(date, format)
  {
    var dateObj = {
        "M+":  date.getMonth() + 1,
        "d+":  date.getDate(),
        "H+":  date.getHours(),
        "m+":  date.getMinutes(),
        "s+":  date.getSeconds()
    }

    if(/(y+)/i.test(format)) {
        format = format.replace(
            RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }

    for(var index in dateObj) {
        if(new RegExp("("+ index +")").test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length ==1
                    ? dateObj[index] : ("00" + dateObj[index]).substr(
                        ("" + dateObj[index]).length
                    )
            );
        }
    }

    return format;
  }
};

module.exports = Base;
