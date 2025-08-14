import {computed, Injectable, signal} from '@angular/core';
import {LoginCredentials, SignUpData, User} from '../types/user.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()
  private users: User[] = []

  constructor() {
    // Load users from localStorage if available
    const savedUsers = localStorage.getItem("users")
    if (savedUsers) {
      this.users = JSON.parse(savedUsers)
    }
    // Create an admin user if it doesn't exist
    this.createAdminUser();

    // Check if user is already logged in
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser))
    }

    // Keep signal in sync with BehaviorSubject
    this.currentUser$.subscribe(user => {
      this.currentUserSignal.set(user);
    });
  }

  signUp(signUpData: SignUpData): Observable<{ success: boolean; message: string }> {
    return new Observable((observer) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = this.users.find((u) => u.email === signUpData.email);
        if (existingUser) {
          observer.next({ success: false, message: "User already exists with this email" });
          observer.complete();
          return;
        }

        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          name: signUpData.name,
          email: signUpData.email,
          password: signUpData.password, // In real app, this would be hashed
          createdAt: new Date(),
          role: 'user', // Default role, can be changed later
        };

        this.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(this.users));

        observer.next({ success: true, message: "Account created successfully" });
        observer.complete();
      }, 1000); // 5 second delay
    })
  }

  login(credentials: LoginCredentials): Observable<{ success: boolean; message: string; user?: User }> {
    return new Observable((observer) => {
      setTimeout(() => {
        const user = this.users.find((u) => u.email === credentials.email && u.password === credentials.password)

        if (user) {
          this.currentUserSubject.next(user)
          localStorage.setItem("currentUser", JSON.stringify(user))
          observer.next({ success: true, message: "Login successful", user })
        } else {
          observer.next({ success: false, message: "Invalid email or password" })
        }
        observer.complete()
      }, 1000); // Simulate network delay

    })
  }

  logout(): void {
    this.currentUserSubject.next(null)
    setTimeout(() => {
      localStorage.removeItem("currentUser")
    }, 1000); // Simulate network delay

  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null
  }

  // Reactive signal for currentUser
  currentUserSignal = signal<User | null>(null);

  // Computed signal for login status
  isLoggedInSignal = computed(() => this.currentUserSignal() !== null);

  createAdminUser(): void{
    // check if admin user already exists
    const adminUser = this.users.find(user => user.role === 'admin');
    if (adminUser) {
      console.log("Admin user already exists");
      return;
    }
    // Create admin user
    const newUser: User = {
      id: Date.now().toString(),
      name: "admin",
      email: "admin@mail.com",
      password: "admin", // In real app, this would be hashed
      createdAt: new Date(),
      role: 'admin', // Default role, can be changed later
    };

    this.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}
