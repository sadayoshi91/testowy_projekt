export type Mod = {
  id: string;
  name: string;
  description?: string;
  dataFiles?: string[];
};

export async function listMods(): Promise<Mod[]> {
  if ((window as any).api?.listMods) {
    return await (window as any).api.listMods();
  }
  try {
    const res = await fetch('/mods/index.json');
    return await res.json();
  } catch(e) {
    return [];
  }
}
