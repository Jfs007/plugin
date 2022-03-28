import { ConfigType } from '../types';
import Config from '../etc/config';
import Base from './base';
export default class Confirgurable extends Base{
    _config: ConfigType;
    constructor(config: ConfigType) {
        super();
        this._config = config;
        this.init();
    }
    init() {
        this._config = <ConfigType>(<any>Object).assign({}, Config, this._config);
    }
}