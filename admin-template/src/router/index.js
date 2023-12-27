import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';
import login from '../views/login.vue';
import forgot from '../views/forgot.vue';
import register from '../views/register.vue';
Vue.use(VueRouter)

const routes = [
    // 主页
    {
        path: '/',
        name: 'index',
        component: index,
        meta: {
            index: 0,
            title: '首页'
        }
    },

    // 登录
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            index: 0,
            title: '登录'
        }
    },

            // 注册
        {
            path: '/register',
            name: 'register',
            component: register,
            meta: {
                index: 0,
                title: '注册'
            }
        },
    
    // 忘记密码
    {
        path: '/forgot',
        name: "forgot",
        component: forgot,
        meta: {
            index: 0,
            title: '忘记密码'
        }
    },

    // 修改密码
    {
        path: '/user/password',
        name: "password",
        component: () => import("../views/user/password.vue"),
        meta: {
            index: 0,
            title: '修改密码'
        }
    },

    // 视频播放页
    {
        path: "/media/video",
        name: "video",
        component: () => import('../views/media/video.vue'),
        meta: {
            index: 0,
            title: "视频"
        }
    },

    // 音频播放页
    {
        path: "/media/audio",
        name: "audio",
        component: () => import('../views/media/audio.vue'),
        meta: {
            index: 0,
            title: "音频"
        }
    },

            // 权限路由
        {
            path: '/auth/table',
            name: 'auth_table',
            component: () => import('../views/auth/table.vue'),
            meta: {
                index: 0,
                title: '权限列表'
            }
        },
        {
            path: '/auth/view',
            name: 'auth_view',
            component: () => import('../views/auth/view.vue'),
            meta: {
                index: 0,
                title: '权限详情'
            }
        },
    
    
                    // 友情链接路由
            {
                path: '/link/table',
                name: 'link_table',
                component: () => import('../views/link/table.vue'),
                meta: {
                    index: 0,
                    title: '链接列表'
                }
            },
            {
                path: '/link/view',
                name: 'link_view',
                component: () => import('../views/link/view.vue'),
                meta: {
                    index: 0,
                    title: '链接详情'
                }
            },
                // 轮播图路由
        {
            path: '/slides/table',
            name: 'slides_table',
            component: () => import('../views/slides/table.vue'),
            meta: {
                index: 0,
                title: '轮播图列表'
            }
        },
        {
            path: '/slides/view',
            name: 'slides_view',
            component: () => import('../views/slides/view.vue'),
            meta: {
                index: 0,
                title: '轮播图详情'
            }
        },
                    // 文章路由
            {
                path: '/article/table',
                name: 'article_table',
                component: () => import('../views/article/table.vue'),
                meta: {
                    index: 0,
                    title: '文章列表'
                }
            },
            {
                path: '/article/view',
                name: 'article_view',
                component: () => import('../views/article/view.vue'),
                meta: {
                    index: 0,
                    title: '文章详情'
                }
            },

            // 文章分类路由
            {
                path: '/article_type/table',
                name: 'article_type_table',
                component: () => import('../views/article_type/table.vue'),
                meta: {
                    index: 0,
                    title: '文章分类列表'
                }
            },
            {
                path: '/article_type/view',
                name: 'article_type_view',
                component: () => import('../views/article_type/view.vue'),
                meta: {
                    index: 0,
                    title: '文章分类详情'
                }
            },
                // 敏感词路由
        {
            path: '/sensitive_vocabulary/table',
            name: 'sensitive_vocabulary_table',
            component: () => import('../views/sensitive_vocabulary/table.vue'),
            meta: {
                index: 0,
                title: '敏感词列表'
            }
        },
        {
            path: '/sensitive_vocabulary/view',
            name: 'sensitive_vocabulary_view',
            component: () => import('../views/sensitive_vocabulary/view.vue'),
            meta: {
                index: 0,
                title: '敏感词详情'
            }
        },
                    // 广告路由
            {
                path: '/ad/table',
                name: 'ad_table',
                component: () => import('../views/ad/table.vue'),
                meta: {
                    index: 0,
                    title: '广告列表'
                }
            },
            {
                path: '/ad/view',
                name: 'ad_view',
                component: () => import('../views/ad/view.vue'),
                meta: {
                    index: 0,
                    title: '广告详情'
                }
            },
            
            // 留言板路由
        {
            path: '/message/table',
            name: 'message_table',
            component: () => import('../views/message/table.vue'),
            meta: {
                index: 0,
                title: '测试留言板列表'
            }
        },
        {
            path: '/message/view',
            name: 'message_view',
            component: () => import('../views/message/view.vue'),
            meta: {
                index: 0,
                title: '测试留言板详情'
            }
        },
    
            // 论坛路由
        {
            path: '/forum/table',
            name: 'forum_table',
            component: () => import('../views/forum/table.vue'),
            meta: {
                index: 0,
                title: '论坛列表'
            }
        },
        {
            path: '/forum/view',
            name: 'forum_view',
            component: () => import('../views/forum/view.vue'),
            meta: {
                index: 0,
                title: '论坛详情'
            }
        },

        // 论坛分类路由
        {
            path: '/forum_type/table',
            name: 'forum_type_table',
            component: () => import('../views/forum_type/table.vue'),
            meta: {
                index: 0,
                title: '论坛分类列表'
            }
        },
        {
            path: '/forum_type/view',
            name: 'forum_type_view',
            component: () => import('../views/forum_type/view.vue'),
            meta: {
                index: 0,
                title: '论坛分类详情'
            }
        },
    
            // 公告路由
        {
            path: '/notice/table',
            name: 'notice_table',
            component: () => import('../views/notice/table.vue'),
            meta: {
                index: 0,
                title: '关于我们列表'
            }
        },
        {
            path: '/notice/view',
            name: 'notice_view',
            component: () => import('../views/notice/view.vue'),
            meta: {
                index: 0,
                title: '关于我们详情'
            }
        },
                // 考试路由
        {
            path: '/exam/table',
            name: 'exam_table',
            component: () => import('../views/exam/table.vue'),
            meta: {
                index: 0,
                title: '考试管理'
            }
        },
        {
            path: '/exam/view',
            name: 'exam_view',
            component: () => import('../views/exam/view.vue'),
            meta: {
                index: 0,
                title: '考试详情'
            }
        },
        {
            path: '/question_table/table',
            name: 'question_table_table',
            component: () => import('../views/exam/question_table.vue'),
            meta: {
                index: 0,
                title: '题库列表'
            }
        },
        {
            path: '/question_view/view',
            name: 'question_view_view',
            component: () => import('../views/exam/question_view.vue'),
            meta: {
                index: 0,
                title: '题库详情'
            }
        },
        {
            path: '/answer_view/view',
            name: 'answer_view_view',
            component: () => import('../views/exam/answer_view.vue'),
            meta: {
                index: 0,
                title: '答题'
            }
        },
        {
            path: '/score_table/table',
            name: 'score_table_table',
            component: () => import('../views/exam/score_table.vue'),
            meta: {
                index: 0,
                title: '评分列表'
            }
        },
        {
            path: '/score_view/view',
            name: 'score_view_view',
            component: () => import('../views/exam/score_view.vue'),
            meta: {
                index: 0,
                title: '评分详情'
            }
        },
                // 科目模块-考试路由
        {
            path: '/exam_subject/exams_table',
            name: 'exam_table',
            component: () => import('../views/exam_subject/exams_table.vue'),
            meta: {
                index: 0,
                title: '考试管理'
            }
        },
        // 自动题库
        {
            path: '/exam_subject/genQuestion',
            name: 'exam_genQuestion',
            component: () => import('../views/exam_subject/genQuestion.vue'),
            meta: {
                index: 0,
                title: '自动题库'
            }
        },
        //科目模块-考试详情
        {
            path: '/exam_subject/exams_view',
            name: 'exam_view',
            component: () => import('../views/exam_subject/exams_view.vue'),
            meta: {
                index: 0,
                title: '考试详情'
            }
        },
        //科目列表
        {
            path: '/exam_subject/table',
            name: 'subject_table',
            component: () => import('../views/exam_subject/table.vue'),
            meta: {
                index: 0,
                title: '科目列表'
            }
        },
        //科目详情
        {
            path: '/exam_subject/view',
            name: 'subject_view',
            component: () => import('../views/exam_subject/view.vue'),
            meta: {
                index: 0,
                title: '科目详情'
            }
        },
        {
            path: '/exam_subject/exams_db',
            name: 'exams_db',
            component: () => import('../views/exam_subject/exams_db.vue'),
            meta: {
                index: 0,
                title: '试题库'
            }
        },
        {
            path: '/exam_subject/wrong_list',
            name: 'wrong_list',
            component: () => import('../views/exam_subject/wrong_list.vue'),
            meta: {
                index: 0,
                title: '错题记录'
            }
        },
        {
            path: '/exam_subject/exams_paper',
            name: 'exams_paper',
            component: () => import('../views/exam_subject/exams_paper.vue'),
            meta: {
                index: 0,
                title: '试卷列表'
            }
        },
        {
            path: '/exam_subject/answer_wrong_view',
            name: 'question_view',
            component: () => import('../views/exam_subject/answer_wrong_view.vue'),
            meta: {
                index: 0,
                title: '错题详情'
            }
        },
        {
            path: '/exam_subject/question_table',
            name: 'question_table_table',
            component: () => import('../views/exam_subject/question_table.vue'),
            meta: {
                index: 0,
                title: '题库列表'
            }
        },
        {
            path: '/exam_subject/question_view',
            name: 'question_view_view',
            component: () => import('../views/exam_subject/question_view.vue'),
            meta: {
                index: 0,
                title: '题库详情'
            }
        },

        {
            path: '/exam_subject/question_database_table',
            name: 'question_database_table',
            component: () => import('../views/exam_subject/question_database_table.vue'),
            meta: {
                index: 0,
                title: '题库列表'
            }
        },
        {
            path: '/exam_subject/question_database_view',
            name: 'question_database_view',
            component: () => import('../views/exam_subject/question_database_view.vue'),
            meta: {
                index: 0,
                title: '题库详情'
            }
        },
        //科目模块-答题
        {
            path: '/exam_subject/answer_view',
            name: 'answer_view_view',
            component: () => import('../views/exam_subject/answer_view.vue'),
            meta: {
                index: 0,
                title: '答题'
            }
        },
        //科目模块-评分列表
        {
            path: '/exam_subject/score_table',
            name: 'score_table_table',
            component: () => import('../views/exam_subject/score_table.vue'),
            meta: {
                index: 0,
                title: '评分列表'
            }
        },
        //科目模块-评分详情
        {
            path: '/exam_subject/score_view',
            name: 'score_view_view',
            component: () => import('../views/exam_subject/score_view.vue'),
            meta: {
                index: 0,
                title: '评分详情'
            }
        },
                {
            path: '/goods_type/table',
            name: 'goods_type_table',
            component: () => import('../views/goods_type/table.vue'),
            meta: {
                index: 0,
                title: '商品分类列表'
            }
        },
        {
            path: '/goods_type/view',
            name: 'goods_type_view',
            component: () => import('../views/goods_type/view.vue'),
            meta: {
                index: 0,
                title: '商品分类详情'
            }
        },

        // 订单路由
        {
            path: '/order/table',
            name: 'order_table',
            component: () => import('../views/order/table.vue'),
            meta: {
                index: 0,
                title: '订单列表'
            }
        },
        {
            path: '/order/view',
            name: 'order_view',
            component: () => import('../views/order/view.vue'),
            meta: {
                index: 0,
                title: '订单详情'
            }
        },
                // 订单配送路由
        {
            path: '/logistics_delivery/table',
            name: 'logistics_delivery_table',
            component: () => import('../views/logistics_delivery/table.vue'),
            meta: {
                index: 0,
                title: '订单配送列表'
            }
        },
        {
            path: '/logistics_delivery/view',
            name: 'logistics_delivery_view',
            component: () => import('../views/logistics_delivery/view.vue'),
            meta: {
                index: 0,
                title: '订单配送详情'
            }
        },
            
            // 评论路由
        {
            path: '/comment/table',
            name: 'comment_table',
            component: () => import('../views/comment/table.vue'),
            meta: {
                index: 0,
                title: '评论列表'
            }
        },
        {
            path: '/comment/view',
            name: 'comment_view',
            component: () => import('../views/comment/view.vue'),
            meta: {
                index: 0,
                title: '评论详情'
            }
        },
                // 章节路由
        {
            path: '/novel_chapters/table',
            name: 'novel_chapters_table',
            component: () => import('../views/novel_chapters/table.vue'),
            meta: {
                index: 0,
                title: '章节列表'
            }
        },
        {
            path: '/novel_chapters/view',
            name: 'novel_chapters_view',
            component: () => import('../views/novel_chapters/view.vue'),
            meta: {
                index: 0,
                title: '章节详情'
            }
        },
    
            // 商城用户路由
        {
            path: '/mall_users/table',
            name: 'mall_users_table',
            component: () => import('../views/mall_users/table.vue'),
            meta: {
                index: 0,
                title: '商城用户列表'
            }
        },
        {
            path: '/mall_users/view',
            name: 'mall_users_view',
            component: () => import('../views/mall_users/view.vue'),
            meta: {
                index: 0,
                title: '商城用户详情'
            }
        },
            // 卖家路由
        {
            path: '/seller/table',
            name: 'seller_table',
            component: () => import('../views/seller/table.vue'),
            meta: {
                index: 0,
                title: '卖家列表'
            }
        },
        {
            path: '/seller/view',
            name: 'seller_view',
            component: () => import('../views/seller/view.vue'),
            meta: {
                index: 0,
                title: '卖家详情'
            }
        },
            // 商城中心路由
        {
            path: '/mall_center/table',
            name: 'mall_center_table',
            component: () => import('../views/mall_center/table.vue'),
            meta: {
                index: 0,
                title: '商城中心列表'
            }
        },
        {
            path: '/mall_center/view',
            name: 'mall_center_view',
            component: () => import('../views/mall_center/view.vue'),
            meta: {
                index: 0,
                title: '商城中心详情'
            }
        },
            // 定制商品路由
        {
            path: '/customized_products/table',
            name: 'customized_products_table',
            component: () => import('../views/customized_products/table.vue'),
            meta: {
                index: 0,
                title: '定制商品列表'
            }
        },
        {
            path: '/customized_products/view',
            name: 'customized_products_view',
            component: () => import('../views/customized_products/view.vue'),
            meta: {
                index: 0,
                title: '定制商品详情'
            }
        },
            // 我要定制路由
        {
            path: '/i_want_to_customize/table',
            name: 'i_want_to_customize_table',
            component: () => import('../views/i_want_to_customize/table.vue'),
            meta: {
                index: 0,
                title: '我要定制列表'
            }
        },
        {
            path: '/i_want_to_customize/view',
            name: 'i_want_to_customize_view',
            component: () => import('../views/i_want_to_customize/view.vue'),
            meta: {
                index: 0,
                title: '我要定制详情'
            }
        },
            // 分类信息路由
        {
            path: '/classification_information/table',
            name: 'classification_information_table',
            component: () => import('../views/classification_information/table.vue'),
            meta: {
                index: 0,
                title: '分类信息列表'
            }
        },
        {
            path: '/classification_information/view',
            name: 'classification_information_view',
            component: () => import('../views/classification_information/view.vue'),
            meta: {
                index: 0,
                title: '分类信息详情'
            }
        },
            // 网站公告路由
        {
            path: '/website_announcement/table',
            name: 'website_announcement_table',
            component: () => import('../views/website_announcement/table.vue'),
            meta: {
                index: 0,
                title: '网站公告列表'
            }
        },
        {
            path: '/website_announcement/view',
            name: 'website_announcement_view',
            component: () => import('../views/website_announcement/view.vue'),
            meta: {
                index: 0,
                title: '网站公告详情'
            }
        },
            // 热卖图书路由
        {
            path: '/hot_selling_books/table',
            name: 'hot_selling_books_table',
            component: () => import('../views/hot_selling_books/table.vue'),
            meta: {
                index: 0,
                title: '热卖图书列表'
            }
        },
        {
            path: '/hot_selling_books/view',
            name: 'hot_selling_books_view',
            component: () => import('../views/hot_selling_books/view.vue'),
            meta: {
                index: 0,
                title: '热卖图书详情'
            }
        },
    
    // 用户路由
    {
        path: '/user/table',
        name: 'user_table',
        component: () => import('../views/user/table.vue'),
        meta: {
            index: 0,
            title: '用户列表'
        }
    },
    {
        path: '/user/view',
        name: 'user_view',
        component: () => import('../views/user/view.vue'),
        meta: {
            index: 0,
            title: '用户详情'
        }
    },
    {
        path: '/user/info',
        name: 'user_info',
        component: () => import('../views/user/info.vue'),
        meta: {
            index: 0,
            title: '个人信息'
        }
    },
    // 用户组路由
    {
        path: '/user_group/table',
        name: 'user_group_table',
        component: () => import('../views/user_group/table.vue'),
        meta: {
            index: 0,
            title: '用户组列表'
        }
    },
    {
        path: '/user_group/view',
        name: 'user_group_view',
        component: () => import('../views/user_group/view.vue'),
        meta: {
            index: 0,
            title: '用户组详情'
        }
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let token = to.query.token;
    if (token) {
        $.db.set("token", token, 120);
    }
    next();
})

router.afterEach((to, from, next) => {
    let title = "该项目为测试项目（用于演示或测试）-admin";
    document.title = title;
})

export default router
