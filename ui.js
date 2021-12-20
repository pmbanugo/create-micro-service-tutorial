"use strict";
const React = require("react");
const { Task, TaskList } = require("ink-task-list");
const { addPackageJson, clone, installDependencies } = require("./init");

const App = ({ name = "micro-service" }) => {
	const [tasks, setTasks] = React.useState([
		{ state: "loading", label: "Downloading files." },
	]);

	React.useEffect(() => {
		async function scaffold() {
			await clone(name);
			setTasks([
				{ state: "success", label: "Downloaded files." },
				{ state: "loading", label: "Adding package.json." },
			]);

			await addPackageJson(name);
			setTasks((prevState) => [
				{ ...prevState[0] },
				{ state: "success", label: "Added package.json." },
				{ state: "loading", label: "Installing dependencies." },
			]);

			await installDependencies(name);
			setTasks((prevState) => [
				{ ...prevState[0] },
				{ ...prevState[1] },
				{ state: "success", label: "Installed dependencies." },
			]);
		}

		scaffold();
	}, []);

	return (
		<TaskList>
			{tasks.map(({ label, state }, index) => (
				<Task key={index} label={label} state={state} />
			))}
		</TaskList>
	);
};

module.exports = App;
