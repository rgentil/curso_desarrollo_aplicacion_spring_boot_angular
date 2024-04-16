import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Cliente } from '../../model/Cliente';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario:string;
  password:string;
  cliente:Cliente;

  constructor(private loginService:LoginService, private menuComponent:MenuComponent, private router:Router){

  }

  login(){
    this.loginService.login(this.usuario, this.password).subscribe(data=>{
      this.cliente = data;
      if(this.cliente!=null){//Usuario válido
        this.menuComponent.cliente = this.cliente;
        this.menuComponent.enabled = true;
        this.router.navigate(["/procesar"]);
        //alert("Usuario autenticado");
      }else{
        alert("Usuario no autenticado");
      }
    })
  }

}
