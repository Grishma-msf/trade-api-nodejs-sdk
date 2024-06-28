module.exports.API = {
	root: 'https://uapix.blinkx.in',
	debug: false,
	timeout: 60000,

	user_login: '/auth/api/v1/login/normal-login',

	order_place: '/orderApi/order/v1/place-order',
	order_modify: '/orderApi/order/v1/modify-order',
	order_cancel: '/orderApi/order/v1/cancel-order',
	order_exit: '/orderApi/order/v1/exit-order',
	brokerage_charges: '/orderApi/order/v1/brokerage-charges',
	trade_book: '/orderApi/order/v1/trade-book',
	order_trail: '/orderApi/order/v1/order-trail',
	order_book: '/orderApi/order/v1/order-book',

	convert_position: '/detailsApi/portfolio/v1/convert-position',
	position_book: '/detailsApi/portfolio/v1/position-book',
	holdings: '/detailsApi/portfolio/v1/holdings',

};
