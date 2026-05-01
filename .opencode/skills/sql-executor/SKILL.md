---
name: sql-executor
description: Conector de base de datos. Permite conectarse, hacer DESCRIBE de tablas y ejecutar consultas SQL para armar logica con datos reales.
compatibility: opencode
metadata:
  audience: developer
  tools: bash
---

# SQL Executor — Conector de Base de Datos

## Que hace

Permite al agente conectarse a bases de datos, inspeccionar estructuras y ejecutar consultas directamente, sin que el usuario tenga que explicar el schema a ciegas.

## Cuando usar

Cuando @developer necesita:
- Conocer la estructura real de las tablas (DESCRIBE, SHOW COLUMNS, \d+).
- Escribir queries que se ajusten exactamente a los tipos de datos y constraints existentes.
- Verificar que una migracion o modelo nuevo es compatible con el schema actual.
- Insertar datos de prueba y validar constraints.
- Depurar problemas de datos directamente.

## Como usar — PostgreSQL

```bash
# Ver estructura de una tabla
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "\d+ nombre_tabla"

# Listar todas las tablas
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "\dt"

# Ejecutar query de verificacion
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT col1, col2 FROM tabla LIMIT 5"
```

## Como usar — MySQL

```bash
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS -e "DESCRIBE nombre_tabla" $DB_NAME
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS -e "SHOW TABLES" $DB_NAME
```

## Como usar — SQLite

```bash
sqlite3 archivo.db ".schema nombre_tabla"
sqlite3 archivo.db "SELECT * FROM tabla LIMIT 5"
```

## Reglas

- NUNCA ejecutes DROP, DELETE sin WHERE, TRUNCATE sin confirmacion explicita del Architect.
- Antes de escribir cualquier modelo o query, hace DESCRIBE de las tablas involucradas.
- Si no hay credenciales configuradas en el entorno, solicitalas al Architect.
- Los datos sensibles vistos en las tablas JAMAS se incluyen en la respuesta al usuario.
