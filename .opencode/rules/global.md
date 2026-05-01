# Instrucciones Globales del Proyecto

Estas reglas aplican a TODOS los agentes del Team Ensemble sin excepcion.

## 1. Idioma

- **Todas las respuestas al usuario deben ser en ESPANOL.**
- Los strings visibles en la UI deben estar en espanol.
- La documentacion y comentarios (si se requieren) deben estar en espanol.
- Nombres de variables, funciones y clases pueden estar en ingles (convencion estandar de programacion).

## 2. Python: Tipado Fuerte Obligatorio

- **Type hints en TODAS las funciones y metodos**, sin excepcion.
- Usa `mypy` como referencia de estandar de tipado.
- Tipos de retorno explicitos en cada funcion.
- Usa `Protocol` y `TypedDict` cuando corresponda.
- No uses `Any` a menos que sea estrictamente necesario.
- Todas las clases deben tener atributos tipados (con anotaciones de clase o `__init__` tipado).

Ejemplo requerido:
```python
from typing import Protocol, TypedDict

class ProductoDict(TypedDict):
    id: int
    nombre: str
    precio: float
    stock: int

class ProductoRepository(Protocol):
    def obtener_por_id(self, id: int) -> ProductoDict | None: ...
    def listar_todos(self) -> list[ProductoDict]: ...
    def crear(self, producto: ProductoDict) -> ProductoDict: ...

def calcular_total(productos: list[ProductoDict], impuesto: float = 0.21) -> float:
    subtotal = sum(p["precio"] for p in productos)
    return subtotal * (1 + impuesto)
```

## 3. Estilos: Tailwind CSS

- **TODO el frontend usa Tailwind CSS** para estilos.
- No se deben crear archivos CSS personalizados a menos que sea estrictamente necesario.
- Usa clases utilitarias de Tailwind directamente en los componentes.
- Para componentes React, usar className con clases de Tailwind.
- Si un patron de Tailwind se repite mucho, extraerlo a un componente reutilizable, no a una clase CSS.
- Usa la paleta de colores y espaciado de Tailwind por defecto.
