const degit = require("degit");
const { join } = require("path");
const writePackage = require("write-pkg");
const { install } = require("pkg-install");

exports.clone = async (name) => {
	const emitter = degit("github:kazi-faas/function-template-js");
	await emitter.clone(`./${name}`);
};

exports.addPackageJson = async (name) => {
	const pkg = {
		name,
		description: "A function which responds to HTTP requests",
		main: "index.js",
		scripts: {
			start: "micro",
			dev: "micro-dev",
		},
	};

	await writePackage(join(process.cwd(), name, "package.json"), pkg);
};

exports.installDependencies = async (name) => {
	const dir = join(process.cwd(), name);
	await install({ micro: "^9.3.4" }, { cwd: dir });
	await install({ "micro-dev": "^3.0.0" }, { cwd: dir, dev: true });
};
