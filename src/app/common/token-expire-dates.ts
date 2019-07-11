const day = 86400000;

export const getExpireDate = (days) => {
    var ms = new Date().getTime() + (day * days);
    return new Date(ms);
}