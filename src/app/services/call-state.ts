import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CallStateService {
  private roomId$ = new BehaviorSubject<string | null>(null);

  setRoom(id: string) {
    this.roomId$.next(id);
  }

  getRoom() {
    return this.roomId$.asObservable();
  }
}
