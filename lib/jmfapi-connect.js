'use strict';

let axios = require('axios');
/**
 * @constructor
 * @name SmartApi
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
	 * @method brokerageCharges
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
	self.brokerageCharges = function (params) {
		return post_request('brokerage_charges', params);
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
	 */
	self.positionBook = function (params) {
		return get_request('position_book');
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
	 * @param {string} orderIds
	 */
	self.tradeBook = function (params) {
		return post_request('trade_book', params);
	};

	/**
	 * Description
	 * @method orderTrail
	 * @param {string} ordId
	 * @param {string} instrument
	 */
	self.orderTrail = function (params) {
		return post_request('order_trail', params);
	};

	/**
	 * Description
	 * @method orderBook
	 */
	self.orderBook = function (params) {
		return get_request('order_book');
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
				'X-UserType': 'USER',
				'X-SourceID': 'WEB',
				'X-PrivateKey': self.api_key, // ? self.api_key : 'smartapi_key'
			},
		};

		// console.log('options', options);
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

};

module.exports = JmfSmartApi;
