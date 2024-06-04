import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { routesPath } from "../components/pages/routesPath";


export const TasksContext = createContext(null);

export const TasksProvider = ({children}) => {
    let navigate = useNavigate();

    const [tasks, setTasks] = useState(null);

    const getTasks = (cards) => {
        setTasks(cards);
        navigate(routesPath.MAIN);
    };

    return (
        <TasksContext.Provider value={{tasks, setTasks, getTasks}}>
            {children}
        </TasksContext.Provider>
    );
};