export const useSessionStorage = (key: string): any | false => {
    let valorAlmacenamientoCliente = sessionStorage.getItem(key);

    if (!valorAlmacenamientoCliente) {
        return false;
    }
    return valorAlmacenamientoCliente;
}