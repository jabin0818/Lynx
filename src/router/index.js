import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'
import { Message } from 'element-ui';

// 每次调用Vue.$router.push方法跳转路由的时候先判断是不是已经在目标路由，避免重复跳转
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "index"
    },
    {
        path: "/index",
        name: "index",
        component: () => import("@/pages/index/index"),
    },
    // {
    //     path: "/login",
    //     component: () => import("@/pages/login/index"),
    // },
    // {
    //     path: "/register",
    //     component: () => import("@/pages/register/index"),
    // },
    {
        path: "/notes/detail/:id",
        component: () => import("@/pages/notes/notesDetail/index"),
    },
    {
        path: "/notes/creation",
        component: () => import("@/pages/notes/notesCreation/index"),
    },
    {
        path: "/notes/edit/:id",
        component: () => import("@/pages/notes/notesCreation/index"),
    },
    {
        path: "/user/:id",
        component: () => import("@/pages/user"),
        children: [
            {
                path: "/",
                redirect: "notes"
            },
            {
                path: 'notes',
                component: () => import("@/pages/user/userTab/userNotes"),
            },
            {
                path: 'cards',
                component: () => import("@/pages/user/userTab/userCards"),
            },
            {
                path: 'videos',
                component: () => import("@/pages/user/userTab/userVideos"),
            },
            {
                path: 'dynamic',
                component: () => import("@/pages/user/userTab/userDynamic"),
            },
            {
                path: 'star',
                component: () => import("@/pages/user/userTab/userStar"),
                children: [
                    {
                        path: ":favId",
                        component: () => import("@/pages/user/userTab/userStar")
                    }
                ]
            },
            {
                path: 'follow',
                component: () => import("@/pages/user/userTab/userFollow"),
            },
            {
                path: 'search',
                component: () => import("@/pages/user/userTab/userSearch"),
            },
            {
                path: 'fans',
                component: () => import("@/pages/user/userTab/userFans"),
            }
        ]

    },
    {
        path: "/settings",
        component: () => import("@/pages/set"),
        children: [
            {
                path: "/",
                redirect: "profile"
            },
            {
                path: 'profile',
                component: () => import("@/pages/set/profileSettings"),

            },
            {
                path: 'account',
                component: () => import("@/pages/set/accountSettings"),
            }
        ]

    },
    {
        path: "/tags",
        component: () => import("@/pages/tag"),
        children: [
            {
                path: "/",
                redirect: "all"
            },
            {
                path: 'all',
                component: () => import("@/pages/tag/allTag"),
            },
            {
                path: 'my',
                component: () => import("@/pages/tag/myTag"),
            }
        ]

    },
    {
        name: 'tagDetails',
        path: '/tags/detail/:tagId/:tagName',
        component: () => import("@/pages/tag/detailTag"),
    },
    {
        name: "creator",
        path: "/creator",
        component: () => import("@/pages/creator"),
        props: true,
        children: [
            {
                path: "/",
                redirect: "home"
            },
            {
                path: 'home',
                component: () => import("@/pages/creator/home"),

            },
            {
                path: 'content/notes',
                component: () => import("@/pages/creator/content/notes"),
                children: [
                    {
                        path: "/",
                        redirect: "essays"
                    },
                    {
                        path: 'essays',
                        component: () => import("@/pages/creator/content/notes/essays/index"),

                    },
                    {
                        path: 'drafts',
                        component: () => import("@/pages/creator/content/notes/drafts/index"),
                    }
                ]
            },
            {
                path: 'content/card',
                component: () => import("@/pages/creator/content/card/index"),
                children: [
                    {
                        path: "/",
                        redirect: "essays"
                    },
                    {
                        path: 'essays',
                        component: () => import("@/pages/creator/content/card/essays"),

                    },
                    {
                        path: 'drafts',
                        component: () => import("@/pages/creator/content/card/drafts"),
                    }
                ]
            },
            {
                path: 'content/video',
                component: () => import("@/pages/creator/content/video/index"),
                children: [
                    {
                        path: "/",
                        redirect: "essays"
                    },
                    {
                        path: 'essays',
                        component: () => import("@/pages/creator/content/video/essays"),

                    },
                    {
                        path: 'drafts',
                        component: () => import("@/pages/creator/content/video/drafts"),
                    }
                ]
            }
        ]
    },
    {
        name: "published",
        path: "/published",
        component: () => import("@/pages/global/published/index"),
        props: true,
    },
    {
        path: "/card",
        component: () => import("@/pages/card/index"),
    },
    {
        path: "/card/creation/:id",
        component: () => import("@/pages/card/cardCreation/index"),
    },
    {
        path: "/card/detail/:id",
        component: () => import("@/pages/card/cardDetail/index"),
    },
    {
        path: "/video",
        component: () => import("@/pages/video/index"),
    },
    {
        path: "/video/detail/:id",
        component: () => import("@/pages/video/videoDetail/index"),
    },
    {
        path: "/video/creation",
        component: () => import("@/pages/video/uploadVideo"),
    },
    {
        path: "/video/edit/:id",
        component: () => import("@/pages/video/uploadVideo"),
    },
    {
        path: "/community",
        component: () => import("@/pages/community"),
    },
    {
        path: "/community/detail/:id",
        component: () => import("@/pages/community/detail"),
    },
    {
        path: "/message",
        component: () => import("@/pages/message"),
        children: [
            {
                path: "/",
                redirect: "comment"
            },
            {
                path: 'comment',
                component: () => import("@/pages/message/comment"),
            },
            {
                path: 'like',
                component: () => import("@/pages/message/like"),
            },
            {
                path: 'follow',
                component: () => import("@/pages/message/follow"),
            },
            {
                path: 'chat',
                component: () => import("@/pages/message/chat"),
                children: [
                    {
                        path: ":id",
                        component: () => import("@/pages/message/chat")
                    }
                ]
            },
            {
                path: 'system',
                component: () => import("@/pages/message/system"),
            },
        ]
    },
    {
        path: "*",
        component: () => import("@/pages/global/errorPage")
    }
];

const router = new VueRouter({
    routes
});


router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let username = store.state.user.userInfo.username
    if (token) {
        if (username) {
            // 用户信息未过期，放行
            next()
        } else {
            // 用户信息已过期,重新获取用户信息
            try {
                let result = await store.dispatch('user/getUserInfo');
                if (result === 'ok') {
                    next()
                }
            } catch (error) {
                //token已过期，退出登录
                store.commit('user/USERLOGOUT')
            }
        }
        // }
    } else {
        //未登录，无token
        let toPath = to.path;
        if (toPath.indexOf('creator') !== -1 ||
            toPath.indexOf('edit') !== -1 ||
            toPath.indexOf('community') !== -1 ||
            toPath.indexOf('creation') !== -1 ||
            toPath.indexOf('/tags/my') !== -1 ||
            toPath.indexOf('message') !== -1 ||
            toPath.indexOf('published') !== -1
        ) {
            next('/index')
            Message.error("请先登录！")
            store.state.global.loginRegVisible = true
        } else {
            next()
        }
    }

})


export default router;