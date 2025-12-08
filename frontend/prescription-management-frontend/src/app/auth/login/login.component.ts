import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isSubmitting = false;
  error: string | null = null;
  returnUrl: string | null = null;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.value;
    if (!username || !password) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigateByUrl(this.returnUrl || '/prescriptions');
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Invalid username or password';
      },
    });
  }
}
