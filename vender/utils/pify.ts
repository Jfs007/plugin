
type Config = {
    resolve?: Function;
    revoke?: Function
}

let ifyDefaultConfig = {
    resolve: (v) => v,
    revoke: (v) => v
}

export let promiseify = (_function:Function, ) => {
    return (...args ) => new Promise((resolve, revoke) => {
        let lastParamtar = args[args.length-1];
       
        let config:Config = {};
       
        if(<Config>lastParamtar.resolve) {
           
            config = args.pop();
        }
        let _config = Object.assign({}, ifyDefaultConfig, config);
        _function(...args, (err, data) => {
            if(err) {
                revoke(_config.revoke(err))
            }else {
                resolve(_config.resolve(data));
            }
        })
    })
}