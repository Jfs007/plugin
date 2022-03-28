


export let mergeArrayObject = (array: Array<object>, refArray: Array<object>, callbackFunction:Function = (object: object, refObject: object):boolean => false ) : Array<object>=> { 
    let target = array.length > refArray.length ? array : refArray;
    let mergeArray = [];
    target.map((obj, index) => {
        mergeArray.push(obj);
        let refObject = refArray[index];
        if(refObject) {
            let exit = mergeArray.find(obj => callbackFunction(obj, refObject));
            if(exit) {
                Object.assign(exit, refObject);
            }
           !exit && callbackFunction(obj, refObject) && mergeArray.push(refObject);
        }
      
    })
    return mergeArray;
}