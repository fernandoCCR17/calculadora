import { useContext } from "react";
import CalculadoraContext from "../context/CalculadoraProvider";

function useCalculadora(){
    return useContext(CalculadoraContext)
}

export default useCalculadora;