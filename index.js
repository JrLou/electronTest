// const {autoUpdater} =require("electron-updater");

const { app, BrowserWindow, ipcMain, dialog  } = require('electron')
const log  =require('electron-log');
const Store = require('electron-store');
const store = new Store();
const path = require('path');
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭

// const MenuBuilder =require('./menu');

// global.updataeURL = 'http://106.14.5.204:8070/ftp/down/';
// const path = require('path');
// const os = require('os');
// const ip = require('ip');

// const http = require('http');
// const server =http.createServer();
//
// const  io = require('socket.io')(server, {
//     path: '/socket.io',
//     serveClient: false,
//     // below are engine.IO options
//     pingInterval: 10000,
//     pingTimeout: 5000,
//     cookie: false
// });
// console.log(io)

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async () => {
    global.electron = require('electron');
    if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
    ) {
        await installExtensions();
    }

    mainWindow = new BrowserWindow({
        show: false,
        width: 1920,
        height: 1080,
        title:"运营小工具",
        backgroundColor:"#1D1E24",
        webPreferences: {
            webSecurity: false,  nodeIntegration: true
        }
    });


    loadUrl(getUpdateURL());

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            // 显示
            // remoteWindow.show()
        }
        mainWindow.setTitle("运营小工具");
    });
    mainWindow.show();
    mainWindow.focus()

    //系统托盘图标目录
    // let trayIcon = path.join(__dirname, 'image');//app是选取的目录
    // let tray = new Tray(path.join(trayIcon, 'icon.png'));//app.ico是app目录下的ico文件
    // tray.setTitle("Remote")
    // tray.on('click', () => {
    //   // dialog.showErrorBox("1",""+mainWindow.isVisible())
    //   mainWindow.isVisible()?mainWindow.hide(): mainWindow.show()
    // })

    mainWindow.on('closed', () => {

        let all = BrowserWindow.getAllWindows();
        for(let bro of all){
            bro.destroy()
            // bro.close()
        }
        mainWindow = null;
        app.quit();
    });
    // const menuBuilder = new MenuBuilder(mainWindow);
    // menuBuilder.buildMenu();

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    log.transports.file.level = 'info';
    autoUpdater.logger = log;

    // let message = {
    //     error: '检查更新出错',
    //     checking: '正在检查更新……',
    //     updateAva: '检测到新版本，正在下载……',
    //     updateNotAva: '现在使用的就是最新版本，不用更新'
    // };

    // autoUpdater.checkForUpdatesAndNotify();
    // autoUpdater.autoDownload = false;
    // autoUpdater.setFeedURL(global.updataeURL);
    // autoUpdater.on('error', error => {
    //     mainWindow.webContents.send('error', JSON.stringify(error));
    // });
    // autoUpdater.on('checking-for-update', (test) => {
    //     mainWindow.webContents.send('checking', message.checking);
    // });
    // autoUpdater.on('update-available', info => {
    //     mainWindow.webContents.send('down', JSON.stringify(info));
    // });
    // autoUpdater.on('update-not-available', info => {
    //     mainWindow.webContents.send('nodown', JSON.stringify(info));
    // });

    // ipcMain.on('checkForUpdate', () => {
    //     //执行自动更新检查
    //     // mainWindow.webContents.send('nodown', 1);
    //     if (process.env.NODE_ENV === 'development') {
    //         mainWindow.webContents.send('nodown', 1);
    //         // let info = {"version":"0.17.2","files":[{"url":"ElectronReact-0.17.2-mac.zip","sha512":"S9SegZDQTqAoBLwdslqvcbWOxq27rcgVyHwJkfWbRLknfS/eXOs1wKkL+IfaU0HP68sfkh6A1cXvw3jte29q5w==","size":81594246,"blockMapSize":86140},{"url":"ElectronReact-0.17.2.dmg","sha512":"3jNFJMSGgpQwVHt0fb2A7oX4Zt6p0boTRme2OO0yj7nCsLIGcxNV4xCYENsIfDtxoOSP0TPdKHue2np/6IXD1g==","size":84764581}],"path":"ElectronReact-0.17.2-mac.zip","sha512":"S9SegZDQTqAoBLwdslqvcbWOxq27rcgVyHwJkfWbRLknfS/eXOs1wKkL+IfaU0HP68sfkh6A1cXvw3jte29q5w==","releaseDate":"2019-08-01T03:11:25.716Z"}
    //         // mainWindow.webContents.send('down', JSON.stringify(info))
    //     } else {
    //         autoUpdater.checkForUpdates();
    //     }
    // });

    //主进程代码
    // ipcMain.on('download', (evt, downloadpath) => {
    //     mainWindow.webContents.downloadURL(downloadpath);
    // });
    // ipcMain.on('goMain', (evt, downloadpath) => {
    //     let aa = getURL();
    //
    //     loadUrl(aa)
    // });
    // ipcMain.on('setUrl', function(event, arg){
    //     store.set('host', arg);;
    //     loadUrl(getUpdateURL())
    //     //跳到更新页面去
    // });
    // ipcMain.on('setUrlReset', function(event, arg){
    //     store.set('host', getDefaultURL());;
    //     console.log("恢复")
    //     loadUrl(getUpdateURL())
    //     //跳到更新页面去
    // });
    // mainWindow.webContents.session.on(
    //     'will-download',
    //     (event, item, webContents) => {
    //         item.on('updated', (e, state) => {
    //             if (state === 'interrupted') {
    //                 mainWindow.webContents.send(
    //                     'progressingError',
    //                     '下载被中断,请复制下载地址,用其他工具下载。'
    //                 );
    //             } else if (state === 'progressing') {
    //                 if (item.isPaused()) {
    //                     mainWindow.webContents.send('progressingError', '下载被停止。');
    //                 } else {
    //                     mainWindow.webContents.send(
    //                         'progressing',
    //                         JSON.stringify({
    //                             curr: item.getReceivedBytes(),
    //                             all: item.getTotalBytes()
    //                         })
    //                     );
    //                 }
    //             }
    //         });
    //         item.once('done', (e, state) => {
    //             if (state === 'completed') {
    //                 mainWindow.webContents.send('progressingSuccess', item.getSavePath());
    //             } else if (state === 'cancelled') {
    //                 mainWindow.webContents.send('progressingError', '取消下载');
    //             } else {
    //                 mainWindow.webContents.send(
    //                     'progressingError',
    //                     'failed:' + state + ' error:' + e
    //                 );
    //             }
    //         });
    //     }
    // );
});

function loadUrl(url) {
    mainWindow.setTitle("运营小工具");
    mainWindow.loadURL(url)
}
function getHOST() {
    return store.get('host');
}
function getUpdateURL() {
    return  `file://${path.join(__dirname, './public/index.html')}`;
}
function getURL(){
    //默认URL设置页面
    let  URL ;
    let host =  getHOST();
    if(host&&checkUrl(host)){
        //存在设置页面
        URL = host;
    }else{
        URL = getDefaultURL();
    }
    return URL;
}
function getDefaultURL(){
    return "http://localhost:3002";
}


function checkUrl(url){
    let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)[\s\S]+$/;
    if(!reg.test(url)){
        dialog.showErrorBox("错误提示",url + "   不是一个有效的地址")
        return false;
    }
    else{
        return true;
    }
}

