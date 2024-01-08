import styled from "@emotion/styled"
import useCalculadora from "../hooks/useCalculadora"

const SpinnerDiv = styled.div`
    width: 100%;
    height: 20rem;
    grid-column: 1 / 5;
    position: relative;

    .spinner {
        width: 9rem;
        height: 8rem;
        text-align: center;
        font-size: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .spinner > div {
        background-color: ${props => props.backgroundSpinner};
        height: 100%;
        width: 6px;
        display: inline-block;
        
        -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
        animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    .spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }

    .spinner .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }

    @-webkit-keyframes sk-stretchdelay {
        0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
        20% { -webkit-transform: scaleY(1.0) }
    }

    @keyframes sk-stretchdelay {
        0%, 40%, 100% { 
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }  20% { 
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
        }
    }
`

const Spinner = () => {
    const { theme } = useCalculadora()

  return (
    <SpinnerDiv 
        backgroundSpinner={`var(--keyBackgroundEqualAndToggle${theme})`}
    >
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
    </SpinnerDiv>
  )
}

export default Spinner