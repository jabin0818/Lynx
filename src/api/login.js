import request from './request';

//发送验证码
export const sendCode = (email) => request({ url: `/user/captcha`, method: 'post', data: { account: email } })

//注册
export const register = (email, code, password) => request({ url: `/user/regist`, method: 'post', data: { account: email, password, captcha: code } })

//登录
export const login = (email, password) => request({ url: `/user/login`, method: 'post', data: { account: email, password } })

//退出登录
// export const logout = (email, password) => request({ url: `/user/logout`, method: 'post', data: { account: email, password } })

//忘记密码
export const resetPassword = (email, code, newPassword) => request({ url: `/user/findPassword`, method: 'post', data: { account: email, captcha: code, password: newPassword } })

//修改密码
export const updateUserPassword = (id, account, password, newPassword) => request({ url: `/user/changePassword`, method: `post`, data: { id, account, password, newPassword }})

