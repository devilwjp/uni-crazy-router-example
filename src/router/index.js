import Vue from 'vue'
import uniCrazyRouter from "uni-crazy-router";
Vue.use(uniCrazyRouter)
import {bindInterceptLogin, destroyInterceptLogin} from './interceptLogin'

// 启用登录页的拦截
bindInterceptLogin()

uniCrazyRouter.beforeEach(async (to, from ,next)=>{
    // 逻辑代码

    if (to.url === 'pages/index/page2') {
        uniCrazyRouter.afterNotNext(() => {
            uni.navigateTo({
                url: '/pages/index/page1',
                passedParams: {
                    info: '因为page2不存在，拦截跳转到此'
                }
            })
        })
        return
    }

    next()
})

uniCrazyRouter.afterEach((to, from)=>{
    // 逻辑代码
})

uniCrazyRouter.onError((to, from)=>{
    uni.showToast({
        title: `${to.url} 不存在`,
        icon: 'none'
    })
})

export function destoryInterceptLogin () {
    interceptLogin()
}
