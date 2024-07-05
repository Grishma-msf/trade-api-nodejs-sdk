'use strict';

let axios = require('axios');
let { API } = require('../config/api');
const https = require('https');
const { errorLogger } = require('./winston_log');

/**
 * @constructor
 * @name JmfSmartApi
 * @param {Object} params
 * @param {string} api_key
 * @param {string} root
 * @param {string} timeout
 * @param {string} debug
 * @param {string} access_token
 * @param {string} refresh_token
 * @param {string} default_login_uri
 * @param {string} session_expiry_hook
 */
var JmfSmartApi = function (params) {
	var self = this;
	
	self.api_key = params.api_key;
	self.client_code = params.client_code || null;
	self.root = params.root || API.root;
	self.timeout = params.timeout || API.timeout;
	self.debug = params.debug || API.debug;
	self.access_token = params.access_token || null;
	self.refresh_token = params.refresh_token || null;
	self.default_login_uri = API.login;
	self.session_expiry_hook = null;

	self.local_ip = null;
	self.mac_addr = null;
	self.public_ip = null;

	var requestInstance = axios.create({
		baseURL: self.root,
		timeout: self.timeout,
		headers: {
			// 'X-ClientLocalIP': self.local_ip, //'192.168.168.168',
			// 'X-ClientPublicIP': self.public_ip, //'106.193.147.98',
			// 'X-MACAddress': self.mac_addr, //'fe80::216e:6507:4b90:3719',
		},

		paramsSerializer: function (params) {
			return querystring.stringify(params);
		},

		httpsAgent : new https.Agent({
			minVersion: 'TLSv1.2',
        	maxVersion: 'TLSv1.3'
		})
		
	});
	// Set content type as form encoded for PUT and POST
	requestInstance.defaults.headers.post['Content-Type'] = 'application/json';
	requestInstance.defaults.headers.put['Content-Type'] = 'application/json';

	// Add a request interceptor
	requestInstance.interceptors.request.use(function (request) {
		if (self.debug) console.log(request);
		return request;
	});

	// Add a response interceptor
	requestInstance.interceptors.response.use(
		(response) => {
			try {
				if (self.debug) console.log(response);
				// console.log('response::', response);
				if (response?.status === 200) {
					if (response?.data?.success || response?.data?.status) {
						console.log("Response",response);
						return response.data;
					} else {
						// USER INPUT OR TOKEN RELATED ERROR TO BE HANDLED HERE
						if (
							response?.data?.errorCode === 'AG8001' &&
							self.session_expiry_hook !== null
						) {
							self.session_expiry_hook();
						}
						// REFRESH TOKEN ISSUES
						// else if (response.data.errorCode === "AB8050") {
						//     // CUSTOM
						// }
						errorLogger.error({ message : "Error on response data",clientId : self.client_code,response : response})
						return response?.data;
					}
				} else {
					errorLogger.error({ message : "Error if status not 200",clientId : self.client_code,response : response})
					return response?.data;
				}
			} catch (error) {
				errorLogger.error({ message : "Error on catch block",clientId : self.client_code,response : error})
				return [];
			}
		},
		(error) => {
			try {
				// console.log(error);
				let errorObj = {};
				if (error?.response?.status) {
					errorObj.status = error?.response?.status;
					errorObj.message = error?.response?.statusText;
					errorLogger.error({ message : "Error Response in if block",clientId : self.client_code,response : error.response})
				}
				else if(error){
					errorLogger.error({ message : "Error Response in else if block",clientId : self.client_code,response : error})
				} 
				else {
					errorObj.status = 500;
					errorObj.message = 'Error';
					errorLogger.error({ message : "Error Response in else if block",clientId : self.client_code,response : error.response})
				}
				return errorObj;
				// return Promise.reject(errorObj);
			} catch (error) {
				errorLogger.error({ message : "Error catch block",clientId : self.client_code,response : error})
				return [];
			}
		}
	);

	/**
	 * Used to set access_token
	 * @method setAccessToken
	 * @param {string} access_token
	 */
	self.setAccessToken = function (access_token) {
		self.access_token = access_token;
	};

	/**
	 * Description
	 * @method setPublicToken
	 * @param {string} refresh_token
	 */
	self.setPublicToken = function (refresh_token) {
		self.refresh_token = refresh_token;
	};

	/**
	 * Description
	 * @method userLogin
	 * @param {string} mobileNumber
	 * @param {string} password
	 * @param {string} userId
	 */
	self.userLogin = function (mobileNumber, password, userId) {
		let params = {
			mobileNumber: mobileNumber,
			password: password,
			userId: userId
		};
		
		let token_data = post_request('user_login', params);

		token_data
			.then((response) => {
				if (response.status) {
					if(response.data){
						if(response.data.accessToken){
							self.setAccessToken(response.data.accessToken);
						}
						if(response.data.refreshToken){
							self.setPublicToken(response.data.refreshToken);
						}
					}
				}
			})
			.catch(function (err) {
				throw err;
			});

		return token_data;
	};

	/**
	 * Description
	 * @method placeOrder
	 * @param {object} params
	 * @param {string} symbol (NORMAL or STOPLOSS)
	 * @param {string} exc (NSE or BSE)
	 * @param {string} ordAction (BUY or SELL)
	 * @param {string} ordValidity (DAY or IOC)
	 * @param {string} ordType (MARKET, LIMIT, STOPLOSS_MARKET, STOPLOSS_LIMIT)
	 * @param {string} prdType (DELIVERY, MARGIN, INTRADAY, AMO_DELIVERY, AMO_INTRADAY)
	 * @param {number} qty
	 * @param {number} disQty
	 * @param {number} lotSize
	 * @param {number} triggerPrice
	 * @param {string} instrument
	 * @param {number} limitPrice
	 * @param {string} amo
	 * @param {string} build
	 * @param {string} excToken
	 * @param {number} boStpLoss
	 * @param {number} boTgtPrice
	 * @param {number} trailingSL
	 */
	self.placeOrder = function (params) {
		return post_request('order_place', params);
	};

	/**
	 * Description
	 * @method modifyOrder
	 * @param {object} params
	 * @param {number} triggerPrice
	 * @param {string} ordType (MARKET, LIMIT, STOPLOSS_MARKET, STOPLOSS_LIMIT)
	 * @param {string} prdType (DELIVERY, MARGIN, INTRADAY, AMO_DELIVERY, AMO_INTRADAY)
	 * @param {string} instrument
	 * @param {string} exc (NSE or BSE)
	 * @param {number} qty
	 * @param {number} lotSize
	 * @param {string} symbol 
	 * @param {string} ordId
	 * @param {string} ordAction
	 * @param {number} limitPrice
	 * @param {number} disQty
	 * @param {string} ordValidity
	 * @param {number} tradedQty
	 * @param {number} ordValidityDays
	 * @param {string} exchangeToken
	 * @param {string} amo
	 */
	self.modifyOrder = function (params) {
		return post_request('order_modify', params);
	};

	/**
	 * Description
	 * @method cancelOrder
	 * @param {string} symbol
	 * @param {string} exc
	 * @param {string} ordId
	 */
	self.cancelOrder = function (params) {
		return post_request('order_cancel', params);
	};

	/**
	 * Description
	 * @method exitOrder
	 * @param {string} symbol
	 * @param {string} exc
	 * @param {string} prdType
	 * @param {string} boOrdStatus
	 * @param {string} ordId
	 * @param {string} parOrdId
	 */
	self.exitOrder = function (params) {
		return post_request('order_exit', params);
	};

	/**
	 * Description
	 * @method convertPosition
	 * @param {string} type
	 * @param {string} ordAction
	 * @param {string} prdType
	 * @param {string} toPrdType
	 * @param {number} qty
	 * @param {string} symbol
	 * @param {string} excToken
	 * @param {string} exc
	 * @param {number} lotSize
	 * @param {string} instrument
	 * @param {string} id
	 */
	self.convertPosition = function (params) {
		return post_request('convert_position', params);
	};


	/**
	 * Description
	 * @method positionBook
	 * @param {string} qParams
	 */
	self.positionBook = function (qParams) {
		return get_request_qParams('position_book', qParams);
	};

	/**
	 * Description
	 * @method holdings
	 */
	self.holdings = function (params) {
		return get_request('holdings');
	};

	/**
	 * Description
	 * @method tradeBook
	 */
	self.tradeBook = function () {
		return get_request('trade_book');
	};

	/**
	 * Description
	 * @method orderBook
	 */
	self.orderBook = function (params) {
		return get_request('order_book');
	};

	/**
	 * Description
	 * @method tradeDetails
	 * @param {string} ordId
	 */
	self.tradeDetails = function (params) {
		return post_request('trade_details', params);
	};

	/**
	 * Description
	 * @method orderHistory
	 * @param {string} ordId
	 * @param {string} instrument
	 */
	self.orderHistory = function (params) {
		return post_request('order_history', params);
	};

	/**
	 * Description
	 * @method orderDetails
	 * @param {string} ordId
	 */
	self.orderDetails = function (params) {
		return post_request('order_details', params);
	};

	/**
	 * Description
	 * @method brokerage
	 * @param {string} symbol
	 * @param {string} orderAction
	 * @param {string} excToken
	 * @param {string} exc
	 * @param {string} qty
	 * @param {string} price
	 * @param {string} product
	 * @param {string} triggerPrice
	 * @param {string} instrument
	 */
	self.brokerage = function (params) {
		return post_request('brokerage', params);
	};

	/**
	 * Description
	 * @method getOhlc
	 * @param {string} data
	 * @param {string} instruments
	 */
	self.getOhlc = function (params) {
		return post_request('get_ohlc', params);
	};

	/**
	 * Description
	 * @method intradayCandleData
	 * @param {string} data
	 * @param {string} exchangeInstrumentID
	 * @param {string} exchange
	 * @param {string} startTime
	 * @param {string} endTime
	 */
	self.intradayCandleData = function (params) {
		return post_request('intraday_candle_data', params);
	};

	/**
	 * Description
	 * @method historicalCandleData
	 * @param {string} qParams
	 */
	self.historicalCandleData = function (qParams) {
		return get_request_qParams('historical_candle_data', qParams);
	};

	/**
	 * Description
	 * @method profitLossReport
	 * @param {string} data
	 * @param {string} fromDate
	 * @param {string} months
	 * @param {string} fy
	 * @param {string} segment
	 * @param {string} toDate
	 * @param {string} days
	 * @param {string} appID
	 */
	self.profitLossReport = function (params) {
		return post_request('profit_loss_report', params);
	};

	/**
	 * Description
	 * @method getProfile
	 * @param {string} data
	 * @param {string} appID
	 */
	self.getProfile = function (params) {
		return post_request('get_profile', params);
	};

	/**
	 * Description
	 * @method getFunds
	 */
	self.getFunds = function (params) {
		return get_request('get_funds');
	};

	/**
	 * Description
	 * @method quote
	 * @param {string} data
	 * @param {string} instruments
	 * @param {string} appID
	 */
	self.quote = function (params) {
		return post_request('quote', params);
	};

	function get_request(route, params, responseType, responseTransformer) {
		return request_util(
			route,
			'GET',
			params || {},
			responseType,
			responseTransformer
		);
	}

	function post_request(route, params, responseType, responseTransformer) {
		return request_util(
			route,
			'POST',
			params || {},
			responseType,
			responseTransformer
		);
	}
	
	function get_request_qParams(route, qParams) {
		return request_util_qParams(
			route, 
			"GET", 
			qParams
		);
	}

	function request_util(
		route,
		method,
		params,
		responseType,
		responseTransformer
	) {
		let url = API[route],
			payload = null;

		if (method !== 'GET' || method !== 'DELETE') {
			payload = params;
		}

		let options = {
			method: method,
			url: url,
			// params: queryParams,
			data: JSON.stringify(payload),
			// Set auth header
			headers: {
				'Content-Type': 'application/json',
				 Accept: 'application/json',
				// 'X-UserType': 'USER',
				// 'X-SourceID': 'WEB',
				'api-key': self.api_key, // ? self.api_key : 'smartapi_key'
			},
		};

		if (self.access_token) {
			options['headers']['Authorization'] = 'Bearer ' + self.access_token;
		}

		// Set response transformer
		if (responseTransformer) {
			options.transformResponse =
				axios.defaults.transformResponse.concat(responseTransformer);
		}

		return requestInstance.request(options);
	}

	function request_util_qParams(
		route,
		method,
		qParams
	) {
		let url = API[route],
			payload = null;

		if (qParams) {
			url = `${url}?${qParams}`;
		}
		
		let options = {
			method: method,
			url: url,
			// params: queryParams,
			data: JSON.stringify(payload),
			// Set auth header
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				//"X-UserType": "USER",
				//"X-SourceID": "WEB",
				"api-key": self.api_key, // ? self.api_key : 'smartapi_key'
			},
		};

		if (self.access_token) {
			options["headers"]["Authorization"] = "Bearer " + self.access_token;
		}

		return requestInstance.request(options);
	}

};

module.exports = JmfSmartApi;
