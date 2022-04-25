import axios from '../config/axios.config';

/**
 * MEtodo de login
 * @param email {string} Dato de correo electronico registrado de usuario
 * @param password {string} contraseña
 * @returns 
 */
export const login = (email: string, password: string) => {
    // Definir el body a enviar en la peticion http
    let body = {
        email: email,
        password: password
    }
    // Envio mediante metodo http POST al endopint de login http://localhost:8000/api/auth/login
    return axios.post('/auth/login', body); // Devuelve promesa
}
/**
 * Metodo para registrar usuario
 * @param email {string} email a registrar 
 * @param password {string} Contraseña
 * @param name {string} Nombres y apellidos del usuario
 * @param age {number} Edad del usuario
 * @returns 
 */
export const register = async (email: string, password: string, name: string, age: number) => {
    console.log("entra qui")
    // Definir el body a enviar en la peticion http
    let body = {
        name: name,
        email: email,
        password: password,
        age: age
    }
    // Envio mediante metodo http POST al endopint de login http://localhost:8000/api/auth/register
    return await axios.post('/auth/register', body);
}