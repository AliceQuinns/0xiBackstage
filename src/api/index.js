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
export let login = (axios, data) => axios.post('http://192.168.1.146:8080/login', qs.stringify(data));
// ============================================== settings 接口开始 =====================================
/**
 * 增加权限组
 * @param axios
 * @param data
 */
export let addUserGroup = (axios, data) => axios.post('http://192.168.1.146:8080/shscAdminGroupAdd', qs.stringify(data));
/**
 * 获取管理权限组
 * @param axios
 */
export let getGroupList = axios => axios.get(`http://192.168.1.146:8080/shscAdminGroupList`);
/**
 * 删除管理权限组
 * @param axios
 * @param data 权限组的 groupId
 */
export let deleteGroup = (axios, data) => axios.post('/api/shscAdminGroupDelete', data);
/**
 * 获取权限组的信息
 * @param axios
 * @param groupid
 */
export let getGroupInfo = (axios, userid) => axios.get(`http://192.168.1.146:8080/shscAdminGroupId?userid=${userid}`);
/**
 * 编辑权限组
 * @param axios
 * @param data
 */
export let editGroup = (axios, data) => axios.post('http://192.168.1.146:8080/shscAdminGroupModify', data);
/**
 * 获取管理员列表
 * @param axios
 */
export let getUserList = (axios, page) => axios.get(`http://192.168.1.146:8080/shscAdminList?page=${page}`);
/**
 * 删除管理员
 * @param axios
 * @param data
 */
export let deleteUser = (axios, data) => axios.post('http://192.168.1.146:8080/shscAdminDelete', qs.stringify(data));
/**
 * 获取增加管理员页面下拉框的数据
 * @param axios
 */
export let getOptionsData = axios => axios.get(`http://192.168.1.146:8080/shscAdminInsert`);
/**
 * 增加管理员
 * @param axios
 * @param data
 */
export let addUser = (axios, data) => axios.post('http://192.168.1.146:8080/shscAdminAdd', data);
/**
 * 编辑管理员 提交
 * @param axios
 * @param data
 */
export let editUser = (axios, data) => axios.post('http://192.168.1.146:8080/shscAdminModify', data);
/**
 * 获取管理员信息
 * @param axios
 * @param id
 */
export let getUserInfo = (axios, userid) => axios.get(`http://192.168.1.146:8080/shscAdminInsert?userid=${userid}`);
/**
 * 获取热门关键词
 * @param axios
 * @param search
 */
export let getHotKeywords = (axios, search) => axios.get(`http://192.168.1.146:8080/shscSearchWordList${search}`);
/**
 * 增加热门关键词
 * @param axios
 * @param data
 */
export let addHotKeyword = (axios, data) => axios.post('http://192.168.1.146:8080/shscSearchWordAdd', qs.stringify(data));
/**
 * 删除热门关键词
 * @param axios
 * @param data
 */
export let deleteHotKeyword = (axios, data) => axios.post('http://192.168.1.146:8080/shscSearchWordDelete', qs.stringify(data));
/**
 * 获取疯狂抢购和热卖商品
 * @param axios
 * @param search
 */
export let getIndexContent = (axios, search) => axios.get(`http://192.168.1.146:8080/product/ph${search}`);
/**
 * 增加疯狂抢购和热卖商品
 * @param axios
 * @param data type类型传0就可以删除
 */
export let addIndexContent = (axios, data) => axios.post('http://192.168.1.146:8080/product/shp', qs.stringify(data));
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
 * 获取分销店铺的信息
 * @param axios
 * @param userid
 */
export let getDistributionInfo = (axios, userid) => axios.get(`http://192.168.1.146:8080/shscDistributionShopId?userid=${userid}`);
/**
 * 查询商家店铺的信息
 * @param axios
 * @param userid
 */
export let getShopInfo = (axios, userid) => axios.get(`http://192.168.1.146:8080/shscShopId?userid=${userid}`);
/**
 * 编辑分销店铺
 * @param axios
 * @param data
 */
export let editDist = (axios, data) => axios.post('http://192.168.1.146:8080/shscDistributionShopModify', qs.stringify(data));
/**
 * 编辑商家店铺
 * @param axios
 * @param data
 */
export let editNormal = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopModify', qs.stringify(data));
/**
 * 店铺管理删除店铺
 * @param axios
 * @param data
 */
export let deleteShop = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopDelete', qs.stringify(data));
/**
 * 获取分销店铺的信息
 * @param axios
 * @param search
 */
export let getAllDistInfo = (axios, search) => axios.get(`http://192.168.1.146:8080/shscDistributionShopManagerList${search}`);
/**
 * 获取所有的商家店铺信息
 * @param axios
 * @param search
 * @param shop_statu=-1 可查询已关店铺
 */
export let getAllNormalInfo = (axios, search) => axios.get(`http://192.168.1.146:8080/shscShopManagerList${search}`);
/**
 * 获取所有的申请店铺信息
 * @param axios
 * @param search
 */
export let getAllApplyInfo = (axios, search) => axios.get(`http://192.168.1.146:8080/applyShopList${search}`);
/**
 * 修改申请店铺的状态
 * @param axios
 * @param data
 */
export let editApplyStatus = (axios, data) => axios.post('http://192.168.1.146:8080/applyShopModify', qs.stringify(data));
/**
 * 获取所有的店铺分类
 * @param axios
 */
export let getAllCates = axios => axios.get(`http://192.168.1.146:8080/shscShopCatList`);
/**
 * 删除店铺分类
 * @param axios
 * @param data
 */
export let deleteCate = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopCatDelete', qs.stringify(data));
/**
 * 增加修改分类
 * @param axios
 * @param data
 */
export let modifyNAddCate = (axios, data) => axios.post('http://192.168.1.146:8080/shscShopCatAddOrModify', qs.stringify(data));
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
/**
 * 店铺新闻推荐位列表
 * @param axios
 * @param data
 */
export let getStoreNews = axios => axios.get('http://192.168.1.146:8080/shscSjTjWeiList');
/**
 * 删除店铺新闻推荐位
 * @param axios
 * @param data
 */
export let removeGetStoreNews = (axios, data) => axios.post('http://192.168.1.146:8080/shscSjTjWeiDelete', qs.stringify(data));
/**
 * 增加或修改新闻推荐位
 * @param axios
 * @param data
 */
export let addgetStoreNews = (axios, data) => axios.post('http://192.168.1.146:8080/shscSjTjWeiAddORModify', qs.stringify(data));
/**
 * 查询发货地址列表
 * @param axios
 * @param page
 */
export let goodsAddress = (axios, page) => axios.get(`http://192.168.1.146:8080/shscShippingAddressSelectAll?page=${page}`);
/**
 * 删除发货地址
 * @param axios
 * @param data
 */
export let deletegoodsAddress = (axios, data) => axios.post('http://192.168.1.146:8080/shscShippingAddressDelete', qs.stringify(data));
/**
 * 查询最新活动用户预约
 * @param axios
 * @param data
 */
export let reservedUser = (axios, page) => axios.get(`http://192.168.1.146:8080/shscMemberMakeSelectAll?page=${page}`);
/**
 * 删除最新活动用户预约
 * @param axios
 * @param data
 */
export let deletereservedUser = (axios, data) => axios.post('http://192.168.1.146:8080/shscMemberMakeDelete', qs.stringify(data));
// ============================================= shop 接口结束 ==========================================


// ============================================= member 接口开始 ==========================================
/**
 * 会员管理
 * @param axios
 * @param search
 */
export let getAllMember = (axios, search) => axios.get(`http://192.168.1.146:8080/shscMemberList${search}`);
/**
 * 删除会员
 * @param axios
 * @param data
 */
export let deleteMember = (axios, data) => axios.post('http://192.168.1.146:8080/shscMemberDelete', qs.stringify(data));
/**
 * 用户通过审核
 * @param axios
 * @param data
 */
export let passMember = (axios, data) => axios.post('http://192.168.1.146:8080/alreadyCheck', qs.stringify(data));
/**
 * 用户修改为待审核
 * @param axios
 * @param data
 */
export let unpassMember = (axios, data) => axios.post('http://192.168.1.146:8080/stayCheck', qs.stringify(data));
/**
 * 禁止用户访问
 * @param axios
 * @param data
 */
export let blockMember = (axios, data) => axios.post('http://192.168.1.146:8080/banVisit', qs.stringify(data));
/**
 * 查询收货地址列表
 * @param axios
 * @param page
 */
export let obtainAddress = (axios, page) => axios.get(`http://192.168.1.146:8080/deliveryAddressList?page=${page}`);
/**
 * 删除收货地址
 * @param axios
 * @param data
 */
export let deleteAddress = (axios, data) => axios.post('http://192.168.1.146:8080/deliveryAddressListDelete', qs.stringify(data));
/**
 * 查询所有会员等级
 * @param axios
 * @param data
 */
export let membershipLevel = axios => axios.get('http://192.168.1.146:8080/memberGradeList');
/**
 * 获取单个会员等级
 * @param axios
 * @param id
 */
export let getOnemembershipLevel = (axios, id) => axios.get(`http://192.168.1.146:8080/memberGradeListId?id=${id}`);
/**
 * 删除会员等级
 * @param axios
 * @param data
 */
export let deletemembershipLevel = (axios, data) => axios.post('http://192.168.1.146:8080/memberGradeDeleteList', qs.stringify(data));
/**
 * 增加会员等级
 * @param axios
 * @param data
 */
export let addmembershipLevel = (axios, data) => axios.post('http://192.168.1.146:8080/memberGradeAdd', qs.stringify(data));
/**
 * 修改会员等级
 * @param axios
 * @param data
 */
export let modifymembershipLevel = (axios, data) => axios.post('http://192.168.1.146:8080/memberGradeUpdate', qs.stringify(data));
// ============================================= member 接口结束 ==========================================


// ============================================= product 接口开始 ==========================================
/**
 * 产品列表查询商品
 * @param axios
 * @param data
 */
export let inquiryCommodity = (axios, search) => axios.get(`http://192.168.1.146:8080/product/query${search}`);
/**
 * 查询未审核的商品
 * @param axios
 * @param data
 */
export let notAudited = (axios, search) => axios.get(`http://192.168.1.146:8080/product/unaudited${search}`);
/**
 * 查询违规下架的商品
 * @param axios
 * @param data
 */
export let illegalDelivery = (axios, search) => axios.get(`http://192.168.1.146:8080/product/violate${search}`);
/**
 * 更新商品状态
 * @param axios
 * @param data
 */
export let updateStatus = (axios, data) => axios.post('http://192.168.1.146:8080/product/updateStatus', qs.stringify(data));
/**
 * 单条删除商品
 * @param axios
 * @param data
 */
export let deleteProduct = (axios, data) => axios.post('http://192.168.1.146:8080/product/del', qs.stringify(data));
/**
 * 查询单个商品
 * @param axios
 * @param data
 */
export let individualCommodity = (axios, data) => axios.post('http://192.168.1.146:8080/product/edit', qs.stringify(data));
/**
 * 提交编辑表单
 * @param axios
 * @param data
 */
export let ditorialMember = (axios, data) => axios.post('http://192.168.1.146:8080/product/update', qs.stringify(data));
/**
 * 查询所有商品的评论
 * @param axios
 * @param data
 */
export let productEvaluation = (axios, data) => axios.post('http://192.168.1.146:8080/product/comment', qs.stringify(data));
/**
 * 查询单个商品的评论
 * @param axios
 * @param data
 */
export let singleEvaluation = (axios, data) => axios.post('http://192.168.1.146:8080/product/comment', qs.stringify(data));
/**
 * 删除商品评论
 * @param axios
 * @param data
 */
export let deletesingleEvaluation = (axios, data) => axios.post('http://192.168.1.146:8080/productcomment/del', qs.stringify(data));
/**
 * 查询所有商品的咨询
 * @param axios
 * @param data
 */
export let consultations = (axios, data) => axios.post('http://192.168.1.146:8080/product/consult', qs.stringify(data));
/**
 * 删除商品咨询
 * @param axios
 * @param data
 */
export let deleteconsultations = (axios, data) => axios.post('http://192.168.1.146:8080/productconsult/del', qs.stringify(data));
// ============================================= product 接口结束 ==========================================
