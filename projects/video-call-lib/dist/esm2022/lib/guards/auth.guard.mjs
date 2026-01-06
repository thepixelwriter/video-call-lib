import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth";
import * as i2 from "@angular/router";
export class AuthGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate() {
        if (this.auth.isLoggedIn())
            return true;
        this.router.navigate(['/']);
        return false;
    }
    static { this.ɵfac = function AuthGuard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthGuard)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthGuard, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvZ3VhcmRzL2F1dGguZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszQyxNQUFNLE9BQU8sU0FBUztJQUVwQixZQUFvQixJQUFpQixFQUFVLE1BQWM7UUFBekMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRWpFLFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzswR0FSVSxTQUFTO3VFQUFULFNBQVMsV0FBVCxTQUFTLG1CQURJLE1BQU07O2lGQUNuQixTQUFTO2NBRHJCLFVBQVU7ZUFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGgnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cclxuXHJcbiAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5hdXRoLmlzTG9nZ2VkSW4oKSkgcmV0dXJuIHRydWU7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==