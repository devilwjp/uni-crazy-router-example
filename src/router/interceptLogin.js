import uniCrazyRouter from "uni-crazy-router"
let intercept
export function bindInterceptLogin () {
    destroyInterceptLogin()
    intercept = uniCrazyRouter.beforeEach(async (to, from ,next) => {
        // 判断是否登录，没有登陆就跳转到登录页，并且要去除对登录页的拦截，否则会死循环
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

