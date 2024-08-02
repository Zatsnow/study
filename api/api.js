import request, { post, get } from "@/utils/request";

// export function products(params) {
//     return request({
//       url: "/api/v1/products",  //接口路径
//       method: "get",  //接口方法
//       headers: { 'Content-Type': 'multipart/form-data' }, //给接口添加请求头
//       params  //接口参数
//     });
// }

//-------------------------------登陆---------------------------------------
// 登陆
export const login = (params) => post("/login",params)
//登出
export const logout = () => get("/login/logout")
//修改密码
export const changePassword = (params) => post("/user/changePassword",params)

//-------------------------------上传---------------------------------------
// 上传图片
export const uploadImage = (params) => post("/common/uploadImage",params)
// 上传文件
export const uploadFile = (params) => post("/common/uploadFile",params)

//-------------------------------部门---------------------------------------
// 查询部门
export const getDeptList = (params) => post('/dept/getDeptList',params)
// 新增部门
export const saveDept = (params) => post('/dept/saveDept',params)
// 根据id查询部门
export const getById = (params) => get('/dept/getById',params)
//更新部门
export const editDept = (params) => post("/dept/editDept",params)
//删除部门
export const removeDept = (params) => get("/dept/removeDept",params)

//-------------------------------菜单---------------------------------------
// 查询菜单
export const getMenuList = (params) => post("/menu/getMenuList",params)
//保存菜单
export const saveMenu = (params) => post("/menu/saveMenu",params)
//更新菜单
export const editMenu = (params) => post("/menu/editMenu",params)
//删除菜单
export const removeMenu = (params) => get("/menu/removeMenu",params)
//根据id查询菜单
export const getMenuById = (params) => get("/menu/getById",params)
//根据用户获取菜单权限
export const getMenuByUser = () => get("/menu/getMenuByUser")

//-------------------------------岗位---------------------------------------
// 查询岗位
export const getPostPage = (params) => post("/post/getPostPage",params)
//岗位列表
export const getPostList = (params) => post("/post/getPostList",params)
//保存岗位
export const savePost = (params) => post("/post/savePost",params)
//更新岗位
export const editPost = (params) => post("/post/editPost",params)
//删除岗位
export const removePost = (params) => get("/post/removePost",params)
//根据id查询岗位
export const getPostById = (params) => get("/post/getPostById",params)

//-------------------------------角色---------------------------------------
// 查询角色
export const getRolePage = (params) => post("/role/getRolePage",params)
//查询角色列表
export const getRoleList = (params) => post("/role/getRoleList",params)
//根据id获取角色
export const getRoleById = (params) => get("/role/getRoleById",params)
//保存角色
export const saveRole = (params) => post("/role/saveRole",params)
//更新角色
export const editRole = (params) => post("/role/editRole",params)
//删除角色
export const removeRole = (params) => get("/role/removeRole",params)

//-------------------------------用户---------------------------------------
// 查询用户
export const getUserPage = (params) => post("/user/getUserPage",params)
//根据id查询用户
export const getUserById = (params) => get("/user/getUserById",params)
//保存用户
export const saveUser = (params) => post("/user/saveUser",params)
//更新用户
export const editUser = (params) => post("/user/editUser",params)
//删除用户
export const removeUser = (params) => get("/user/removeUser",params)
//重置密码
export const resetPassword = (params) => post("/user/resetPassword",params)
//获取登陆用户信息
export const getUser = () => get("/user/getUserInfo")
//修改个人信息
export const setUserInfo = (params) => post("/user/setUserInfo",params)
//修改个人头像
export const setUserAvatar = (params) => get("/user/setUserAvatar",params)
//验证密码
export const verPassword = (params) => get("/login/verPassword",params)
//根据类型获取用户列表
export const getUserListByType = (params) => get("/user/getUserListByType",params)

//-------------------------------参数---------------------------------------
// 查询参数
export const getParamPage = (params) => post("/param/getParamPage",params)
// 根据id查询参数
export const getParamById = (params) => get("/param/getById",params)
//保存参数
export const saveParam = (params) => post("/param/saveParam",params)
//更新参数
export const editParam = (params) => post("/param/editParam",params)
//删除参数
export const removeParam = (params) => get("/param/removeParam",params)

//-------------------------------公告---------------------------------------
// 查询公告
export const getAccountPage = (params) => post("/account/getAccountPage",params)
// 根据id查询公告
export const getAccountById = (params) => get("/account/getById",params)
// 保存公告
export const saveAccount = (params) => post("/account/saveAccount",params)
// 编辑公告
export const editAccount = (params) => post("/account/editAccount",params)
//删除公告
export const removeAccount = (params) => get("/account/removeAccount",params)

//-------------------------------日志---------------------------------------
// 查询登陆日志
export const getLogPage = (params) => post("/loginLog/getLogPage",params)
// 删除登陆日志
export const removeLog = (params) => get("/loginLog/removeLog",params)
// 清空登陆日志
export const clearLog = () => get("/loginLog/clearLog")
// 查询操作日志
export const getOperLogPage = (params) => post("/operLog/getLogPage",params)
// 删除操作日志
export const removeOperLog = (params) => get("/operLog/removeLog",params)
// 清空操作日志
export const clearOperLog = () => get("/operLog/clearLog")

//-------------------------------字典---------------------------------------
// 查询字典
export const getDictPage = (params) => post("/dict/getDictPage",params)
// 根据id获取字典
export const getDictById = (params) => get("/dict/getDictById",params)
// 保存字典
export const saveDict = (params) => post("/dict/saveDict",params)
// 编辑字典
export const editDict = (params) => post("/dict/editDict",params)
// 删除字典
export const removeDict = (params) => get("/dict/removeDict",params)
// 根据编码获取字典数据
export const getDictByCode = (params) => get("/dict/getDictByCode",params)
// 根据编码获取字典数据和标签获取值
export const getDictByCodeAndLabel = (params) => get("/dict/getDictByCodeAndLabel",params)
// 查询全部字典类型
export const getDictTypeList = () => get("/dict/getDictTypeList")

//-------------------------------代码生成---------------------------------------
// 查询代码生成列表
export const getGenPage = (params) => post("/genTable/getGenPage",params)
// 根据id获取代码生成
export const getGenById = (params) => get("/genTable/getGenById",params)
// 保存代码生成
export const saveGen = (params) => get("/genTable/saveGen",params)
// 编辑代码生成
export const editGen = (params) => post("/genTable/editGen",params)
// 删除代码生成
export const removeGen = (params) => get("/genTable/removeGen",params)
// 获取数据库表
export const getTables = (params) => post("/genTable/getTables",params)
// 同步生成表和字段
export const syncTableAndColumns = (params) => get("/genTable/syncTableAndColumns",params)
//预览
export const preview = (params) => get("/genTable/preview",params)

//-------------------------------学校表---------------------------------------
//查询学校表
export const getApeSchoolPage = (params) => post("/school/getApeSchoolPage",params)
//获取学校列表
export const getApeSchoolList = () => get("/school/getApeSchoolList")
//根据id查询学校表
export const getApeSchoolById = (params) => get("/school/getApeSchoolById",params)
//保存学校表
export const saveApeSchool = (params) => post("/school/saveApeSchool",params)
//更新学校表
export const editApeSchool = (params) => post("/school/editApeSchool",params)
//删除ApeSchool
export const removeApeSchool = (params) => get("/school/removeApeSchool",params)

//-------------------------------专业表---------------------------------------
//查询专业表
export const getApeMajorPage = (params) => post("/major/getApeMajorPage",params)
//获取专业列表
export const getApeMajorList = () => get("/major/getApeMajorList")
//根据id查询专业表
export const getApeMajorById = (params) => get("/major/getApeMajorById",params)
//保存专业表
export const saveApeMajor = (params) => post("/major/saveApeMajor",params)
//更新专业表
export const editApeMajor = (params) => post("/major/editApeMajor",params)
//删除ApeMajor
export const removeApeMajor = (params) => get("/major/removeApeMajor",params)

//-------------------------------留言表---------------------------------------
//查询留言表
export const getApeMessagePage = (params) => post("/message/getApeMessagePage",params)
//根据id查询留言表
export const getApeMessageById = (params) => get("/message/getApeMessageById",params)
//保存留言表
export const saveApeMessage = (params) => post("/message/saveApeMessage",params)
//更新留言表
export const editApeMessage = (params) => post("/message/editApeMessage",params)
//删除ApeMessage
export const removeApeMessage = (params) => get("/message/removeApeMessage",params)

//-------------------------------课程---------------------------------------
//查询课程
export const getApeTaskPage = (params) => post("/task/getApeTaskPage",params)
//查询课程列表
export const getApeTaskList = (params) => get("/task/getApeTaskList",params)
//根据id查询课程
export const getApeTaskById = (params) => get("/task/getApeTaskById",params)
//保存课程
export const saveApeTask = (params) => post("/task/saveApeTask",params)
//更新课程
export const editApeTask = (params) => post("/task/editApeTask",params)
//删除ApeTask
export const removeApeTask = (params) => get("/task/removeApeTask",params)

//-------------------------------分类---------------------------------------
//查询分类
export const getApeClassificationPage = (params) => post("/classification/getApeClassificationPage",params)
//获取分类列表
export const getApeClassificationList = () => get("/classification/getApeClassificationList")
//根据id查询分类
export const getApeClassificationById = (params) => get("/classification/getApeClassificationById",params)
//保存分类
export const saveApeClassification = (params) => post("/classification/saveApeClassification",params)
//更新分类
export const editApeClassification = (params) => post("/classification/editApeClassification",params)
//删除ApeClassification
export const removeApeClassification = (params) => get("/classification/removeApeClassification",params)

//-------------------------------章节---------------------------------------
//查询章节
export const getApeChapterPage = (params) => post("/chapter/getApeChapterPage",params)
//根据id查询章节
export const getApeChapterById = (params) => get("/chapter/getApeChapterById",params)
//保存章节
export const saveApeChapter = (params) => post("/chapter/saveApeChapter",params)
//更新章节
export const editApeChapter = (params) => post("/chapter/editApeChapter",params)
//删除ApeChapter
export const removeApeChapter = (params) => get("/chapter/removeApeChapter",params)

//-------------------------------作业---------------------------------------
//查询作业
export const getApeHomeworkPage = (params) => post("/homework/getApeHomeworkPage",params)
//根据id查询作业
export const getApeHomeworkById = (params) => get("/homework/getApeHomeworkById",params)
//保存作业
export const saveApeHomework = (params) => post("/homework/saveApeHomework",params)
//更新作业
export const editApeHomework = (params) => post("/homework/editApeHomework",params)
//删除ApeHomework
export const removeApeHomework = (params) => get("/homework/removeApeHomework",params)

//-------------------------------笔记---------------------------------------
//查询笔记
export const getApeArticlePage = (params) => post("/article/getApeArticlePage",params)
//根据id查询笔记
export const getApeArticleById = (params) => get("/article/getApeArticleById",params)
//保存笔记
export const saveApeArticle = (params) => post("/article/saveApeArticle",params)
//更新笔记
export const editApeArticle = (params) => post("/article/editApeArticle",params)
//删除ApeArticle
export const removeApeArticle = (params) => get("/article/removeApeArticle",params)

//-------------------------------考试---------------------------------------
//查询考试
export const getApeTestPage = (params) => post("/test/getApeTestPage",params)
//根据id查询考试
export const getApeTestById = (params) => get("/test/getApeTestById",params)
//保存考试
export const saveApeTest = (params) => post("/test/saveApeTest",params)
//更新考试
export const editApeTest = (params) => post("/test/editApeTest",params)
//删除ApeTest
export const removeApeTest = (params) => get("/test/removeApeTest",params)

//-------------------------------考试题目---------------------------------------
//查询考试题目
export const getApeTestItemPage = (params) => post("/item/getApeTestItemPage",params)
//根据id查询考试题目
export const getApeTestItemById = (params) => get("/item/getApeTestItemById",params)
//保存考试题目
export const saveApeTestItem = (params) => post("/item/saveApeTestItem",params)
//更新考试题目
export const editApeTestItem = (params) => post("/item/editApeTestItem",params)
//删除ApeTestItem
export const removeApeTestItem = (params) => get("/item/removeApeTestItem",params)

//-------------------------------课程报名---------------------------------------
//查询课程报名
export const getApeTaskStudentPage = (params) => post("/student/getApeTaskStudentPage",params)
//根据id查询课程报名
export const getApeTaskStudentById = (params) => get("/student/getApeTaskStudentById",params)
//保存课程报名
export const saveApeTaskStudent = (params) => post("/student/saveApeTaskStudent",params)
//更新课程报名
export const editApeTaskStudent = (params) => post("/student/editApeTaskStudent",params)
//删除ApeTaskStudent
export const removeApeTaskStudent = (params) => get("/student/removeApeTaskStudent",params)

//-------------------------------课程评论---------------------------------------
//查询课程评论
export const getApeTaskCommentPage = (params) => post("/comment/getApeTaskCommentPage",params)
//根据id查询课程评论
export const getApeTaskCommentById = (params) => get("/comment/getApeTaskCommentById",params)
//保存课程评论
export const saveApeTaskComment = (params) => post("/comment/saveApeTaskComment",params)
//更新课程评论
export const editApeTaskComment = (params) => post("/comment/editApeTaskComment",params)
//删除ApeTaskComment
export const removeApeTaskComment = (params) => get("/comment/removeApeTaskComment",params)

//-------------------------------笔记评论---------------------------------------
//查询笔记评论
export const getApeArticleCommentPage = (params) => post("/articleComment/getApeArticleCommentPage",params)
//根据id查询笔记评论
export const getApeArticleCommentById = (params) => get("/articleComment/getApeArticleCommentById",params)
//保存笔记评论
export const saveApeArticleComment = (params) => post("/articleComment/saveApeArticleComment",params)
//更新笔记评论
export const editApeArticleComment = (params) => post("/articleComment/editApeArticleComment",params)
//删除ApeArticleComment
export const removeApeArticleComment = (params) => get("/articleComment/removeApeArticleComment",params)
//获取作业完成标志
export const getHomeworkStudentFlag = (params) => get("/student/getHomeworkStudentFlag",params)
//获取学生
export const getTaskStudentPage = (params) => post("/student/getTaskStudentPage",params)
//获取阅卷列表
export const getTestStudent = (params) => post("/test/getTestStudent",params)
//获取阅卷题目
export const getTestStudentItem = (params) => get("/student/getTestStudentItem",params)
//修改阅卷内容
export const editApeTestStudent = (params) => post("/student/editApeTestStudent",params)
//获取学生学习情况
export const getAdoptTaskStudent = (params) => post("/student/getAdoptTaskStudent",params)
export const getIndexData = (params) => get("/index/getIndexData",params)
export const getIndexSexData = (params) => get("/index/getIndexSexData",params)
export const getTaskChart = (params) => get("/index/getTaskChart",params)
export const getTaskIndexList = (params) => get("/index/getTaskIndexList",params)
//获取教师课程列表
export const getApeTaskByTeacherId = (params) => get("/task/getApeTaskByTeacherId",params)

//-------------------------------论坛---------------------------------------
//查询论坛
export const getApeForumPage = (params) => post("/forum/getApeForumPage",params)
//根据id查询论坛
export const getApeForumById = (params) => get("/forum/getApeForumById",params)
//保存论坛
export const saveApeForum = (params) => post("/forum/saveApeForum",params)
//更新论坛
export const editApeForum = (params) => post("/forum/editApeForum",params)
//删除ApeForum
export const removeApeForum = (params) => get("/forum/removeApeForum",params)

//-------------------------------论坛讨论---------------------------------------
//查询论坛讨论
export const getApeForumItemPage = (params) => post("/item/getApeForumItemPage",params)
//根据id查询论坛讨论
export const getApeForumItemById = (params) => get("/item/getApeForumItemById",params)
//保存论坛讨论
export const saveApeForumItem = (params) => post("/item/saveApeForumItem",params)
//更新论坛讨论
export const editApeForumItem = (params) => post("/item/editApeForumItem",params)
//删除ApeForumItem
export const removeApeForumItem = (params) => get("/item/removeApeForumItem",params)

//-------------------------------答疑---------------------------------------
//查询答疑
export const getApeQuestionPage = (params) => post("/question/getApeQuestionPage",params)
//根据id查询答疑
export const getApeQuestionById = (params) => get("/question/getApeQuestionById",params)
//保存答疑
export const saveApeQuestion = (params) => post("/question/saveApeQuestion",params)
//更新答疑
export const editApeQuestion = (params) => post("/question/editApeQuestion",params)
//删除ApeQuestion
export const removeApeQuestion = (params) => get("/question/removeApeQuestion",params)
//导出成绩
export const getTestStudentExport = (params) => post("/test/getTestStudentExport",params)
//点评作业
export const dianping = (params) => post("/student/dianping",params)