const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error);
        process.exit(1);
    });

function getInstallerConfig () {
    const root = path.join('./');
    const out = path.join(root, 'release-builds');

    return Promise.resolve({
        appDirectory: path.join(out, 'Progresso-win32-ia32/'),
        authors: 'LochiQF',
        noMsi: true,
        outputDirectory: path.join(out, 'windows-installer'),
        exe: 'Progresso.exe',
        setupExe: 'ProgressoInstaller.exe',
        setupIcon: path.join(root, 'assets', 'icons',  'win', 'icon.ico'),
        skipUpdateIcon: true,
        versionString: {
            FileDescription: 'A tree view progress based todolist',
            ProductName: 'Progresso'
        }
    });
}
