// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const estimator = require('us-tax-estimator');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  let body = request.body;
  const entityToStatusMap = {
    "Single" : "single",
    "Married - Filing Jointly" : "marriedFilingJointly",
    "Married - Filing Separately" : "marriedFilingSeparately",
    "Head Of Household" : "headOfHousehold",
  };

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function calculateFederalTaxes(agent) {
    const queryResult  = request.body.queryResult;
    const outputContext = queryResult.outputContexts || [];
	const params = outputContext[0].parameters;
    let filingStatus = entityToStatusMap[params.estimate_filing_status];
    let unitCurrency = params['unit-currency'];

    const amt = unitCurrency.amount;
    const currency = unitCurrency.currency;
    const exemptions = 1;
    const deduction = estimator.constants.standardDeduction[2019][filingStatus];

    const estimate = estimator.calculate(
      "2019",
      filingStatus,
      amt,
      exemptions,
      deduction
    );

    const response = "Done! Here's a summary of your federal taxes: \n\nYour taxable income is: $" + estimate.taxableIncome.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "\n\nYour total federal taxes due are: $"+ estimate.tax.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "\n\nYour effective tax rate is: " + estimate.effectiveTaxRate.toFixed(2) + "% \n\nAccountbot is for informational purposes only and is not intended to provide tax advice. \n\nDo you want to do your State taxes?";
    agent.add(response);
  }

  function calculateHomeOfficeDeduction(agent){
    let body = request.body;

    const queryResult  = request.body.queryResult;
    const outputContext = queryResult.outputContexts || [];
   	console.log('outputContext', JSON.stringify(outputContext, null, 2));

	const params = outputContext[0].parameters;
	let unitNumber = params['unit-number'];
	let deduction = unitNumber * 5;
	const response = "Your deduction is" + deduction.toString(10);
	agent.add(response);
  }

  let intentMap = new Map();
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('estimate_taxes.income', calculateFederalTaxes);
  intentMap.set('Home_office_deduction - yess - yes', calculateHomeOfficeDeduction);

  agent.handleRequest(intentMap);
});
