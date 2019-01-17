import { app, BrowserWindow, Menu, shell } from 'electron';

import path from 'path';
import Moment from 'moment';
import events from './installers/events';

let mainWindow = null;
let willQuit = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        minWidth: 800,
        height: 600,
        fullscreenable: false,
        frame: true,
        backgroundColor: '#3f4755',
        icon: path.join(__dirname, 'assets/icons/128x128.png')
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
}

function manageRefresh() {
    const time = Moment('24:00:00', 'hh:mm:ss').diff(Moment(), 'seconds');

    setTimeout(
        midnightTask,
        time * 1000
    );

    function midnightTask() {
        mainWindow.reload();
    }
}

function menuSetup() {
    const menuTemplate = [
        {
            label: 'Progresso',
            submenu: [
                {
                    label: 'Github',
                    accelerator: 'CommandOrControl+O',
                    click: () => {
                        shell.openExternal('http://github.com/LochiQF/Progresso');
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Dev tools',
                    accelerator: 'F12',
                    click: () => {
                        mainWindow.webContents.openDevTools();
                    }
                },
                {
                    label: 'Quit',
                    accelerator: 'CommandOrControl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'minimize' },
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);

    Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
    if (events.handleSquirrelEvent()) {
        return;
    }

    createWindow();
    menuSetup();

    mainWindow.on('close', e => {
        if (willQuit) {
            mainWindow = null;
        } else {
            e.preventDefault();
            mainWindow.hide();
        }
    });

    manageRefresh();
});

app.on('activate', () => mainWindow.show());
app.on('before-quit', () => willQuit = true);
