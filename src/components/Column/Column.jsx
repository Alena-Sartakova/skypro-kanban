import Card from "../Card/Card";
import *as S from "./Column.styled";

const Column = ({ title, cardList }) => {
    return (<div className="main__column">
        <S.ColumnTitle>
            <p>{title}</p>
        </S.ColumnTitle>
        <S.StyledCard>
            {cardList.map((card) => (
                <Card
                    title={card.title}
                    theme={card.theme}
                    date={card.date}
                    key={card._id}
                    id={card._id}
                />
            ))}
        </S.StyledCard>
    </div>);
}

export default Column;