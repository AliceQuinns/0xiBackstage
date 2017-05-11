import qs from 'qs'
/**
 * 获取用户权限
 * @param axios
 */
export let getPowers1 = axios => axios.get('/api/power1');
export let getPowers2 = axios => axios.get('/api/power2');
/**
 * 获取首页个人信息
 * @param axios
 */
export let getIndexInfo = axios => axios.post('/api/userinfo');

// ============================================== settings 接口开始 =====================================
/**
 * 增加权限组
 * @param axios
 * @param data  发给服务器的数据
 */
export let addUserGroup = (axios, data) => axios.post('/api/addadmin', data);
/**
 * 获取权限组列表
 * @param axios
 */
export let getGroupList = axios => axios.get('/api/shscAdminGroupList');
/**
 * 删除某一个权限组
 * @param axios
 * @param data 权限组的 groupId
 */
export let deleteGroup = (axios, data) => axios.post('/api/shscAdminGroupDelete', data);
/**
 * 获取权限组的信息
 * @param axios
 * @param groupid
 */
export let getGroupInfo = (axios, groupid) => axios.get(`/api/shscAdminGroupId?groupid=${groupid}`);
/**
 * 编辑权限组
 * @param axios
 * @param data
 */
export let editGroup = (axios, data) => axios.post('/api/shscAdminGroupModify', data);
/**
 * 获取管理员列表
 * @param axios
 */
export let getUserList = (axios, page) => axios.get(`/api/shscAdminList?page=${page}`);
/**
 * 删除管理员
 * @param axios
 * @param data  管理员 id
 */
export let deleteUser = (axios, data) => axios.post('/api/shscAdminDelete', data);
/**
 * 获取增加管理员页面下拉框的数据
 * @param axios
 */
export let getOptionsData = axios => axios.get('/api/shscAdminInsert');
/**
 * 增加管理员
 * @param axios
 * @param data
 */
export let addUser = (axios, data) => axios.post('/api/shscAdminAdd', data);
/**
 * 编辑管理员
 * @param axios
 * @param data
 */
export let editUser = (axios, data) => axios.post('/api/shscAdminModify', data);
/**
 * 获取管理员信息
 * @param axios
 * @param id
 */
export let getUserInfo = (axios, id) => axios.get(`/api/shscAdminGroupId?id=${id}`);
// ============================================== settings 接口结束 =====================================

// ============================================= shop 接口开始 ==========================================
/**
 * 获取所有店铺的等级
 * @param axios
 */
export let getAllShopsLevel = axios => axios.get('/api/shscShopGradeList');
/**
 * 获取单个店铺的等级
 * @param axios
 * @param id
 */
export let getOneShopLevel = (axios, id) => axios.get(`/api/shscShopGradeList?id=${id}`);
/**
 * 删除店铺等级
 * @param axios
 * @param data
 */
export let deleteShopLevel = (axios, data) => axios.post('/api/shscShopGradeDelectList', data);
/**
 * 增加店铺等级
 * @param axios
 * @param data
 */
export let addShopLevel = (axios, data) => axios.post('/api/shscShopGradeAdd', data);
/**
 * 编辑店铺等级
 * @param axios
 * @param data
 */
export let editShopLevel = (axios, data) => axios.post('/api/shscShopGradeUpdate', data);
/**
 * 获取店铺管理的店铺信息
 * @param axios
 * @param search
 */
export let getAllShopInfo = (axios, search) => axios.get(`http://192.168.1.146:8080/shscShopList${search}`);
/**
 * 获取店铺的分类信息
 * @param axios
 */
export let getShopType = axios => axios.get('http://192.168.1.146:8080/shscShopCat');
/**
 * 获取单个店铺的信息
 * @param axios
 * @param userid
 */
export let getShopInfo = (axios, userid) => axios.get(`http://192.168.1.146:8080/shscShopId?userid=${userid}`);
/**
 * 店铺管理删除店铺
 * @param axios
 * @param data
 */
export let deleteShop = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopDelete', qs.stringify(data));
/**
 * 获取店铺模板
 * @param axios
 */
export let getShopTemplate = axios => axios.get('http://192.168.1.146:8080/shscShopTemplateSelectAll');
/**
 * 增加店铺模块
 * @param axios
 * @param data
 */
export let addStoreModule = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopTemplateAdd', qs.stringify(data));
/**
 * 修改店铺模板
 * @param axios
 * @param data
 */
export let modifyStoreModule = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopTemplateUpdate', qs.stringify(data));
/**
 * 删除店铺模板
 * @param axios
 * @param data
 */
export let deleteShopTemplate = (axios, data) => axios.post(`http://192.168.1.146:8080/shscShopTemplateDelete`,qs.stringify(data));
/**
 * 查询店铺手机端模板
 * @param axios
 * @param data
 */
export let getShopTemplateMobile = axios => axios.get('http://192.168.1.146:8080/shscShopSjTemplateSelectAll');
/**
 * 删除店铺手机端模板
 * @param axios
 * @param data
 */
export let deleteShopTemplateMobile = (axios, data) => axios.post(`http://192.168.1.146:8080/shscShopSjTemplateDelete`,qs.stringify(data));
/**
 * 增加店铺手机端模板
 * @param axios
 * @param data
 */
export let addStoreModuleMobile = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopSjTemplateAdd', qs.stringify(data));
/**
 * 修改店铺手机端模板
 * @param axios
 * @param data
 */
export let modifyStoreModuleMobile = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopSjTemplateUpdate', qs.stringify(data));
// ============================================= shop 接口结束 ==========================================

