import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
        ], imports: [CommonModule, HttpClientModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VideoCallLibModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, HttpClientModule],
                providers: [
                    WebRTCService,
                    CallStateService,
                    AuthService,
                    Signaling,
                    AuthGuard
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VideoCallLibModule, { imports: [CommonModule, HttpClientModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY2FsbC1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi92aWRlby1jYWxsLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQVloRCxNQUFNLE9BQU8sa0JBQWtCO21IQUFsQixrQkFBa0I7bUVBQWxCLGtCQUFrQjt3RUFSbEI7WUFDVCxhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxTQUFTO1lBQ1QsU0FBUztTQUNWLFlBUFMsWUFBWSxFQUFFLGdCQUFnQjs7aUZBUzdCLGtCQUFrQjtjQVY5QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUN6QyxTQUFTLEVBQUU7b0JBQ1QsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxTQUFTO2lCQUNWO2FBQ0Y7O3dGQUNZLGtCQUFrQixjQVRuQixZQUFZLEVBQUUsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IFdlYlJUQ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3dlYnJ0Yyc7XHJcbmltcG9ydCB7IENhbGxTdGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NhbGwtc3RhdGUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aCc7XHJcbmltcG9ydCB7IFNpZ25hbGluZyB9IGZyb20gJy4vc2VydmljZXMvc2lnbmFsaW5nJztcclxuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYXV0aC5ndWFyZCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgV2ViUlRDU2VydmljZSxcclxuICAgIENhbGxTdGF0ZVNlcnZpY2UsXHJcbiAgICBBdXRoU2VydmljZSxcclxuICAgIFNpZ25hbGluZyxcclxuICAgIEF1dGhHdWFyZFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFZpZGVvQ2FsbExpYk1vZHVsZSB7fVxyXG4iXX0=