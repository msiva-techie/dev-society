import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/layout/NotFound";

if (localStorage.getItem("token")) {
	setAuthToken();
}

const WithContainer = () => {
	return (
		<section className="container">
			<div>
				<Alert />
			</div>

			<Switch>
				<Route exact path="/developers" component={Profiles} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/profile/:id" component={Profile} />
				<PrivateRoute exact path="/posts" component={Posts} />
				<PrivateRoute exact path="/post/:id" component={Post} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
				<PrivateRoute exact path="/edit-profile" component={EditProfile} />
				<PrivateRoute exact path="/add-experience" component={AddExperience} />
				<PrivateRoute exact path="/add-education" component={AddEducation} />
				<PrivateRoute exact path="/create-profile" component={CreateProfile} />
				<Route component={NotFound} />
			</Switch>
		</section>
	);
};
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={WithContainer} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
