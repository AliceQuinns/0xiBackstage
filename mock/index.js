let data = require('./mockData.json');
let power = data.power;
let userInfo = data.userInfo;
let groupList = data.groupList;
let userList = data.userList;
let options = data.optionsData;

module.exports = function (apiRouter) {
  apiRouter.get('/api/power1', (req, res) => {
    res.json({
      statusCode: 1,
      power: power.power1,
    });
  });
  apiRouter.get('/api/power2', (req, res) => {
    res.json({
      statusCode: 1,
      power: power.power2,
    });
  });
  apiRouter.get('/api/shscAdminGroupList', (req, res) => {
    res.json({
      statusCode: 1,
      data: groupList
    });
  });
  apiRouter.post('/api/userinfo', (req, res) => {
    res.json({
      statusCode: 1,
      userInfo: userInfo
    });
  });

  apiRouter.post('/api/addadmin', (req, res) => {
    let group = req.body.groupName;
    let desc = req.body.groupDesc;
    let power = req.body.groupPerms;
    if (group !== '' && desc !== '' && power !== '') {
      res.json({
        success: true,
        statusCode: 1,
        msg: '添加成功',
      });
    } else {
      res.json({
        success: false,
        statusCode: -1,
        msg: '添加失败',
      });
    }
  });
  apiRouter.post('/api/shscAdminGroupDelete', (req, res) => {
    let groupId = req.body.groupId;
    if (groupId !== '') {
      for (let i = 0; i < groupList.length; i++) {
        if (Number(groupList[i].groupId) === groupId) {
          groupList.splice(i, 1);
          break;
        }
      }
      res.json({
        success: true,
        statusCode: 1,
        msg: '删除成功',
      });
    } else {
      res.json({
        success: false,
        statusCode: -1,
        msg: '删除失败',
      });
    }
  });
  apiRouter.get('/api/shscAdminGroupId', (req, res) => {
    let groupId = req.query.groupid;
    let info = '';
    for (let i = 0; i < groupList.length; i++) {
      if (groupList[i].groupId === groupId) {
        info = groupList[i];
        break;
      }
    }
    res.json({
      statusCode: 1,
      data: info
    });
  });
  apiRouter.post('/api/shscAdminGroupModify', (req, res) => {
    let groupId = req.body.groupId;
    let groupName = req.body.groupName;
    let groupDesc = req.body.groupDesc;
    let groupPerms = req.body.groupPerms;
    if (groupId && groupName && groupDesc && groupPerms) {
      res.json({
        success: true,
        statusCode: 1,
        msg: '删除成功',
      });
    } else {
      res.json({
        success: false,
        statusCode: -1,
        msg: '删除失败',
      });
    }
  });
  apiRouter.get('/api/shscAdminList', (req, res) => {
    let page = req.query.page;
    if (userList.length <= 0) {
      for (let i = 0; i < 300; i++) {
        userList.push({
          "id": i,
          "user": `Alvin${i}`,
          "name": `晓丽${i}`,
          "groupName": `财务组${i}`,
        })
      }
    }
    res.json({
      success: true,
      statusCode: 1,
      msg: '删除成功',
      data: {
        total: 300,
        data: userList.slice((page-1)*10, page*10)
      },
    })
  });
  apiRouter.post('/api/shscAdminDelete', (req, res) => {
    let id = req.body.id;
    if (id && id !== 0) {
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === id) {
          userList.splice(i, 1);
          break;
        }
      }
      res.json({
        success: true,
        statusCode: 1,
        msg: '删除成功',
      });
    } else {
      res.json({
        success: false,
        statusCode: -1,
        msg: '删除失败',
      });
    }
  });
  apiRouter.get('/api/shscAdminInsert', (req, res) => {
    res.json({
      statusCode: 1,
      data: options
    });
  });
  apiRouter.post('/api/shscAdminAdd', (req, res) => {
    if (req.body.user) {
      res.json({
        success: true,
        statusCode: 1,
        msg: '删除成功',
      });
    } else {
      res.json({
        success: false,
        statusCode: -1,
        msg: '删除失败',
      });
    }
  });
};

