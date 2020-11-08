import calculate from "./calculator";

test("calculate salary 5k", () => {
  const salary = 5000;
  const pensionRate = 5;
  const loanPlan = 1;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 5000,
    pension: 250,
    taxable: 0,
    loan: 0,
    tax: 0,
    ni: 0,
    net: 4750,
  });
});

test("calculate salary 20k", () => {
  const salary = 20000;
  const pensionRate = 5;
  const loanPlan = 0;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 20000,
    pension: 1000,
    taxable: 6500,
    loan: 0,
    tax: 1300,
    ni: 1258.08,
    net: 16441.92,
  });
});

test("calculate salary 28800k", () => {
  const salary = 28800;
  const pensionRate = 0;
  const loanPlan = 3;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 28800,
    pension: 0,
    taxable: 16300,
    loan: 468,
    tax: 3260,
    ni: 2314.08,
    net: 22757.92,
  });
});

test("calculate salary 60k", () => {
  const salary = 60000;
  const pensionRate = 10;
  const loanPlan = 1;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 60000,
    pension: 6000,
    taxable: 41500,
    loan: 3655.7999999999997,
    tax: 9100,
    ni: 5060.4800000000005,
    net: 36183.719999999994,
  });
});

test("calculate salary 100k", () => {
  const salary = 100000;
  const pensionRate = 0;
  const loanPlan = 0;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 100000,
    pension: 0,
    taxable: 87500,
    loan: 0,
    tax: 27500,
    ni: 5860.48,
    net: 66639.52,
  });
});

test("calculate salary 110k", () => {
  const salary = 110000;
  const pensionRate = 1;
  const loanPlan = 2;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 110000,
    pension: 1100,
    taxable: 100850,
    loan: 7508.88,
    tax: 32840,
    ni: 6060.48,
    net: 62490.64000000001,
  });
});

test("calculate salary 120k", () => {
  const salary = 120000;
  const pensionRate = 2;
  const loanPlan = 0;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 120000,
    pension: 2400,
    taxable: 113900,
    loan: 0,
    tax: 38060,
    ni: 6260.48,
    net: 73279.52,
  });
});

test("calculate salary 125k", () => {
  const salary = 125000;
  const pensionRate = 0;
  const loanPlan = 0;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 125000,
    pension: 0,
    taxable: 125000,
    loan: 0,
    tax: 42500,
    ni: 6360.48,
    net: 76139.52,
  });
});

test("calculate salary 130k", () => {
  const salary = 130000;
  const pensionRate = 0;
  const loanPlan = 0;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 130000,
    pension: 0,
    taxable: 130000,
    loan: 0,
    tax: 44500,
    ni: 6460.48,
    net: 79039.52,
  });
});

test("calculate salary 180k", () => {
  const salary = 180000;
  const pensionRate = 5;
  const loanPlan = 0;
  expect(calculate(salary, pensionRate, loanPlan)).toEqual({
    gross: 180000,
    pension: 9000,
    taxable: 171000,
    loan: 0,
    tax: 62575,
    ni: 7460.48,
    net: 100964.52,
  });
});

describe("Calculate salary in time units", () => {
  test("Annually", () => {
    const salary = 180000;
    const pensionRate = 5;
    const loanPlan = 0;
    const unit = 1;
    expect(calculate(salary, pensionRate, loanPlan, unit)).toEqual({
      gross: 180000,
      pension: 9000,
      taxable: 171000,
      loan: 0,
      tax: 62575,
      ni: 7460.48,
      net: 100964.52,
    });
  });
  test("Monthly", () => {
    const salary = 180000;
    const pensionRate = 5;
    const loanPlan = 0;
    const unit = 12;
    expect(calculate(salary, pensionRate, loanPlan, unit)).toEqual({
      gross: 15000,
      pension: 750,
      taxable: 14250,
      loan: 0,
      tax: 5214.583333333333,
      ni: 621.7066666666666,
      net: 8413.710000000001,
    });
  });
});
