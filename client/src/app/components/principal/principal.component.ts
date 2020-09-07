import { Component, OnInit } from '@angular/core';
const parser=require('../../public/analizador.js');
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
  prueba(){
    alert("Esta vivo okiukiu");

  }
}
