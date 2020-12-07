import {InjectionToken} from '@angular/core';
import {IModalService} from './modal-service.interface';

// Service provider injection token for modal.
export const MODAL_SERVICE_PROVIDER = new InjectionToken<IModalService>('');
