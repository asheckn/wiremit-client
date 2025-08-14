import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth-service';
import {LoginCredentials} from '../../../core/types/user.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials: LoginCredentials = {
    email: "",
    password: "",
  }

  loading = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.errorMessage = ""

    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = "Email and password are required"
      return
    }

    this.loading = true

    this.authService.login(this.credentials).subscribe({
      next: (result) => {
        this.loading = false
        if (result.success) {
          this.router.navigate(["/dashboard"])
        } else {
          this.errorMessage = result.message
        }
      },
      error: () => {
        this.loading = false
        this.errorMessage = "An error occurred. Please try again."
      },
    })
  }
}
