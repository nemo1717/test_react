export const getUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr){
        return JSON.parse(userStr);
    }
    else {
        return "";
    }
}

export const getUserID = () => {
    const userID = localStorage.getItem("userID");
    if (userID){
        return JSON.parse(userID);
    }
    else {
        return "";
    }
}

export const getToken = () => {
    return localStorage.getItem("token") || null

}

export const setUserSession = (token, user, userID) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userID", userID);
}

export const removeUserSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userID");
}