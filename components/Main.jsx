import styled from "@emotion/styled";
import useCalculadora from "../hooks/useCalculadora"
import KeyPad from "./KeyPad";

const MainStyle = styled.main`
    margin-top: 3rem;
`

const ScreenStyle = styled.div`
    padding: 2.5rem;
    font-size: 4rem;
    border-radius: 1rem;
    background-color: ${props => props.backgroundScreen};
    
    p{
        height: 4.6rem;
        margin: 0;
        color: ${props => props.colorScreen};
        text-align: right;
    }
    `

const InputScreen = styled.input`
    color: ${props => props.colorScreen};
    width: 100%;
    background: none;
    text-align: end;
    border: none;

    &::placeholder{
        color: ${props => props.colorPlaceholderScreen};
    }

    &:focus{
        outline: none;
    }
`

function Main(){
    const { theme, screenText, setScreenText, handleScreen, borrarTotal, setBorrarTotal, isNegative, setIsNegative } = useCalculadora()

    function handleInput(e){
        let textScreen = e.target.value
        if(textScreen[0] === "-" && textScreen.length === 1 && textScreen.length > screenText.length){
            setIsNegative(true)
            setScreenText("-")
            return
        }
       
        if(isNegative && screenText.length <= 2 && textScreen.length < screenText.length){
            setIsNegative(false)
            setScreenText("")
            return
        }

        if(isNegative){
            textScreen = textScreen.slice(1)
        }

        if(/[-]/.test(textScreen)){
            return
        }
        
        if(textScreen[0] === "0" && textScreen[1] != "." && textScreen.length > 1){
            if(borrarTotal){
                setBorrarTotal(false)
            }
            textScreen = textScreen.slice(1)
        }

        if(textScreen.length === 1 && textScreen[0] === "."){
            setScreenText("0.")
            return
        }

        if(textScreen === ""){
            if(borrarTotal){
                setBorrarTotal(false)
            }
            setScreenText("")
        }
        
        if(textScreen[textScreen.length - 1] === "." && !/[.]/.test(textScreen.slice(0, textScreen.length-1))){
            if(borrarTotal){
                setBorrarTotal(false)
            }
            setScreenText(textScreen)
            return
        }

        if(/[0-9.-]+$/.test(textScreen)){
            if(borrarTotal){
                setBorrarTotal(false)
            }
            const textSplit = textScreen.split(".")
            const textLeft =  handleScreen(textSplit[0])

            if(!textSplit[1]){
                setScreenText(`${isNegative ? "-" : ""}${textLeft}`)
                return
            }

            const textRigth = handleScreen(textSplit[1])
            setScreenText(`${isNegative ? "-" : ""}${textLeft}.${textRigth}`)
        }
    }

    return (
        <MainStyle>
            <ScreenStyle
                backgroundScreen = {`var(--backgroundScreen${theme})`}
                colorScreen = {`var(--textTheme${theme})`}
                >
                <InputScreen 
                    colorScreen = {`var(--textTheme${theme})`}
                    colorPlaceholderScreen = {`var(--textPlaceholderTheme${theme})`}
                    type="text" 
                    value={screenText} 
                    onChange={handleInput}
                    placeholder="0"
                />
            </ScreenStyle>

            <KeyPad />
        </MainStyle>
    )
}

export default Main;