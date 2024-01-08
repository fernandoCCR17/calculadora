import styled from "@emotion/styled";
import useCalculadora from "../hooks/useCalculadora";

const HeaderStyles = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.colorHeader};

    h1{
        font-size: 2.8rem;
        margin: 0;
    }
`

const DivContainer = styled.div`
    font-size: 1.3rem;
    display: flex;
    align-items: end;
    gap: 3rem;

    p{
        margin: 0;
        letter-spacing: .2rem;
    }
`

const Toggle = styled.div`
    width: 7rem;

    .numbersContainer{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-inline: .7rem;
        margin-bottom: .5rem;
    }

    `

const InputContainer = styled.div`
    width: 100%;
    padding: .3rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    background-color: ${props => props.backgroundToggle};

    input{
        -webkit-appearance: none;
        width: 100%;
        background-color: unset;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background-color: ${props => props.sliderThumb};
            cursor: pointer;
        }
    }
    
`

const Header = () => {
    const { theme, handleSetTheme } = useCalculadora();

    return (
        <HeaderStyles 
            colorHeader={`var(--textTheme${theme})`}
        >
            <h1>calc</h1>

            <DivContainer>
                <p>THEME</p>

                <Toggle>
                    <div className="numbersContainer">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>

                    <InputContainer
                        backgroundToggle={`var(--backgroundToggleAndKeypad${theme})`}
                        
                        sliderThumb={`var(--keyBackgroundEqualAndToggle${theme})`}
                    >
                        <input 
                            type="range" 
                            min="1" 
                            max="3" 
                            name="" 
                            value={theme}
                            onChange={handleSetTheme} 
                        />
                    </InputContainer>
                </Toggle>
            </DivContainer>
        </HeaderStyles>
    )
}

export default Header;