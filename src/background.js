'use strict'
/* global __static */

import { app, protocol, BrowserWindow } from 'electron'
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 750,
        icon: path.join(__static, 'icon.png'),
        // titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true, // fix require is not defined errors
            webviewTag: true, // enable webview tag
        },
    })
    win.setOpacity(0.98)

    // ignore x-frame-options & contect-security-policy
    win.webContents.session.webRequest.onHeadersReceived({}, (detail, callback) => {
        const xFrameOriginKey = Object.keys(detail.responseHeaders).find(header => String(header).match(/^x-frame-options$/i))
        if (xFrameOriginKey) {
            delete detail.responseHeaders[xFrameOriginKey]
        }

        const contentSecurityPolicyKey = Object.keys(detail.responseHeaders).find(header => String(header).match(/^content-security-policy$/i))
        if (contentSecurityPolicyKey) {
            delete detail.responseHeaders[contentSecurityPolicyKey]
        }
        callback({ cancel: false, responseHeaders: detail.responseHeaders })
    })

    // change user agent
    win.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/73.0.3683.103 Mobile/13B143 Safari/601.1.46'
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })

    if (isDevelopment) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadFile('index.html')
    }

    win.on('closed', () => {
        win.removeAllListeners()
        win = null
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
    createWindow()
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
