import { createContext, useState, useEffect } from "react";

const CalculadoraContext = createContext();

function CalculadoraProvider({children}){
    const [theme, setTheme] = useState(1)
    const [loading, setLoading] = useState(false)
    const [buttons, setButtons] = useState([])
    const [screenText, setScreenText] = useState("")
    const [cantidades, setCantidades] = useState([])
    const [operadores, setOperadores] = useState([])
    const [borrar, setBorrar] = useState(true)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        async function obtenerDatos() {
            try {
                setLoading(true)
                const url = import.meta.env.VITE_URL
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                setButtons(resultado)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }

        obtenerDatos();

    }, [])

    const functionOperaciones = {
        "+": (number1, number2) => Number(number1.replaceAll(",", "")) + Number(number2.replaceAll(",", "")),  
        "-": (number1, number2) => Number(number1.replaceAll(",", "")) - Number(number2.replaceAll(",", "")),  
        "/": (number1, number2) => {
            const result = Number(number1.replaceAll(",", "")) / Number(number2.replaceAll(",", ""))

            return !Number.isInteger(result) ? result.toFixed(2) : result
        },  
        "x": (number1, number2) => Number(number1.replaceAll(",", "")) * Number(number2.replaceAll(",", "")),  
    }


    const handleSetTheme = e => {
        if(e.target.value > 3){
            setTheme(3)
            return
        }

        if(e.target.value < 1){
            setTheme(1)
            return
        }
        
        setTheme(e.target.value)
    }

    const handleScreen = (text) => {
        let textScreen = text.replaceAll(",", "").split("").reverse()
        const negative = textScreen[textScreen.length-1] === "-"

        if(negative){
            textScreen = textScreen.slice(1)
        }

        if(textScreen.length > 3){
            let newText = []
            for(let i = 0; i < textScreen.length; i++){
                if((i+1) > 3 && (i+1) % 3 === 1){
                    newText.push(",")
                    newText.push(textScreen[i])
                }else{
                    newText.push(textScreen[i])
                }
            }

            return newText.reverse().join("")
        }

        return text.replaceAll(",", "")
    }

    const handleNumbers = e => {
        const text = `${screenText}${e.target.value}`.split(".")
        let textLeft = handleScreen(text[0])
        let textRight = ""

        // Si no existe decimal y la parte entera tiene mas de un dígito y el primer dígito es igual a 0 Ej= 03
        if(!text[1] && textLeft.length > 1 && textLeft[0] === "0"){
            setScreenText(textLeft.slice(1))//imprime en pantalla 3
            return
        }

        // si el número no cuenta con parte decimal, enviamos la parte entera
        if(!text[1]){
            setScreenText(textLeft)
            return
        }

        if(e.target.value === "0" && text[1][0] === "0"){
            setBorrar(false)
            setScreenText([textLeft, "0"].join("."))
            return
        }
        
        textRight = handleScreen(text[1])
        setScreenText([textLeft, textRight].join("."))
    }

    const handleOperator = e => {
        if(cantidades.length === 0 && screenText === ""){
            return
        }

        if(screenText === ""){
            return
        }

        setCantidades([...cantidades, screenText])
        setOperadores([...operadores, e.target.value])
        setScreenText("")
    }

    const handleDelete = () => {
        const textSplit = screenText.split(".")
        let textLeft = textSplit[0]
        let textRight = textSplit[1]

        if(!textRight){
            const newTextScreen = handleScreen(textLeft.slice(0, textLeft.length - 1))
            setScreenText(newTextScreen)
            return
        }

        if(textRight && textRight.length === 1){
            setBorrar(true)
            setScreenText(textLeft)
            return
        }

        const newTextScreen = handleScreen(textRight.slice(0, textRight.length - 1))
        setScreenText(`${textLeft}.${newTextScreen}`)
    }
    
    const handleReset = () => {
        setScreenText("")
        setCantidades([])
        setOperadores([])
        setBorrar(true)
    }

    const handleEqual = () => {
        //si es la primera cantidad que ingresa y aprieta "=" devolverá lo que este en pantalla
        if(cantidades.length === 0 && screenText !== "" ){
            setScreenText(screenText)
            return
        }
        
        //si no tiene ninguna cantidad guardada previamente y aprieta "=" devolverá un 0
        if(cantidades.length === 0 && screenText === ""){
            setScreenText("0")
            return
        }
        
        if(cantidades.length === 1 && operadores.length === 1 && screenText === ""){
            setScreenText(cantidades[0])
            return
        }

        let auxCan = [...cantidades] // variable auxiliar de cantidades para insertar lo que el usuario tenga en pantalla
        let auxTotal = 0

        if(screenText !== ""){
            auxCan.push(screenText)
        }

        for(let i = 1; i <= auxCan.length - 1; i++){
            const operador = operadores[(i-1)];

            if(i === 1){
                auxTotal = functionOperaciones[operador](auxCan[0], auxCan[i]) 
            }else{
                auxTotal = functionOperaciones[operador](auxTotal.toString(), auxCan[i]) 
            }
        }

        const textSplit = auxTotal.toString().split(".")
        const textLeft = handleScreen(textSplit[0])
        
        if(!textSplit[1]){
            setScreenText(textLeft)
        }else{
            const textRight = handleScreen(textSplit[1])
            setScreenText(`${textLeft}.${textRight}`)
        }
        

        setCantidades([])
        setOperadores([])
        setBorrar(true)
    }

    const handlePoint = () => {
        if(screenText.indexOf(".") != -1){
            return
        }

        if(screenText === ""){
            setScreenText("0.")
            return
        }

        setScreenText(`${screenText}.`)
    }

    const functions = {
        number: handleNumbers,
        operator: handleOperator,
        delete: handleDelete,
        reset: handleReset,
        equal: handleEqual,
        point: handlePoint
    }

    return (
        <CalculadoraContext.Provider    
            value={{
                theme,
                loading,
                handleSetTheme,
                buttons,
                handleNumbers,
                screenText,
                functions
            }}
        >
            {children}
        </CalculadoraContext.Provider>
    )
}

export { CalculadoraProvider }

export default CalculadoraContext;