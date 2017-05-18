let data = require('./mockData.json');
let power = data.power;
let indexInfo = data.indexInfo;
let allUser = [];
let groupList = data.groupList;
let options = data.optionsData;
let allLevel = [];

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
      userInfo: indexInfo
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
    if (allUser.length <= 0) {
      for (let i = 0; i < 300; i++) {
        allUser.push({
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
        data: allUser.slice((page-1)*10, page*10)
      },
    })
  });
  apiRouter.post('/api/shscAdminDelete', (req, res) => {
    let id = req.body.id;
    if (id && id !== 0) {
      for (let i = 0; i < allLevel.length; i++) {
        if (allLevel[i].id === id) {
          allLevel.splice(i, 1);
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
    let user = {
      name: 'test',
      user: 'foo',
      groupId: "0",
      province: '广东省',
      city: '深圳市',
      area: '宝安区',
      type: 0,
      desc: 'testetstetststeted',
    };
    res.json({
      statusCode: 1,
      data: {
        data: user,
        data1: options.data,
        data2: options.data1
      }
    });
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
  apiRouter.get('/api/shscShopGradeList', (req, res) => {
    let id = req.query.id;
    let level = {};
    if (!id) {
      if (allLevel.length <= 0) {
        for (let i = 0; i < 100; i++) {
          allLevel.push({
            id: i,
            name: `test${i}`,
            desc: `描述${i}`,
            create_time: '2017-05-08',
            status: i % 2 === 0 ? 1 : 0,
          });
        }
      }
      res.json({
        statusCode: 1,
        data: allLevel
      });
    } else {
      allLevel.forEach(v => {
        if (v.id === Number(id)) {
          level = v;
        }
      });
      res.json({
        statusCode: 1,
        data: level
      });
    }

  });
  apiRouter.post('/api/shscShopGradeDelectList', (req, res) => {
    let id = req.body.id;
    if (id && id !== 0) {
      for (let i = 0; i < allLevel.length; i++) {
        if (allLevel[i].id === Number(id)) {
          allLevel.splice(i, 1);
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
  apiRouter.post('/api/shscShopGradeAdd', (req, res) => {
    let name = req.body.name;
    let desc = req.body.desc;
    let status = req.body.status;
    if (name !== '' && desc !== '' && status !== '') {
      allLevel.push({
        id: allLevel.length,
        name,
        desc,
        status,
      });
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
  apiRouter.post('/api/shscShopGradeUpdate', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let desc = req.body.desc;
    let status = req.body.status;
    if (id && name && desc && status) {
      allLevel.forEach(v => {
        if (v.id === id) {
          v.name = name;
          v.desc = desc;
          v.status = status;
        }
      });
      res.json({
        success: true,
        statusCode: 1,
        msg: '修改成功',
      });
    } else {
      res.json({
        success: false,
        statusCode: -1,
        msg: '修改失败',
      });
    }
  });
  apiRouter.post('/api/shscAdminModify', (req, res) => {
    res.json({
      success: true,
      statusCode: 1,
      msg: '修改成功',
    });
  });
  apiRouter.post('/api/login', (req, res) => {
    res.json({
      success: true,
      statusCode: 1,
      msg: '修改成功',
      data: {
        user: 'admin',
        logoip: '192.168.1.255',
        currentLogoIp: '192.168.1.255',
        logotime: new Date().getTime()/1000,
        lastlogotime: new Date().getTime()/1000 - 86400,
        logonums: 1234,
        groupParam: power.power2.join(','),
        sessionId: '45EWJ8325JKD8S7RRNKDF9342R5WGGH',
      },
    });
  });
};

