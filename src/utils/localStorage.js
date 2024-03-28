//本地存储持久化存储

//token
export const getToken = () => {
  return localStorage.getItem('token');
}
export const setToken = (token) => {
  localStorage.setItem('token', token);
}
export const clearToken = () => {
  localStorage.removeItem('token');
}

//userInfo
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('userInfo'))
}
export const setUserInfo = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}
export const clearUserInfo = () => {
  localStorage.removeItem('userInfo');
}


//记住我 邮箱 密码
export const getAccount = () => {
  return JSON.parse(localStorage.getItem('account'));
}
export const setAccount = ({ email, password }) => {
  localStorage.setItem('account', JSON.stringify({ email, password }));
}
export const clearAccount = () => {
  localStorage.removeItem('account');
}

//userId
export const getUserId = () => {
  return localStorage.getItem('userId');
}
export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
}
export const clearUserId = () => {
  localStorage.removeItem('userId');
}


//私信 消息 存储 历史记录
export const getMessageById = (fromTo) => {
  return JSON.parse(localStorage.getItem(fromTo));
}
export const setMessageById = (fromTo, data) => {
  localStorage.setItem(fromTo, JSON.stringify(data));
}
export const clearMessageById = (fromTo) => {
  localStorage.removeItem(fromTo);
}

// 用户名密码
export const getUserPsd = () => {
  return JSON.parse(localStorage.getItem('userPsd'));
}
export const setUserPsd = (data) => {
  localStorage.setItem('userPsd', JSON.stringify(data));
}
export const clearUserPsd = () => {
  localStorage.removeItem('userPsd');
}


