import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const useFetch = () => {
    const context = useContext(DataContext);
    return context;
}

export default useFetch;