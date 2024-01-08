import styled from "@emotion/styled"
import useCalculadora from "./useCalculadora"
import Spinner from "../components/Spinner"

const Button = styled.button`
    border: none;
    border-radius: .7rem;
    width: 100%;
    height: 6rem;
    background-color: ${props => props.backgroundButton};
    color: ${props => props.colorButton};
    box-shadow: inset 0px -.9rem .2rem -.4rem ${props => props.shadowButton};
    transition: background-color .3s ease;

    span{
        pointer-events: none;
    }
    
    &:hover{
        cursor: pointer;
        background-color: ${props => props.backgroundButtonOpacity};
    }

    &.letra{
        font-size: 2rem;
        text-transform: uppercase;
    }

    &.gridCol1{
        grid-column: 1 / 3;
    }

    &.gridCol2{
        grid-column: 3 / 5;
    }
`

const useButtonCalculadora = () => {
    const ButtonCalculadora = () => {
        const { theme, loading, buttons, functions } = useCalculadora();

        return (
            <>
                {loading ? 
                <Spinner /> : 
                buttons.map(button => (
                    <Button
                        className={
                            `
                                ${button.id === 4 || button.id === 17 || button.id === 18 ? "letra" : ""}

                                ${button.id === 17 ? "gridCol1" : ""}

                                ${button.id === 18 ? "gridCol2" : ""}
                            `
                        }
                        
                        key={button.id}
                        type="button"
                        backgroundButton={`${button.background}${theme})`}
                        backgroundButtonOpacity={`${button.backgroundOpacity}${theme})`}
                        shadowButton={`${button.shadow}${theme})`}
                        colorButton={`${button.color}${theme})`}
                        value={`${button.text}`}
                        name={`${button.name}`}
                        onClick={e => functions[button.name](e)}
                    >
                        <span>{button.text}</span>
                    </Button>
                ))}
            </>
        )
        
    }

    return [ButtonCalculadora]
}

export default useButtonCalculadora;