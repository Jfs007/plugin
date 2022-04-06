import Base from "../lib/base";

type Options = {
    forceType: boolean;
}
export class Word extends Base{
    code: string;
    options: Options;
    constructor(code: string, options?:Options) {
       
        super(options);
        this.code = code;
        this.options = {
            forceType: true
        }
        super.init(options);
        // this.forceType = options.
    }
    isObject(value: string): boolean {
        return <boolean>(!!value.trim().match(/^\{.*\}$/))
    }
    isArray(value: string): boolean {
        return <boolean>(!!value.trim().match(/^\[.*\]$/))
    }
    isNumber(value: string): boolean {
        return <boolean>(!!value.trim().match(/^\d*$/));
    }
    isString(value: string): boolean {
        return <boolean>(!!value.trim().match(/^['|"].*['|"]$/));
    }

    isFunction(value: string): boolean {
        let fun1 = <boolean>(!!value.match(/^function(.*).*{.*}$/));
        let fun2 = <boolean>(!!value.match(/^(.*).*=>.*{.*}$/));
        return fun1 || fun2;
    }
    typeof(value: string):string {
        if (this.isObject(value)) return 'object';
        if (this.isArray(value)) return 'array';
        if (this.isNumber(value)) return 'number';
        if (this.isFunction(value)) return 'function';
        if (this.isString(value)) return 'string';
        if (value.trim() == 'undefined') return 'undefined';
        if (value.trim() == 'null') return 'null';
        return 'var'

    }
    scopeMerge(clapArray:Array<string>, ):Array<string> {
        let keyValues = [];
        let scopeIdentNum = { '{': 0, '[': 0, '}': 0, ']': 0 };
        clapArray.map(keyValue =>  {
            let scopeIdent = keyValue.match(/\[|\{|\}|\]/g) || [];
            if ((scopeIdentNum['{'] == scopeIdentNum['}'] && scopeIdentNum['['] == scopeIdentNum[']'])) {
                scopeIdentNum = { '{': 0, '[': 0, '}': 0, ']': 0 };
                keyValues.push(keyValue);
                
            }else {
                let lastKeyValue = keyValues[keyValues.length-1];

                keyValues[keyValues.length-1]= lastKeyValue + ',' + keyValue;
                
            }  
            scopeIdent.map(ident => {
                scopeIdentNum[ident]++;
            });
        })

        // clapArray.map()

        return keyValues;
    }

    js() {
        return this.analysis(this.code);
    }

    analysis(code:string):object {
        let {forceType} = this.options;
        code = code.trim();
        let _obj = {};
        let clap_string:string = code.replace(/[\n\r]/g, '').match(/^\{(.*)\}$/)[1];
        if(!clap_string) return _obj;
        let keyValues = this.scopeMerge(clap_string.split(','));
        let fileds = keyValues.map((keyValue: string): Array<string> => {
            let [exec, key, value] = <Array<string>>(keyValue.match(/(.*?):(.*)/) || []);
            return [key.trim(), value.trim()];
        });
        
        fileds.map(filed => {
            let [key, value] = filed;
            let _type = this.typeof(value);
            if (this.isArray(value)) {
                let arrayObjectString:string = value.trim().match(/\[(.*)\]/)[1];
                if(arrayObjectString) {
                    _obj[key] = this.scopeMerge(arrayObjectString.split(',')).map(code => {
                        
                        return this.analysis(code);
                    });
                }else {
                    _obj[key] = [];
                }
            
                
            }
            else if (this.isObject(value)) {
                _obj[key] = this.analysis(value);
            } else if (this.isString(value)){
                _obj[key] = forceType ? `${value.replace(/^["'](.*)["']$/, "$1")}:${_type}` : value;
                // .replace(/^["'](.*)["']$/, "$1")

            } else {
                _obj[key] = forceType ? `${value}:${_type}` : value;
            }
        });
        return _obj;
    }
}