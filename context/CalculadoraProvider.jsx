import { createContext, useState, useEffect } from "react";

const CalculadoraContext = createContext();

function CalculadoraProvider({children}){
    const [theme, setTheme] = useState(1)
    const [loading, setLoading] = useState(false)
    const [buttons, setButtons] = useState([])
    const [screenText, setScreenText] = useState("")
    const [cantidades, setCantidades] = useState([])
    const [operadores, setOperadores] = useState([])
    const [borrarTotal, setBorrarTotal] = useState(false)
    const [isNegative, setIsNegative] = useState(false)

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
        "+": (number1, number2) => {
            const result = Number(number1.replaceAll(",", "")) + Number(number2.replaceAll(",", ""))
            
            return !Number.isInteger(result) ? result.toFixed(2) : result
        },  
        "-": (number1, number2) => {
            const result = Number(number1.replaceAll(",", "")) - Number(number2.replaceAll(",", ""))
            
            return !Number.isInteger(result) ? result.toFixed(2) : result
        },  
        "/": (number1, number2) => {
            const result = Number(number1.replaceAll(",", "")) / Number(number2.replaceAll(",", ""))

            return !Number.isInteger(result) ? result.toFixed(2) : result
        },  
        "x": (number1, number2) => {
            const result = Number(number1.replaceAll(",", "")) * Number(number2.replaceAll(",", ""))

            return !Number.isInteger(result) ? result.toFixed(2) : result
        },  
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
            return
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
        if(borrarTotal){
            setScreenText(e.target.value)
            setBorrarTotal(false)
            return 
        }

        let textScreen = `${screenText}${e.target.value}`
        if(isNegative){
            textScreen = textScreen.slice(1)
        }
        const text = textScreen.split(".")
        let textLeft = handleScreen(text[0])
        let textRight = ""


        // Si no existe decimal y la parte entera tiene mas de un dígito y el primer dígito es igual a 0 Ej= 03
        if(!text[1] && textLeft.length > 1 && textLeft[0] === "0"){
            setScreenText(`${isNegative ? "-" : ""}${textLeft.slice(1)}`)//imprime en pantalla 3
            return
        }

        // si el número no cuenta con parte decimal, enviamos la parte entera
        if(!text[1]){
            setScreenText(`${isNegative ? "-" : ""}${textLeft}`)
            return
        }

        if(e.target.value === "0" && text[1][0] === "0"){
            setScreenText(`${isNegative ? "-" : ""}${textLeft}.0`)
            return
        }
        
        textRight = handleScreen(text[1])
        setScreenText(`${isNegative ? "-" : ""}${textLeft}.${textRight}`)
    }

    const handleOperator = e => {
        if(borrarTotal){
            setBorrarTotal(false)
        }

        if(isNegative && screenText.length > 1){
            setIsNegative(false)
        }else if(isNegative && screenText.length <= 1){
            return
        }

        if(screenText.length === 0 && e.target.value === "-"){
            setScreenText("-")
            setIsNegative(true)
            return
        }

        if(cantidades.length === 0 && screenText === ""){
            return
        }

        if(screenText === ""){
            const newOperadores = [...operadores]
            newOperadores[newOperadores.length - 1] = e.target.value
            setOperadores(newOperadores)
            return
        }

        setCantidades([...cantidades, screenText])
        setOperadores([...operadores, e.target.value])
        setScreenText("")
    }

    const handleDelete = () => {
        if(borrarTotal){
            setScreenText("")
            return
        }

        if(isNegative && screenText.length <= 2){
            setScreenText("")
            setIsNegative(false)
            return 
        }

        const textSplit = screenText.split(".")
        let textLeft = textSplit[0]
        if(isNegative){
            textLeft = textLeft.slice(1)
        }
        let textRight = textSplit[1]
        
        if((textRight && textRight.length === 1) || textRight === ""){
            setScreenText(`${isNegative ? "-" : ""}${textLeft}`)
            return
        }

        if(!textRight){
            const newTextScreen = handleScreen(textLeft.slice(0, textLeft.length - 1))
            setScreenText(`${isNegative ? "-" : ""}${newTextScreen}`)
            return
        }

        const newTextScreen = handleScreen(textRight.slice(0, textRight.length - 1))
        setScreenText(`${isNegative ? "-" : ""}${textLeft}.${newTextScreen}`)
    }
    
    const handleReset = () => {
        setScreenText("")
        setCantidades([])
        setOperadores([])
        setBorrarTotal(false)
        setIsNegative(false);
    }

    const handleEqual = () => {
        //si es la primera cantidad que ingresa y aprieta "=" devolverá lo que este en pantalla
        if(cantidades.length === 0 && screenText !== "" ){
            setScreenText(screenText)
            return
        }
        
        //si no tiene ninguna cantidad guardada previamente y aprieta "=" devolverá un ""
        if(cantidades.length === 0 && screenText === ""){
            setScreenText("")
            return
        }
        
        if(cantidades.length === 1 && operadores.length === 1 && screenText === ""){
            setScreenText(cantidades[0])
            setCantidades([])
            setOperadores([])
            setIsNegative(false)
            setBorrarTotal(true)
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
        
        let auxIsNegative = false;
        let text = auxTotal.toString()
        if(auxTotal < 0){
            setIsNegative(true)
            auxIsNegative = true
            text = text.slice(1)
        }

        console.log(text)
        const textSplit = text.split(".")

        let textLeft = handleScreen(textSplit[0])
        
        if(!textSplit[1]){
            setScreenText(`${auxIsNegative ? "-" : ""}${textLeft}`)
        }else{
            const textRight = handleScreen(textSplit[1])
            setScreenText(`${auxIsNegative ? "-" : ""}${textLeft}.${textRight}`)
        }
        
        setCantidades([])
        setOperadores([])
        setIsNegative(false)
        setBorrarTotal(true)
    }

    const handlePoint = () => {
        if(borrarTotal){
            setBorrarTotal(false)
        }

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
                setScreenText,
                functions,
                handleScreen,
                borrarTotal,
                setBorrarTotal,
                setOperadores,
                isNegative,
                setIsNegative
            }}
        >
            {children}
        </CalculadoraContext.Provider>
    )
}

export { CalculadoraProvider }

export default CalculadoraContext;