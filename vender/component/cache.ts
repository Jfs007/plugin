export default class Cache {
    _c: Array<string>;
    constructor() {
        this._c = [];
        
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

    isCache(cache):boolean {
        return !!this._c.find(c => c == cache)
    }
    getCache() {
        return this._c;
    }
    

}