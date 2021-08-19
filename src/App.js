import './App.css';
import Header from './Pages/Header';

import IndexUser from './User/IndexUser';
import Login from './User/Login'
import Dash from './User/Dash.jsx'
import IndexPoll from './Poll/IndexPoll.jsx'

// import { BrowserRouter as Router, Route } from 'react-';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Route path="/IndexUser" component={IndexUser} />
				<Route path="/Login" component={Login} />
				<Route path="/Dash" component={Dash} />
				<Route path="/IndexPoll" component={IndexPoll} />

			</Router>


		</div>
	);
}

export default App;
