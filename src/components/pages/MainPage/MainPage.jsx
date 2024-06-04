import { useEffect, useState } from 'react';

import Main from '../../Main/Main';
import Header from '../../Header/Header';


import NewCardPopup from '../../popups/NewCard/NewCard';
import { Outlet } from 'react-router-dom';
import { Wrapper } from '../LoginPage/LoginPage.styled';
import { getCadrs } from '../../../api';
import { Loader } from '../../Main/Main.styled';
import { useUser } from '../../../hooks/useUser';
import { useTasks } from '../../../hooks/useTasks';



function MainPage() {
  // const [cards, setCards] = useState(cardList);
  const [isLoaded, setIsLoaded] = useState(true);
  const { user } = useUser();
  const { setTasks } = useTasks();
  const [error, setError] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    }, 2000); // 2 секунды задержки
  }, []);

  useEffect(() => {
    const onCards = async () => {
      try {
        setIsLoaded(true);
        const response = await getCadrs({ token: user.token });
        console.log(response);
        setTasks(response.tasks);
      } catch (error) {
        console.error(error);
        setError("Не удалось загрузить данные, попробуйте позже");
      } finally {
        setIsLoaded(false);
      }
    };
    onCards();
  }, [setTasks, user.token]);

  // function addCard() {
  //   setTasks([
  //     ...cards,
  //     {
  //       id: cards.length + 1,
  //       theme: "Research",
  //       title: "Нужно сделать",
  //       date: "30.11.23",
  //       status: "Без статуса",
  //     },
  //   ]);
  // }

  return (
    <Wrapper>

      <Outlet />

      <NewCardPopup />
      <Header />
      {isLoaded ? <Loader>Данные загружаются...</Loader> : <Main />}
      {error && <span style={{ color: "red" }}>Случилась ошибка</span>}
    </Wrapper>

  );

}

export default MainPage