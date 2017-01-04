require('./app.styl');

import { NegModuleLoader } from './core.services';
window['defineModule'] = NegModuleLoader.defineModule;

export * from './core.services';
export * from './core.pipes';
export * from './core.module';

import { TranslateModule, LangChangeEvent } from 'ng2-translate';
export {
  TranslateModule,
  LangChangeEvent,
};


