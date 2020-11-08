const ALLOWANCE = 12500;
const ALLOWANCE_THRESHOLD = 100000;
const ALLOWANCE_DECREASE_RATE = 2;
const TAX_RULES = [
  { band: 37500, rate: 0.2 },
  { band: 100000, rate: 0.4 },
  { band: Infinity, rate: 0.45 },
];
const NI_RULES = [
  { band: 9516, rate: 0 },
  { band: 40508, rate: 0.12 },
  { band: Infinity, rate: 0.02 },
];
const LOAN_RULES = [
  { threshold: 0, rate: 0 },
  { threshold: 19380, rate: 0.09 },
  { threshold: 26568, rate: 0.09 },
  { threshold: 21000, rate: 0.06 },
];

function calculateAllowance(income: number) {
  const remainigIncome = capZero(income - ALLOWANCE_THRESHOLD);
  const allowance =
    ALLOWANCE - Math.floor(remainigIncome / ALLOWANCE_DECREASE_RATE);
  return capZero(allowance);
}

function capZero(figure: number) {
  return Math.max(figure, 0);
}

function calculateTax(income: number, rules: typeof TAX_RULES) {
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

export default function calculate(
  salary: number,
  pensionRate: number = 0,
  loanPlan: number = 0,
  unit: number = 1
) {
  const gross = salary;
  const pension = (gross * pensionRate) / 100;
  const grossWithouPension = gross - pension;
  const loan = calculateLoan(gross, loanPlan);
  const allowance = calculateAllowance(grossWithouPension);
  const taxable = capZero(grossWithouPension - allowance);
  const tax = calculateTax(taxable, TAX_RULES);
  const ni = calculateTax(gross, NI_RULES);
  const net = grossWithouPension - tax - ni - loan;

  const figures = { gross, pension, loan, taxable, tax, ni, net };
  return scaleByUnit(figures, unit);
}
