const POWERMAP = require('./powerMap.json');

/**
 * 将后台返回的全部权限进行改装
 * @param arr 后台返回的全部权限
 * @returns {{path: Array, restPower: Array}}  path： 包含主路由导航对象的数组；restPower 不属于主分类的权限
 */
export function getNameAndPath(arr) {
  let path = [];
  let restPower = null;
  for (let o of POWERMAP) {
    let id = o.id;
    let idx = arr.indexOf(id);
    if ( idx !== -1) {
      let obj = {};
      obj.pathName = o.path;
      obj.name = o.name;
      obj.id = id;
      path.push(obj);
      arr.splice(idx, 1);
    }
  }
  restPower = arr;
  return {
    path,
    restPower,
  }
}

/**
 * 获取对应的主分类下面的所有子权限的 path 和 name
 * @param idx 主分类在映射表的下标
 * @param restArr 所有的次级权限
 * @returns {Array}
 */
export function getSubNavPath(idx, restArr) {
  let totalData = POWERMAP[idx];
  let subNavPath = [];
  for (let v of totalData.subs) {
    // 是否有分组
    if (v.groupId) {
      let group = {};
      group.name = v.groupName;
      group.itemIds = [];
      v.itemIds.forEach(item => {
        let idx = restArr.indexOf(item.id);
        if (idx !== -1) {
          let obj = {};
          obj.name = item.name;
          obj.pathName = item.path;
          group.itemIds.push(obj);
        }
      });
      subNavPath.push(group);
    } else {
      restArr.forEach(k => {
        if (k === v.id) {
          let obj = {};
          obj.name = v.name;
          obj.pathName = v.path;
          subNavPath.push(obj);
        }
      });
    }
  }
  return subNavPath;
}

/**
 * 格式化时间
 * @param date  要格式化的时间对象
 * @param fmt   格式化的模板
 * @returns {*} 返回格式化的字符串
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      // 根据传递过来的模型长度来决定要不要补零
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 * 补零
 * @param str
 * @returns {string}
 */
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * 获取默认渲染的路由
 * @param navId 主导航在 pathmap 文件下的下标
 * @param powers  除主导航以外的权限
 * @returns {*}  返回应该渲染的路由
 */
export function getDefaultPath(navId, powers) {
  let subInfoArr = getSubNavPath(navId, powers.split(','));
  if (!subInfoArr[0]) {
    return
  }
  if (subInfoArr[0].itemIds) {
    if (subInfoArr[0].itemIds[0]) {
      return subInfoArr[0].itemIds[0].pathName;
    }
  } else {
    return subInfoArr[0].pathName;
  }
}

export function detectPower(path, powers) {
  let navPath = /\/\w+/.exec(path)[0];
  for (let i = 0; i < POWERMAP.length; i++) {
    // 找到所属的导航
    if (POWERMAP[i].path === navPath) {
      let subs = POWERMAP[i].subs;
      for (let j = 0; j < subs.length; j++) {
        // 和二级路由进行对比
        if (subs[j].itemIds) {
          for (let m = 0; m < subs[j].itemIds.length; m++) {
            if (subs[j].itemIds[m].path === path) {
              if (powers.indexOf(subs[j].itemIds[m].id) === -1) {
                return false;
              } else {
                return true;
              }
            }
          }
        } else {
          if (subs[j].path === path) {
            if (powers.indexOf(subs[j].id) === -1) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
      break;
    }
  }
  return false;
}
