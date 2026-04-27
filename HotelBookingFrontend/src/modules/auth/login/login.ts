import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../../../core/services/authservice';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   private fb     = inject(FormBuilder);
  private auth   = inject(Authservice);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.auth.savesession(res);
        if (this.auth.isSuperAdmin()) {
          this.router.navigate(['/admin/dashboard']);
        } else if (this.auth.isOwner()) {
          this.router.navigate(['/owner/add-hotel']);
        } else {
          this.router.navigate(['/hotels']);
        }
      },
      error: (err: any) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || 'Login failed. Please try again.');
        console.error('Login error:', err);
      }
    });
  }
}


