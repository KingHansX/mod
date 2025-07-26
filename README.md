# MooMoo Helper Server

Servidor para la extensión MooMoo Helper que permite actualizaciones automáticas y protección del código.

## Estructura

```
/
├── script.js          # Script principal (moomoo_helper.user.js)
├── version.json       # Información de versiones
├── stats.json         # Estadísticas de uso
└── README.md          # Este archivo
```

## URLs de acceso

Una vez configurado GitHub Pages, las URLs serán:

- **Script principal**: `https://tu-usuario.github.io/moomoo-helper-server/script.js`
- **Versiones**: `https://tu-usuario.github.io/moomoo-helper-server/version.json`
- **Estadísticas**: `https://tu-usuario.github.io/moomoo-helper-server/stats.json`

## Configuración en la extensión

En `content.js` de la extensión, configura:

```javascript
const SERVER_CONFIG = {
    baseUrl: 'https://tu-usuario.github.io/moomoo-helper-server',
    scriptPath: '/script.js',
    versionPath: '/version.json',
    // ...
};
```

## Actualizaciones

Para actualizar el script:

1. Modifica `script.js` con el nuevo código
2. Actualiza `version.json` con nueva versión
3. Haz commit y push a GitHub
4. Los usuarios recibirán la actualización automáticamente

## Ventajas

- ✅ Código protegido en servidor
- ✅ Actualizaciones automáticas
- ✅ Sin límites de ancho de banda
- ✅ HTTPS automático
- ✅ Totalmente gratuito 