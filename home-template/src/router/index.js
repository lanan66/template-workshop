import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue'
import login from '../views/account/login.vue';

Vue.use(VueRouter)

const routes = [
	// 主页ss
	{
		path: '/',
		name: 'index',
		component: index
	},
	// 登录
	{
		path: '/account/login',
		name: 'login',
		component: login
	},
	// 忘记密码
	{
		path: '/account/forgot',
		name: 'forgot',
		component: () => import('../views/account/forgot.vue')
	},
	// 注册账号
	{
		path: '/account/register',
		name: 'register',
		component: () => import('../views/account/register.vue')
	},
	// 媒体图片
	{
		path: '/media/image',
		name: 'media_image',
		component: () => import('../views/media/image.vue')
	},
	// 音乐
	{
		path: '/media/music',
		name: 'media_music',
		component: () => import('../views/media/music.vue')
	},
	// 媒体视频
	{
		path: '/media/video',
		name: 'media_video',
		component: () => import('../views/media/video.vue')
	},
	// 媒体视频
	{
		path: '/user_center/index',
		name: 'user_center_index',
		component: () => import('../views/user_center/index.vue')
	},
	// 文章路由
	{
		path: '/article/list',
		name: 'article_list',
		component: () => import('../views/article/list.vue')
	},
	{
		path: '/article/details',
		name: 'article_details',
		component: () => import('../views/article/details.vue')
	},
	// 浏览网站
	// 收藏路由
	{
		path: '/user/collect',
		name: 'collect_list',
		component: () => import('../views/user/collect.vue')
	},

	// 论坛路由
	{
		path: '/forum/list',
		name: 'forum_list',
		component: () => import('../views/forum/list.vue')
	},

	{
		path: '/forum/details',
		name: 'forum_details',
		component: () => import('../views/forum/details.vue')
	},
	{
		path: '/forum/edit',
		name: 'forum_edit',
		component: () => import('../views/forum/edit.vue')
	},
	{
		path: '/forum/table',
		name: 'forum_table',
		component: () => import('../views/forum/table.vue')
	},
	{
		path: '/forum/view',
		name: 'forum_view',
		component: () => import('../views/forum/view.vue')
	},
	{
		path: '/comment/table',
		name: 'comment_table',
		component: () => import('../views/comment/table.vue')
	},
	{
		path: '/comment/view',
		name: 'comment_view',
		component: () => import('../views/comment/view.vue')
	},

	// 考试路由
	{
		path: '/exam/list',
		name: 'exam_list',
		component: () => import('../views/exam/list.vue')
	},

	{
		path: '/exam/details',
		name: 'exam_details',
		component: () => import('../views/exam/details.vue')
	},
	// 考试路由
	{
		path: '/exam/table',
		name: 'exam_table',
		component: () => import('../views/exam/table.vue')
	},
	{
		path: '/exam/view',
		name: 'exam_view',
		component: () => import('../views/exam/view.vue')
	},
		// 考试路由
	{
		path: '/subject_exam/list',
		name: 'exam_list',
		component: () => import('../views/subject_exam/list.vue')
	},
	{
		path: '/subject_exam/details',
		name: 'exam_details',
		component: () => import('../views/subject_exam/details.vue')
	},
	

	// 商品路由
	{
		path: '/goods/list',
		name: 'goods_list',
		component: () => import('../views/goods/list.vue')
	},
	{
		path: '/goods/details',
		name: 'goods_details',
		component: () => import('../views/goods/details.vue')
	},
	{
		path: '/pay/detail',
		name: 'pay_detail',
		component: () => import('../views/pay/details.vue')
	},
	// 购物车路由
	{
		path: '/cart/list',
		name: 'cart_list',
		component: () => import('../views/cart/list.vue')
	},
	// 订单路由
	{
		path: '/order/list',
		name: 'order_list',
		component: () => import('../views/order/list.vue')
	},
	{
		path: '/order/details',
		name: 'order_details',
		component: () => import('../views/order/details.vue')
	},
		// 物流配送表格路由
	{
		path: '/logistics_delivery/table',
		name: '/logistics_delivery_table',
		component: () => import('../views/logistics_delivery/table.vue')
	},
	// 物流配送详情路由
	{
		path: '/logistics_delivery/view',
		name: '/logistics_delivery_view',
		component: () => import('../views/logistics_delivery/view.vue')
	},
	// 收货地址路由
	{
		path: '/user/address',
		name: 'address',
		component: () => import('../views/user/address.vue')
	},
	{
		path: '/user/address_edit',
		name: 'address_edit',
		component: () => import('../views/user/address_edit.vue')
	},
	
	 // 留言路由
	 {
	 	path: '/message/list',
	 	name: 'message_list',
	 	component: () => import('../views/message/list.vue')
	 },
	 {
		path: '/message/edit',
		name: 'message_edit',
		component: () => import('../views/message/edit.vue')
	 },
	// 留言板路由
	{
		path: '/message/table',
		name: 'message_table',
		component: () => import('../views/message/table.vue')
	},
	{
		path: '/message/view',
		name: 'message_view',
		component: () => import('../views/message/view.vue')
	},

	// 公告路由
	{
		path: '/notice/list',
		name: 'notice_list',
		component: () => import('../views/notice/list.vue')
	},
	{
		path: '/notice/details',
		name: 'notice_details',
		component: () => import('../views/notice/details.vue')
	},
	// 章节路由
	{
		path: '/novel_chapters/table',
		name: 'novel_chapters_table',
		component: () => import('../views/novel_chapters/table.vue')
	},
	{
		path: '/novel_chapters/view',
		name: 'novel_chapters_view',
		component: () => import('../views/novel_chapters/view.vue')
	},
	{
		path: '/novel_chapters/read',
		name: 'novel_chapters_read',
		component: () => import('../views/novel_chapters/read.vue')
	},
	// 测试
	{
		path: '/web/index',
		name: 'web_index',
		component: () => import('../views/web/index.vue')
	},
	// 商城用户表格路由
	{
		path: '/mall_users/table',
		name: '/mall_users_table',
		component: () => import('../views/mall_users/table.vue')
	},
	// 商城用户详情路由
	{
		path: '/mall_users/view',
		name: '/mall_users_view',
		component: () => import('../views/mall_users/view.vue')
	},
	
	
		// 卖家表格路由
	{
		path: '/seller/table',
		name: '/seller_table',
		component: () => import('../views/seller/table.vue')
	},
	// 卖家详情路由
	{
		path: '/seller/view',
		name: '/seller_view',
		component: () => import('../views/seller/view.vue')
	},
	
	
		// 商城中心表格路由
	{
		path: '/mall_center/table',
		name: '/mall_center_table',
		component: () => import('../views/mall_center/table.vue')
	},
	// 商城中心详情路由
	{
		path: '/mall_center/view',
		name: '/mall_center_view',
		component: () => import('../views/mall_center/view.vue')
	},
	
		// 商城中心列表路由
	{
		path: '/mall_center/list',
		name: '/mall_center_list',
		component: () => import('../views/mall_center/list.vue')
	},
	
		// 商城中心详情路由
	{
		path: '/mall_center/details',
		name: '/mall_center_details',
		component: () => import('../views/mall_center/details.vue')
	},
		// 定制商品表格路由
	{
		path: '/customized_products/table',
		name: '/customized_products_table',
		component: () => import('../views/customized_products/table.vue')
	},
	// 定制商品详情路由
	{
		path: '/customized_products/view',
		name: '/customized_products_view',
		component: () => import('../views/customized_products/view.vue')
	},
	
		// 定制商品列表路由
	{
		path: '/customized_products/list',
		name: '/customized_products_list',
		component: () => import('../views/customized_products/list.vue')
	},
	
		// 定制商品详情路由
	{
		path: '/customized_products/details',
		name: '/customized_products_details',
		component: () => import('../views/customized_products/details.vue')
	},
		// 我要定制表格路由
	{
		path: '/i_want_to_customize/table',
		name: '/i_want_to_customize_table',
		component: () => import('../views/i_want_to_customize/table.vue')
	},
	// 我要定制详情路由
	{
		path: '/i_want_to_customize/view',
		name: '/i_want_to_customize_view',
		component: () => import('../views/i_want_to_customize/view.vue')
	},
		// 我要定制添加路由
	{
		path: '/i_want_to_customize/edit',
		name: '/i_want_to_customize_edit',
		component: () => import('../views/i_want_to_customize/edit.vue')
	},
	
		// 我要定制列表路由
	{
		path: '/i_want_to_customize/list',
		name: '/i_want_to_customize_list',
		component: () => import('../views/i_want_to_customize/list.vue')
	},
	
		// 分类信息表格路由
	{
		path: '/classification_information/table',
		name: '/classification_information_table',
		component: () => import('../views/classification_information/table.vue')
	},
	// 分类信息详情路由
	{
		path: '/classification_information/view',
		name: '/classification_information_view',
		component: () => import('../views/classification_information/view.vue')
	},
		// 分类信息添加路由
	{
		path: '/classification_information/edit',
		name: '/classification_information_edit',
		component: () => import('../views/classification_information/edit.vue')
	},
	
		// 分类信息列表路由
	{
		path: '/classification_information/list',
		name: '/classification_information_list',
		component: () => import('../views/classification_information/list.vue')
	},
	
		// 网站公告表格路由
	{
		path: '/website_announcement/table',
		name: '/website_announcement_table',
		component: () => import('../views/website_announcement/table.vue')
	},
	// 网站公告详情路由
	{
		path: '/website_announcement/view',
		name: '/website_announcement_view',
		component: () => import('../views/website_announcement/view.vue')
	},
	
		// 网站公告列表路由
	{
		path: '/website_announcement/list',
		name: '/website_announcement_list',
		component: () => import('../views/website_announcement/list.vue')
	},
	
		// 网站公告详情路由
	{
		path: '/website_announcement/details',
		name: '/website_announcement_details',
		component: () => import('../views/website_announcement/details.vue')
	},
		// 热卖图书表格路由
	{
		path: '/hot_selling_books/table',
		name: '/hot_selling_books_table',
		component: () => import('../views/hot_selling_books/table.vue')
	},
	// 热卖图书详情路由
	{
		path: '/hot_selling_books/view',
		name: '/hot_selling_books_view',
		component: () => import('../views/hot_selling_books/view.vue')
	},
	
		// 热卖图书列表路由
	{
		path: '/hot_selling_books/list',
		name: '/hot_selling_books_list',
		component: () => import('../views/hot_selling_books/list.vue')
	},
	
		// 热卖图书详情路由
	{
		path: '/hot_selling_books/details',
		name: '/hot_selling_books_details',
		component: () => import('../views/hot_selling_books/details.vue')
	},
	
	// 用户路由
	{
		path: '/user/index',
		name: 'user_index',
		component: () => import('../views/user/index.vue')
	},
	// 基本信息
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue')
	},
	// 找回密码
	{
		path: '/user/password',
		name: 'user_password',
		component: () => import('../views/user/password.vue')
	},

	// 搜索
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/search/index.vue')
	},
	// 局部搜索
	{
		path: '/search/details',
		name: 'search_details',
		component: () => import('../views/search/details.vue')
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.afterEach((to, from, next) => {
	let title = "该项目为测试项目（用于演示或测试）-home";
	document.title = title;
	document.logo = "该项目为测试项目（用于演示或测试）"
})

export default router
