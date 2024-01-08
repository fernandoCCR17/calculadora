import styled from "@emotion/styled"
import useCalculadora from "../hooks/useCalculadora"
import useButtonCalculadora from "../hooks/useButtonCalculadora";

const KeyPadStyle = styled.div`
    margin-top: 2rem;
    padding: 2.5rem;
    border-radius: 1rem;
    background-color: ${props => props.background};
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
`

function KeyPad() {
    const { theme } = useCalculadora();
    const [Buttons] = useButtonCalculadora()

    return (
        <KeyPadStyle
            background = {`var(--backgroundToggleAndKeypad${theme})`}
        >
            <Grid>
                <Buttons />
            </Grid>
        </KeyPadStyle>
    )
}

export default KeyPad