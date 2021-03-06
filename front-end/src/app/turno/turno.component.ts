import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
  private apiUrl: string = 'http://localhost:8000/';
  turno : string;
  fecha : string;
  email : string;
  codigo : string;
  horario : string;
  logueado: boolean;
  cargando : boolean;
  actividad : string;

  color = 'warn';
  checked = false;
  disabled = false;


  constructor(private http: HttpClient,public snackBar: MatSnackBar) { }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  ngOnInit() {
    this.turno = "";
    this.fecha = "";
    this.email = "";
    this.codigo = "";
    this.horario = "";
    this.actividad = "";
    this.logueado = false;
    this.cargando = false;
  }
  clean($event){
    $event.preventDefault();
    this.turno = "";
    this.fecha = "";
    this.email = "";
    this.codigo = "";
    this.horario = "";
    this.actividad = "";
    this.logueado = false;
    this.cargando = false;
  }
  getRandomNumber(i: number) {
    let random = Math.floor(Math.random() * (6 - 1)) + 1;
    return random;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000,});
  }
  send_mail($event){
    $event.preventDefault();
    this.cargando = true;
    this.http.post(this.apiUrl+'codigo/', this.email).subscribe(data => {
      setTimeout(() =>{ this.cargando = false;this.openSnackBar('Se ha enviado un codigo a su mail','OK');  },1500);
      console.log(data);
    });
  }
  guardar() {
    //var numero = this.getRandomNumber();
    //if(numero == 1 || numero == 2 || numero == 3){ this.logueado = false; }
    if(!this.logueado || this.codigo == '123'){
      this.cargando = true;
      setTimeout(() =>{ this.cargando = false;this.openSnackBar('El turno se ha guardado correctamente','OK');  },1500);
    }else{
      this.openSnackBar('El codigo no es el correcto',' ');
    }
  }

}
