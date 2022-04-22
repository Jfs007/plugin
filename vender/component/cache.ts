export default class Cache {
    _c: Array<string>;
    constructor() {
        this._c = [];
        
    }
    for(callback:Function) {
        this._c.map(cache => callback(cache));
    }
    pushCache(cache) {
        let _c = this._c;
        if(!this.isCache(cache)) {
            this._c.push(cache);
        }
    }
    pushCaches(caches) {
        caches.map(cache => this.pushCache(cache));
    }

    clearCache(cache) {
        let index = this._c.findIndex(c => c == cache);
        if(index>-1) {
            this._c.splice(index, 1);
        }
    }
    clearCaches(caches) {
        caches.map(cache => this.clearCache(cache));
    }

    isCache(cache):boolean {
        return !!this._c.find(c => c == cache)
    }
    getCache() {
        return this._c;
    }
    

}