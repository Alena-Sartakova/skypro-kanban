
import './App.css'
import { AppRoutes } from './AppRoutes';
import { ThemeProvider } from 'styled-components';

function App() {
	

	return (
		<ThemeProvider >
	  <AppRoutes/>
		</ThemeProvider>
	)
}

export default App
