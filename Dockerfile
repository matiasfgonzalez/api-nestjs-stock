# Usa una imagen base oficial de Node.js
FROM node:18.20.4-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Compila el código TypeScript
RUN npm run build

# Eliminar carpetas innecesarias
RUN rm .dockerignore

# Expone el puerto que usa la API
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
