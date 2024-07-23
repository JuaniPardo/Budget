# Lista de pendientes

- [ ] Agregar la funcionalidad que permita establecer un presupuesto por mes
- [ ] Agregar la funcionalidad que muestre la relación entre el presupuesto y los gastos reales
- [ ] Agregar la funcionalidad que permita ocultar el navbar en tamaño móvil
- [x] Agregar la funcionalidad que permita borrar las transacciones guardadas en el navegador local
- [x] Agregar la funcionalidad que permita calcular el total por categoría (en este momento está hard coded)

### Elementos de diseño a fururo
- [x] `index.html` en este momento es en realidad la página de Categorias. Debería ser la página de Inicio, una presentación de la aplicación
- [x] Cada vez que paso por `index.html` estoy recargando en localStorage los datos hardcodeados en `data.js`. Agregar boton que permita generar datos de muestra.
- [x] Al ingresar por primera vez a la app, deberia mostrar un mensaje de bienvenida invitandote a personalizar las categorías, y que sugiera algunas por defecto. El usuario siempre podrá personalizar las categorías en el futuro.
- [x] Agregar botones a las cards de las transacciones para poder borrarlas o editarlas (necesito guardar el index como id de las cards para usar `splice`).