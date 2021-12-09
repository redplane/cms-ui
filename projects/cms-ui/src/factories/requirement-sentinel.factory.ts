import {RequirementSentinelService} from '../modules/sentinel/requirement-sentinel/requirement-sentinel.service';
import {Injector} from '@angular/core';

export function buildSentinelDirectiveService(injector: Injector): RequirementSentinelService {
  return new RequirementSentinelService(injector);
}
