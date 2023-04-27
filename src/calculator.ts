const ALLOWANCE = 12570;
const ALLOWANCE_THRESHOLD = 100000;
const ALLOWANCE_DECREASE_RATE = 2;

const TAX_RULES = [
  { band: 0, rate: 0.2 },
  { band: 37700, rate: 0.4 },
  { band: 125140, rate: 0.45 },
];
const SCOTLAND_TAX_RULES = [
  { band: 0, rate: 0.19 },
  { band: 2162, rate: 0.2 },
  { band: 13118, rate: 0.21 },
  { band: 31092, rate: 0.42 },
  { band: 125140, rate: 0.47 },
];
const NI_RULES = [
  { band: 0, rate: 0 },
  { band: 12584, rate: 0.12 },
  { band: 50284, rate: 0.02 },
];
export const LOAN_RULES = [
  { threshold: 0, rate: 0 },
  { threshold: 22015, rate: 0.09 },
  { threshold: 27295, rate: 0.09 },
  { threshold: 27660, rate: 0.09 },
  { threshold: 25000, rate: 0.09 },
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
  for (const { band, rate } of [...rules].reverse()) {
    const chunk = income - band;
    if (chunk < 0) continue;
    tax += chunk * rate;
    income = band;
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
