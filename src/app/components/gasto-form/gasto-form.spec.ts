import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoForm, NuevoGasto } from './gasto-form';

describe('GastoForm (componente)', () => {
  let component: GastoForm;
  let fixture: ComponentFixture<GastoForm>;
  let el: HTMLElement;
  let emitidos: NuevoGasto[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GastoForm] }).compileComponents();
    fixture = TestBed.createComponent(GastoForm);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    emitidos = [];
    component.nuevoGasto.subscribe((g) => emitidos.push(g));
    fixture.detectChanges();
  });

  function escribir(selector: string, valor: string): void {
    const input = el.querySelector(selector) as HTMLInputElement;
    input.value = valor;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function enviar(): void {
    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  it('muestra las cuatro categorías en el desplegable', () => {
    const opciones = Array.from(el.querySelectorAll('option')).map((o) => o.textContent?.trim());
    expect(opciones).toEqual(['Comida', 'Transporte', 'Ocio', 'Otros']);
  });

  it('emite el gasto (acepta coma decimal y la categoría elegida) y limpia el formulario', () => {
    escribir('.concepto', 'Taxi');
    escribir('.importe', '7,5');
    const select = el.querySelector('select') as HTMLSelectElement;
    select.value = 'Transporte';
    select.dispatchEvent(new Event('change'));
    enviar();
    expect(emitidos).toEqual([{ concepto: 'Taxi', importe: 7.5, categoria: 'Transporte' }]);
    expect((el.querySelector('.concepto') as HTMLInputElement).value).toBe('');
    expect(el.querySelector('.error')).toBeNull();
  });

  it('muestra un error si falta el concepto', () => {
    escribir('.importe', '5');
    enviar();
    expect(emitidos).toEqual([]);
    expect(el.querySelector('.error')?.textContent).toContain('concepto');
  });

  it('muestra un error si el importe no es válido', () => {
    escribir('.concepto', 'Cena');
    escribir('.importe', 'abc');
    enviar();
    expect(emitidos).toEqual([]);
    expect(el.querySelector('.error')?.textContent).toContain('mayor que 0');
  });
});
