import calculate from "./calculator";

describe("England Tax", () => {
  test("calculate salary 5k", () => {
    const payDetails = { salary: 5000, pensionRate: 5, loanPlan: 1 };
    expect(calculate(payDetails)).toEqual({
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
    const payDetails = { salary: 20000, pensionRate: 5, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
      gross: 20000,
      pension: 1000,
      taxable: 6430,
      loan: 0,
      tax: 1286,
      ni: 1340.9,
      net: 16373.1,
    });
  });

  test("calculate salary 28800k", () => {
    const payDetails = { salary: 28800, pensionRate: 0, loanPlan: 3 };
    expect(calculate(payDetails)).toEqual({
      gross: 28800,
      pension: 0,
      taxable: 16230,
      loan: 468,
      tax: 3246,
      ni: 2506.9,
      net: 22579.1,
    });
  });

  test("calculate salary 60k", () => {
    const payDetails = { salary: 60000, pensionRate: 10, loanPlan: 1 };
    expect(calculate(payDetails)).toEqual({
      gross: 60000,
      pension: 6000,
      taxable: 41430,
      loan: 3583.44,
      tax: 9032,
      ni: 5669.300000000001,
      net: 35715.259999999995,
    });
  });

  test("calculate salary 100k", () => {
    const payDetails = { salary: 100000, pensionRate: 0, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
      gross: 100000,
      pension: 0,
      taxable: 87430,
      loan: 0,
      tax: 27432,
      ni: 6969.300000000001,
      net: 65598.7,
    });
  });

  test("calculate salary 110k", () => {
    const payDetails = { salary: 110000, pensionRate: 1, loanPlan: 2 };
    expect(calculate(payDetails)).toEqual({
      gross: 110000,
      pension: 1100,
      taxable: 100780,
      loan: 7444.08,
      tax: 32772,
      ni: 7294.300000000001,
      net: 61389.619999999995,
    });
  });

  test("calculate salary 120k", () => {
    const payDetails = { salary: 120000, pensionRate: 2, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
      gross: 120000,
      pension: 2400,
      taxable: 113830,
      loan: 0,
      tax: 37992,
      ni: 7619.300000000001,
      net: 71988.7,
    });
  });

  test("calculate salary 125k", () => {
    const payDetails = { salary: 125000, pensionRate: 0, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
      gross: 125000,
      pension: 0,
      taxable: 124930,
      loan: 0,
      tax: 42432,
      ni: 7781.800000000001,
      net: 74786.2,
    });
  });

  test("calculate salary 130k", () => {
    const payDetails = { salary: 130000, pensionRate: 0, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
      gross: 130000,
      pension: 0,
      taxable: 130000,
      loan: 0,
      tax: 44460,
      ni: 7944.300000000001,
      net: 77595.7,
    });
  });

  test("calculate salary 180k", () => {
    const payDetails = { salary: 180000, pensionRate: 5, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
      gross: 180000,
      pension: 9000,
      taxable: 171000,
      loan: 0,
      tax: 62538.5,
      ni: 9569.300000000001,
      net: 98892.2,
    });
  });
});

describe("Scotland Tax", () => {
  test("calculate salary 5k", () => {
    const payDetails = {
      salary: 5000,
      pensionRate: 5,
      loanPlan: 1,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 5000,
      pension: 250,
      taxable: 0,
      loan: 0,
      tax: 0,
      ni: 0,
      net: 4750,
    });
  });

  test("calculate salary 14k", () => {
    const payDetails = {
      salary: 14000,
      pensionRate: 0,
      loanPlan: 0,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 14000,
      pension: 0,
      taxable: 1430,
      loan: 0,
      tax: 271.7,
      ni: 545.9,
      net: 13182.4,
    });
  });

  test("calculate salary 20k", () => {
    const payDetails = {
      salary: 20000,
      pensionRate: 0,
      loanPlan: 0,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 20000,
      pension: 0,
      taxable: 7430,
      loan: 0,
      tax: 1464.38,
      ni: 1340.9,
      net: 17194.719999999998,
    });
  });

  test("calculate salary 28800k", () => {
    const payDetails = {
      salary: 28800,
      pensionRate: 0,
      loanPlan: 0,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 28800,
      pension: 0,
      taxable: 16230,
      loan: 0,
      tax: 3255.5000000000005,
      ni: 2506.9,
      net: 23037.6,
    });
  });

  test("calculate salary 60k", () => {
    const payDetails = {
      salary: 60000,
      pensionRate: 10,
      loanPlan: 1,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 60000,
      pension: 6000,
      taxable: 41430,
      loan: 3583.44,
      tax: 10922.5,
      ni: 5669.300000000001,
      net: 33824.759999999995,
    });
  });

  test("calculate salary 100k", () => {
    const payDetails = {
      salary: 100000,
      pensionRate: 0,
      loanPlan: 0,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 100000,
      pension: 0,
      taxable: 87430,
      loan: 0,
      tax: 29322.5,
      ni: 6969.300000000001,
      net: 63708.2,
    });
  });

  test("calculate salary 110k", () => {
    const payDetails = {
      salary: 110000,
      pensionRate: 1,
      loanPlan: 2,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 110000,
      pension: 1100,
      taxable: 100780,
      loan: 7444.08,
      tax: 34662.5,
      ni: 7294.300000000001,
      net: 59499.119999999995,
    });
  });

  test("calculate salary 120k", () => {
    const payDetails = {
      salary: 120000,
      pensionRate: 2,
      loanPlan: 0,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 120000,
      pension: 2400,
      taxable: 113830,
      loan: 0,
      tax: 39882.5,
      ni: 7619.300000000001,
      net: 70098.2,
    });
  });

  test("calculate salary 125k", () => {
    const payDetails = {
      salary: 125000,
      pensionRate: 0,
      loanPlan: 0,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 125000,
      pension: 0,
      taxable: 124930,
      loan: 0,
      tax: 44322.5,
      ni: 7781.800000000001,
      net: 72895.7,
    });
  });

  test("calculate salary 130k", () => {
    const payDetails = {
      salary: 130000,
      pensionRate: 0,
      loanPlan: 0,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 130000,
      pension: 0,
      taxable: 130000,
      loan: 0,
      tax: 46350.5,
      ni: 7944.300000000001,
      net: 75705.2,
    });
  });

  test("calculate salary 180k", () => {
    const payDetails = {
      salary: 180000,
      pensionRate: 5,
      loanPlan: 0,
      scotlandTax: true,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 180000,
      pension: 9000,
      taxable: 171000,
      loan: 0,
      tax: 65057.020000000004,
      ni: 9569.300000000001,
      net: 96373.68,
    });
  });
});

describe("Calculate salary in time units", () => {
  test("Annually", () => {
    const payDetails = { salary: 180000, pensionRate: 5, loanPlan: 0, unit: 1 };
    expect(calculate(payDetails)).toEqual({
      gross: 180000,
      pension: 9000,
      taxable: 171000,
      loan: 0,
      tax: 62538.5,
      ni: 9569.300000000001,
      net: 98892.2,
    });
  });

  test("Monthly", () => {
    const payDetails = {
      salary: 180000,
      pensionRate: 5,
      loanPlan: 0,
      unit: 12,
    };
    expect(calculate(payDetails)).toEqual({
      gross: 15000,
      pension: 750,
      taxable: 14250,
      loan: 0,
      tax: 5211.541666666667,
      ni: 797.4416666666667,
      net: 8241.016666666666,
    });
  });
});
