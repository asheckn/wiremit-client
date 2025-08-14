import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SignUpData} from '../../../core/types/user.model';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  signUpData: SignUpData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  loading = false
  errorMessage = ""
  successMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.errorMessage = ""
    this.successMessage = ""

    // Validation
    if (!this.signUpData.name || !this.signUpData.email || !this.signUpData.password) {
      this.errorMessage = "All fields are required"
      return
    }

    if (this.signUpData.password !== this.signUpData.confirmPassword) {
      this.errorMessage = "Passwords do not match"
      return
    }

    if (this.signUpData.password.length < 6) {
      this.errorMessage = "Password must be at least 6 characters"
      return
    }

    this.loading = true

    this.authService.signUp(this.signUpData).subscribe({
      next: (result) => {
        this.loading = false
        if (result.success) {
          this.successMessage = result.message
          setTimeout(() => {
            this.router.navigate(["/login"])
          }, 2000)
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
