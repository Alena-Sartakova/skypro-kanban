import Column from "../Column/Column";
import { cardList, statusList } from "../data";

function Main({ cardList, isLoaded }) {
    return (
        <main className="main">
            <div className="container">
                <div className="main__block">
                    <div className="main__content">
                        {isLoaded ? "Загрузка..." : statusList.map((item) => (
                            <Column
                                key={item}
                                title={item}
                                cardList={cardList.filter((card) => card.status === item)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;