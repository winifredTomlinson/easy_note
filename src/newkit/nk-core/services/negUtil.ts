import { Injectable } from '@angular/core';

@Injectable()
export class NegUtil {

  constructor() { }

  encodeUri(text: string): void {
    return (window as any).encodeURI(text);
  }

  decodeUri(text: string): void {
    return (window as any).decodeURI(text);
  }

}