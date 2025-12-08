// preload.js - exposes electronAPI.savePayroll via contextBridge
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  savePayroll: async (payload) => {
    try {
      const res = await ipcRenderer.invoke('save-payroll', payload);
      return { success: true, path: res };
    } catch (e) {
      return { success: false, error: e && e.message ? e.message : String(e) };
    }
  }
});
