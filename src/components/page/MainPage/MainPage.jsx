import { useEffect, useState } from 'react';
import { Wrapper } from '../LoginPage/LoginPage.styled';
import Main from '../../Main/Main';
import { Header } from '../../Header/Header.styled';
import { cardList } from '../../data';
import { Outlet } from 'react-router-dom';

function MainPage() {
    const [cards, setCards] = useState(cardList);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(false);
        }, 2000);
    }, []);

    function addCard() {
        setCards([
            ...cards,
            {
                id: cards.length + 1,
                theme: "Research",
                title: "Нужно сделать",
                date: "30.11.23",
                status: "Без статуса",
            },
        ]);
    }

    return (
        <Wrapper>
            <Outlet />
            <Header addCard={addCard} />

            <Main cardList={cards} isLoaded={isLoaded} />
        </Wrapper>

    );

}

export default MainPage