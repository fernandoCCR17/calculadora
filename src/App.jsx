import styled from "@emotion/styled"
import useCalculadora from "../hooks/useCalculadora"
import Header from "../components/Header";
import Main from "../components/Main";

const DivContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .container{
    width: 100%;
    max-width: 60rem;
  }
`

function App() {
  const { theme } = useCalculadora();

  return (
    <DivContainer   
      style={{
        backgroundColor: `var(--backgroundApp${theme})`,
      }}
    >
      <div className="container">
        <Header />

        <Main />
      </div>
    </DivContainer>
  )
}

export default App
