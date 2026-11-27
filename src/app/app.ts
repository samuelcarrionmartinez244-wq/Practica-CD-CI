import { Component, inject } from '@angular/core';

import { GastoForm, NuevoGasto } from './components/gasto-form/gasto-form';
import { ResumenGastos } from './components/resumen-gastos/resumen-gastos';
import { Gastos } from './services/gastos';

@Component({
  selector: 'app-root',
  imports: [GastoForm, ResumenGastos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly titulo = 'Control de gastos';
  protected readonly gastos = inject(Gastos);

  anadir(g: NuevoGasto): void {
    this.gastos.agregar(g.concepto, g.importe, g.categoria);
  }
}
