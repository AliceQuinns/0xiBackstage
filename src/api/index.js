// 打包时或者合并到主分支时要去掉前缀
/**
 * 获取首页个人信息
 * @param axios
 */
export let getManagerInfo = axios => axios.get('/getSession');
/**
 * 退出登录
 * @param axios
 * @param data sessionId
 */
// export let logout = (axios, data) => axios.post('/logout', data);
export let logout = axios => axios.get('/logout');
// ============================================== settings 接口开始 =====================================
/**
 * 增加权限组
 * @param axios
 * @param data
 */
export let addUserGroup = (axios, data) => axios.post('/shscAdminGroupAdd', data);
/**
 * 获取管理权限组
 * @param axios
 */
export let getGroupList = axios => axios.get(`/shscAdminGroupList`);
/**
 * 删除管理权限组
 * @param axios
 * @param data 权限组的 groupId
 */
export let deleteGroup = (axios, data) => axios.post('/shscAdminGroupDelete', data);
/**
 * 获取权限组的信息
 * @param axios
 * @param groupid
 */
export let getGroupInfo = (axios, groupid) => axios.get(`/shscAdminGroupId?groupId=${groupid}`);
/**
 * 编辑权限组
 * @param axios
 * @param data
 */
export let editGroup = (axios, data) => axios.post('/shscAdminGroupModify', data);
/**
 * 获取管理员列表
 * @param axios
 */
export let getUserList = (axios, page) => axios.get(`/shscAdminList?page=${page}`);
/**
 * 删除管理员
 * @param axios
 * @param data
 */
export let deleteUser = (axios, data) => axios.post('/shscAdminDelete', data);
/**
 * 获取增加管理员页面下拉框的数据
 * @param axios
 */
export let getOptionsData = axios => axios.get(`/shscAdminInsert`);
/**
 * 增加管理员
 * @param axios
 * @param data
 */
export let addUser = (axios, data) => axios.post('/shscAdminAdd', data);
/**
 * 编辑管理员 提交
 * @param axios
 * @param data
 */
export let editUser = (axios, data) => axios.post('/shscAdminModify', data);
/**
 * 获取管理员信息
 * @param axios
 * @param id
 */
export let getUserInfo = (axios, id) => axios.get(`/shscAdminId?id=${id}`);
/**
 * 获取热门关键词
 * @param axios
 * @param search
 */
export let getHotKeywords = (axios, search) => axios.get(`/shscSearchWordList${search}`);
/**
 * 增加热门关键词
 * @param axios
 * @param data
 */
export let addHotKeyword = (axios, data) => axios.post('/shscSearchWordAdd', data);
/**
 * 删除热门关键词
 * @param axios
 * @param data
 */
export let deleteHotKeyword = (axios, data) => axios.post('/shscSearchWordDelete', data);
/**
 * 获取疯狂抢购和热卖商品
 * @param axios
 * @param search
 */
export let getIndexContent = (axios, search) => axios.get(`/product/ph${search}`);
/**
 * 增加疯狂抢购和热卖商品
 * @param axios
 * @param data type类型传0就可以删除
 */
export let addIndexContent = (axios, data) => axios.post('/product/shp', data);
// ============================================== settings 接口结束 =====================================

// ============================================= shop 接口开始 ==========================================
/**
 * 获取所有店铺的等级
 * @param axios
 */
export let getAllShopsLevel = axios => axios.get('/shscShopGradeList');
/**
 * 获取单个店铺的等级
 * @param axios
 * @param id
 */
export let getOneShopLevel = (axios, id) => axios.get(`/shscShopGradeListId?id=${id}`);
/**
 * 删除店铺等级
 * @param axios
 * @param data
 */
export let deleteShopLevel = (axios, data) => axios.post('/shscShopGradeDelete', data);
/**
 * 增加店铺等级
 * @param axios
 * @param data
 */
export let addShopLevel = (axios, data) => axios.post('/shscShopGradeAdd', data);
/**
 * 编辑店铺等级
 * @param axios
 * @param data
 */
export let editShopLevel = (axios, data) => axios.post('/shscShopGradeUpdate', data);
/**
 * 获取店铺管理的店铺信息
 * @param axios
 * @param search
 */
export let getAllShopInfo = (axios, search) => axios.get(`/shscShopList${search}`);
/**
 * 获取店铺的分类信息
 * @param axios
 */
export let getShopType = axios => axios.get('/shscShopCat');
/**
 * 获取分销店铺的信息
 * @param axios
 * @param userid
 */
export let getDistributionInfo = (axios, userid) => axios.get(`/shscDistributionShopId?userid=${userid}`);
/**
 * 查询商家店铺的信息
 * @param axios
 * @param userid
 */
export let getShopInfo = (axios, userid) => axios.get(`/shscShopId?userid=${userid}`);
/**
 * 编辑分销店铺
 * @param axios
 * @param data
 */
export let editDist = (axios, data) => axios.post('/shscDistributionShopModify', data);
/**
 * 编辑商家店铺
 * @param axios
 * @param data
 */
export let editNormal = (axios, data) => axios.post('/shscShopModify', data);
/**
 * 店铺管理删除店铺
 * @param axios
 * @param data
 */
export let deleteShop = (axios, data) => axios.post('/shscShopDelete', data);
/**
 * 获取分销店铺的信息
 * @param axios
 * @param search
 */
export let getAllDistInfo = (axios, search) => axios.get(`/shscDistributionShopManagerList${search}`);
/**
 * 获取所有的商家店铺信息
 * @param axios
 * @param search
 * @param shop_statu=-1 可查询已关店铺
 */
export let getAllNormalInfo = (axios, search) => axios.get(`/shscShopManagerList${search}`);
/**
 * 获取所有的申请店铺信息
 * @param axios
 * @param search
 */
export let getAllApplyInfo = (axios, search) => axios.get(`/applyShopList${search}`);
/**
 * 修改申请店铺的状态
 * @param axios
 * @param data
 */
export let editApplyStatus = (axios, data) => axios.post('/applyShopModify', data);
/**
 * 获取所有的店铺分类
 * @param axios
 */
export let getAllCates = axios => axios.get(`/shscShopCatList`);
/**
 * 删除店铺分类
 * @param axios
 * @param data
 */
export let deleteCate = (axios, data) => axios.post('/shscShopCatDelete', data);
/**
 * 增加修改分类
 * @param axios
 * @param data
 */
export let modifyNAddCate = (axios, data) => axios.post('/shscShopCatAddOrModify', data);
/**
 * 获取店铺模板
 * @param axios
 */
export let getShopTemplate = axios => axios.get('/shscShopTemplateSelectAll');
/**
 * 增加店铺模块
 * @param axios
 * @param data
 */
export let addStoreModule = (axios, data) => axios.post('/shscShopTemplateAdd', data);
/**
 * 修改店铺模板
 * @param axios
 * @param data
 */
export let modifyStoreModule = (axios, data) => axios.post('/shscShopTemplateUpdate', data);
/**
 * 删除店铺模板
 * @param axios
 * @param data
 */
export let deleteShopTemplate = (axios, data) => axios.post(`/shscShopTemplateDelete`,data);
/**
 * 查询店铺手机端模板
 * @param axios
 * @param data
 */
export let getShopTemplateMobile = axios => axios.get('/shscShopSjTemplateSelectAll');
/**
 * 删除店铺手机端模板
 * @param axios
 * @param data
 */
export let deleteShopTemplateMobile = (axios, data) => axios.post(`/shscShopSjTemplateDelete`,data);
/**
 * 增加店铺手机端模板
 * @param axios
 * @param data
 */
export let addStoreModuleMobile = (axios, data) => axios.post('/shscShopSjTemplateAdd', data);
/**
 * 修改店铺手机端模板
 * @param axios
 * @param data
 */
export let modifyStoreModuleMobile = (axios, data) => axios.post('/shscShopSjTemplateUpdate', data);
/**
 * 店铺新闻推荐位列表
 * @param axios
 * @param data
 */
export let getStoreNews = axios => axios.get('/shscSjTjWeiList');
/**
 * 删除店铺新闻推荐位
 * @param axios
 * @param data
 */
export let removeGetStoreNews = (axios, data) => axios.post('/shscSjTjWeiDelete', data);
/**
 * 增加或修改新闻推荐位
 * @param axios
 * @param data
 */
export let addgetStoreNews = (axios, data) => axios.post('/shscSjTjWeiAddORModify', data);
/**
 * 查询发货地址列表
 * @param axios
 * @param page
 */
export let goodsAddress = (axios, page) => axios.get(`/shscShippingAddressSelectAll?page=${page}`);
/**
 * 删除发货地址
 * @param axios
 * @param data
 */
export let deletegoodsAddress = (axios, data) => axios.post('/shscShippingAddressDelete', data);
/**
 * 查询最新活动用户预约
 * @param axios
 * @param data
 */
export let reservedUser = (axios, page) => axios.get(`/shscMemberMakeSelectAll?page=${page}`);
/**
 * 删除最新活动用户预约
 * @param axios
 * @param data
 */
export let deletereservedUser = (axios, data) => axios.post('/shscMemberMakeDelete', data);
// ============================================= shop 接口结束 ==========================================


// ============================================= member 接口开始 ==========================================
/**
 * 会员管理
 * @param axios
 * @param search
 */
export let getAllMember = (axios, search) => axios.get(`/shscMemberList${search}`);
/**
 * 删除会员
 * @param axios
 * @param data
 */
export let deleteMember = (axios, data) => axios.post('/shscMemberDelete', data);
/**
 * 用户通过审核
 * @param axios
 * @param data
 */
export let passMember = (axios, data) => axios.post('/alreadyCheck', data);
/**
 * 用户修改为待审核
 * @param axios
 * @param data
 */
export let unpassMember = (axios, data) => axios.post('/stayCheck', data);
/**
 * 禁止用户访问
 * @param axios
 * @param data
 */
export let blockMember = (axios, data) => axios.post('/banVisit', data);
/**
 * 查询收货地址列表
 * @param axios
 * @param page
 */
export let obtainAddress = (axios, page) => axios.get(`/deliveryAddressList?page=${page}`);
/**
 * 删除收货地址
 * @param axios
 * @param data
 */
export let deleteAddress = (axios, data) => axios.post('/deliveryAddressListDelete', data);
/**
 * 查询所有会员等级
 * @param axios
 * @param data
 */
export let membershipLevel = axios => axios.get('/memberGradeList');
/**
 * 获取单个会员等级
 * @param axios
 * @param id
 */
export let getOnemembershipLevel = (axios, id) => axios.get(`/memberGradeListId?id=${id}`);
/**
 * 删除会员等级
 * @param axios
 * @param data
 */
export let deletemembershipLevel = (axios, data) => axios.post('/memberGradeDeleteList', data);
/**
 * 增加会员等级
 * @param axios
 * @param data
 */
export let addmembershipLevel = (axios, data) => axios.post('/memberGradeAdd', data);
/**
 * 修改会员等级
 * @param axios
 * @param data
 */
export let modifymembershipLevel = (axios, data) => axios.post('/memberGradeUpdate', data);
// ============================================= member 接口结束 ==========================================


// ============================================= product 接口开始 ==========================================
/**
 * 产品列表查询商品
 * @param axios
 * @param data
 */
export let inquiryCommodity = (axios, search) => axios.get(`/product/query${search}`);
/**
 * 查询未审核的商品
 * @param axios
 * @param data
 */
export let notAudited = (axios, search) => axios.get(`/product/unaudited${search}`);
/**
 * 查询违规下架的商品
 * @param axios
 * @param data
 */
export let illegalDelivery = (axios, search) => axios.get(`/product/violate${search}`);
/**
 * 更新商品状态
 * @param axios
 * @param data
 */
export let updateStatus = (axios, data) => axios.post('/product/updateStatus', data);
/**
 * 单条删除商品
 * @param axios
 * @param data
 */
export let deleteProduct = (axios, data) => axios.post('/product/del', data);
/**
 * 查询单个商品
 * @param axios
 * @param data
 */
export let individualCommodity = (axios, data) => axios.post('/product/edit', data);
/**
 * 提交编辑表单
 * @param axios
 * @param data
 */
export let ditorialMember = (axios, data) => axios.post('/product/update', data);
/**
 * 查询所有商品的评论
 * @param axios
 * @param data
 */
export let productEvaluation = (axios, data) => axios.post('/product/comment', data);
/**
 * 查询单个商品的评论
 * @param axios
 * @param data
 */
export let singleEvaluation = (axios, data) => axios.post('/product/comment', data);
/**
 * 删除商品评论
 * @param axios
 * @param data
 */
export let deletesingleEvaluation = (axios, data) => axios.post('/productcomment/del', data);
/**
 * 查询所有商品的咨询
 * @param axios
 * @param data
 */
export let consultations = (axios, data) => axios.post('/product/consult', data);
/**
 * 删除商品咨询
 * @param axios
 * @param data
 */
export let deleteconsultations = (axios, data) => axios.post('/productconsult/del', data);
/**
 * 查询多个品牌 查询单个品牌
 * @param axios
 * @param data
 */
export let queryBrand = (axios, data) => axios.post('/brand/query', data);
/**
 * 添加品牌 修改品牌
 * @param axios
 * @param data
 */
export let addQueryBrand = (axios, data) => axios.post('/brand/add', data);
/**
 * 修改品牌状态
 * @param axios
 * @param data
 */
export let modifyState = (axios, data) => axios.post('/brand/updatebrandstatus', data);
/**
 * 修改品牌排序值
 * @param axios
 * @param data
 */
export let modifySort = (axios, data) => axios.post('/brand/updateiddo', data);
/**
 * 删除品牌
 * @param axios
 * @param data
 */
export let deleteQueryBrand = (axios, data) => axios.post('/brand/del', data);
/**
 * 获取下拉菜单选项
 * @param axios
 * @param data
 */
export let queryselect = axios => axios.get('/brandcat/query');
/**
 * 查询所有分类
 * @param axios
 * @param data
 */
export let allCategories = (axios, data) => axios.post('/productcat/query', data);
/**
 * 查询单个分类
 * @param axios
 * @param data
 */
export let singleClassification = (axios, data) => axios.post('/productcat/querybyid', data);
/**
 * 修改单个分类  添加单个分类
 * @param axios
 * @param data
 */
export let modifiedCategories = (axios, data) => axios.post('/productcat/add', data);
/**
 * 删除分类
 * @param axios
 * @param data
 */
export let deleteCategories = (axios, data) => axios.post('/productcat/del', data);
// ============================================= product 接口结束 ==========================================
