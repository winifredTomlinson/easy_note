require('./styl/all.styl');

import { NegModuleLoader } from 'newkit/core';
window['defineModule'] = NegModuleLoader.defineModule;

import { AppModule } from './app.module';

export {
  AppModule
};
