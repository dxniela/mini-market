# Mini Market 

Este README documenta las **decisiones de diseño**, **pendientes** y una **guía de ejecución** del proyecto **Mini Market**, que incluye **frontend en Next.js** y **backend en Node.js / TypeScript**.

---

## Decisiones de diseño

### Frontend
1. **Separación `apiClient` y `api`**  
   - `apiClient` contiene la instancia de Axios con la URL base y headers.  
   - `api.ts` contiene funciones específicas para cada recurso (`getProducts`, `getProductById`, `getCheapestProducts`).  
   - Esto permite **reutilización** de la instancia y mantener funciones limpias y desacopladas.

2. **Axios**  
   - Se eligió Axios por su facilidad para manejar requests, errores y params.  
   - Permite tipado directo de respuestas (`axios.get<PaginatedResponse<Product>>`) y cancelación de requests si se quisiera.

3. **Tailwind CSS**  
   - Se eligió Tailwind para un **desarrollo rápido y consistente de UI** sin necesidad de escribir CSS personalizado extenso.  
   - Permite crear componentes responsive y mantener clases consistentes en todo el proyecto.

4. **Tipados (`types.ts`)**  
   - Todos los objetos de negocio (`Product`, `ProductQuery`, `PaginatedResponse`) están tipados.  
   - Esto asegura que tanto el frontend como la comunicación con el backend sean más confiables.

6. **Componentes**  
   - Componentes como `ProductCard` permiten **reutilización** y facilitan cambios en diseño sin tocar la lógica.

---

### Backend
1. **Separación de servicios y controladores**  
   - `ProductService` maneja la lógica de negocio.  
   - `ProductController` solo maneja las rutas y la validación de requests.

2. **Funciones específicas**  
   - `getTopCheapestAvailable(products, top=3)` devuelve los 3 productos más baratos, separando lógica especial del endpoint genérico de productos.  
   - Esto permite **optimizar queries** y mantener funciones claras.

3. **Manejo de errores**  
   - Se creó un archivo para **errores personalizados** y otro para **mensajes (`get_message`)**.  
   - Esto mantiene consistencia en la respuesta de errores y facilita cambios futuros en los mensajes.

4. **MongoDB (pendiente)**  
   - Se creó modelo y conexión para MongoDB, pero **no se pudo probar** ni integrar al servicio por un error al conectar con el cluster en MongoDB Compass.  
   - Este es un **pendiente** para futuras iteraciones.

---

## Pendientes / Mejoras
- Terminar integración de MongoDB.    
- Añadir tests unitarios y de integración.  
- Optimizar queries para productos con paginación y filtros complejos directamente en la base de datos.  

---

## Guía de ejecución

### Clonar el repositorio
```
git clone git@github.com:dxniela/mini-market.git
cd mini-market
```

### Ejecución del Backend (leer también README de la carpeta /server)

1. Instalación de dependencias
```
cd server
npm install
```
2. Crear archivo .env con variables:
```
PORT=3001
DATABASE_URL=mongodb+srv://dxniela:<db_password>@mini-market.qetlgrt.mongodb.net/
```
3. Ejecutar en desarrollo:
``` 
npm run dev 
```

### Ejecución del Frontend (leer también README de la carpeta /client)

1. Instalación de dependencias
```
cd client
npm install
```
2. Crear archivo .env con variables:
```
NEXT_PUBLIC_API_BASE=http://localhost:3001
```
3. Ejecutar en desarrollo:
``` 
npm run dev 
```
4. Abrir en el navegador:
``` 
http://localhost:3000
``` 

---

© 2025 Mini Market. Desarrollado por [Daniela Ramírez](https://github.com/dxniela).

