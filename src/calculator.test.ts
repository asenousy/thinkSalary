import { calculate } from "./calculator";

test("calculate salary 5k", () => {
  const salary = 5000;
  const pensionRate = 5;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 5000,
    pension: 250,
    taxable: 0,
    studentLoan: 0,
    tax: 0,
    ni: 0,
    net: 4750,
  });
});

test("calculate salary 20k", () => {
  const salary = 20000;
  const pensionRate = 5;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 20000,
    pension: 1000,
    taxable: 6500,
    studentLoan: 0,
    tax: 1300,
    ni: 1258.08,
    net: 16441.92,
  });
});

test("calculate salary 60k", () => {
  const salary = 60000;
  const pensionRate = 10;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 60000,
    pension: 6000,
    taxable: 41500,
    studentLoan: 0,
    tax: 9100,
    ni: 5060.4800000000005,
    net: 39839.52,
  });
});

test("calculate salary 130k", () => {
  const salary = 130000;
  const pensionRate = 0;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 130000,
    pension: 0,
    taxable: 130000,
    studentLoan: 0,
    tax: 44500,
    ni: 6460.48,
    net: 79039.52,
  });
});

test("calculate salary 180k", () => {
  const salary = 180000;
  const pensionRate = 5;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 180000,
    pension: 9000,
    taxable: 171000,
    studentLoan: 0,
    tax: 62575,
    ni: 7460.48,
    net: 100964.52,
  });
});
