export class Word  { 
    constructor() {

    }
    isObject(value:string):boolean {
        return <boolean>(!!value.trim().match(/^\{.*\}$/))
    }
    isArray(value:string):boolean {
        return <boolean>(!!value.trim().match(/^\[.*\]$/))
    }
    isNumber(value:string) :boolean {
        return <boolean>(!!value.trim().match(/^\d*$/));
    }
    isString(value:string) :boolean {
        return <boolean>(!!value.trim().match(/^['|"].*['|"]$/));
    }
    
    isFunction(value:string):boolean {
        let f1 = <boolean>(!!value.match(/^function(.*).*{.*}$/));
        let f2 = <boolean>(!!value.match(/^(.*).*=>.*{.*}$/));
        return f1 || f2;
    }
    typeof(value:string) {
        if(this.isObject(value)) return 'object';
        if(this.isArray(value)) return 'array';
        if(this.isNumber(value)) return 'number';
        if(this.isFunction(value)) return 'function';
        if(this.isString(value)) return 'string';
        if(value.trim() == 'undefined') return 'undefined';
        if(value.trim() == 'null') return 'null';
        return 'var'
        
    }

    analysis(code) {
        code = code.trim();
        let _obj = {};
        let fileds_dirty = <Array<string>>(code.match(/([^\s.]*)\s{0,}:\s+(.*)/g) || []);
        console.log(fileds_dirty, 'vvv');
        // ['name: "home",', 'go: vv,']
        let fileds = fileds_dirty.map((dirty:string): Array<string> => {
            let clean:string =  dirty.replace(/,$/, '').trim();
            let [exec, key, value] = <Array<string>>(clean.match(/(.*?):(.*)/) || []);
            return [key.trim(), value.trim()];
        });
        // console.log(fileds, 'fies');

        fileds.map(filed => {
            let [key, value] = filed;
            if(this.isArray(value)) {
                _obj[key] = (value.trim()).match(/\[(.*)\]/)[1].split(',').map(code => {
                    return this.analysis(code);
                });
            }
            else if(this.isObject(value)) {
                _obj[key] = this.analysis(value);
            }else {
                _obj[key] = `"${value}"`;
            }

            // _obj[key] 
        });
        return _obj; 
    }

    
    // let wordAnalysis = (code) => {
    //     code.match(/([^\s.]*)\s{0,}:\s+(.*)/g)
    // }
    // code.match(/([^\s.]*)\s{0,}:\s+(.*)/g)
}