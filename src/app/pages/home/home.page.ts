import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { CallStateService } from 'src/app/services/call-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: false
})
export class HomePage {

  @ViewChild('startButton') startButton!: ElementRef<HTMLButtonElement>;
  roomId: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private callState: CallStateService
  ) {}

  startCall() {
    if (!this.roomId.trim()) {
      alert('Please enter a room ID');
      return;
    }

    this.isLoading = true;
    // Blur the button to remove focus before navigation
    this.startButton?.nativeElement?.blur();
    
    this.auth.login();
    this.callState.setRoom(this.roomId);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      this.router.navigate(['/call', this.roomId]);
    }, 300);
  }
}
