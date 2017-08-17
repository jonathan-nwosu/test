'use strict';
const Restify = require('restify');
const server  = Restify.createServer ({
	name: "MoneyBot"
});

const PORT = process.env.PORT || 4000;

server.use(Restify.plugins.bodyParser());
server.use(Restify.plugins.jsonp());

//POST route handler
server.post('/',(req, res, next) => {
	let {
		status,
		result
	} = req.body;

	if(status.code === 200 && result.action === 'convert'){
		const {
			outputCurrency,
			amountToConvert
		} = result.parameters;

		//check if input currency code === output currency code
		if(amountToConvert.currency === outputCurrency){
			const {
				amount,
				currency
			} = amountToConvert;
			let responseText = `Well, ${amount} ${outputCurrency} is obviously eual to ${amount} ${outputCurrency}!`;
			res.json({
				speech: responseText,
				displayText: responseText,
				source: "moneybot-webhook"
			})
		} else {
			//query the fixer.io api
		}
	}

	console.log(result);

	return next();
});

server.listen(PORT, () => console.log(`MoneyBot running on ${PORT}`));