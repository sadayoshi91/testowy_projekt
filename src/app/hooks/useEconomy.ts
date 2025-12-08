// src/app/hooks/useEconomy.ts
import { useRef, useMemo } from 'react';
import { EconomySystem } from '../../systems/EconomySystem';

export function useEconomy(company: any, setCompany: (s:any)=>void) {
  const econRef = useRef<EconomySystem|null>(null);
  if (!econRef.current) econRef.current = new EconomySystem(company?.payrollIntervalDays || 30);

  // call this when you change interval from UI
  const setIntervalDays = (n: number) => {
    econRef.current!.payoutIntervalDays = n;
    // persist to company so next reload keeps it
    setCompany((c:any)=> ({ ...c, payrollIntervalDays: n }));
  };

  const runPayrollNow = () => {
    const econ = econRef.current!;
    const next = econ.runPayroll(company);
    setCompany(next);
    return next;
  };

  const nextPayoutDays = () => econRef.current!.nextPayoutInDays(company);

  return useMemo(() => ({
    setIntervalDays,
    runPayrollNow,
    nextPayoutDays: nextPayoutDays()
  }), [company && company.day, company && company.payrollHistory]);
}
