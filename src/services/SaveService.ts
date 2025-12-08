import { CompanyState } from '../models/company';

export const saveToLocal = async (name: string, state: CompanyState) => {
  const data = JSON.stringify(state, null, 2);
  if ((window as any).api?.saveFile) {
    await (window as any).api.saveFile(name, data);
  } else {
    localStorage.setItem(name, data);
  }
};

export const loadFromLocal = async (name: string): Promise<CompanyState | null> => {
  if ((window as any).api?.loadFile) {
    const raw = await (window as any).api.loadFile(name);
    return raw ? JSON.parse(raw) : null;
  } else {
    const raw = localStorage.getItem(name);
    return raw ? JSON.parse(raw) : null;
  }
};
