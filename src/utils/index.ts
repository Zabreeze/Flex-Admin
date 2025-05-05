/**
 * @description 设置token
 * @param {String} token token值
 */
export const setToken = (token: string) => {
    localStorage.setItem("TOKEN", token);
  };
  
  /**
   * @description 获取token
   * @returns {String}
   */
  export const getToken = () => {
    return localStorage.getItem("TOKEN");
  };
  
  /**
   * @description 删除token
   * @returns {String}
   */
  export const removeToken = () => {
    return localStorage.removeItem("TOKEN");
  };
  