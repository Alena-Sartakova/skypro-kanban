import Column from "../Column/Column";
import { statusList } from "../data";
import * as S from "./Main.styled.js";

function Main({ cardList, isLoaded }) {
    return (

        <main className="main">
            <div className="container">
                <S.MainBlock>
                    <S.StyledMainContent>

                        {isLoaded ? "Загрузка..." : statusList.map((item) => (
                            <Column
                                key={item}
                                title={item}
                                cardList={cardList.filter((card) => card.status === item)}
                            />
                        ))}

                    </S.StyledMainContent>
                </S.MainBlock>
            </div>
        </main>
    );
}

export default Main;