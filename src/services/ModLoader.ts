export type Mod = {
  id: string;
  name: string;
  description?: string;
  dataFiles?: string[];
};

let cachedStaticMods: Mod[] | null = null;

async function loadStaticMods(): Promise<Mod[]> {
  if (cachedStaticMods) {
    return cachedStaticMods;
  }
  try {
    const module = await import('../../mods/index.json');
    const data = (module as { default?: Mod[] }).default ?? (module as unknown as Mod[]);
    cachedStaticMods = Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Static mod list unavailable', error);
    cachedStaticMods = [];
  }
  return cachedStaticMods;
}

export async function listMods(): Promise<Mod[]> {
  if ((window as any).electronAPI?.listMods) {
    console.log('Korzystam z Electron API');
    try {
      const res = await (window as any).electronAPI.listMods();
      if (Array.isArray(res)) {
        return res;
      }
      if (res?.success && Array.isArray(res.mods)) {
        return res.mods;
      }
      console.warn('Nieznany format odpowiedzi listMods', res);
      return [];
    } catch (error) {
      console.error('B³¹d listMods IPC', error);
      return [];
    }
  }
  console.log('Korzystam z danych statycznych');
  return loadStaticMods();
}
