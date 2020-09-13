import { Component, OnInit } from '@angular/core';
import {parser} from '../../build_A/public/analizador.js';

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
    const tree= parser.parse(this.captura);
    console.log(tree);
  }
}
