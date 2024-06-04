import {  useTasks } from "../../hooks/useTasks.jsx";
import Column from "../Column/Column";
import { statusList } from "../data";
import * as S from "./Main.styled.js";

function Main({  isLoaded }) {
    const {tasks} = useTasks(); 
    return (

        <main className="main">
            <div className="container">
                <S.MainBlock>
                    <S.StyledMainContent>

                        {isLoaded ? "Загрузка..." : statusList.map((item) => (
                            <Column
                                key={item}
                                title={item}
                                cardList={tasks.filter((card) => card.status === item)}
                            />
                        ))}

                    </S.StyledMainContent>
                </S.MainBlock>
            </div>
        </main>
    );
}

export default Main;