// src/app/hooks/usePayroll.ts
import { useCallback } from 'react';

type ToastFn = (t: { type: 'info' | 'success' | 'warning' | 'error', title?: string, message: string }) => void;

export function usePayrollHelpers(setCompany: (s: any) => void, getCompany: () => any, pushToast: ToastFn) {
    // run payroll, autosave to localStorage and call IPC to save file on disk (if available)
    const runPayroll = useCallback(() => {
        const company = getCompany();
        // assume company.payrollHistory will be updated by EconomySystem
        // here we just persist + backup
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('payrollHistory', JSON.stringify(company.payrollHistory || []));
            }
        } catch (e) { /* ignore */ }
        // ask electron to save payrollHistory if available
        (async () => {
            try {
                if (window?.electronAPI?.savePayroll) {
                    const resp = await window.electronAPI.savePayroll(company.payrollHistory || []);
                    if (resp && resp.success) pushToast({ type: 'info', title: 'Export', message: 'Payroll backed to disk' });
                    else pushToast({ type: 'warning', title: 'Export', message: 'Payroll backup to disk failed' });
                } else {
                    // no electron — still success locally
                    pushToast({ type: 'info', title: 'Payroll', message: 'Payroll saved (local)' });
                }
            } catch (err: any) {
                pushToast({ type: 'error', title: 'Export', message: 'Export error: ' + (err?.message || String(err)) });
            }
        })();
    }, [getCompany, pushToast, setCompany]);

    const exportPayroll = useCallback(async () => {
        const company = getCompany();
        if (!window?.electronAPI?.savePayroll) {
            pushToast({ type: 'error', title: 'Export', message: 'savePayroll IPC not available' });
            return;
        }
        try {
            const res = await window.electronAPI.savePayroll(company.payrollHistory || []);
            if (res && res.success) pushToast({ type: 'success', title: 'Export', message: 'Payroll exported to ' + res.path });
            else pushToast({ type: 'error', title: 'Export', message: 'Export failed' });
        } catch (e: any) {
            pushToast({ type: 'error', title: 'Export', message: 'Export failed: ' + (e?.message || String(e)) });
        }
    }, [getCompany, pushToast]);

    return { runPayroll, exportPayroll };
}
