import { Component, output, signal } from '@angular/core';

import { Categoria } from '../../services/gastos';

export interface NuevoGasto {
  concepto: string;
  importe: number;
  categoria: Categoria;
}

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.html',
  styleUrl: './gasto-form.css'
})
export class GastoForm {
  readonly categorias: Categoria[] = ['Comida', 'Transporte', 'Ocio', 'Otros'];
  readonly concepto = signal('');
  readonly importe = signal('');
  readonly categoria = signal<Categoria>('Comida');
  readonly error = signal('');
  readonly nuevoGasto = output<NuevoGasto>();

  enviar(): void {
    const concepto = this.concepto().trim();
    const importe = Number(this.importe().replace(',', '.'));
    if (!concepto) {
      this.error.set('Escribe un concepto');
      return;
    }
    if (!(importe > 0)) {
      this.error.set('El importe debe ser mayor que 0');
      return;
    }
    this.nuevoGasto.emit({ concepto, importe, categoria: this.categoria() });
    this.concepto.set('');
    this.importe.set('');
    this.error.set('');
  }
}
