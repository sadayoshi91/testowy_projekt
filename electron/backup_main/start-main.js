// electron/start-main.js
// Consolidated main process: dev URL detection, dev-server check, preload, and IPC handlers.
// Replace your current electron/start-main.js with this file.

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const os = require('os');

const DEV_CHECK_RETRIES = 20;
const DEV_CHECK_INTERVAL_MS = 300;

// Determine dev URL: prefer env ELECTRON_START_URL, else detect LAN IPv4 private address, else localhost.
function getDevUrl() {
    if (process.env.ELECTRON_START_URL && process.env.ELECTRON_START_URL.trim().length > 0) {
        return process.env.ELECTRON_START_URL;
    }
    try {
        const nets = os.networkInterfaces();
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                if (net.family === 'IPv4' && !net.internal) {
                    // pick RFC1918 private ranges only (10.*, 192.168.*, 172.16-31.*)
                    if (/^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(net.address)) {
                        return `http://${net.address}:5173`;
                    }
                }
            }
        }
    } catch (e) {
        console.warn('[electron] IP detect failed', e && e.message);
    }
    return 'http://127.0.0.1:5173';
}

function createWindow() {
    const DEV_URL = getDevUrl();

    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            // preload is in electron/preload.js (relative to this file)
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Open DevTools automatically in development context:
    // we treat ELECTRON_START_URL or NODE_ENV !== 'production' as dev.
    const isDev = !!process.env.ELECTRON_START_URL || process.env.NODE_ENV !== 'production';
    if (isDev) {
        win.webContents.openDevTools({ mode: 'right' });
    }

    // Try dev server first, else load local build
    checkDevServer(DEV_URL, DEV_CHECK_RETRIES, DEV_CHECK_INTERVAL_MS)
        .then(() => {
            console.log('[electron] Dev server is up, loading', DEV_URL);
            win.loadURL(DEV_URL).catch(err => {
                console.error('[electron] loadURL failed', err);
                loadLocalFileOrFallback(win);
            });
        })
        .catch(() => {
            console.log('[electron] Dev server not available, trying local build');
            loadLocalFileOrFallback(win);
        });
}

function loadLocalFileOrFallback(win) {
    // try dist/index.html relative to project root or relative to this file
    const localPaths = [
        path.join(__dirname, '..', 'dist', 'index.html'),
        path.join(process.cwd(), 'dist', 'index.html'),
        path.join(__dirname, 'dist', 'index.html') // fallback
    ];
    for (const p of localPaths) {
        if (fs.existsSync(p)) {
            win.loadFile(p).catch(err => console.error('[electron] loadFile failed', err));
            return;
        }
    }
    console.warn('[electron] local file not found in any of:', localPaths);
    win.loadURL('data:text/html,<h2>App not found</h2><p>No dev server and no dist/index.html</p>');
}

function checkDevServer(url, retries, intervalMs) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const tryOnce = () => {
            attempts++;
            try {
                const req = http.get(url, res => {
                    if (res.statusCode && res.statusCode < 400) {
                        res.resume();
                        resolve();
                    } else {
                        res.resume();
                        next();
                    }
                });
                req.on('error', () => next());
                req.setTimeout(1000, () => {
                    req.destroy();
                    next();
                });
            } catch (e) {
                next();
            }
        };

        const next = () => {
            if (attempts >= retries) return reject();
            setTimeout(tryOnce, intervalMs);
        };

        tryOnce();
    });
}

// App lifecycle
app.whenReady().then(createWindow);

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

//
// IPC handlers
//

// Existing save/load/list-mods handlers (preserved, using app.getPath('userData') for game saves)
ipcMain.handle('save-file', async (event, name, data) => {
    const saveDir = path.join(app.getPath('userData'), 'saves');
    if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });
    const filePath = path.join(saveDir, name + '.json');
    fs.writeFileSync(filePath, data, 'utf8');
    return { path: filePath };
});

ipcMain.handle('load-file', async (event, name) => {
    const saveDir = path.join(app.getPath('userData'), 'saves');
    const filePath = path.join(saveDir, name + '.json');
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf8');
});

ipcMain.handle('list-mods', async () => {
    const modsPath = path.join(process.cwd(), 'mods');
    if (!fs.existsSync(modsPath)) return [];
    const list = [];
    const items = fs.readdirSync(modsPath);
    for (const it of items) {
        const fi = path.join(modsPath, it);
        const stat = fs.statSync(fi);
        if (stat.isDirectory()) {
            const meta = path.join(fi, 'mod.json');
            if (fs.existsSync(meta)) {
                try {
                    const txt = fs.readFileSync(meta, 'utf8');
                    list.push(JSON.parse(txt));
                } catch (e) { /* ignore invalid mod */ }
            }
        }
    }
    return list;
});

// New: save payroll CSV into ./save folder (relative to process.cwd())
ipcMain.handle('save-payroll', async (event, payload) => {
    try {
        const cwd = process.cwd();
        const saveDir = path.join(cwd, 'save');
        if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });
        const fname = path.join(saveDir, 'payroll_history_' + Date.now().toString(36) + '.csv');
        const header = ['id', 'date', 'payroll', 'tax', 'rent', 'total'];
        const rows = (payload || []).map(h => [h.id, h.date, h.payroll, h.tax, h.rent, h.total]);
        const csv = [header, ...rows].map(r => r.join(',')).join('\\n');
        fs.writeFileSync(fname, csv, 'utf8');
        return fname;
    } catch (e) {
        console.error('[electron] save-payroll error', e);
        throw e;
    }
});
