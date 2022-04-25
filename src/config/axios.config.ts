import axios from 'axios';
/**
 * Configuracion de axios
 */
export default axios.create({
    baseURL: 'http://localhost:8000/api',// Ruta base, donde se agregaran los endpoint a consultar de la app de code-verifier-backend
    responseType: 'json', // Devuelve respuesta en formato JSON
    timeout: 6000, // MAximo tiempo de espera en recibir response


})