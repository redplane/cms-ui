import {ModuleWithProviders, NgModule} from '@angular/core';
import {RoleSentinelDirective} from './role-sentinel.directive';
import {RoleSentinelOption} from './role-sentinel-option';

@NgModule({
    declarations: [
        RoleSentinelDirective
    ],
    exports: [
        RoleSentinelDirective
    ]
})
export class RoleSentinelModule {

    //#region Properties

    public static forRoot(option: RoleSentinelOption): ModuleWithProviders<RoleSentinelModule> {
        return {
            ngModule: RoleSentinelModule,
            providers: option.providers || []
        };
    }

    //#endregion

}
