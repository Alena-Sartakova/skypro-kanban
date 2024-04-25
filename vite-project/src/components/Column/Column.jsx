import Card from "../Card/Card";
import { cardList } from "../data";

const Column = ({ title, cardList }) => {
    return (<div className="main__column">
        <div className="column__title">
            <p>{title}</p>
        </div>
        <div className="cards">
            {cardList.map((card) => (
                <Card
                    title={card.title}
                    theme={card.theme}
                    date={card.date}
                    key={card.id}
                />
            ))}
        </div>
    </div>);
}

export default Column;