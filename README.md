# Práctica 4 · CI/CD con GitHub Actions

Aplicación Angular de control de gastos con integración y despliegue continuos.

- **CI**: en cada pull request contra `main` se instala con `npm ci`, se ejecutan los tests con cobertura mínima (80 % sentencias, funciones y líneas; 70 % ramas) y se compila con `ng build`.
- **CD**: en cada push a `main` se repite la CI y se despliega en GitHub Pages.
- `main` está protegida: una PR no se puede fusionar si la CI falla.

**Web:** https://samuelcarrionmartinez244-wq.github.io/Practica-CD-CI/

Autor: Samuel Carrión Martínez · 2º DAW
