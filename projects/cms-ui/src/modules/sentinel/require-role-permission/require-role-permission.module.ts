import {ModuleWithProviders, NgModule} from '@angular/core';
import {RequireRolePermissionDirective} from './require-role-permission.directive';
import {RequireRolePermissionOption} from './require-role-permission-option';

@NgModule({
    declarations: [
        RequireRolePermissionDirective
    ],
    exports: [
        RequireRolePermissionDirective
    ]
})
export class RequireRolePermissionModule {

    //#region Properties

    public static forRoot(option: RequireRolePermissionOption): ModuleWithProviders<RequireRolePermissionModule> {
        return {
            ngModule: RequireRolePermissionModule,
            providers: option.providers
        };
    }

    //#endregion

}
