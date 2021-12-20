#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ create-micro-service

	Options
		--name  Your project's name.

	Examples
	  $ create-micro-service --name=order-service

`);

render(React.createElement(ui, cli.flags));
