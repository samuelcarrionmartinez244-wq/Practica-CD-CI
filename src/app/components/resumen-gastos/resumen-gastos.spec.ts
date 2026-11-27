import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenGastos } from './resumen-gastos';
import { Gasto } from '../../services/gastos';

describe('ResumenGastos (componente)', () => {
  let component: ResumenGastos;
  let fixture: ComponentFixture<ResumenGastos>;
  let el: HTMLElement;

  const datos: Gasto[] = [
    { id: 1, concepto: 'Gasolina', importe: 40, categoria: 'Transporte' },
    { id: 2, concepto: 'Entradas', importe: 15.5, categoria: 'Ocio' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ResumenGastos] }).compileComponents();
    fixture = TestBed.createComponent(ResumenGastos);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  it('muestra un aviso y total 0 cuando no hay gastos', () => {
    fixture.detectChanges();
    expect(el.querySelector('.vacio')).not.toBeNull();
    expect(el.querySelector('.total')?.textContent).toContain('0,00 €');
  });

  it('pinta una fila por gasto con el importe formateado y el total', () => {
    fixture.componentRef.setInput('gastos', datos);
    fixture.componentRef.setInput('total', 55.5);
    fixture.detectChanges();
    const filas = el.querySelectorAll('tbody tr');
    expect(filas.length).toBe(2);
    expect(filas[1].textContent).toContain('Entradas');
    expect(filas[1].textContent).toContain('15,50 €');
    expect(el.querySelector('.total')?.textContent).toContain('55,50 €');
  });

  it('emite el id al pulsar la papelera', () => {
    const eliminados: number[] = [];
    component.eliminar.subscribe((id) => eliminados.push(id));
    fixture.componentRef.setInput('gastos', datos);
    fixture.detectChanges();
    (el.querySelectorAll('button.eliminar')[1] as HTMLButtonElement).click();
    expect(eliminados).toEqual([2]);
  });
});
