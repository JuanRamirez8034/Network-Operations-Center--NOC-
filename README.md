# Aplicación Centro de operaciones de red (NOC)
El objetivo de esta aplicación es brindar una aplicación para el monitoreo constante de servicios de red utilizando node y Js como la herramienta de implementación.

## Requerimientos para correr en desarrollo
- **Node V18.19.0**
- **Docker** 

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

    # Direccion de la base de datos de mongo
    MONGO_URL = myMongoDbAddress
    #  Nombre de la base de datos de mongo
    MONGO_DB_NAME = myMongoDbName
    #  Usuario de la base de datos
    MONGO_USER =  myMongoDbUser
    # Contrasena de la base de dato
    MONGO_PASSWORD = myMongoDbPassword

    # Direccion de la base de datos de Postgres
    POSTGRES_URL = myPostgresDbAddress
    # nombre de la base de datos de postgres
    POSTGRES_DB_NAME = myPostgresDbName
    # Usuario de la base de datos de postgres
    POSTGRES_USER = myPostgresDbUser
    # contrasena de la base de datos de postgres
    POSTGRES_PASSWORD = myPostgressDbPassword
```
4. Levantar la base de datos con el comando:
```cmd
    docker compose up -d
```

## Comandos
- **npm run dev** : Ejecuta el proyecto en modo desarrollo
- **npm run build** : Transpila el proyecto a javascript valido para correr en producción
- **npm run start** : Ejecuta el proyecto en modo producción
<!-- comentario test -->