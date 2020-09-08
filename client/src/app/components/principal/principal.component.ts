import { Component, OnInit } from '@angular/core';
import {parser} from '../../AnalizadorEjecucion/public/analizador.js';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {

  captura:any='';

  constructor() { }

  ngOnInit() {
  }
  prueba(){
    alert(this.captura);
    parser.parse(this.captura);
  }
}
