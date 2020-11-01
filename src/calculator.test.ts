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

test("calculate salary 100k", () => {
  const salary = 100000;
  const pensionRate = 0;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 100000,
    pension: 0,
    taxable: 87500,
    studentLoan: 0,
    tax: 27500,
    ni: 5860.48,
    net: 66639.52,
  });
});

test("calculate salary 110k", () => {
  const salary = 110000;
  const pensionRate = 1;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 110000,
    pension: 1100,
    taxable: 100850,
    studentLoan: 0,
    tax: 32840,
    ni: 6060.48,
    net: 69999.52,
  });
});

test("calculate salary 120k", () => {
  const salary = 120000;
  const pensionRate = 2;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 120000,
    pension: 2400,
    taxable: 113900,
    studentLoan: 0,
    tax: 38060,
    ni: 6260.48,
    net: 73279.52,
  });
});

test("calculate salary 125k", () => {
  const salary = 125000;
  const pensionRate = 0;
  expect(calculate(salary, pensionRate)).toEqual({
    salary: 125000,
    pension: 0,
    taxable: 125000,
    studentLoan: 0,
    tax: 42500,
    ni: 6360.48,
    net: 76139.52,
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
