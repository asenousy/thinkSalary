const taxRules = [
  { band: 37500, rate: 0.2 },
  { band: 100000, rate: 0.4 },
  { band: Infinity, rate: 0.45 },
];

const niRules = [
  { band: 9516, rate: 0 },
  { band: 40508, rate: 0.12 },
  { band: Infinity, rate: 0.02 },
];

function calculateAllowance(income: number) {
  let allowance = 12500;
  income = capZero(income - 100000);
  allowance -= Math.floor(income / 2);
  return capZero(allowance);
}

function capZero(figure: number) {
  return Math.max(figure, 0);
}

function calculateTax(income: number, rules: any) {
  let tax = 0;
  for (const { band, rate } of rules) {
    tax += rate * Math.min(income, band);
    income = capZero(income - band);
  }
  return tax;
}

export function calculate(salary: number, pensionRate: number) {
  const pension = (salary * pensionRate) / 100;
  const salaryWithouPension = salary - pension;
  const studentLoan = 0;

  const allowance = calculateAllowance(salaryWithouPension);

  const taxable = capZero(salaryWithouPension - allowance);
  const tax = calculateTax(taxable, taxRules);
  const ni = calculateTax(salary, niRules);

  const net = salaryWithouPension - tax - ni;
  return { salary, pension, studentLoan, taxable, tax, ni, net };
}
