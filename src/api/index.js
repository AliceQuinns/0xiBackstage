// 目前测试环境下需要给每个接口前面加个前缀 ，打包时要去掉
/**
 * 获取首页个人信息
 * @param axios
 */
export let getManagerInfo = axios => axios.get('/api/getSession');
/**
 * 退出登录
 * @param axios
 * @param data sessionId
 */
// export let logout = (axios, data) => axios.post('/api/logout', data);
export let logout = axios => axios.get('/api/logout');
// ============================================== settings 接口开始 =====================================
/**
 * 增加权限组
 * @param axios
 * @param data
 */
export let addUserGroup = (axios, data) => axios.post('/api/shscAdminGroupAdd', data);
/**
 * 获取管理权限组
 * @param axios
 */
export let getGroupList = axios => axios.get(`/api/shscAdminGroupList`);
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
export let getGroupInfo = (axios, userid) => axios.get(`/api/shscAdminGroupId?userid=${userid}`);
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
 * @param data
 */
export let deleteUser = (axios, data) => axios.post('/api/shscAdminDelete', data);
/**
 * 获取增加管理员页面下拉框的数据
 * @param axios
 */
export let getOptionsData = axios => axios.get(`/api/shscAdminInsert`);
/**
 * 增加管理员
 * @param axios
 * @param data
 */
export let addUser = (axios, data) => axios.post('/api/shscAdminAdd', data);
/**
 * 编辑管理员 提交
 * @param axios
 * @param data
 */
export let editUser = (axios, data) => axios.post('/api/shscAdminModify', data);
/**
 * 获取管理员信息
 * @param axios
 * @param id
 */
export let getUserInfo = (axios, userid) => axios.get(`/api/shscAdminInsert?userid=${userid}`);
/**
 * 获取热门关键词
 * @param axios
 * @param search
 */
export let getHotKeywords = (axios, search) => axios.get(`/api/shscSearchWordList${search}`);
/**
 * 增加热门关键词
 * @param axios
 * @param data
 */
export let addHotKeyword = (axios, data) => axios.post('/api/shscSearchWordAdd', data);
/**
 * 删除热门关键词
 * @param axios
 * @param data
 */
export let deleteHotKeyword = (axios, data) => axios.post('/api/shscSearchWordDelete', data);
/**
 * 获取疯狂抢购和热卖商品
 * @param axios
 * @param search
 */
export let getIndexContent = (axios, search) => axios.get(`/api/product/ph${search}`);
/**
 * 增加疯狂抢购和热卖商品
 * @param axios
 * @param data type类型传0就可以删除
 */
export let addIndexContent = (axios, data) => axios.post('/api/product/shp', data);
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
export let getOneShopLevel = (axios, id) => axios.get(`/api/shscShopGradeListId?id=${id}`);
/**
 * 删除店铺等级
 * @param axios
 * @param data
 */
export let deleteShopLevel = (axios, data) => axios.post('/api/shscShopGradeDelete', data);
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
export let getAllShopInfo = (axios, search) => axios.get(`/api/shscShopList${search}`);
/**
 * 获取店铺的分类信息
 * @param axios
 */
export let getShopType = axios => axios.get('/api/shscShopCat');
/**
 * 获取分销店铺的信息
 * @param axios
 * @param userid
 */
export let getDistributionInfo = (axios, userid) => axios.get(`/api/shscDistributionShopId?userid=${userid}`);
/**
 * 查询商家店铺的信息
 * @param axios
 * @param userid
 */
export let getShopInfo = (axios, userid) => axios.get(`/api/shscShopId?userid=${userid}`);
/**
 * 编辑分销店铺
 * @param axios
 * @param data
 */
export let editDist = (axios, data) => axios.post('/api/shscDistributionShopModify', data);
/**
 * 编辑商家店铺
 * @param axios
 * @param data
 */
export let editNormal = (axios, data) => axios.post('/api/shscShopModify', data);
/**
 * 店铺管理删除店铺
 * @param axios
 * @param data
 */
export let deleteShop = (axios, data) => axios.post('/api/shscShopDelete', data);
/**
 * 获取分销店铺的信息
 * @param axios
 * @param search
 */
export let getAllDistInfo = (axios, search) => axios.get(`/api/shscDistributionShopManagerList${search}`);
/**
 * 获取所有的商家店铺信息
 * @param axios
 * @param search
 * @param shop_statu=-1 可查询已关店铺
 */
export let getAllNormalInfo = (axios, search) => axios.get(`/api/shscShopManagerList${search}`);
/**
 * 获取所有的申请店铺信息
 * @param axios
 * @param search
 */
export let getAllApplyInfo = (axios, search) => axios.get(`/api/applyShopList${search}`);
/**
 * 修改申请店铺的状态
 * @param axios
 * @param data
 */
export let editApplyStatus = (axios, data) => axios.post('/api/applyShopModify', data);
/**
 * 获取所有的店铺分类
 * @param axios
 */
export let getAllCates = axios => axios.get(`/api/shscShopCatList`);
/**
 * 删除店铺分类
 * @param axios
 * @param data
 */
export let deleteCate = (axios, data) => axios.post('/api/shscShopCatDelete', data);
/**
 * 增加修改分类
 * @param axios
 * @param data
 */
export let modifyNAddCate = (axios, data) => axios.post('/api/shscShopCatAddOrModify', data);
/**
 * 获取店铺模板
 * @param axios
 */
export let getShopTemplate = axios => axios.get('/api/shscShopTemplateSelectAll');
/**
 * 增加店铺模块
 * @param axios
 * @param data
 */
export let addStoreModule = (axios, data) => axios.post('/api/shscShopTemplateAdd', data);
/**
 * 修改店铺模板
 * @param axios
 * @param data
 */
export let modifyStoreModule = (axios, data) => axios.post('/api/shscShopTemplateUpdate', data);
/**
 * 删除店铺模板
 * @param axios
 * @param data
 */
export let deleteShopTemplate = (axios, data) => axios.post(`/api/shscShopTemplateDelete`,data);
/**
 * 查询店铺手机端模板
 * @param axios
 * @param data
 */
export let getShopTemplateMobile = axios => axios.get('/api/shscShopSjTemplateSelectAll');
/**
 * 删除店铺手机端模板
 * @param axios
 * @param data
 */
export let deleteShopTemplateMobile = (axios, data) => axios.post(`/api/shscShopSjTemplateDelete`,data);
/**
 * 增加店铺手机端模板
 * @param axios
 * @param data
 */
export let addStoreModuleMobile = (axios, data) => axios.post('/api/shscShopSjTemplateAdd', data);
/**
 * 修改店铺手机端模板
 * @param axios
 * @param data
 */
export let modifyStoreModuleMobile = (axios, data) => axios.post('/api/shscShopSjTemplateUpdate', data);
/**
 * 店铺新闻推荐位列表
 * @param axios
 * @param data
 */
export let getStoreNews = axios => axios.get('/api/shscSjTjWeiList');
/**
 * 删除店铺新闻推荐位
 * @param axios
 * @param data
 */
export let removeGetStoreNews = (axios, data) => axios.post('/api/shscSjTjWeiDelete', data);
/**
 * 增加或修改新闻推荐位
 * @param axios
 * @param data
 */
export let addgetStoreNews = (axios, data) => axios.post('/api/shscSjTjWeiAddORModify', data);
/**
 * 查询发货地址列表
 * @param axios
 * @param page
 */
export let goodsAddress = (axios, page) => axios.get(`/api/shscShippingAddressSelectAll?page=${page}`);
/**
 * 删除发货地址
 * @param axios
 * @param data
 */
export let deletegoodsAddress = (axios, data) => axios.post('/api/shscShippingAddressDelete', data);
/**
 * 查询最新活动用户预约
 * @param axios
 * @param data
 */
export let reservedUser = (axios, page) => axios.get(`/api/shscMemberMakeSelectAll?page=${page}`);
/**
 * 删除最新活动用户预约
 * @param axios
 * @param data
 */
export let deletereservedUser = (axios, data) => axios.post('/api/shscMemberMakeDelete', data);
// ============================================= shop 接口结束 ==========================================


// ============================================= member 接口开始 ==========================================
/**
 * 会员管理
 * @param axios
 * @param search
 */
export let getAllMember = (axios, search) => axios.get(`/api/shscMemberList${search}`);
/**
 * 删除会员
 * @param axios
 * @param data
 */
export let deleteMember = (axios, data) => axios.post('/api/shscMemberDelete', data);
/**
 * 用户通过审核
 * @param axios
 * @param data
 */
export let passMember = (axios, data) => axios.post('/api/alreadyCheck', data);
/**
 * 用户修改为待审核
 * @param axios
 * @param data
 */
export let unpassMember = (axios, data) => axios.post('/api/stayCheck', data);
/**
 * 禁止用户访问
 * @param axios
 * @param data
 */
export let blockMember = (axios, data) => axios.post('/api/banVisit', data);
/**
 * 查询收货地址列表
 * @param axios
 * @param page
 */
export let obtainAddress = (axios, page) => axios.get(`/api/deliveryAddressList?page=${page}`);
/**
 * 删除收货地址
 * @param axios
 * @param data
 */
export let deleteAddress = (axios, data) => axios.post('/api/deliveryAddressListDelete', data);
/**
 * 查询所有会员等级
 * @param axios
 * @param data
 */
export let membershipLevel = axios => axios.get('/api/memberGradeList');
/**
 * 获取单个会员等级
 * @param axios
 * @param id
 */
export let getOnemembershipLevel = (axios, id) => axios.get(`/api/memberGradeListId?id=${id}`);
/**
 * 删除会员等级
 * @param axios
 * @param data
 */
export let deletemembershipLevel = (axios, data) => axios.post('/api/memberGradeDeleteList', data);
/**
 * 增加会员等级
 * @param axios
 * @param data
 */
export let addmembershipLevel = (axios, data) => axios.post('/api/memberGradeAdd', data);
/**
 * 修改会员等级
 * @param axios
 * @param data
 */
export let modifymembershipLevel = (axios, data) => axios.post('/api/memberGradeUpdate', data);
// ============================================= member 接口结束 ==========================================


// ============================================= product 接口开始 ==========================================
/**
 * 产品列表查询商品
 * @param axios
 * @param data
 */
export let inquiryCommodity = (axios, search) => axios.get(`/api/product/query${search}`);
/**
 * 查询未审核的商品
 * @param axios
 * @param data
 */
export let notAudited = (axios, search) => axios.get(`/api/product/unaudited${search}`);
/**
 * 查询违规下架的商品
 * @param axios
 * @param data
 */
export let illegalDelivery = (axios, search) => axios.get(`/api/product/violate${search}`);
/**
 * 更新商品状态
 * @param axios
 * @param data
 */
export let updateStatus = (axios, data) => axios.post('/api/product/updateStatus', data);
/**
 * 单条删除商品
 * @param axios
 * @param data
 */
export let deleteProduct = (axios, data) => axios.post('/api/product/del', data);
/**
 * 查询单个商品
 * @param axios
 * @param data
 */
export let individualCommodity = (axios, data) => axios.post('/api/product/edit', data);
/**
 * 提交编辑表单
 * @param axios
 * @param data
 */
export let ditorialMember = (axios, data) => axios.post('/api/product/update', data);
/**
 * 查询所有商品的评论
 * @param axios
 * @param data
 */
export let productEvaluation = (axios, data) => axios.post('/api/product/comment', data);
/**
 * 查询单个商品的评论
 * @param axios
 * @param data
 */
export let singleEvaluation = (axios, data) => axios.post('/api/product/comment', data);
/**
 * 删除商品评论
 * @param axios
 * @param data
 */
export let deletesingleEvaluation = (axios, data) => axios.post('/api/productcomment/del', data);
/**
 * 查询所有商品的咨询
 * @param axios
 * @param data
 */
export let consultations = (axios, data) => axios.post('/api/product/consult', data);
/**
 * 删除商品咨询
 * @param axios
 * @param data
 */
export let deleteconsultations = (axios, data) => axios.post('/api/productconsult/del', data);
/**
 * 查询多个品牌 查询单个品牌
 * @param axios
 * @param data
 */
export let queryBrand = (axios, data) => axios.post('/api/brand/query', data);
/**
 * 添加品牌 修改品牌
 * @param axios
 * @param data
 */
export let addQueryBrand = (axios, data) => axios.post('/api/brand/add', data);
/**
 * 修改品牌状态
 * @param axios
 * @param data
 */
export let modifyState = (axios, data) => axios.post('/api/brand/updatebrandstatus', data);
/**
 * 修改品牌排序值
 * @param axios
 * @param data
 */
export let modifySort = (axios, data) => axios.post('/api/brand/updateiddo', data);
/**
 * 删除品牌
 * @param axios
 * @param data
 */
export let deleteQueryBrand = (axios, data) => axios.post('/api/brand/del', data);
/**
 * 获取下拉菜单选项
 * @param axios
 * @param data
 */
export let queryselect = axios => axios.get('/api/brandcat/query');
/**
 * 查询所有分类
 * @param axios
 * @param data
 */
export let allCategories = (axios, data) => axios.post('/api/productcat/query', data);
/**
 * 查询单个分类
 * @param axios
 * @param data
 */
export let singleClassification = (axios, data) => axios.post('/api/productcat/querybyid', data);
/**
 * 修改单个分类  添加单个分类
 * @param axios
 * @param data
 */
export let modifiedCategories = (axios, data) => axios.post('/api/productcat/add', data);
/**
 * 删除分类
 * @param axios
 * @param data
 */
export let deleteCategories = (axios, data) => axios.post('/api/productcat/del', data);
// ============================================= product 接口结束 ==========================================
