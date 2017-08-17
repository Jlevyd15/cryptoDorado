// return calculations
import moment from 'moment'

/*
 parameters 
 data: array

example:
[
    {
        "trade_id": 74,
        "product_id": "BTC-USD",
        "price": "10.00",
        "size": "0.01",
        "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
        "created_at": "2014-11-07T22:19:28.578544Z",
        "liquidity": "T",
        "fee": "0.00025",
        "settled": true,
        "side": "buy"
    }
]*/


// TODO - pull the actual coin value from redux
const getCoinPriceAtDate = (coinType, date) => {

} 

// TODO - pull the actual total coin amount from redux
const getAccountValueByCoinType = (coinType, date) => {
	// return getCoinPriceAtDate(coinType, date) * 
	return { price: 17157, created_at: date, size: 1 }
}

export const calcXIRR = (data, guess, coinType) => {
	// console.log('data', data)
	// iterate over each of the objects (trades) in the array from fills
	// get toal price for a given trade: price * size
	// multiply all total numbers by -1 to get the inverse of each trade dollar amount
	// divide by 1 + guess to the power of the number of days/365

	const accumIRR = [] // accumulatedIRRforEachDate
	const dateLast = moment(data[0].created_at)
	const dateZero = moment(data[data.length - 1].created_at)

	// latest account value for the coinType
	const dateNowISO = moment().toISOString()

	// TODO - this isn't working beacause the calcXIRR function is getting called a few times from the React component so 
	// the object is gettting injected multiple times
	//just before starting the iteration inject the current account value as one of the objects in the array
	// data.unshift(getAccountValueByCoinType(coinType, dateNowISO))

	// console.log('data after adding current account value', data)

	for (let i = 0; i < data.length; i++) {
		console.log('totals ', data[i]['side'] === 'sell' ? (Number(data[i]['price']) * Number(data[i]['size'])) * -1 
			: Number(data[i]['price']) * Number(data[i]['size']))
		
		accumIRR.push(data[i]['side'] === 'sell' ? (Number(data[i]['price']) * Number(data[i]['size'])) * -1 
			: Number(data[i]['price']) * Number(data[i]['size']) /
		 Math.pow((1 + guess), (moment(data[i].created_at).diff(dateZero, 'days') / 365)))
	}

	return calcYTDXIRR(accumIRR.reduce((sum, value) => { return sum + value }, 0), dateZero, dateLast) 
}

// dates passed here MUST be formatted as moment objects
export const calcYTDXIRR = (XIRR, dateZero, dateLast) => {
	console.log('before returning YTD XIRR', XIRR, dateLast.diff(dateZero, 'days'), dateLast, dateZero)
	return ((Math.pow((1 + XIRR) * -1, dateLast.diff(dateZero, 'days') / 365) - 1) * 100).toFixed(2).concat('%')
	// ((1+XIRR(K2:K13,E2:E13,130%))^((E13-E2)/365))-1 this is the calculation from EXCEL
}




