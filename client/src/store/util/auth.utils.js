export const ACCESS_TOKEN_KEY = 'access-token';

export const getAccessToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const storeAccessToken = (value) => {
    return window.localStorage.setItem(ACCESS_TOKEN_KEY, value);
}

export const clearAccessToken = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export const authorizationHeader = () => {
    const accessToken = getAccessToken();
    return accessToken ? { headers: {'Authorization': `Bearer ${accessToken}`} } : {};
}
