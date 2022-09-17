import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/auth/services/auth.service';

@Directive({ selector: '[appUserRole]'})
/**
 * This is to show hide content by checking user role. This is structural direvtive
 */
export class UserRoleDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private authService: AuthenticationService,
        private viewContainer: ViewContainerRef
    ) { }

    userRoles: any[] = [];

    @Input() 
    set appUserRole(roles: any[]) {
        if (!roles || !roles.length) {
            throw new Error('Roles value is empty or missed');
        }

        this.userRoles = roles;
    }

    ngOnInit() {
        let hasAccess = false;

        if (this.authService.isAuthorized() && this.userRoles) {
            hasAccess = this.userRoles.some(r => this.authService.hasRole(r));
        }

        if (hasAccess) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
