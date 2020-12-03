global.fetch = require("node-fetch");


const BASE_URL = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/';
const API_VERSION = 'v1.0';
const API_KEY = 'a3993a2bc6mshcdfbd67a37fcac3p1ba14fjsn6fbb6d22b76d';
const RAPID_HOST = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';


describe("Skyscanner Tests", function () {

	it("should return 403 status code on wrong rapidapi-key", function (done) {
		fetch(BASE_URL + "autosuggest/" + API_VERSION + "/UK/GBP/en-GB/?query=Stockholm", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": 'wrong-rapidapi-key'
			}
		})
			.then(response => {
				expect(response.status).toBe(403)
				done()
			})
			.catch(err => {
				console.log(err);
			});
	});

	it("should not return empty result for query Stockholm", function (done) {
		fetch(BASE_URL + "autosuggest/" + API_VERSION + "/UK/GBP/en-GB/?query=Stockholm", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY
			}
		})
			.then((response) => {
				expect(response.status).toBe(200)
				expect(response.length).not.toBe(0)

				response.json().then((responseBody) => {
					expect(responseBody.Places).toBeDefined()
					expect(responseBody.Places[0].CityId).toBe('STOC-sky')
				})

				done()
			})
			.catch(err => {
				console.log(err);
			});
	});

	it("should return empty result for query armin11", function (done) {
		fetch(BASE_URL + "autosuggest/" + API_VERSION + "/UK/GBP/en-GB/?query=arm111", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY
			}
		})
			.then((response) => {
				expect(response.status).toBe(200)

				response.json().then((responseBody) => {
					expect(responseBody.Places).toBeDefined();	
					expect(responseBody.Places.length).toBe(0)
				})

				done()
			})
			.catch(err => {
				console.log(err);
			});
	});
	 
	it("should return list of countries curencies", function (done) {
		fetch(BASE_URL + "reference/" + API_VERSION + "/currencies", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true, 
			}
		})
			.then(response => {
				expect(response.status).toBe(200)
				done()
			})
			.catch(err => {
				console.log(err);
			});
	});


	it("should return list of countries markets", function (done) {
		fetch(BASE_URL + "reference/" + API_VERSION + "/countries/en-US", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true, 
			}
		})
			.then(response => {
				expect(response.status).toBe(200)
				done()
			})
			.catch(err => {
				console.log(err);
			});
	});

	it("should return error when we input wrong locale parameters", function (done) {
		fetch(BASE_URL + "reference/" + API_VERSION + "/countries/wrong", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true, 
			}
		})
			.then(response => {
				expect(response.status).not.toBe(200)
				done()
			})
			.catch(err => {
				console.log(err);
			});
	});
 
	it("should return routes of flights", function (done) {
		fetch(BASE_URL + "browseroutes/" + API_VERSION + "/US/USD/en-US/SFO-sky/ORD-sky/2021-02-12", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
			
		})
			.then(response => {
				expect(response.status).toBe(200)
				done()
			})
			.catch(err => {
				console.log(err);
			});
	});


	it("should return error after we input old date", function (done) {
		fetch(BASE_URL + "browseroutes/" + API_VERSION + "/US/USD/en-US/SFO-sky/ORD-sky/2010-02-12", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
			
		})
			.then(response => {
				expect(response.status).not.toBe(200)
				done()

				response.json().then((responseBody) => {
					expect(responseBody.ValidationErrors).toBeDefined()
					expect(responseBody.ValidationErrors[0].Message).toBe('Date in the past')
				})
			})
			.catch(err => {
				console.log(err);
			});
	});

	it("should return cheapest dates for a given route", function (done) {
		fetch(BASE_URL + "browsedates/" + API_VERSION + "/US/USD/en-US/SFO-sky/LAX-sky/2021-02-12", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
			
		})
			.then(response => {
				expect(response.status).toBe(200)
				done()
			})
			.catch(err => {
				console.log(err);
			});
	});
	
	it("should return cheapest dates for a given route", function (done) {
		fetch(BASE_URL + "browsedates/" + API_VERSION + "/US/USD/en-US/SFO-sky/LAX-sky/2015-02-12", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
			
		})
			.then(response => {
				expect(response.status).not.toBe(200)
				done()

				response.json().then((responseBody) => {
					expect(responseBody.ValidationErrors).toBeDefined()
					expect(responseBody.ValidationErrors[0].Message).toBe('Date in the past')
				})
			})
			.catch(err => {
				console.log(err);
			});
	});


	it("should return cheapest quotes", function (done) {
		fetch(BASE_URL + "browsequotes/" + API_VERSION + "/US/USD/en-US/SFO-sky/JFK-sky/2021-02-12", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
			
		})
			.then(response => {
				expect(response.status).toBe(200)
				done()
			})
			.catch(err => {
				console.log(err);
			});
	});

	it ("search quotes with a wrong country input", function(done){
		fetch(BASE_URL + "browsequotes/" + API_VERSION + "/jablanica/USD/en-US/SFO-sky/JFK-sky/2021-02-12", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
		})
		.then(response => {
			expect(response.status).not.toBe(200)
			done()
		})
		.catch(err => {
			console.log(err);
		});
	});

	it("when input wrong locale we shoud get a error message", function (done) {
		fetch(BASE_URL + "reference/" + API_VERSION + "/countries/wrong_countrie", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
			
		})
			.then(response => {
				expect(response.status).not.toBe(200)
				done()

				response.json().then((responseBody) => {
					expect(responseBody.ValidationErrors).toBeDefined()
					expect(responseBody.ValidationErrors[0].Message).toBe('Locale is not valid, call the locales service to get a valid list.')
				})
			})
			.catch(err => {
				console.log(err);
			});
	});

	it ("should return cheapes inboun dates", function(done){
		fetch(BASE_URL + "browsedates/" + API_VERSION + "/US/USD/en-US/SFO-sky/JFK-sky/2020-11-12/2020-12-15", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
		})
		.then(response => {
			expect(response.status).toBe(200)
			done()
		})
		.catch(err => {
			console.log(err);
		});
	});

	it ("should return error when input wrong currency", function(done){
		fetch(BASE_URL + "browsedates/" + API_VERSION + "/US/wrong_currency/en-US/SFO-sky/JFK-sky/2020-11-12/2020-12-15", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
		})
		.then(response => {
			expect(response.status).not.toBe(200)
			done()

			response.json().then((responseBody) => {
				expect(responseBody.ValidationErrors).toBeDefined()
				expect(responseBody.ValidationErrors[0].Message).toBe('Incorrect value')
			})
		})
		.catch(err => {
			console.log(err);
		});
	});


	it ("should return the ceapest quotes inbounds", function(done){
		fetch(BASE_URL + "browsequotes/" + API_VERSION + "/US/USD/en-US/SFO-sky/JFK-sky/2020-11-12/2020-12-15", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
		})
		.then(response => {
			expect(response.status).toBe(200)
			done()
		})
		.catch(err => {
			console.log(err);
		});
	});

	it ("should return the list of routes inbounds", function(done){
		fetch(BASE_URL + "browseroutes/" + API_VERSION + "/US/USD/en-US/SFO-sky/JFK-sky/2020-11-12/2020-12-15", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
		})
		.then(response => {
			expect(response.status).toBe(200)
			done()
		})
		.catch(err => {
			console.log(err);
		});
	});


	it ("should return error wrong date format", function(done){
		fetch(BASE_URL + "browseroutes/" + API_VERSION + "/US/USD/en-US/SFO-sky/JFK-sky/2020-33-12/2020-12-15", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": RAPID_HOST,
				"x-rapidapi-key": API_KEY,
				"useQueryString": true
			},
		})
		.then(response => {
			expect(response.status).not.toBe(200)
			done()

			response.json().then((responseBody) => {
				expect(responseBody.ValidationErrors).toBeDefined()
				expect(responseBody.ValidationErrors[0].Message).toBe('Incorrect date format')
			})
		})
		.catch(err => {
			console.log(err);
		});
	});

});