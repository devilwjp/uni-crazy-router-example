import uniCrazyRouter from "uni-crazy-router"
let intercept
export function bindInterceptEveryone () {
    destroyInterceptEveryone()
    intercept = uniCrazyRouter.beforeEach(async (to, from ,next) => {
        if (to.url === 'pages/login') {
            uniCrazyRouter.afterNotNext(() => {
                // 拦截路由，并且跳转去登录页
                uni.navigateTo({
                    url: '/pages/index/page1',
                    passedParams: {
                        info: '不需要登录，对任何人开放'
                    }
                })
            })
            return // 拦截路由，不执行next
        }
        next()
    })
}
export function destroyInterceptEveryone () {
    if (intercept) {
        intercept() // 销毁拦截
        intercept = null
    }
}

