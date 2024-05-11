# Aplicación Centro de operaciones de red (NOC)
El objetivo de esta aplicación es brindar una aplicación para el monitoreo constante de servicios de red utilizando node y Js como la herramienta de implementación.

## Pasos para recosntrucción del proyecto
1. Clonar el repositorio
2. Instalar los modulos correspondientes
3. Crear el archivo de variables de entrono *(.env)* con la estructura especificada en el archivo plantilla *([.env.template](.env.template))*
```docker
    # Puerto donde corre la aplicacion
    PORT = 3100
    # Servicio de envio de correos
    MAILER_SERVICE = gmail
    # Direccion email a donde enviar reportes
    MAILER_EMAIL = example@email.com
    # Clave secreta para el correo
    MAILER_SECRET_KEY = mySecretMailerKey123
    # Modo de ejecucion produccion
    PRODUCTION = false
```

## Comandos
- **npm run dev** : Ejecuta el proyecto en modo desarrollo
- **npm run build** : Transpila el proyecto a javascript valido para correr en producción
- **npm run start** : Ejecuta el proyecto en modo producción
