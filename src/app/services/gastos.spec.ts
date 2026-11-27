import { TestBed } from '@angular/core/testing';

import { Gastos } from './gastos';

describe('Gastos (servicio)', () => {
  let service: Gastos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gastos);
  });

  it('empieza sin gastos y con total 0', () => {
    expect(service.gastos()).toEqual([]);
    expect(service.total()).toBe(0);
  });

  it('agrega un gasto válido recortando el concepto', () => {
    const g = service.agregar('  Menú del día ', 12.5, 'Comida');
    expect(g).toEqual({ id: 1, concepto: 'Menú del día', importe: 12.5, categoria: 'Comida' });
    expect(service.gastos().length).toBe(1);
  });

  it('rechaza conceptos vacíos e importes no positivos', () => {
    expect(service.agregar('   ', 10, 'Otros')).toBeNull();
    expect(service.agregar('Bus', 0, 'Transporte')).toBeNull();
    expect(service.agregar('Bus', -3, 'Transporte')).toBeNull();
    expect(service.gastos().length).toBe(0);
  });

  it('calcula el total redondeado a céntimos', () => {
    service.agregar('Café', 0.1, 'Comida');
    service.agregar('Bollo', 0.2, 'Comida');
    expect(service.total()).toBe(0.3);
  });

  it('suma por categoría', () => {
    service.agregar('Metro', 1.5, 'Transporte');
    service.agregar('Cine', 8, 'Ocio');
    service.agregar('Bus', 2, 'Transporte');
    expect(service.totalPorCategoria('Transporte')).toBe(3.5);
    expect(service.totalPorCategoria('Comida')).toBe(0);
  });

  it('elimina un gasto por id y actualiza el total', () => {
    const a = service.agregar('Cine', 8, 'Ocio')!;
    service.agregar('Pizza', 10, 'Comida');
    service.eliminar(a.id);
    expect(service.gastos().map((g) => g.concepto)).toEqual(['Pizza']);
    expect(service.total()).toBe(10);
  });
});
