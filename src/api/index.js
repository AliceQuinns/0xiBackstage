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
// ============================================= shop 接口结束 ==========================================

