import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitter = false;

public registerForm = this.fb.group({
  nombre: ['thomas',  Validators.required],
  email: ['thomas@gmail.com',  [Validators.required, Validators.email]],
  password: ['12345', Validators.required],
  password2: ['12345', Validators.required],
  terminos: [true, Validators.required],
}, {
  validators: this.passwordsIguales('password', 'password2')
});

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  crearUsuario(){
    this.formSubmitter = true;
    console.log(this.registerForm.value);
    

    if (this.registerForm.invalid) {
     return;    
    }

    //Reaizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe( resp => {
//Navegando al Dashboard
this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error:',`${err.error.msg}`,'error');
      });
    
  }

  campoNoValido(campo:string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitter ) {
      return true;
    }else{
      return false;
    }

  }

  contrasenasNoValidas(){

const pass1= this.registerForm.get('password').value;
const pass2= this.registerForm.get('password2').value;

if ( (pass1 !== pass2)  && this.formSubmitter ) {
  return true;
}else{
  return false;
}

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitter;
  }

  passwordsIguales(pass1Name: string, pass2Name:string){

    return (formGroup: FormGroup) =>{

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
          pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual: true})
      }

    }

  }
}
