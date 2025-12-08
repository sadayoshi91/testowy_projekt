export class EconomySystem {
  payoutIntervalDays: number;
  constructor(payoutIntervalDays = 30) {
    this.payoutIntervalDays = payoutIntervalDays;
  }

  runPayroll(state: any) {
    const s = { ...state };
    const employees = Array.isArray(s.employees) ? s.employees : [];
    const totalPayroll = employees.reduce((acc:number, e:any) => acc + (Number(e?.salary || 0)), 0);
    const tax = Math.round(totalPayroll * 0.2 * 100) / 100;
    const rent = Math.round((s.rent || 0) * 100) / 100;
    const total = Math.round((totalPayroll + tax + rent) * 100) / 100;
    s.funds = Math.round(((s.funds || 0) - total) * 100) / 100;

    if (!Array.isArray(s.payrollHistory)) s.payrollHistory = [];
    const entry = { id: (Date.now()).toString(36), date: new Date().toISOString(), payroll: totalPayroll, tax, rent, total };
    s.payrollHistory = [entry, ...s.payrollHistory];

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('payrollHistory', JSON.stringify(s.payrollHistory));
      }
    } catch (e) { /* ignore */ }

    return s;
  }

  tickEconomy(state: any) {
    const day = Number(state?.day || 0);
    if (day > 0 && day % this.payoutIntervalDays === 0) {
      return this.runPayroll(state);
    }
    return state;
  }

  nextPayoutInDays(state:any) {
    const day = Number(state?.day || 0);
    const rem = this.payoutIntervalDays - (day % this.payoutIntervalDays);
    return rem === this.payoutIntervalDays ? 0 : rem;
  }
}
