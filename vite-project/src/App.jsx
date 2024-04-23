
import './App.css'
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import BrowsePopup from './components/popups/Browse/Browse';
import ExitPopup from './components/popups/Exit/Exit';
import NewCardPopup from './components/popups/NewCard/NewCard';

function App() {


	return (
		<div className="wrapper">
			<ExitPopup />

			<NewCardPopup />

			<BrowsePopup />

			<Header />

			<Main />

		</div>
	);

}

export default App
