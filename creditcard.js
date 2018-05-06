function OpenCard(limit, apr) {
  let random = Math.floor(3 + Math.random() * 4); //Randomly generates a AmEx, Visa, MasterCard or Discover
  this.cycle = new Array(30);                     //Creates a new 30 Credit Cycle Array
  this.limit = limit;                             //Sets the Credit Limit from the User Input
  this.apr = apr;                                 //Sets the APR from the User Input
  this.openDay = 0;                               //Opening day Starts at 0
  this.currentBalance = 0                         //Stars the current balance at 0

  //Creates Random 16 digit Credit Card Number based on AmEx, VISA, MasterCard, or Discover
  this.cardNumber =  random.toString() + Math.floor(100000000000000 + Math.random() * 900000000000000);
}

//Purchase METHOD when user makes a purchase (takes purchase amount and day of purchase in the cycle)
OpenCard.prototype.purchase = function (amount, day) {
  let puchaseDay = day;                           //Sets the purchase day from User Input
  let purchaseAmount = amount                     //Sets the purchase amount from User Input
  //Tests if the current balance + the purchase amount is greater than available credit
  if (purchaseAmount + this.currentBalance > this.limit) {
    return "Card Declined! You do not have enought Credit to make this purchase" //Returns this message if current balance is greater than available credit
  } else {
    this.currentBalance = this.currentBalance + purchaseAmount
    if (!this.cycle[day]) {
      this.cycle[day] = purchaseAmount  //if a payment/purchase hasn't occured on this day/index it adds the purchase amount to this index
    } else {
      let currentAmount = this.cycle[day]
      this.cycle[day] = currentAmount + purchaseAmount //Adds current purchase amount to existing payment/purchase amount
    }
  }
}

//Payment METHOD when user makes a payment (takes payment amount and day of payment in the cycle)
OpenCard.prototype.payment = function (amount, day) {
  let paymentDate = day;                      //Sets the payment day from User Input
  let paymentAmount = amount * -1 ;           //Sets the purchase amount from User Input

  //Tests if the current balance + the payment amount is greater than total credit
  if (paymentAmount + this.currentBalance < 0) {
    return "You're overpaying your outstanding balance" //Returns this message if current balance is greater than available credit
  } else {
    this.currentBalance = this.currentBalance + paymentAmount
    if (!this.cycle[day]) {
      this.cycle[day] = paymentAmount       //if a payment/purchase hasn't occured on this day/index it adds the payment amount to this index
    } else {
      let currentAmount = this.cycle[day]
      this.cycle[day] = currentAmount + paymentAmount //Adds current payment amount to existing payment/purchase amount
    }
  }
}

//METHOD that checks the remaining credit available
OpenCard.prototype.remainingCredit = function (day) {
  return this.limit - this.currentBalance
}

//METHOD that checks current balance (with or without interest)
OpenCard.prototype.checkBalance = function(day) {
  let totalInt = 0;              //Creates variable of Total Interest
  let days = 0                   //Creates variable Days to calculate interest for the outstanding balance throughout cycle
  let currentVal = this.cycle[0] //Sets current value to value at array index[0]

  //Loops through the payment cycle up to the specific day requested
  for (let i = 0; i <= day; i++) {

    //If the cycle length (30) equals the day the user wants the outstanding balance, calculate the interest and reset days to 0
    if (this.cycle.length === i) {
      totalInt -= currentVal * (this.apr / 365) * (days);
      days = 0
    }

    //If there are no payments/purchases on the next day it adds 1 to days for Interest calculation
    else if (this.cycle[i + 1] === undefined) {
      days += 1;
    }

    //If there is a payment/purchase on the current day/index OR if the current day/index is undefined
    else {
      days += 1  //Adds 1 to days for interest calculation

      //if currentvalue DOES NOT EQUAL undefined (i.e. it has a value)
      if (currentVal !== undefined) {
        totalInt -= currentVal * (this.apr / 365) * (days); //Calculates interest for that amount of days at that outstanding balance (currentVal)
        currentVal += this.cycle[i + 1]; //reassigns currentVal to the next days outstanding balance or index value
      }

      //if the Current Value EQUALS undefined - reassign currentVal to the next days outstanding balance or index value
      else {
        currentVal = this.cycle[i + 1];
      }
      days = 0; //Reassigns days to 0 because the next days value is different and therefore needs it's own interest calculated.
    }
  }
  totalInt = Number(totalInt.toFixed(2)) //Round total interest to 2 decimal points and make "typeof" equal a number
  let outstanding = ((currentVal * -1) + totalInt) * -1 //calculates total outstanding balance at end of cycle
  let outStandingBalBeforeCycleEnd = currentVal; //calculates outstanding balance before end of cycle (without interest applied)
  //checks whether the user wants to check outstanding balance during cycle or at the end of the cycle
  if (day >= 30) {
    return outstanding  //Returns outstanding balance after interest is calculated
  } else {
    return outStandingBalBeforeCycleEnd //Returns outstanding balance before end of cycle (without interest)
  }
}

