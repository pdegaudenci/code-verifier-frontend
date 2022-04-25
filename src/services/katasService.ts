import axios from '../config/axios.config';

export const getAllKatas = (token: string, limit?: number, page?: number) => {

    /**
     * Añado configuracion a peticion axios ,
     * incluyendo el xs-access-token como parametro de la cabecera o
     *  headers y parametros 
     *  */
    const options =
    {
        headers: {
            'xs-access-token': token
        },
        params: {
            limit: limit,
            page: page
        }
    }
    // https://localhost:8000/api/katas?limit=limit&page=page
    return axios.get('/katas',
        options
    )
}

export const getKataById = (token: string, id: string) => {

    /**
     * Añado configuracion a peticion axios ,
     * incluyendo el xs-access-token como parametro de la cabecera o
     *  headers y parametros 
     *  */
    const options =
    {
        headers: {
            'xs-access-token': token
        },
        params: {
            id: id
        }

    }
    // https://localhost:8000/api/katas?id=id
    const response = axios.get('/katas',
        options

    )
    console.table(response)
    return response
}