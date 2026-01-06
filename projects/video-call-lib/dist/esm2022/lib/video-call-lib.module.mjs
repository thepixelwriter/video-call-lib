import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { WebRTCService } from './services/webrtc';
import { CallStateService } from './services/call-state';
import { AuthService } from './services/auth';
import { Signaling } from './services/signaling';
import { AuthGuard } from './guards/auth.guard';
import * as i0 from "@angular/core";
export class VideoCallLibModule {
    static { this.ɵfac = function VideoCallLibModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || VideoCallLibModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: VideoCallLibModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            WebRTCService,
            CallStateService,
            AuthService,
            Signaling,
            AuthGuard
        ], imports: [CommonModule,
            HttpClientModule,
            IonicModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VideoCallLibModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    IonicModule
                ],
                providers: [
                    WebRTCService,
                    CallStateService,
                    AuthService,
                    Signaling,
                    AuthGuard
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VideoCallLibModule, { imports: [CommonModule,
        HttpClientModule,
        IonicModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY2FsbC1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi92aWRlby1jYWxsLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFnQmhELE1BQU0sT0FBTyxrQkFBa0I7bUhBQWxCLGtCQUFrQjttRUFBbEIsa0JBQWtCO3dFQVJsQjtZQUNULGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsV0FBVztZQUNYLFNBQVM7WUFDVCxTQUFTO1NBQ1YsWUFWQyxZQUFZO1lBQ1osZ0JBQWdCO1lBQ2hCLFdBQVc7O2lGQVVGLGtCQUFrQjtjQWQ5QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixXQUFXO2lCQUNaO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsV0FBVztvQkFDWCxTQUFTO29CQUNULFNBQVM7aUJBQ1Y7YUFDRjs7d0ZBQ1ksa0JBQWtCLGNBWjNCLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IElvbmljTW9kdWxlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgV2ViUlRDU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvd2VicnRjJztcclxuaW1wb3J0IHsgQ2FsbFN0YXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2FsbC1zdGF0ZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoJztcclxuaW1wb3J0IHsgU2lnbmFsaW5nIH0gZnJvbSAnLi9zZXJ2aWNlcy9zaWduYWxpbmcnO1xyXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9hdXRoLmd1YXJkJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIElvbmljTW9kdWxlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFdlYlJUQ1NlcnZpY2UsXHJcbiAgICBDYWxsU3RhdGVTZXJ2aWNlLFxyXG4gICAgQXV0aFNlcnZpY2UsXHJcbiAgICBTaWduYWxpbmcsXHJcbiAgICBBdXRoR3VhcmRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaWRlb0NhbGxMaWJNb2R1bGUge31cclxuIl19