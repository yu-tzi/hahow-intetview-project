export const getObjectSumNum = (data: { [key: string]: number }) => {
    if (!data) {
        return null
    }
    return Object.values(data).reduce((acc, cur) => acc + cur);
}