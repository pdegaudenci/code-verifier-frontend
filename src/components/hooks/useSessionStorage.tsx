export const useSessionStorage = (key: string): any | false => {
    let storeValue = sessionStorage.getItem(key);

    if (!storeValue) {
        return false;
    }
    return storeValue;
}