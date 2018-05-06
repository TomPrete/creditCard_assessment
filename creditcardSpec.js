describe('Create a new credit card', function() {
  var newCard;
})

beforeEach(function() {
  newCard = new OpenCard(1000, .35);
})

it('has methods `purchase`, `payment`, `remainingCredit`, and `checkBalance`', function() {
  expect(typeof newCard.purchase).toBe('function');
  expect(typeof newCard.payment).toBe('function');
  expect(typeof newCard.remainingCredit).toBe('function');
  expect(typeof newCard.checkBalance).toBe('function');
})

it('the current credit card number is 16 digits long and is a string', function() {
  expect(typeof newCard.cardNumber).toBe('string');
  expect(newCard.cardNumber.length).toBe(16);
})

it('The current Billing Cycle is 30 days long, statement start cycle day is 0', function() {
  expect(newCard.openDay).toBe(0);
  expect(typeof newCard.cycle).toBe('object');
  expect(newCard.cycle.length).toBe(30);
})

describe('A customer opens a credit card with a $1,000.00 limit at a 35% APR.', function() {
  var newCard;
})

beforeEach(function() {
  newCard = new OpenCard(1000, .35);
})

it('The customer charges $500 on opening day (outstanding balance becomes $500)', function() {
  newCard.purchase(500, 0)
  expect(newCard.remainingCredit()).toBe(500);
  expect(newCard.checkBalance(20)).toBe(500);
})

it('The customer does not make any more charges or any payments for 30 days. The total outstanding balance owed 30 days after opening should be $514.38', function() {
  newCard.purchase(500, 0)
  expect(newCard.checkBalance(30)).toBe(514.38);
})

describe('A customer opens a credit card with a $1,000.00 limit at a 35% APR', function() {
  var newCard;
})

beforeEach(function() {
  newCard = new OpenCard(1000, .35);
})

it('The customer charges $500 on opening day (outstanding balance becomes $500)', function() {
  newCard.purchase(500, 0)
  expect(newCard.remainingCredit()).toBe(500);
  expect(newCard.checkBalance(20)).toBe(500);
})

it('15 days after opening, the customer pays $200 (outstanding balance becomes $300)', function() {
  newCard.purchase(500, 0)
  newCard.payment(200, 15)
  expect(newCard.remainingCredit()).toBe(700);
  expect(newCard.checkBalance(20)).toBe(300);
})

it('25 days after opening, the customer charges another $100 (outstanding balance becomes $400)', function() {
  newCard.purchase(500, 0)
  newCard.payment(200, 15)
  newCard.purchase(100, 25)
  expect(newCard.remainingCredit()).toBe(600);
  expect(newCard.checkBalance(26)).toBe(400);
})

it('The total outstanding balance owed on day 30 should be $411.99.', function() {
  newCard.purchase(500, 0)
  newCard.payment(200, 15)
  newCard.purchase(100, 25)
  expect(newCard.checkBalance(30)).toBe(411.99);
})
