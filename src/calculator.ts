const ALLOWANCE = 12500;

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

function splitByBands(income: number, rules: any) {
  const bands = [];
  while (income > 0) {
    const band = rules[bands.length].band;
    income > band ? bands.push(band) : bands.push(income);
    income = income - band;
  }
  return bands;
}

function calculateTax(income: number, rules: any) {
  const bands = splitByBands(income, rules);
  return bands.reduce((tax, band, i) => tax + band * rules[i].rate, 0);
}

function calculateAllowance(income: number) {
  if (income > 125000) return 0;
  return ALLOWANCE;
}

function capZero(figure: number) {
  return Math.max(figure, 0);
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
