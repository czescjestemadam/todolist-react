export const getServer = () => localStorage.getItem("server");
export const setServer = server => localStorage.setItem("server", server);
export const clearServer = () => localStorage.removeItem("server");

export const getToken = () => localStorage.getItem("token")
export const setToken = token => localStorage.setItem("token", token);
export const clearToken = () => localStorage.removeItem("token");

export const clearServerToken = () => clearServer() || clearToken();
