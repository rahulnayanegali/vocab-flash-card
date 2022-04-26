// import { Nodehun } from 'nodehun'
const Nodehun = require('nodehun')
const fs          = require('fs')
const affix       = fs.readFileSync('path/to/*.aff')
const dictionary  = fs.readFileSync('path/to/*.dic')

const nodehun     = new Nodehun(affix, dictionary)

// Promise example
nodehun.suggest('colour')
		   .then(suggestions => { })

// async/await example
async function example() {
	const suggestions = await nodehun.suggest('colour')
}

// sync example
const suggestions = nodehun.suggestSync('colour')