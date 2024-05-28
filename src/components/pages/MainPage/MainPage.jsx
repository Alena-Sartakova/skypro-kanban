import { useEffect, useState } from 'react';

import Main from '../../Main/Main';
import  Header  from '../../Header/Header';
import { cardList } from '../../data';

import NewCardPopup from '../../popups/NewCard/NewCard';
import { Outlet } from 'react-router-dom';
import { Wrapper } from '../LoginPage/LoginPage.styled';
import BrowsePopup from '../../popups/Browse/Browse';


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
            
            <NewCardPopup />
            <Header addCard={addCard} />

            <Main cardList={cards} isLoaded={isLoaded} />
        </Wrapper>

    );

}

export default MainPage