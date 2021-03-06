import { ConfigType, File } from "../types";
import defaultConfig from "../etc/config";
import FileBuilt from '../lib/file-built';
import { promiseify } from '../utils/pify';
import { createRouter } from "../utils/route";
import FileWatcher from "./file-watch";
import Router from "./router";
import Cache from "./cache";
const fs = require('fs');

export default class FileListenPlugin {
    config: ConfigType;
    cwd: string;
    cache: Cache;
    _fwatcher: FileWatcher
    routers: Array<Router>;
    constructor(config: ConfigType) {
        this.cache = new Cache();
        this.routers = [];
        this._fwatcher = new FileWatcher({
            file: 'src/page/'
        }, process.cwd().replace(/\\/g, "\\"))
        this.run(config);

    }
    get watchFolderPath(): string {
        let cwd = this.cwd;
        let { include } = this.config;
        return cwd + '/' + include;
    }
    async run(config: ConfigType) {
        this.config = (<any>Object).assign(defaultConfig, config);
        this.cwd = process.cwd().replace(/\\/g, "\\");
        let Files = await this.resolveFiles(this.watchFolderPath);
        console.log(await this.resolveFiles2(this.watchFolderPath));
        this.builtRouter(Files);
    }
    async listen(_file: File) {

        let { include } = this.config;
        let { path } = _file;
        let changePath = path.replace(`${this.cwd}/`, '');
        let isWatch = <boolean>(!!changePath.match(new RegExp(`^${include}`)));
        let includePath = path.replace(`${this.cwd}/${this.config.include}/`, '');
        let pathFolder = path.replace(/(.*)\/.*\..*$/ig, "$1");
        if (isWatch && !this.cache.isCache(pathFolder)) {
            let p = `${this.cwd}/${this.config.include}/${includePath.split('/')[0]}`;
            let Files = await this.resolveFiles(p);
            Files.unshift(p);
            this.cache.for(c => {
                let has = <boolean>(!!Files.find(file => file == c));
                if (!has) {
                    this.cache.clearCache(c);
                }
            });

            this.builtRouter(Files);
        }
    }
    async builtRouter(Files) {
        this.cache.pushCaches(Files);
        let Routers = createRouter(Files, this.cwd, this.config);
        this.routers = Routers;
        new FileBuilt(Routers, this.cwd, this.config);
    }
    async resolveFiles(foldePath) {
        let statify = promiseify(fs.stat);
        let Files = [];
        let _resolve = async (foldePath) => {
            let files: Array<string> = fs.readdirSync(foldePath);
            let readf = [];
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let path = foldePath + '/' + file;
                readf.push(statify(path, {
                    resolve: (data) => {
                        return {
                            stat: data,
                            path,
                        }
                    }
                }));
            }
            let stats: Array<any> = await Promise.all(readf);
            stats = stats.filter(file => !file.stat.isFile());
            for (let i = 0; i < stats.length; i++) {
                let stat = stats[i];
                Files.push(stat.path);
                await _resolve(stat.path);
            }
        }
        await _resolve(foldePath);
        Files = this.ingore(Files);
        return Files;

    }

    async resolveFiles2(foldePath) {
        let statify = promiseify(fs.stat);
        let Files = [];
        let _resolve = async (foldePath) => {
            let files: Array<string> = fs.readdirSync(foldePath);
            let readf = [];
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let path = foldePath + '/' + file;
                readf.push(statify(path, {
                    resolve: (data) => {
                        return {
                            stat: data,
                            path,
                        }
                    }
                }));
            }
            let stats: Array<any> = await Promise.all(readf);
            for (let i = 0; i < stats.length; i++) {
                let stat = stats[i];
                if (!stat.stat.isFile()) {
                    await _resolve(stat.path);
                } else {
                    Files.push(stat.path);
                }

            }
        }
        await _resolve(foldePath);
        // Files = this.ingore(Files);
        return Files;

    }
    
    ingore(folderPath) {
        let { ignoreFilePrefix, includeFilePrefix } = this.config;
        return folderPath.filter(folder => {
            let builtPath = folder.replace(`${this.cwd}/${this.config.include}/`, '');
            return !builtPath.split('/').find(path => {
                if (includeFilePrefix) {
                    let reg = new RegExp(`^${includeFilePrefix}`);
                    let includeTarget = path.match(reg);
                    if (!includeTarget) {
                        return true;
                    }
                }
                let reg = new RegExp(`^${ignoreFilePrefix}`);
                let ingoreTarget = path.match(reg);
                return <boolean>!!ingoreTarget;
            })
        })
    }

}