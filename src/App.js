import React from "react";
import Grid from "./grid/Grid";
import "./App.css";
import Nav from "./components/nav/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Blog from "./components/blog/Blog";
import Error from "./components/error/Error";
import State from "./components/statehook/State";
import Details from "./components/details/Details";
import Create from "./components/create/Create";

const App = () => {
	function qst() {
		return `How are you today?`;
	}
	return (
		<div className="App">
			<Nav />
			{/* <State /> */}
			{/* <Grid /> */}
			<Routes>
				{/* place your route here */}
				<Route
					path="/"
					element={
						<Home
							title={"Mr."}
							name={"Seth"}
							question={qst}
						/>
					}
				/>
				<Route
					path="/about"
					element={<About />}
				/>
				<Route
					path="/blog"
					element={<Blog />}
				/>
				<Route
					path="/create"
					element={<Create />}
				/>
				<Route
					path="/blog/:id"
					element={<Details />}
				/>
				<Route
					path="*"
					element={<Error />}
				/>
			</Routes>
		</div>
	);
};

export default App;
