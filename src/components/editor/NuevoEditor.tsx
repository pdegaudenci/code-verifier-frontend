
import React, { Fragment, useState } from 'react';
import Editor from 'react-simple-code-editor'; // Componente para editar bloques de codigo
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';


// Declaracion de bloque de codigo de ejemplo a renderizar
const bloque =
    `
 import axios from 'axios';

 const getUSer=()=>{
     return axios.get(''<https;//randomuser.me/api)
 }
 `

// Definicion de estilos que se pasaran como props al componente Editor
const styles: any = {
    root: {
        boxSizing: 'border-box',
        fontFamily: '"Dank Mono","Fira Code"',
        ...theme.plain
    }
}

// Array con lenguajes del editor (Interfaz Language nos indica los lenguajes permitidos)
const lenguajes: Language[] = [
    "tsx",
    "typescript",
    "javascript",
    "jsx",
    "python",
    "json",
    "go",
    "c"
]


const elementoHighlight = (codigo: string) => (
    <Highlight {...defaultProps} theme={theme} code={bloque} language={lenguajes[0]}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                    </div>
                ))}
            </Fragment>
        )}
    </Highlight>

)

export const NuevoEditor = () => {
    const [codigo, setCodigo] = useState(bloque);
    // Almacena lenguaje seleccionado
    const [lenguajeSeleccionado, setLenguajeSeleccionado] = useState(lenguajes[0]);
    const manejadorCambios = (codigoNuevo: string) => {
        setCodigo(codigoNuevo);
    }

    // MAnejador de cambios para renderizar la seleccion del lenguaje
    const manejadorLenguajes = (lenguajeSelec: any) => {
        setLenguajeSeleccionado(lenguajeSelec);
    }




    return (
        <>
            <select>
                {lenguajes.map((lenguaje, index) => (
                    <option onChange={(valor) => manejadorLenguajes(valor)} value={lenguaje} key={index}>{lenguaje}</option>
                ))}

            </select>
            <Editor
                value={codigo}
                onValueChange={manejadorCambios}
                highlight={elementoHighlight}
                padding={10}
                style={styles.root}
            />

        </>
    )
}