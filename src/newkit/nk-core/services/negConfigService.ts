import { Injectable } from '@angular/core';

import { NegAjax } from './../services/negAjax';
import { NegUtil } from './../services/negUtil';

@Injectable()
export class NegConfigService {

  private configServiceMap: Map<string, any>;

  constructor(private negAjax: NegAjax, private negUtil: NegUtil) {
    this.configServiceMap = new Map<string, any>();
  }
  /**
   * 加载config services.
   * @param  {string} system - 系统名称
   * @param  {string} key - 系统中的key
   * @param  {string} hashKey - 系统名称和key拼接的一个key
   * @param  {boolean} force? - 是否强制获取最新数据
   * @returns {Promise}
   */
  _load(system: string, key: string, hashKey: string, force?: boolean): Promise<any> {
    let url = `${NewkitConf.configServiceAddress}/${this.negUtil.encodeUri(system)}/${this.negUtil.encodeUri(key)}`;
    return new Promise((resolve, reject) => {
      if (!force) {
        if (this.configServiceMap.has(hashKey)) {
          return resolve(true);
        }
      }
      this.negAjax.get(url)
        .then(res => {
          let data = res.json();
          this.configServiceMap.set(hashKey, data);
          resolve(true);
        })
        .catch(reason => reject(reason));
    });
  }
  /**
   * 获取指定system和key的config数据
   * @param  {string} system - 系统名称
   * @param  {string} key - 系统中的key
   * @param  {boolean} force? - 强制获取最新数据
   * @returns {Promise}
   */
  get(system: string, key: string, force?: boolean): Promise<any> {
    if (!system) {
      throw new Error('system param required.');
    }
    if (!key) {
      throw new Error('key param required.');
    }
    let hashKey = `${system}+|*|+${key}`;
    return new Promise((resolve, reject) => {
      this._load(system, key, hashKey, force)
        .then(() => {
          let config = this.configServiceMap.get(hashKey);
          if (config) {
            return resolve(config.configValue);
          }
          resolve(null);
        })
        .catch(reason => reject(reason));
    });
  }
}