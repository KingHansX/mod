# MooMoo Helper - Netlify Server

Servidor para la extensión MooMoo Helper con soporte CORS completo.

## Configuración en Netlify

1. **Crear sitio en Netlify**:
   - Ve a https://netlify.com
   - "New site from Git"
   - Conecta tu repositorio de GitHub

2. **Configuración automática**:
   - Netlify detectará automáticamente los archivos
   - El archivo `_headers` configurará CORS automáticamente

3. **URL del sitio**:
   - Será algo como: `https://tu-sitio-123456.netlify.app`
   - O puedes configurar un dominio personalizado

## Estructura de archivos

```
/
├── _headers          # Configuración CORS
├── script.js         # Script principal
├── version.json      # Información de versiones
└── README.md         # Este archivo
```

## URLs de acceso

Una vez desplegado en Netlify:

- **Script principal**: `https://tu-sitio.netlify.app/script.js`
- **Versiones**: `https://tu-sitio.netlify.app/version.json`

## Ventajas de Netlify

- ✅ **CORS configurado automáticamente**
- ✅ **HTTPS automático**
- ✅ **CDN global**
- ✅ **Deploy automático desde GitHub**
- ✅ **Completamente gratuito**
- ✅ **Sin límites de ancho de banda**

## Configuración en la extensión

En `content.js`, cambia la URL:

```javascript
const SERVER_CONFIG = {
    baseUrl: 'https://tu-sitio.netlify.app',
    // ...
};
``` 