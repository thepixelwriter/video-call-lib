import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class WebRTCService {
    private http;
    private pc;
    private localStream;
    private remoteStream;
    private currentRoom;
    private isInitialized;
    private remoteVideoElement;
    constructor(http: HttpClient);
    private baseUrl;
    init(room: string, localVideo: HTMLVideoElement, remoteVideo: HTMLVideoElement): Promise<void>;
    private setupSocketListeners;
    private cleanup;
    switchCamera(): Promise<void>;
    leave(): void;
    pause(): void;
    resume(): void;
    toggleAudio(enabled: boolean): void;
    toggleVideo(enabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebRTCService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WebRTCService>;
}
//# sourceMappingURL=webrtc.d.ts.map