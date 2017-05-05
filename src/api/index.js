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
export let getUserInfo = axios => axios.post('/api/userinfo');
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
