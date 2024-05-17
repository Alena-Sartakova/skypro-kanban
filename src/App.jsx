
import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header/Header';
import Main from './components/Main/Main';


import { cardList } from './components/data';

function App() {
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
		<div className="wrapper">

			<Header addCard={addCard} />

			<Main cardList={cards} isLoaded={isLoaded} />

		</div>
	);

}

export default App
