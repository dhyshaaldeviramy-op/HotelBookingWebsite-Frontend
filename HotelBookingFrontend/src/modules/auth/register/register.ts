import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../../../core/services/authservice';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  
  private fb     = inject(FormBuilder);
  private auth   = inject(Authservice);
  private router = inject(Router);

  loading = signal(false);
  roles = ['Customer', 'Owner'];

    
  form:FormGroup= this.fb.group({
    name  : ['',Validators.required],
    email: ['',[Validators.required]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    role: ['',Validators.required]
  });

  submit():void{
    if(this.form.invalid){
      this.form.markAllAsTouched(); 
      return;
    }
   
    this.loading.set(true);
    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        console.error();
        this.loading.set(false);
      }
    });
  }
}


