// All services import 
import { NegAlert } from './services/negAlert';
import { NegAjax } from './services/negAjax';
import { NegModuleLoader } from './services/negModuleLoader';
import { NegUtil } from './services/negUtil';
import { NegGlobalConfig } from './services/negGlobalConfig';
import { NegConfigService } from './services/negConfigService';
import { NegDfisUploader } from './services/negDfisUploader';
import { NegEventBus } from './services/negEventBus';
import { NegStorage } from './services/negStorage';
import { NegTracker } from './services/negTracker';
import { NegUserProfile } from './services/negUserProfile';
import { NegContext } from './services/negContext';
import { NegGlobalLoading } from './services/negGlobalLoading';
import { NegProgress } from './services/negProgress';
import { NegAuth } from './services/negAuth';
import { NegBreadcrumb } from './services/negBreadcrumb';
import { NegStore } from './services/negStore';

import { TranslateService } from 'ng2-translate';

// All services export 
export {
  TranslateService,
  NegAlert,
  NegAjax,
  NegConfigService,
  NegContext,
  NegDfisUploader,
  NegEventBus,
  NegGlobalConfig,
  NegModuleLoader,
  NegStorage,
  NegTracker,
  NegUserProfile,
  NegUtil,
  NegGlobalLoading,
  NegProgress,
  NegAuth,
  NegBreadcrumb,
  NegStore
};

// Export all services
export const CORE_SERVICES = [
  TranslateService,
  NegAlert,
  NegAjax,
  NegConfigService,
  NegContext,
  NegDfisUploader,
  NegEventBus,
  NegGlobalConfig,
  NegModuleLoader,
  NegStorage,
  NegTracker,
  NegUserProfile,
  NegUtil,
  NegGlobalLoading,
  NegProgress,
  NegAuth,
  NegBreadcrumb,
  NegStore
];