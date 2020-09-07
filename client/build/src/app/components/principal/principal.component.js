import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
const parser = require('../../public/analizador.js');
let PrincipalComponent = class PrincipalComponent {
    constructor() { }
    ngOnInit() {
    }
    prueba() {
        alert("Esta vivo okiukiu");
    }
};
PrincipalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-principal',
        templateUrl: './principal.component.html',
        styleUrls: ['./principal.component.css']
    })
], PrincipalComponent);
export { PrincipalComponent };
//# sourceMappingURL=principal.component.js.map