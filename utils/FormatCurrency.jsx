import React from 'react'
import numeral from 'numeral';




export const FormatCurrency = (num) => numeral(num).format('0,0').replace(/,/g, '.');