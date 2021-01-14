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
      taxable: 6500,
      loan: 0,
      tax: 1300,
      ni: 1258.08,
      net: 16441.92,
    });
  });

  test("calculate salary 28800k", () => {
    const payDetails = { salary: 28800, pensionRate: 0, loanPlan: 3 };
    expect(calculate(payDetails)).toEqual({
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
    const payDetails = { salary: 60000, pensionRate: 10, loanPlan: 1 };
    expect(calculate(payDetails)).toEqual({
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
    const payDetails = { salary: 100000, pensionRate: 0, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
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
    const payDetails = { salary: 110000, pensionRate: 1, loanPlan: 2 };
    expect(calculate(payDetails)).toEqual({
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
    const payDetails = { salary: 120000, pensionRate: 2, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
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
    const payDetails = { salary: 125000, pensionRate: 0, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
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
    const payDetails = { salary: 130000, pensionRate: 0, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
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
    const payDetails = { salary: 180000, pensionRate: 5, loanPlan: 0 };
    expect(calculate(payDetails)).toEqual({
      gross: 180000,
      pension: 9000,
      taxable: 171000,
      loan: 0,
      tax: 62575,
      ni: 7460.48,
      net: 100964.52,
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
      taxable: 1500,
      loan: 0,
      tax: 285,
      ni: 538.0799999999999,
      net: 13176.92,
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
      taxable: 7500,
      loan: 0,
      tax: 1479.15,
      ni: 1258.08,
      net: 17262.769999999997,
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
      taxable: 16300,
      loan: 0,
      tax: 3275.5699999999997,
      ni: 2314.08,
      net: 23210.35,
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
      taxable: 41500,
      loan: 3655.7999999999997,
      tax: 10681.57,
      ni: 5060.4800000000005,
      net: 34602.149999999994,
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
      taxable: 87500,
      loan: 0,
      tax: 29541.569999999996,
      ni: 5860.48,
      net: 64597.95000000001,
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
      taxable: 100850,
      loan: 7508.88,
      tax: 35015.07,
      ni: 6060.48,
      net: 60315.57,
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
      taxable: 113900,
      loan: 0,
      tax: 40365.57,
      ni: 6260.48,
      net: 70973.95,
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
      taxable: 125000,
      loan: 0,
      tax: 44916.57,
      ni: 6360.48,
      net: 73722.95,
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
      tax: 46966.57,
      ni: 6460.48,
      net: 76572.95,
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
      tax: 65451.57,
      ni: 7460.48,
      net: 98087.95,
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
      tax: 62575,
      ni: 7460.48,
      net: 100964.52,
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
      tax: 5214.583333333333,
      ni: 621.7066666666666,
      net: 8413.710000000001,
    });
  });
});
