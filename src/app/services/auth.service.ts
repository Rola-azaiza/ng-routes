import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  /*
  The login method will return true if the provided user/password pair
  equals 'user' and 'password', respectively. Also, when it is matched, it’s
  going to use localStorage to save the username. This will also serve as a flag
  to indicate whether or not there is an active logged user.
   */
  login(user: string, password: string): boolean {
    if (user === 'user' && password === 'password') {
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }
  // The logout method just clears the username value:
  logout(): void {
    localStorage.removeItem('username');
  }
  // getUser returns the username or null
  getUser(): any {
    return localStorage.getItem('username');
  }
  // isLoggedIn uses getUser() to return true if we have a user
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
