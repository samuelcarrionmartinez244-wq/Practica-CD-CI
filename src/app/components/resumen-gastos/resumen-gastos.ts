import { Component, input, output } from '@angular/core';

import { Gasto } from '../../services/gastos';

@Component({
  selector: 'app-resumen-gastos',
  templateUrl: './resumen-gastos.html',
  styleUrl: './resumen-gastos.css'
})
export class ResumenGastos {
  readonly gastos = input<Gasto[]>([]);
  readonly total = input(0);
  readonly eliminar = output<number>();

  formatear(importe: number): string {
    return importe.toFixed(2).replace('.', ',') + ' €';
  }
}
