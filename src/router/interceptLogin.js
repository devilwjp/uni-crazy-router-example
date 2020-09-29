import uniCrazyRouter from "uni-crazy-router"
let intercept
export function bindInterceptLogin () {
    destroyInterceptLogin()
    intercept = uniCrazyRouter.beforeEach(async (to, from ,next) => {
        if (to.url === 'pages/login') {
            if (uni.getStorageSync('isLogin')) {
                uniCrazyRouter.afterNotNext(() => {
                    // 拦截路由，并且跳转去登录页
                    uni.navigateTo({
                        url: '/pages/index/page1',
                        passedParams: {
                            info: '已登录'
                        }
                    })
                })
            } else {
                uni.showToast({
                    title: '没有登录，不能访问！',
                    icon: 'none'
                })
            }
            return // 拦截路由，不执行next
        }
        next()
    })
}
export function destroyInterceptLogin () {
    if (intercept) {
        intercept() // 销毁拦截
        intercept = null
    }
}

