import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private loginService: LoginService) {}

  onSubmit(): void {
    this.loginService.login(this.email, this.senha).subscribe(
      (response: any) => {
        // Login bem-sucedido, redirecione ou realize ação necessária
        alert('Login bem-sucedido!');
      },
      (error) => {
        // Trate erros, como credenciais inválidas
        alert('Credenciais inválidas');
      }
    );
  }
}
