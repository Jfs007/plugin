

export let serialize = (target: object) => {

    let _serialize = (target): string => {
        let keyGroup = [];

        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                let value = target[key];
                if (typeof value == 'string') {
                    value = `"${value}"`;
                }
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
                    keyGroup.push(`${key}: ${value}`);
                }


            }
        }
        return `{${keyGroup.join(',')}}`;
    }

    if (typeof target != 'object') {
        if(typeof target == 'string') {
            return `"${target}"`;
        }
        return target;
    }
    if (Array.isArray(target)) {
        return "[" + target.map(m => _serialize(m)).join(',') + "]"
    }

    return _serialize(target);
}