import Base from "../lib/base";
import { promiseify } from '../utils/pify';
import { watchOptions } from "../types";
const fs = require('fs');
import Cache from "./cache";


let defaultWatchOptions = {
    path: '',
}


export default class FileWatcher extends Base {
    cwd: string;
    options: watchOptions;
    cache: Cache;
    watchs: Array<Function>;
    constructor(options: watchOptions, cwd) {
        super(options);
        this.cwd = cwd;
        this.watchs = [];
        this.options = Object.assign({}, defaultWatchOptions, options);
        this.cache = new Cache();
    }
    on() {

    }

    beWatchFiles(files: Array<string>): Array<string> {
        let optionFile = this.options.file;
        return files.map(file => {
            return file.replace(`${this.cwd}/`, '');
        }).filter(file => {
            return file.indexOf(optionFile) > -1;
        });
    }

    async resolveFiles() {
        let cwd = this.cwd;
        let watchSrc = cwd + '/' + this.options.file.replace(/\/$/, '');
        let statify = promiseify(fs.stat);
        let Files = [];
        let _resolve = async (watchSrc) => {
            let files: Array<string> = fs.readdirSync(watchSrc);
            let readf = [];
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let path = watchSrc + '/' + file;
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
                Files.push(stat.path);
                if (!stat.stat.isFile()) {
                    await _resolve(stat.path);
                }
            }
        }
        await _resolve(watchSrc);
        return Files;

    }


    async notify(files: Array<string>) {
        files = this.beWatchFiles(files);
        let resolveFiles = await this.resolveFiles();
        resolveFiles = this.beWatchFiles(resolveFiles);
        let removeFile = [];
        this.cache.for(c => {
            let has = <boolean>(!!resolveFiles.find(file => file == c));
            if (!has) {
                removeFile.push(c);
                this.cache.clearCache(c);
            }
        });
    
        
        this.cache.pushCaches(files);

    }

}