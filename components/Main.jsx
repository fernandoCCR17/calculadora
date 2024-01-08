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

function Main(){
    const { theme, screenText } = useCalculadora()

    return (
        <MainStyle>
            <ScreenStyle
                backgroundScreen = {`var(--backgroundScreen${theme})`}
                colorScreen = {`var(--textTheme${theme})`}
            >
                <p>{screenText}</p>
            </ScreenStyle>

            <KeyPad />
        </MainStyle>
    )
}

export default Main;