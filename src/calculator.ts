const ALLOWANCE = 12570;
const ALLOWANCE_THRESHOLD = 100000;
const ALLOWANCE_DECREASE_RATE = 2;

const TAX_RULES = [
  { band: 37700, rate: 0.2 },
  { band: 99730, rate: 0.4 },
  { band: Infinity, rate: 0.45 },
];
const SCOTLAND_TAX_RULES = [
  { band: 2162, rate: 0.19 },
  { band: 10956, rate: 0.2 },
  { band: 15812, rate: 0.21 },
  { band: 103628, rate: 0.4 },
  { band: Infinity, rate: 0.46 },
];
const NI_RULES = [
  { band: 9880, rate: 0 },
  { band: 40404, rate: 0.1325 },
  { band: Infinity, rate: 0.0325 },
];
const LOAN_RULES = [
  { threshold: 0, rate: 0 },
  { threshold: 20184, rate: 0.09 },
  { threshold: 27288, rate: 0.09 },
  { threshold: 21000, rate: 0.06 },
];

function calculateAllowance(income: number) {
  const remainigIncome = capZero(income - ALLOWANCE_THRESHOLD);
  const allowance = ALLOWANCE - Math.floor(remainigIncome / ALLOWANCE_DECREASE_RATE);
  return capZero(allowance);
}

function capZero(figure: number) {
  return Math.max(figure, 0);
}

function calculateTax(income: number, rules: typeof TAX_RULES | typeof SCOTLAND_TAX_RULES) {
  let tax = 0;
  for (const { band, rate } of rules) {
    tax += rate * Math.min(income, band);
    income = capZero(income - band);
  }
  return tax;
}

function calculateLoan(income: number, plan: number) {
  const { threshold, rate } = LOAN_RULES[plan];
  const remainingIncome = capZero(income - threshold);
  return remainingIncome * rate;
}

function scaleByUnit(figures: object, unit: number) {
  return Object.entries(figures).reduce((scaled, [key, value]) => {
    scaled[key] = value / unit;
    return scaled;
  }, {} as any);
}

type PayDetails = {
  salary: number;
  scotlandTax?: boolean;
  pensionRate?: number;
  loanPlan?: number;
  unit?: number;
};

export default function calculate({
  salary,
  scotlandTax = false,
  pensionRate = 0,
  loanPlan = 0,
  unit = 1,
}: PayDetails) {
  const gross = salary;
  const pension = (gross * pensionRate) / 100;
  const grossWithouPension = gross - pension;
  const loan = calculateLoan(gross, loanPlan);
  const allowance = calculateAllowance(grossWithouPension);
  const taxable = capZero(grossWithouPension - allowance);
  const tax = calculateTax(taxable, scotlandTax ? SCOTLAND_TAX_RULES : TAX_RULES);
  const ni = calculateTax(gross, NI_RULES);
  const net = grossWithouPension - tax - ni - loan;

  const figures = { gross, pension, loan, taxable, tax, ni, net };
  return scaleByUnit(figures, unit);
}
