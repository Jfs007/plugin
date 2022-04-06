

export let serialize = (target: object, callback: Function = ({key, value}) => ({ key, value })) => {

    let _serialize = (target): string => {
        let keyGroup = [];

        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                let value = target[key];
                
                if (typeof value == 'object') {
                    if (Array.isArray(value)) {
                        let serializeGroup: Array<unknown> = value.map(target => {
                            let serialize: string = _serialize(target);
                            return serialize;
                        });
                        let childrenSerialize: string = `[${serializeGroup.join(',')}]`;
                        keyGroup.push(`${key}:${childrenSerialize}`);
                    } else {
                        let childrenSerialize: string = _serialize(value);
                        keyGroup.push(`${key}:${childrenSerialize}`);
                    }
                } else {
                    let custom = callback({key, value});
                    if (typeof custom.value == 'string') {
                        custom.value = `${custom.value}`;
                    }
                    // value = value.replace(/^["'](.*)["']$/, "$1");
                    keyGroup.push(`${custom.key}: ${custom.value}`);
                }


            }
        }
        return `{${keyGroup.join(',')}}`;
    }

    if (typeof target != 'object') {
        let custom = callback({key: undefined, value: target });
        if(typeof target == 'string') {
            
        //    return (<string>target).replace(/^["'](.*)["']$/, "$1");
            return `${custom.value}`;
        }
        return custom.value;
    }
    if (Array.isArray(target)) {
        return "[" + target.map(m => _serialize(m)).join(',') + "]"
    }

    return _serialize(target);
}