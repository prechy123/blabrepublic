export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('accessToken', token);
}

export const deleteTokenFromLocalStorage = () => {
    localStorage.removeItem('accessToken');
}

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
}