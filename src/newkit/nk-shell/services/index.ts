import { AuthService } from './auth.service';
import { MessageProcessor } from './messageProcessor';
import { CrossDomainMessage } from './crossDomainMessage';
import { MenuService } from './menu.service';
import { AuthGuard } from './auth-guard.service';

export {
  AuthService,
  MessageProcessor,
  CrossDomainMessage,
  MenuService,
  AuthGuard
};

export const ALL_SERVICES = [
  AuthService,
  MessageProcessor,
  CrossDomainMessage,
  MenuService,
  AuthGuard
];
