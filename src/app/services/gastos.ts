import { Injectable, computed, signal } from '@angular/core';

export type Categoria = 'Comida' | 'Transporte' | 'Ocio' | 'Otros';

export interface Gasto {
  id: number;
  concepto: string;
  importe: number;
  categoria: Categoria;
}

@Injectable({ providedIn: 'root' })
export class Gastos {
  private siguienteId = 1;
  private readonly _gastos = signal<Gasto[]>([]);

  readonly gastos = this._gastos.asReadonly();
  // Bug a propósito: sin redondear, 0.1 + 0.2 da 0.30000000000000004
  readonly total = computed(() => this._gastos().reduce((suma, g) => suma + g.importe, 0));

  agregar(concepto: string, importe: number, categoria: Categoria): Gasto | null {
    const texto = concepto.trim();
    if (!texto || !(importe > 0)) {
      return null;
    }
    const gasto: Gasto = { id: this.siguienteId++, concepto: texto, importe, categoria };
    this._gastos.update((lista) => [...lista, gasto]);
    return gasto;
  }

  eliminar(id: number): void {
    this._gastos.update((lista) => lista.filter((g) => g.id !== id));
  }

  totalPorCategoria(categoria: Categoria): number {
    return this._gastos()
      .filter((g) => g.categoria === categoria)
      .reduce((suma, g) => suma + g.importe, 0);
  }
}
