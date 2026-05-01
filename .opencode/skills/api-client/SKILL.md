---
name: api-client
description: Cliente de APIs HTTP. Envia payloads de prueba a endpoints, consume APIs externas y verifica respuestas JSON reales.
compatibility: opencode
metadata:
  audience: developer
  tools: bash
---

# API Client — Cliente de APIs HTTP

## Que hace

Permite al agente enviar requests HTTP a endpoints reales, consumir APIs externas y verificar exactamente que JSON devuelven. Sustituye la necesidad de abrir Postman manualmente.

## Cuando usar

Cuando @developer o @context necesitan:
- Probar un webhook o endpoint local con un payload de prueba.
- Verificar el formato exacto de respuesta de una API externa.
- Validar que los headers, autenticacion y status codes funcionan correctamente.
- Depurar un flujo de integracion sin salir del agente.

## Como usar — curl

```bash
# GET con headers
curl -s -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "https://api.ejemplo.com/v1/recurso"

# POST con payload
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"nombre": "test", "valor": 123}' \
  "http://localhost:8000/api/endpoint"

# Ver solo status code
curl -s -o /dev/null -w "%{http_code}" "https://api.ejemplo.com/health"
```

## Como usar — Python (requests)

```bash
python -c "
import requests, json
r = requests.get('https://api.ejemplo.com/v1/recurso', headers={'Authorization': 'Bearer $TOKEN'})
print(json.dumps(r.json(), indent=2))
print(f'Status: {r.status_code}')
"
```

## Como usar — npx / fetch

```bash
node -e "
fetch('https://api.ejemplo.com/v1/recurso')
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d, null, 2)))
"
```

## Reglas

- NUNCA envies credenciales reales en requests que queden logueados. Usa variables de entorno.
- Antes de escribir integracion contra una API, consumila primero y mostra la respuesta real.
- Si la API requiere autenticacion, confirma con el Architect que tenes las credenciales correctas.
- Reporta el status code, headers relevantes y body de respuesta en tu informe.
