// main-ipc.js - add this require(...) into your main process to register IPC handler
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

ipcMain.handle('save-payroll', async (event, payload) => {
  try {
    const cwd = process.cwd();
    const saveDir = path.join(cwd, 'save');
    if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });
    const fname = path.join(saveDir, 'payroll_history_' + Date.now().toString(36) + '.csv');
    const header = ['id','date','payroll','tax','rent','total'];
    const rows = (payload || []).map(h => [h.id, h.date, h.payroll, h.tax, h.rent, h.total]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    fs.writeFileSync(fname, csv, 'utf8');
    return fname;
  } catch (e) {
    console.error('save-payroll error', e);
    throw e;
  }
});
