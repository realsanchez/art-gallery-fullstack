import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface UserData {
  name: string;
  username: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  currentUser = this.currentUserSubject.asObservable();
  login(userData: UserData) {
    console.log('AuthService login called with:', userData);
    localStorage.setItem('user', JSON.stringify(userData));
    this.currentUserSubject.next(userData);
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  loadUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}
