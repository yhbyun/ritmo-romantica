'use strict'
/* global __static */

import { app, protocol, BrowserWindow, ipcMain, Menu, Tray, nativeImage, globalShortcut } from 'electron'
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import windowStateKeeper from 'electron-window-state'
import { config } from './config.js'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray
let settings

// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createTray() {
    tray = new Tray(nativeImage.createEmpty())
    tray.setTitle('Ritmo Rómantica')
    tray.setToolTip('Ritmo Rómantica')

    let contextMenu = Menu.buildFromTemplate([
        { label: 'Play', click() { play() } },
        { label: 'Pause', click() { pause() } },
        { type: 'separator' },
        { label: 'Transparency',
            submenu: [
                {
                    label: 'Enabled',
                    id: 'transparency',
                    type: 'checkbox',
                    accelerator: process.platform === 'darwin' ? 'Command+Ctrl+Shift+O' : 'Ctrl+T',
                    checked: settings.transparency,
                    click: () => toggleTransparency(),
                },
                { label: 'Opacity',
                    submenu: [
                        { label: '10%', type: 'radio', checked: settings.opacity === 0.1, click(item) { setOpacity(item, 0.1) } },
                        { label: '20%', type: 'radio', checked: settings.opacity === 0.2, click(item) { setOpacity(item, 0.2) } },
                        { label: '30%', type: 'radio', checked: settings.opacity === 0.3, click(item) { setOpacity(item, 0.3) } },
                        { label: '40%', type: 'radio', checked: settings.opacity === 0.4, click(item) { setOpacity(item, 0.4) } },
                        { label: '50%', type: 'radio', checked: settings.opacity === 0.5, click(item) { setOpacity(item, 0.5) } },
                        { label: '60%', type: 'radio', checked: settings.opacity === 0.6 , click(item) { setOpacity(item, 0.6) } },
                        { label: '70%', type: 'radio', checked: settings.opacity === 0.7, click(item) { setOpacity(item, 0.7) } },
                        { label: '80%', type: 'radio', checked: settings.opacity === 0.8, click(item) { setOpacity(item, 0.8) } },
                        { label: '90%', type: 'radio', checked: settings.opacity === 0.9, click(item) { setOpacity(item, 0.9) } },
                        { label: '100%', type: 'radio', checked: settings.opacity === 0.98, click(item) { setOpacity(item, 0.98) } },
                    ],
                },
            ]
        },
        {
            label: 'Always on top',
            id: 'alwaysontop',
            type: 'checkbox',
            accelerator: process.platform === 'darwin' ? 'Command+Ctrl+Shift+A' : 'Ctrl+A',
            checked: settings.alwaysOnTop,
            click: () => toggleAlwaysOnTop(),
        },
        {
            label: 'Disable Mouse',
            id: 'ignore-mouse-event',
            type: 'checkbox',
            accelerator: process.platform === 'darwin' ? 'Command+Ctrl+Shift+M' : 'Ctrl+A',
            checked: settings.ignoreMouseEvent,
            click: () => toggleIgnoreMouseEvent(),
        },
        { type: 'separator' },
        { role: 'close' },
    ])
    tray.setContextMenu(contextMenu)
}

function play() {
    win.webContents.send('play-control', 'play')
}

function pause() {
    win.webContents.send('play-control', 'pause')
}

function toggleTransparency() {
    settings.transparency = !settings.transparency
    config.set('transparency', settings.transparency)

    settings.transparency ? win.setOpacity(settings.opacity) : win.setOpacity(0.98)
}

function toggleAlwaysOnTop() {
    settings.alwaysOnTop = !settings.alwaysOnTop
    config.set('alwaysOnTop', settings.alwaysOnTop)

    settings.alwaysOnTop ? alwaysOnTop() : DisablealwaysOnTop(0)
}

function toggleIgnoreMouseEvent() {
    settings.ignoreMouseEvent = !settings.ignoreMouseEvent
    config.set('ignoreMouseEvent', settings.ignoreMouseEvent)

    win.setIgnoreMouseEvents(settings.ignoreMouseEvent)
}

function toggleShowLyric() {
    settings.showLyric = !settings.showLyric
    config.set('showLyric', settings.showLyric)

    win.webContents.send('showlyric-changed', settings.showLyric)
}

function setOpacity(item, opacity) {
    item.checked = true
    settings.opacity = opacity
    config.set('opacity', settings.opacity)
    win.setOpacity(settings.opacity)
}

function alwaysOnTop() {
    // hides the dock icon for our app which allows our windows to join other
    // apps' spaces. without this our windows open on the nearest "desktop" space
    app.dock.hide()
    // "floating" + 1 is higher than all regular windows, but still behind things
    // like spotlight or the screen saver
    win.setAlwaysOnTop(true, "floating", 1)
    // allows the window to show over a fullscreen window
    win.setVisibleOnAllWorkspaces(true)
}

function DisablealwaysOnTop() {
    app.dock.show()
    win.setAlwaysOnTop(false)
    win.setVisibleOnAllWorkspaces(false)
}

function createWindow() {
    // Load the previous state with fallback to defaults
    let mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 750
    });

    // Create the browser window.
    win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        icon: path.join(__static, 'icon.png'),
        // titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true, // fix require is not defined errors
            webviewTag: true, // enable webview tag
            nativeWindowOpen: true, // enable window.open
        },
    })

    mainWindowState.manage(win)

    settings.transparency ? win.setOpacity(settings.opacity) : win.setOpacity(0.98)
    if (settings.alwaysOnTop) alwaysOnTop()
    win.setIgnoreMouseEvents(settings.ignoreMouseEvent)

    // ignore x-frame-options & contect-security-policy
    // win.webContents.session.webRequest.onHeadersReceived({}, (detail, callback) => {
    //     const xFrameOriginKey = Object.keys(detail.responseHeaders).find(header => String(header).match(/^x-frame-options$/i))
    //     if (xFrameOriginKey) {
    //         delete detail.responseHeaders[xFrameOriginKey]
    //     }

    //     const contentSecurityPolicyKey = Object.keys(detail.responseHeaders).find(header => String(header).match(/^content-security-policy$/i))
    //     if (contentSecurityPolicyKey) {
    //         delete detail.responseHeaders[contentSecurityPolicyKey]
    //     }
    //     callback({ cancel: false, responseHeaders: detail.responseHeaders })
    // })

    // change user agent
    // win.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    //     details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/73.0.3683.103 Mobile/13B143 Safari/601.1.46'
    //     callback({ cancel: false, requestHeaders: details.requestHeaders })
    // })

    if (isDevelopment) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadFile('index.html')
    }

    let template = [
        {
            label: 'Ritmo Rómantica',
            submenu: [
                {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
                {type: 'separator'},
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {role: 'Reload', accelerator: 'CmdOrCtrl+R', selector: 'reload:'},
                {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
                {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
                {type: 'separator'},
                {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
                {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
                {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'}
            ]
        },
        {
            label: 'Preferences',
            submenu: [
                {
                    label: 'Download Folder',
                    click: () => win.webContents.send('promptForChangeDownloadFolder'),
                },
                {
                    label: 'Show Lyric',
                    type: 'checkbox',
                    checked: settings.showLyric,
                    click: () => toggleShowLyric(),
                },
            ]
        }
    ]

    // If developing add dev menu option to menu bar
    if (isDevelopment) {
        template.push({
            label: 'Dev Options',
            submenu: [
                {
                    label: 'Open Dev Tools',
                    click: () => win.webContents.openDevTools(),
                }
            ]
        })
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    win.on('closed', () => {
        win.removeAllListeners()
        win = null
        tray = null
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        await installVueDevtools()
    }

    settings = {
        transparency: config.get('transparency', false),
        opacity: config.get('opacity', 0.3),
        alwaysOnTop: config.get('alwaysOnTop', false),
        ignoreMouseEvent: config.get('ignoreMouseEvent', false),
        showLyric: config.get('showLyric', true),
    }

    createTray()
    createWindow()

    globalShortcut.register('Cmd+Ctrl+Shift+O', () => toggleTransparency())
    globalShortcut.register('Cmd+Ctrl+Shift+M', () => toggleIgnoreMouseEvent())
    globalShortcut.register('Cmd+Ctrl+Shift+A', () => toggleAlwaysOnTop())
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

// IPC
ipcMain.on('song-updated', (event, arg) => {
    tray.setTitle(arg)
    win.webContents.send('song-updated', arg);
})
