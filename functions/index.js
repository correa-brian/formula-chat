// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const stateMap = {"alabama":{"single":{"rates":[{"rate":0.02,"upTo":500},{"rate":0.04,"upTo":3000},{"rate":0.05,"upTo":3001}],"standardDeduction":2500},"married":{"rates":[{"rate":0.02,"upTo":1000},{"rate":0.04,"upTo":6000},{"rate":0.05,"upTo":6001}],"standardDeduction":7500}},"alaska":{"single":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0},"married":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0}},"arizona":{"single":{"rates":[{"rate":0.0259,"upTo":11047},{"rate":0.0288,"upTo":27614},{"rate":0.0336,"upTo":55226},{"rate":0.0424,"upTo":165674},{"rate":0.0454,"upTo":165675}],"standardDeduction":5535},"married":{"rates":[{"rate":0.0259,"upTo":22092},{"rate":0.0288,"upTo":55226},{"rate":0.0336,"upTo":110450},{"rate":0.0424,"upTo":331346},{"rate":0.0454,"upTo":331347}],"standardDeduction":11059}},"arkansas":{"single":{"rates":[{"rate":0.009,"upTo":4500},{"rate":0.025,"upTo":8900},{"rate":0.035,"upTo":13400},{"rate":0.045,"upTo":22200},{"rate":0.05,"upTo":37200},{"rate":0.069,"upTo":37201}],"standardDeduction":2200},"married":{"rates":[{"rate":0.009,"upTo":4500},{"rate":0.025,"upTo":8900},{"rate":0.035,"upTo":13400},{"rate":0.045,"upTo":22200},{"rate":0.05,"upTo":37200},{"rate":0.069,"upTo":37201}],"standardDeduction":4400}},"california":{"single":{"rates":[{"rate":0.01,"upTo":8544},{"rate":0.02,"upTo":20255},{"rate":0.04,"upTo":31969},{"rate":0.06,"upTo":44377},{"rate":0.08,"upTo":56085},{"rate":0.093,"upTo":286492},{"rate":0.103,"upTo":343788},{"rate":0.113,"upTo":572980},{"rate":0.123,"upTo":1000},{"rate":0.133,"upTo":1000}],"standardDeduction":4401},"married":{"rates":[{"rate":0.01,"upTo":17088},{"rate":0.02,"upTo":40510},{"rate":0.04,"upTo":63938},{"rate":0.06,"upTo":88754},{"rate":0.08,"upTo":112170},{"rate":0.093,"upTo":572984},{"rate":0.103,"upTo":687576},{"rate":0.113,"upTo":1000},{"rate":0.123,"upTo":1145},{"rate":0.133,"upTo":1145}],"standardDeduction":8802}},"colorado":{"single":{"rates":[{"rate":0.0463,"upTo":1}],"standardDeduction":12200},"married":{"rates":[{"rate":0.0463,"upTo":1}],"standardDeduction":24400}},"connecticut":{"single":{"rates":[{"rate":0.03,"upTo":10000},{"rate":0.05,"upTo":50000},{"rate":0.055,"upTo":100000},{"rate":0.06,"upTo":200000},{"rate":0.065,"upTo":250000},{"rate":0.069,"upTo":500000},{"rate":0.0699,"upTo":500001}],"standardDeduction":0},"married":{"rates":[{"rate":0.03,"upTo":20000},{"rate":0.05,"upTo":100000},{"rate":0.055,"upTo":200000},{"rate":0.06,"upTo":400000},{"rate":0.065,"upTo":500000},{"rate":0.069,"upTo":1000},{"rate":0.0699,"upTo":1000}],"standardDeduction":0}},"delaware":{"single":{"rates":[{"rate":0,"upTo":2000},{"rate":0.022,"upTo":5000},{"rate":0.039,"upTo":10000},{"rate":0.048,"upTo":20000},{"rate":0.052,"upTo":25000},{"rate":0.0555,"upTo":60000},{"rate":0.066,"upTo":60001}],"standardDeduction":3250},"married":{"rates":[{"rate":0.022,"upTo":2000},{"rate":0.022,"upTo":5000},{"rate":0.039,"upTo":10000},{"rate":0.048,"upTo":20000},{"rate":0.052,"upTo":25000},{"rate":0.0555,"upTo":60000},{"rate":0.066,"upTo":60001}],"standardDeduction":6500}},"florida":{"single":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0},"married":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0}},"georgia":{"single":{"rates":[{"rate":0.01,"upTo":750},{"rate":0.02,"upTo":2250},{"rate":0.03,"upTo":3750},{"rate":0.04,"upTo":5250},{"rate":0.05,"upTo":7000},{"rate":0.0575,"upTo":7001}],"standardDeduction":4600},"married":{"rates":[{"rate":0.01,"upTo":1000},{"rate":0.02,"upTo":3000},{"rate":0.03,"upTo":5000},{"rate":0.04,"upTo":7000},{"rate":0.05,"upTo":10000},{"rate":0.0575,"upTo":10001}],"standardDeduction":6000}},"hawaii":{"single":{"rates":[{"rate":0.014,"upTo":2400},{"rate":0.032,"upTo":4800},{"rate":0.055,"upTo":9600},{"rate":0.064,"upTo":14400},{"rate":0.068,"upTo":19200},{"rate":0.072,"upTo":24000},{"rate":0.076,"upTo":36000},{"rate":0.079,"upTo":48000},{"rate":0.0825,"upTo":150000},{"rate":0.09,"upTo":175000},{"rate":0.1,"upTo":200000},{"rate":0.11,"upTo":200001}],"standardDeduction":2200},"married":{"rates":[{"rate":0.014,"upTo":4800},{"rate":0.032,"upTo":9600},{"rate":0.055,"upTo":19200},{"rate":0.064,"upTo":28800},{"rate":0.068,"upTo":38400},{"rate":0.072,"upTo":48000},{"rate":0.076,"upTo":72000},{"rate":0.079,"upTo":96000},{"rate":0.0825,"upTo":300000},{"rate":0.09,"upTo":350000},{"rate":0.1,"upTo":400000},{"rate":0.11,"upTo":400001}],"standardDeduction":4400}},"idaho":{"single":{"rates":[{"rate":0.0113,"upTo":1541},{"rate":0.0313,"upTo":3081},{"rate":0.0362,"upTo":4622},{"rate":0.0463,"upTo":6162},{"rate":0.0563,"upTo":7703},{"rate":0.0663,"upTo":11554},{"rate":0.0693,"upTo":11555}],"standardDeduction":12200},"married":{"rates":[{"rate":0.0113,"upTo":3081},{"rate":0.0313,"upTo":6162},{"rate":0.0362,"upTo":9243},{"rate":0.0463,"upTo":12324},{"rate":0.0563,"upTo":15405},{"rate":0.0663,"upTo":23108},{"rate":0.0693,"upTo":23109}],"standardDeduction":24400}},"illinois":{"single":{"rates":[{"rate":0.0495,"upTo":1}],"standardDeduction":0},"married":{"rates":[{"rate":0.0495,"upTo":1}],"standardDeduction":0}},"indiana":{"single":{"rates":[{"rate":0.0323,"upTo":1}],"standardDeduction":0},"married":{"rates":[{"rate":0.0323,"upTo":1}],"standardDeduction":0}},"iowa":{"single":{"rates":[{"rate":0.0033,"upTo":1638},{"rate":0.0067,"upTo":3276},{"rate":0.0225,"upTo":6552},{"rate":0.0414,"upTo":14742},{"rate":0.0563,"upTo":24570},{"rate":0.0596,"upTo":32760},{"rate":0.0625,"upTo":49140},{"rate":0.0744,"upTo":73710},{"rate":0.0853,"upTo":73711}],"standardDeduction":2080},"married":{"rates":[{"rate":0.0033,"upTo":1638},{"rate":0.0067,"upTo":3276},{"rate":0.0225,"upTo":6552},{"rate":0.0414,"upTo":14742},{"rate":0.0563,"upTo":24570},{"rate":0.0596,"upTo":32760},{"rate":0.0625,"upTo":49140},{"rate":0.0744,"upTo":73710},{"rate":0.0853,"upTo":73711}],"standardDeduction":5120}},"kansas":{"single":{"rates":[{"rate":0,"upTo":2500},{"rate":0.031,"upTo":15000},{"rate":0.0525,"upTo":30000},{"rate":0.057,"upTo":30001}],"standardDeduction":3000},"married":{"rates":[{"rate":0,"upTo":5000},{"rate":0.031,"upTo":30000},{"rate":0.0525,"upTo":60000},{"rate":0.057,"upTo":60001}],"standardDeduction":7500}},"kentucky":{"single":{"rates":[{"rate":0.05,"upTo":1}],"standardDeduction":2590},"married":{"rates":[{"rate":0.05,"upTo":0}],"standardDeduction":5180}},"louisiana":{"single":{"rates":[{"rate":0.02,"upTo":12500},{"rate":0.04,"upTo":50000},{"rate":0.06,"upTo":50001}],"standardDeduction":0},"married":{"rates":[{"rate":0.02,"upTo":25000},{"rate":0.04,"upTo":100000},{"rate":0.06,"upTo":100001}],"standardDeduction":0}},"maine":{"single":{"rates":[{"rate":0.058,"upTo":21850},{"rate":0.0675,"upTo":51700},{"rate":0.0715,"upTo":51701}],"standardDeduction":12200},"married":{"rates":[{"rate":0.058,"upTo":43700},{"rate":0.0675,"upTo":103400},{"rate":0.0715,"upTo":103401}],"standardDeduction":24400}},"maryland":{"single":{"rates":[{"rate":0.02,"upTo":1000},{"rate":0.03,"upTo":2000},{"rate":0.04,"upTo":3000},{"rate":0.0475,"upTo":100000},{"rate":0.05,"upTo":125000},{"rate":0.0525,"upTo":150000},{"rate":0.055,"upTo":250000},{"rate":0.0575,"upTo":250001}],"standardDeduction":2300},"married":{"rates":[{"rate":0.02,"upTo":1000},{"rate":0.03,"upTo":2000},{"rate":0.04,"upTo":3000},{"rate":0.0475,"upTo":150000},{"rate":0.05,"upTo":175000},{"rate":0.0525,"upTo":225000},{"rate":0.055,"upTo":300000},{"rate":0.0575,"upTo":300001}],"standardDeduction":4600}},"massachusetts":{"single":{"rates":[{"rate":0.0505,"upTo":1}],"standardDeduction":0},"married":{"rates":[{"rate":0.0505,"upTo":1}],"standardDeduction":0}},"michigan":{"single":{"rates":[{"rate":0.0425,"upTo":1}],"standardDeduction":0},"married":{"rates":[{"rate":0.0425,"upTo":1}],"standardDeduction":0}},"minnesota":{"single":{"rates":[{"rate":0.0535,"upTo":26520},{"rate":0.0705,"upTo":87110},{"rate":0.0785,"upTo":163890},{"rate":0.0985,"upTo":163891}],"standardDeduction":6650},"married":{"rates":[{"rate":0.0535,"upTo":38770},{"rate":0.0705,"upTo":154020},{"rate":0.0785,"upTo":273150},{"rate":0.0985,"upTo":273151}],"standardDeduction":13300}},"mississippi":{"single":{"rates":[{"rate":0,"upTo":1000},{"rate":0.03,"upTo":5000},{"rate":0.04,"upTo":10000},{"rate":0.05,"upTo":10001}],"standardDeduction":2300},"married":{"rates":[{"rate":0,"upTo":1000},{"rate":0.03,"upTo":5000},{"rate":0.04,"upTo":10000},{"rate":0.05,"upTo":10001}],"standardDeduction":4600}},"missouri":{"single":{"rates":[{"rate":0.015,"upTo":1053},{"rate":0.02,"upTo":2106},{"rate":0.025,"upTo":3159},{"rate":0.03,"upTo":4212},{"rate":0.035,"upTo":5265},{"rate":0.04,"upTo":6318},{"rate":0.045,"upTo":7371},{"rate":0.05,"upTo":8424},{"rate":0.054,"upTo":8425}],"standardDeduction":12200},"married":{"rates":[{"rate":0.015,"upTo":1053},{"rate":0.02,"upTo":2106},{"rate":0.025,"upTo":3159},{"rate":0.03,"upTo":4212},{"rate":0.035,"upTo":5265},{"rate":0.04,"upTo":6318},{"rate":0.045,"upTo":7371},{"rate":0.05,"upTo":8424},{"rate":0.054,"upTo":8425}],"standardDeduction":24400}},"montana":{"single":{"rates":[{"rate":0.01,"upTo":3100},{"rate":0.02,"upTo":5400},{"rate":0.03,"upTo":8200},{"rate":0.04,"upTo":11100},{"rate":0.05,"upTo":14300},{"rate":0.06,"upTo":18400},{"rate":0.069,"upTo":18401}],"standardDeduction":4710},"married":{"rates":[{"rate":0.01,"upTo":3100},{"rate":0.02,"upTo":5400},{"rate":0.03,"upTo":8200},{"rate":0.04,"upTo":11100},{"rate":0.05,"upTo":14300},{"rate":0.06,"upTo":18400},{"rate":0.069,"upTo":18401}],"standardDeduction":9420}},"nebraska":{"single":{"rates":[{"rate":0.0246,"upTo":3290},{"rate":0.0351,"upTo":19720},{"rate":0.0501,"upTo":31780},{"rate":0.0684,"upTo":31781}],"standardDeduction":7050},"married":{"rates":[{"rate":0.0246,"upTo":6570},{"rate":0.0351,"upTo":39450},{"rate":0.0501,"upTo":63550},{"rate":0.0684,"upTo":63551}],"standardDeduction":14100}},"nevada":{"single":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0},"married":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0}},"new hampshire":{"single":{"rates":[{"rate":0.05,"upTo":0}],"standardDeduction":0},"married":{"rates":[{"rate":0.05,"upTo":0}],"standardDeduction":0}},"new jersey":{"single":{"rates":[{"rate":0.014,"upTo":20000},{"rate":0.0175,"upTo":35000},{"rate":0.035,"upTo":40000},{"rate":0.0553,"upTo":75000},{"rate":0.0637,"upTo":500000},{"rate":0.0897,"upTo":5000},{"rate":0.1075,"upTo":5000}],"standardDeduction":0},"married":{"rates":[{"rate":0.014,"upTo":20000},{"rate":0.0175,"upTo":50000},{"rate":0.0245,"upTo":70000},{"rate":0.035,"upTo":80000},{"rate":0.0553,"upTo":150000},{"rate":0.0637,"upTo":500000},{"rate":0.0897,"upTo":5000},{"rate":0.1075,"upTo":5000}],"standardDeduction":0}},"new mexico":{"single":{"rates":[{"rate":0.017,"upTo":5500},{"rate":0.032,"upTo":11000},{"rate":0.047,"upTo":16000},{"rate":0.049,"upTo":16001}],"standardDeduction":12200},"married":{"rates":[{"rate":0.017,"upTo":8000},{"rate":0.032,"upTo":16000},{"rate":0.047,"upTo":24000},{"rate":0.049,"upTo":24001}],"standardDeduction":24400}},"new york":{"single":{"rates":[{"rate":0.04,"upTo":8500},{"rate":0.045,"upTo":11700},{"rate":0.0525,"upTo":13900},{"rate":0.059,"upTo":21400},{"rate":0.0621,"upTo":80650},{"rate":0.0649,"upTo":215400},{"rate":0.0685,"upTo":1077},{"rate":0.0882,"upTo":1077}],"standardDeduction":8000},"married":{"rates":[{"rate":0.04,"upTo":17150},{"rate":0.045,"upTo":23600},{"rate":0.0525,"upTo":27900},{"rate":0.059,"upTo":43000},{"rate":0.0621,"upTo":161550},{"rate":0.0649,"upTo":323200},{"rate":0.0685,"upTo":2155},{"rate":0.0882,"upTo":2155}],"standardDeduction":16050}},"north carolina":{"single":{"rates":[{"rate":0.0525,"upTo":1}],"standardDeduction":10000},"married":{"rates":[{"rate":0.0525,"upTo":0}],"standardDeduction":20000}},"north dakota":{"single":{"rates":[{"rate":0.011,"upTo":39450},{"rate":0.0204,"upTo":95500},{"rate":0.0227,"upTo":199250},{"rate":0.0264,"upTo":433200},{"rate":0.029,"upTo":433201}],"standardDeduction":null},"married":{"rates":[{"rate":0.011,"upTo":0},{"rate":0.0204,"upTo":65900},{"rate":0.0227,"upTo":159200},{"rate":0.0264,"upTo":242550},{"rate":0.029,"upTo":433200}],"standardDeduction":0}},"ohio":{"single":{"rates":[{"rate":0,"upTo":10850},{"rate":0.0198,"upTo":16300},{"rate":0.0275,"upTo":21750},{"rate":0.0297,"upTo":43450},{"rate":0.0347,"upTo":86900},{"rate":0.0396,"upTo":108700},{"rate":0.046,"upTo":217400},{"rate":0.05,"upTo":217401}],"standardDeduction":0},"married":{"rates":[{"rate":0,"upTo":10850},{"rate":0.0198,"upTo":16300},{"rate":0.0275,"upTo":21750},{"rate":0.0297,"upTo":43450},{"rate":0.0347,"upTo":86900},{"rate":0.0396,"upTo":108700},{"rate":0.046,"upTo":217400},{"rate":0.05,"upTo":217401}],"standardDeduction":0}},"oklahoma":{"single":{"rates":[{"rate":0.005,"upTo":1000},{"rate":0.01,"upTo":2500},{"rate":0.02,"upTo":3750},{"rate":0.03,"upTo":4900},{"rate":0.04,"upTo":7200},{"rate":0.05,"upTo":7201}],"standardDeduction":6350},"married":{"rates":[{"rate":0.005,"upTo":2000},{"rate":0.01,"upTo":5000},{"rate":0.02,"upTo":7500},{"rate":0.03,"upTo":9800},{"rate":0.04,"upTo":12200},{"rate":0.05,"upTo":12201}],"standardDeduction":12700}},"oregon":{"single":{"rates":[{"rate":0.05,"upTo":3550},{"rate":0.07,"upTo":8900},{"rate":0.09,"upTo":125000},{"rate":0.099,"upTo":125001}],"standardDeduction":2270},"married":{"rates":[{"rate":0.05,"upTo":7100},{"rate":0.07,"upTo":17800},{"rate":0.09,"upTo":250000},{"rate":0.099,"upTo":250001}],"standardDeduction":4545}},"pennsylvania":{"single":{"rates":[{"rate":0.0307,"upTo":1}],"standardDeduction":0},"married":{"rates":[{"rate":0.0307,"upTo":0}],"standardDeduction":0}},"rhode island":{"single":{"rates":[{"rate":0.0375,"upTo":64050},{"rate":0.0475,"upTo":145600},{"rate":0.0599,"upTo":145601}],"standardDeduction":8750},"married":{"rates":[{"rate":0.0375,"upTo":64050},{"rate":0.0475,"upTo":145600},{"rate":0.0599,"upTo":145601}],"standardDeduction":17500}},"south carolina":{"single":{"rates":[{"rate":0.011,"upTo":2450},{"rate":0.03,"upTo":4900},{"rate":0.04,"upTo":7350},{"rate":0.05,"upTo":9800},{"rate":0.06,"upTo":12250},{"rate":0.07,"upTo":12251}],"standardDeduction":12200},"married":{"rates":[{"rate":0.011,"upTo":2450},{"rate":0.03,"upTo":4900},{"rate":0.04,"upTo":7350},{"rate":0.05,"upTo":9800},{"rate":0.06,"upTo":12250},{"rate":0.07,"upTo":12251}],"standardDeduction":24400}},"south dakota":{"single":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0},"married":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0}},"tennessee":{"single":{"rates":[{"rate":0.02,"upTo":1}],"standardDeduction":0},"married":{"rates":[{"rate":0.02,"upTo":1}],"standardDeduction":0}},"texas":{"single":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0},"married":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0}},"utah":{"single":{"rates":[{"rate":0.0495,"upTo":1}],"standardDeduction":0},"married":{"rates":[{"rate":0.0495,"upTo":0}],"standardDeduction":0}},"vermont":{"single":{"rates":[{"rate":0.0335,"upTo":39600},{"rate":0.066,"upTo":95900},{"rate":0.076,"upTo":200100},{"rate":0.0875,"upTo":200101}],"standardDeduction":6100},"married":{"rates":[{"rate":0.0335,"upTo":66150},{"rate":0.066,"upTo":159850},{"rate":0.076,"upTo":243650},{"rate":0.0875,"upTo":243651}],"standardDeduction":12200}},"virginia":{"single":{"rates":[{"rate":0.02,"upTo":3000},{"rate":0.03,"upTo":5000},{"rate":0.05,"upTo":17000},{"rate":0.0575,"upTo":17001}],"standardDeduction":3000},"married":{"rates":[{"rate":0.02,"upTo":3000},{"rate":0.03,"upTo":5000},{"rate":0.05,"upTo":17000},{"rate":0.0575,"upTo":17001}],"standardDeduction":6000}},"washington":{"single":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0},"married":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0}},"washington d.c.":{"single":{"rates":[{"rate":0.04,"upTo":10000},{"rate":0.06,"upTo":40000},{"rate":0.065,"upTo":60000},{"rate":0.085,"upTo":350000},{"rate":0.0875,"upTo":1000},{"rate":0.0895,"upTo":1000}],"standardDeduction":12200},"married":{"rates":[{"rate":0.04,"upTo":10000},{"rate":0.06,"upTo":40000},{"rate":0.065,"upTo":60000},{"rate":0.085,"upTo":350000},{"rate":0.0875,"upTo":1000},{"rate":0.0895,"upTo":1000}],"standardDeduction":24400}},"west virginia":{"single":{"rates":[{"rate":0.03,"upTo":10000},{"rate":0.04,"upTo":25000},{"rate":0.045,"upTo":40000},{"rate":0.06,"upTo":60000},{"rate":0.065,"upTo":60001}],"standardDeduction":0},"married":{"rates":[{"rate":0.03,"upTo":10000},{"rate":0.04,"upTo":25000},{"rate":0.045,"upTo":40000},{"rate":0.06,"upTo":60000},{"rate":0.065,"upTo":60001}],"standardDeduction":0}},"wisconsin":{"single":{"rates":[{"rate":0.04,"upTo":11760},{"rate":0.0584,"upTo":23520},{"rate":0.0627,"upTo":258950},{"rate":0.0765,"upTo":258951}],"standardDeduction":10860},"married":{"rates":[{"rate":0.04,"upTo":15680},{"rate":0.0584,"upTo":31360},{"rate":0.0627,"upTo":345270},{"rate":0.0765,"upTo":345271}],"standardDeduction":20110}},"wyoming":{"single":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0},"married":{"rates":[{"rate":0,"upTo":0}],"standardDeduction":0}}};

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

  function calculateStateIncomeTaxes(agent) {
    const queryResult  = request.body.queryResult;
    let outputContext = queryResult.outputContexts[1];
    let stateInput = outputContext.parameters.us_state;
    let filingStatus = outputContext.parameters.estimate_filing_status;
    let income = outputContext.parameters["unit-currency"].amount;

    // check if status should be reduced to single or married
    if (filingStatus === "Single" || filingStatus === "Married - Filing Separately" ) {
        filingStatus = "single";
    } else {
      filingStatus = "married";
    }

    // Step 1: get state
    let stateTaxInfo = stateMap[stateInput];

    // Step 2: filing status
    let taxStatus = stateTaxInfo[filingStatus];
    let rates = taxStatus.rates;
    let standardDeduction = taxStatus.standardDeduction;

    // Step 3: get income
    // Step 4: subtract standard deduction from income
    let taxableIncome = income - standardDeduction;

    // When taxable income is negative, then its a credit
    if (taxableIncome < 0) {
      agent.add("You may qualify for a refund! Based on your income your estimated state refund is $" + Math.abs(taxableIncome.toFixed(2)));
      return;
    }

	  // Step 5: calculate progressive income tax
	  let taxesOwed = 0;

  	// loop through all the possible tax rates
  	for (let i =0; i < rates.length; i++) {
  		let rateInfo = rates[i];
  		// upTo = how much gets taxed at that a given rate
  		let upTo = rateInfo.upTo;
  		// rate = tax rate
  		let rate = rateInfo.rate;

  		// Taxable income is greater than upTo value. subtract the upTo and add to taxesOwed
  		// If we're not at the end of the tax rates, then additional income will be taxed at higher rates
  		if (taxableIncome > upTo && i !== rates.length - 1) {
  			let taxes = upTo * rate;
  			taxableIncome = taxableIncome - upTo;
  			taxesOwed += taxes;
  		} else if (taxableIncome > upTo && i === rates.length - 1) {
  			// we're in the last tax bracket. tax what's left at this rate.
  			// this will break out of the for loop since we're at the end of the array
  			taxesOwed += taxableIncome * rate;
  		} else if (taxableIncome < upTo) {
  			// the is the last rate that applies to this income. Calculate taxes owed and exit the for-loop.
  			taxesOwed += taxableIncome * rate;
  			break;
  		}
  	}

    agent.add(`Your estimated state taxes are $` + taxesOwed.toFixed(2));
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
	  const params = outputContext[0].parameters;
    let unitNumber = params['unit-number'];
    let deduction = 0;

    if (unitNumber < 300 && unitNumber > 0){
      let deduction = unitNumber * 5;
      const response = "Your deduction is $" + deduction.toString(10);
     	agent.add(response);
    }

    if (unitNumber > 300){
    	let deduction = 1500;
      const response = "The maximum deduction using the Simplified Method is $1500 on 300 square feet of home office, so your deduction would be $" + deduction.toString(10);
     	agent.add(response);
    }
  }

    function calculateBusinessMileageExpenseDeduction(agent){
      let body = request.body;
      const queryResult  = request.body.queryResult;
      const outputContext = queryResult.outputContexts || [];

      const params = outputContext[0].parameters;
	    let unitNumber = params['unit-number'];
	    let unroundedDeduction = unitNumber * 0.58;
      let deduction = unroundedDeduction.toFixed(2);
	    const response = "For " + unitNumber + " miles your deduction is $" + deduction.toString(10) + ". This deduction gets taken on line 9 of your Schedule C form. Is there anything else I can help you with?";
	    agent.add(response);
  }

  function calculateOfficeExpenseDeduction(agent){
    const queryResult  = request.body.queryResult;
    const outputContext = queryResult.outputContexts || [];
    const params = outputContext[0].parameters;

    let costOfItem = params.office_expense_cost_of_item;
    let pct = params['percentage'];
    let pctTrimmed=parseFloat(pct)/100;
    let deduction = 0;

    if (costOfItem < 2501) {
      let deduction = costOfItem * pctTrimmed;
      const response = "Done! " + "You can deduct $" + deduction/*deduction.toString(10)*/ + ". The deduction goes on Line 18 of your Schedule C. Is there anything else we can help with?";
      agent.add(response);
    }

    if (costOfItem>2500){
      let deduction = costOfItem * pctTrimmed;
      const response = "Heads up! When the cost is greater than $2,500, you will want to consider using the 'Section 179 Deduction' instead of the 'De Minimis Safe Harbor' deduction. Right now, I can only calculate the De Minimis Safe Harbor deduction, which would be $" + deduction/*deduction.toString(10)*/ + ". This deduction goes on Line 18 of your Schedule C. Is there anything else we can help with?";
      agent.add(response);
    }
  }

  function calculateSelfEmploymentTaxes(agent){
    const queryResult  = request.body.queryResult;
    const outputContext = queryResult.outputContexts || [];
    const params = outputContext[0].parameters;
    let year = params.self_employment_taxes_yes_year;
    let income = params['unit-currency'];//params['number'];

    const amt = income.amount;
    const currency = income.currency;
    let parsedIncome=parseFloat(amt)
    let netEarningsSelfEmploymentMultiplier = 0.9235;
    let netIncomeSelfEmployment = parsedIncome * netEarningsSelfEmploymentMultiplier;
    let ssTaxes = 0;

    if (netIncomeSelfEmployment < 132901 && netIncomeSelfEmployment > 400 && year == 2019){
      let medicareTaxes = netIncomeSelfEmployment * 0.029;
      let ssTaxes = netIncomeSelfEmployment * 0.124;
      let selfEmploymentTaxes = ssTaxes + medicareTaxes;
      const response = "Thanks! I estimate your self employment taxes will be $" + selfEmploymentTaxes.toFixed(2) + ". That includes $" + ssTaxes.toFixed(2) + " in Social Security Taxes and $" + medicareTaxes.toFixed(2) + " in Medicare Taxes.";
      //const response = "foo foo " + income + " " + year;
      agent.add(response);
    }

    if (netIncomeSelfEmployment > 132900 && year == 2019){
      let ssTaxes = 132900 * 0.124;
      let medicareTaxes = netIncomeSelfEmployment * 0.029;
      let selfEmploymentTaxes = ssTaxes + medicareTaxes;
      const response = "Thanks! I estimate your self employment taxes will be $" + selfEmploymentTaxes.toFixed(2) + ". That includes $" + ssTaxes.toFixed(2) + " in Social Security Taxes and $" + medicareTaxes.toFixed(2) + " in Medicare Taxes.";
    //const response = "foo foo greater income " + income + " " + year;
      agent.add(response);
    }

    if (netIncomeSelfEmployment < 137701 && netIncomeSelfEmployment > 400 && year == 2020){
      let medicareTaxes = netIncomeSelfEmployment * 0.029;
      let ssTaxes = netIncomeSelfEmployment * 0.124;
      let selfEmploymentTaxes = ssTaxes + medicareTaxes;
      const response = "Thanks! I estimate your self employment taxes will be $" + selfEmploymentTaxes.toFixed(2) + ". That includes $" + ssTaxes.toFixed(2) + " in Social Security Taxes and $" + medicareTaxes.toFixed(2) + " in Medicare Taxes.";
      //const response = "foo foo " + income + " " + year;
      agent.add(response);
    }

    if (netIncomeSelfEmployment > 137700 && year == 2020){
      let ssTaxes = 137700 * 0.124;
      let medicareTaxes = netIncomeSelfEmployment * 0.029;
      let selfEmploymentTaxes = ssTaxes + medicareTaxes;
      const response = "Thanks! I estimate your self employment taxes will be $" + selfEmploymentTaxes.toFixed(2) + ". That includes $" + ssTaxes.toFixed(2) + " in Social Security Taxes and $" + medicareTaxes.toFixed(2) + " in Medicare Taxes.";
      //const response = "foo foo greater income " + income + " " + year;
      agent.add(response);
    }

    if (netIncomeSelfEmployment < 401){
      const response = "Good news! You only need to pay self-employment taxes on income over $400, so right now you don't owe any self-employment taxes. If you go over $400 in self-employment income, message us again, and we can tell you what you'll owe in taxes.";
      agent.add(response);
    }
  }

  let intentMap = new Map();
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('estimate_taxes.income', calculateFederalTaxes);
  intentMap.set('Home_office_deduction - yess - yes', calculateHomeOfficeDeduction);
  intentMap.set('faq.finance_terms.business_mileage-calc - yes',calculateBusinessMileageExpenseDeduction);
  intentMap.set('office_expense_percent_for_work',calculateOfficeExpenseDeduction);
  intentMap.set('estimate_taxes.income.yes.state_taxes', calculateStateIncomeTaxes);
  intentMap.set('self_employment_taxes_yes_year_income', calculateSelfEmploymentTaxes);

  agent.handleRequest(intentMap);
});
