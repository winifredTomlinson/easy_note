import { Injectable } from '@angular/core';

import { NegAjax } from './../services/negAjax';

const trackerMap: Map<string, any> = new Map<string, any>();

let buildRandomKey = () => {
  return Math.random().toString(16).replace('.', '');
};

@Injectable()
export class NegTracker {

  constructor(private negAjax: NegAjax) { }

  startTrack(moduleName: string, action: string, label?: string, userId?: string) {
    if (!module) {
      throw new Error('param moduleName required.');
    }
    if (!action) {
      throw new Error('param action required.');
    }
    let key;
    do {
      key = buildRandomKey();
    } while (trackerMap.has(key));
    let track = {
      Module: moduleName,
      Action: action,
      Label: label || '',
      StartDate: Date.now(),
      OperateUser: userId || ''
    };
    trackerMap.set(key, track);

    return {
      end: () => {
        this._endTrack(key);
      }
    };
  }

  _endTrack(key: string) {
    let track = trackerMap.get(key);
    if(!track){
      return;
    }
    track.EndDate = Date.now();
    track.Value = track.EndDate - track.StartDate;
    this._pushTrackData(track, key);
  }

  _pushTrackData(track: any, key: string) {
    let url = `${NewkitConf.APIGatewayAddress}/spider/v1/event`;
    this.negAjax.post(url, [track]).then(data => {
      trackerMap.delete(key);
    });
  }
}