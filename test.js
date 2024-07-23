let { JMFApiSdk } = require('./lib/index');

const params = {
    'api_key': 'API_KEY', // Replace with your actual API key
    root: 'BASE_URL', // Replace with your actual base URL
    access_token: 'ACCESS_TOKEN'
};



const sdk = new JMFApiSdk(params);

//Login API
// (async () => {
//     try {
//         // Test the userLogin function
//         const loginParams = {
//             mobileNumber: 'MOBILE_NUMBER',
//             password: 'PW',
//             userId: 'UID'
//         };
//         const loginResponse = await sdk.userLogin(loginParams.mobileNumber, loginParams.password, loginParams.userId);
//         console.log('Login Response:', loginResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

//Place Order
// (async () => {
//     try {
        
//         const placeOrderParams = {
//             "symbol": "NATIONALUM-EQ",
//             "excToken": "6364",
//             "ordAction": "Buy",
//             "ordValidity": "DAY",
//             "ordType": "LIMIT",
//             "prdType": "NORMAL",
//             "qty": 5,
//             "triggerPrice": 0,
//             "limitPrice": 192.55,
//             "disQty": 0,
//             "instrument": "STK",
//             "exc": "NSE",
//             "lotSize": 0,
//             "amo": false,
//             "build": "MOB",
//             "boStpLoss": 0,
//             "boTgtPrice": 0,
//             "trailingSL": 0
//         };
//         const placeOrderResponse = await sdk.placeOrder(placeOrderParams);
//         console.log('Place Order Response:', placeOrderResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// Modify Order
// (async () => {
//     try {
//         
//         const modifyOrderParams = {
//             "triggerPrice": 0,
//             "ordType": "LIMIT",
//             "prdType": "CASH",
//             "instrument": "STK",
//             "exc": "NSE",
//             "qty": 10,
//             "lotSize": 0,
//             "symbol": "NATIONALUM-EQ",
//             "ordId": "240703000000313",
//             "ordAction": "BUY",
//             "limitPrice": 192.55,
//             "disQty": 0,
//             "ordValidity": "DAY",
//             "tradedQty": 0,
//             "ordValidityDays": 0,
//             "exchangeToken": "13528",
//             "amo": true
//         };
//         const modifyOrderResponse = await sdk.modifyOrder(modifyOrderParams);
//         console.log('Modify Order Response:', modifyOrderResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

//Cancel Order
// (async () => {
//     try {
        
//         const cancelOrderParams = {
//             "symbol":"HDFCBANK-EQ",
//             "ordId": "240704000000030",
//             "exc": "NSE"
//         };
//         const cancelOrderResponse = await sdk.cancelOrder(cancelOrderParams);
//         console.log('Cancel Order Response:', cancelOrderResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

//Order Book
// (async () => {
//     try {
//         
//         const OrderBookParams = {
//             "ordId": "240703000000313"
//         };
//         const OrderBookResponse = await sdk.orderBook(OrderBookParams);
//         console.log('Order Book Response:', OrderBookResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// Exit Order
// (async () => {
//     try {
        
//         exitOrderParams = {
//             "symbol": "HDFCBANK-EQ",
//             "exc": "NSE",
//             "prdType": "NRML",
//             "boOrdStatus": "Trade Confirmed",
//             "parOrdId": "240703000000313",
//             "ordId": "240703000000313"
//         };
//         const exitOrderResponse = await sdk.exitOrder(exitOrderParams);
//         console.log('Exit Order Response:', exitOrderResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// Order History
// (async () => {
//     try {
        
//         orderHistoryParams = {
//             "instrument": "STK",
//             "ordId": "240703000000313"
//         };
//         const orderHistoryResponse = await sdk.orderHistory(orderHistoryParams);
//         console.log('Order History Response:', orderHistoryResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// Order Details
// (async () => {
//     try {
        
//         orderDetailsParams = {
//             "instrument": "STK",
//             "ordId": "240703000000313"
//         };
//         const orderDetailsResponse = await sdk.orderDetails(orderDetailsParams);
//         console.log('Order History Response:', orderDetailsResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// Brokerage
// (async () => {
//     try {
        
//         brokerageParams = {
//             "symbol": "ACC-EQ",
//             "exc": "NSE",
//             "product": "NRML",
//             "triggerPrice": "",
//             "price": "3000",
//             "qty": "100",
//             "instrument": "",
//             "orderAction": "BUY",
//             "excToken": "25"
//         };
//         const brokerageResponse = await sdk.brokerage(brokerageParams);
//         console.log('Brokerage Response:', brokerageResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// get Funds
// (async () => {
//     try {
        
//         const getFundsResponse = await sdk.getFunds();
//         console.log('get Funds Response:', getFundsResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// Intraday-candle-data
// (async () => {
//     try {
        
//         intradayCandleDataParams = {
//             "data": {
//                 "exchangeInstrumentID": "6364",
//                 "exchange": "NSE",
//                 "startTime": "Mar 14 2024 150000",
//                 "endTime": "Mar 14 2024 161500"
//             }
//         };
//         const intradayCandleDataResponse = await sdk.intradayCandleData(intradayCandleDataParams);
//         console.log('Intraday Candle Data Response:', intradayCandleDataResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

// Position Book
// (async () => {
//     try {
//         const positionBookParams = "type=net";

//         const positionBookResponse = await sdk.positionBook(positionBookParams);
//         console.log('Position Book Data Response:', positionBookResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// Intraday-candle-data
// (async () => {
//     try {
        
//         intradayCandleDataParams = {
//             "data": {
//                 "exchangeInstrumentID": "6364",
//                 "exchange": "NSE",
//                 "startTime": "Mar 14 2024 150000",
//                 "endTime": "Mar 14 2024 161500"
//             }
//         };
//         const intradayCandleDataResponse = await sdk.intradayCandleData(intradayCandleDataParams);
//         console.log('Intraday Candle Data Response:', intradayCandleDataResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

// get-ohlc
// (async () => {
//     try {
        
//         getOhlcParams = {
//             "data": {
//                 "instruments" : [
//                     {
//                         "exchange": "NSE",
//                         "exchangeInstrumentID": "6364"
//                     }
//                 ]
                
//             }
//         };
//         const getOhlcResponse = await sdk.getOhlc(getOhlcParams);
//         console.log('get Ohlc Data Response:', getOhlcResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// quote
// (async () => {
//     try {
        
//         quoteParams = {
//             "data": {
//                 "instruments": [
//                     {
//                         "exchange": "NSE",
//                         "exchangeInstrumentID": "22"
//                     }
//                 ]
//             }
//         };
//         const quoteResponse = await sdk.quote(quoteParams);
//         console.log('Quote Data Response:', quoteResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

// Trade-Detail
// (async () => {
//     try {
        
//         tradeDetailParams = {
//             "ordId": "240702000000207"
//          };
//         const tradeDetailResponse = await sdk.tradeDetails(tradeDetailParams);
//         console.log('Trade Detail Data Response:', tradeDetailResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

// getProfile
// (async () => {
//     try {
        
//         getProfileParams = { 
//             "data": {}, 
//             "appID": "1"
//         };
//         const getProfileResponse = await sdk.getProfile(getProfileParams);
//         console.log('get Profile Data Response:', getProfileResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// HistoricalCandleData
// (async () => {
//     try {
        
//         HistoricalCandleDataParams = "symbol=UNIONBANK&resolution=1D&from=785244&to=9777&countback=200&exc=NSE&streamSymbol=10753";
//         const HistoricalCandleDataResponse = await sdk.historicalCandleData(HistoricalCandleDataParams);
//         console.log('Historical candle Data Response:', HistoricalCandleDataResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// trade Book
// (async () => {
//     try {
        
//         const tradeBookResponse = await sdk.tradeBook();
//         console.log('Trade Book Data Response:', tradeBookResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();


// Convert Position
// (async () => {
//     try {
        
//         convertPositionParams = {
//             "type": "DAY1",
//             "ordAction": "buy",
//             "toPrdType": "CNC",
//             "prdType": "NRML",
//             "qty": "30",
//             "exc": "NSE",
//             "instrument": "STK",
//             "symbol": "ADANIENT-EQ",
//             "lotSize": "1",
//             "excToken": "25"
//         };

//         const convertPositionResponse = await sdk.convertPosition(convertPositionParams);
//         console.log('Convert Position Response:', convertPositionResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

// Holding
// (async () => {
//     try {
        
//         const holdingsResponse = await sdk.holdings();
//         console.log('Holdings Data Response:', holdingsResponse);

//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();