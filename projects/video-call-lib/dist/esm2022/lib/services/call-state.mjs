import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class CallStateService {
    constructor() {
        this.roomId$ = new BehaviorSubject(null);
    }
    setRoom(id) {
        this.roomId$.next(id);
    }
    getRoom() {
        return this.roomId$.asObservable();
    }
    static { this.ɵfac = function CallStateService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CallStateService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CallStateService, factory: CallStateService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CallStateService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbC1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvc2VydmljZXMvY2FsbC1zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBR3ZDLE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7UUFFVSxZQUFPLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0tBUzVEO0lBUEMsT0FBTyxDQUFDLEVBQVU7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztpSEFUVSxnQkFBZ0I7dUVBQWhCLGdCQUFnQixXQUFoQixnQkFBZ0IsbUJBREgsTUFBTTs7aUZBQ25CLGdCQUFnQjtjQUQ1QixVQUFVO2VBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBDYWxsU3RhdGVTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJvb21JZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xyXG5cclxuICBzZXRSb29tKGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucm9vbUlkJC5uZXh0KGlkKTtcclxuICB9XHJcblxyXG4gIGdldFJvb20oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb29tSWQkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=