import { Injectable } from '@angular/core';

import { NegAjax } from './../services/negAjax';
import { NegContext } from './../services/negContext';



@Injectable()
export class NegUserProfile {

  private userId: string;
  private userProfile: any = {};

  constructor(private negAjax: NegAjax, private negContext: NegContext) { }

  init(userId: string) {
    this.userId = userId;
    let url = `${NewkitConf.APIGatewayAddress}/framework/v1/user-profile/${NewkitConf.DomainName}/${this.userId}`;
    return new Promise((resolve, reject) => {
      this.negAjax.get(url)
        .then(res => {
          let data = res.json();
          this.userProfile = data;
          this.userProfile.Profiles.forEach(x => {
            try {
              x.Value = JSON.parse(x.Value);
            } catch (e) { }
          });
          resolve(true);
        }).catch(reason => reject(reason));
    });
  }

  get(key: string) {
    let result = null;
    if (this.userProfile.Profiles && this.userProfile.Profiles.length > 0) {
      let keyItem = this.userProfile.Profiles.find(x => x.Key === key);
      if (keyItem) {
        result = keyItem.Value;
      }
    }
    return result;
  }

  _setProfile(key: string, value: string) {
    this._removeProfileKey(key);
    if (this.userProfile.Profiles && this.userProfile.Profiles.length >= 0) {
      this.userProfile.Profiles.push({
        Key: key,
        Value: value
      })
    }
  }

  set(key: string, value: any) {
    let pushData = {
      SystemName: this.userProfile.SystemName,
      UserId: this.userId,
      Profiles: [{
        Key: key,
        Value: value,
        LastEditDate: Date.now()
      }]
    };
    let url = `${NewkitConf.APIGatewayAddress}/framework/v1/user-profile`;
    return new Promise((resolve, reject) => {
      this.negAjax.post(url, pushData)
        .then(res => {
          this._setProfile(key, value);
          resolve(true);
        })
        .catch(reason => reject(reason));
    });
  }

  _removeProfileKey(key: string) {
    if (this.userProfile.Profiles && this.userProfile.Profiles.length > 0) {
      let profiles = this.userProfile.Profiles;
      for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].Key === key) {
          profiles.splice(i, 1);
          break;
        }
      }
    }
  }

  remove(key: string) {
    let url = `${NewkitConf.APIGatewayAddress}/framework/v1/user-profile/${NewkitConf.DomainName}/${this.userId}?key=${key}`;
    return new Promise((resolve, reject) => {
      this.negAjax.delete(url)
        .then(res => {
          resolve(true);
          this._removeProfileKey(key);
        }).catch(reason => reject(reason));
    });
  }
}