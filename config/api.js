module.exports.API = {
	root: 'https://uapix.blinkx.in',
	debug: false,
	timeout: 60000,

	user_login: '/auth-services/api/auth/v1/login',

	order_place: '/wrapper-order-service/api/order/v1/place-order',
	order_modify: '/wrapper-order-service/api/order/v1/modify-order',
	order_cancel: '/wrapper-order-service/api/order/v1/cancel-order',
	order_exit: '/wrapper-order-service/api/order/v1/exit-order',	
	order_history: '/wrapper-details-service/api/order/v1/order-history',
	order_details: '/wrapper-details-service/api/order/v1/order-details',	
	order_book: '/wrapper-details-service/api/order/v1/order-book',

	trade_book: '/wrapper-details-service/api/order/v1/trade-book',
	convert_position: '/detailsApi/portfolio/v1/convert-position',
	position_book: '/wrapper-details-service/api/portfolio/v1/position-book?type=net',
	holdings: '/detailsApi/portfolio/v1/holdings',

	trade_details: '/wrapper-details-service/api/order/v1/trade-details',
	brokerage: '/wrapper-details-service/api/trade/v1/brokerage',
	get_ohlc: '/wrapper-details-service/api/quote/v1/get-ohlc',
	intraday_candle_data: '/wrapper-details-service/api/chart/v1/intraday-candle-data',
	historical_candle_data: '/wrapper-details-service/api/chart/v1/historical-candle-data',
	profit_loss_report: '/wrapper-details-service/api/trade/v1/profit-loss-report',
	get_profile: '/wrapper-details-service/api/user/v1/get-profile',
	get_funds: '/wrapper-details-service/api/funds/v1/get-funds',
	quote: '/wrapper-details-service/api/market/v1/quote',

};
