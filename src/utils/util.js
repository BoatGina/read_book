
export default {
  staticPath: 'http://statics.zhuishushenqi.com',
  /**
   * 获取页面参数
   */
  getParams(key, url) {
    var search = url || location.search;
    if (search.indexOf('?') >= 0) {
      search = search.slice(1);
    }
    var paramsArray = search.split('&'),
      params, tmp;
    if (paramsArray && paramsArray.length) {
      params = {};
      for (var i = 0, len = paramsArray.length; i < len; i++) {
        tmp = paramsArray[i];
        tmp && (tmp = tmp.split('='));
        if (tmp && tmp.length) {
          params[tmp[0]] = (tmp[1] && decodeURIComponent(tmp[1])) || '';
        }
      }
    }
    if (key) {
      return params[key];
    }
    return params;
  },
  setItem(key, value, save) {
    if (typeof (value) == "undefined") {
      return false;
    }
    if (this.hasStorage) {
      value = JSON.stringify(value);
      if (save) {
        value && window.localStorage.setItem(key, value);
      } else {
        value && window.sessionStorage.setItem(key, value);
      }
    } else {
      window[key] = value;
    }
  },
  getItem(key) {
    if (this.hasStorage) {
      let value;
      if (window.sessionStorage.getItem(key)) {
        value = JSON.parse(window.sessionStorage.getItem(key));
        return value;
      }
      value = JSON.parse(window.localStorage.getItem(key));
      return value;

    } else {
      return window[key];
    }
  },
  removeItem(key) {
    if (this.hasStorage) {
      window.sessionStorage.removeItem(key);
      window.localStorage.removeItem(key);
    } else {
      delete window[key];
    }
  },
  saveAccount(data) {
    let list = this.getItem('userList') || [];
    let index;
    for (let i = 0; i < list.length; i++) {
      if (list[i].username == data.username) {
        index = i;
        break;
      }
    }
    if (index != undefined) { //删除已存在的账号
      list.splice(index, 1);
    }
    list.unshift(data);
    list = list.slice(0, 5);
    this.setItem('userList', list, true);
    
  },
  hasStorage: (function () {
    if (!!window.localStorage) {
      try {
        window.localStorage.setItem("key", "value");
        window.localStorage.removeItem("key");
        return true;
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  })()
}


