export default class Base {
    constructor(config?:object) {

    }
    init(options:object) {
        for (let key in options) {
            this[key] = options[key];
        }

    }
}