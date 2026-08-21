# 📱 ExpoApp - Autenticación con Firebase

Una aplicación móvil desarrollada con **React Native** y **Expo (SDK 54)**, que implementa un sistema de autenticación de usuarios (registro, inicio de sesión y persistencia de estado) utilizando **Firebase Authentication** y navegación dinámica con **React Navigation**.

---

## 🚀 Características

- 🔐 **Autenticación con Firebase**: Registro e inicio de sesión de usuarios con correo y contraseña.
- 🔄 **Persistencia y Control de Sesión**: Detección automática del estado del usuario mediante `onAuthStateChanged`.
- 🧭 **Navegación Condicional**:
  - **Rutas Públicas (No autenticado)**: Pantallas de Login y Registro.
  - **Rutas Privadas (Autenticado)**: Pantalla de Inicio (Home).
- 📱 **Multiplataforma**: Compatible con Android, iOS y Web.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React Native](https://reactnative.dev/) (v0.81) / [Expo](https://expo.dev/) (SDK 54)
- **Navegación**: [React Navigation v7](https://reactnavigation.org/) (Native Stack)
- **Backend as a Service (BaaS)**: [Firebase](https://firebase.google.com/) (v12)
- **Almacenamiento Local**: `@react-native-async-storage/async-storage`

---

## 📁 Estructura del Proyecto

```text
ExpoApp/
├── assets/                    # Íconos, splash screen y recursos gráficos
├── src/
│   ├── navigation/
│   │   └── AppNavigation.js   # Manejador de navegación y estado de sesión (Firebase Auth)
│   └── screens/
│       ├── HomeScreen.js      # Pantalla principal tras iniciar sesión
│       ├── LoginScreen.js     # Pantalla de inicio de sesión
│       └── RegisterScreen.js  # Pantalla de registro de usuario
├── App.js                     # Componente raíz de la aplicación
├── app.json                   # Configuración del proyecto Expo
├── firebase.js                # Inicialización y credenciales de Firebase
├── index.js                   # Entry point de Expo
├── package.json               # Dependencias y scripts del proyecto
└── README.md                  # Documentación del proyecto
```

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión LTS recomendada, v18 o superior): [Descargar Node.js](https://nodejs.org/)
2. **Git**: [Descargar Git](https://git-scm.com/)
3. **Expo Go** en tu dispositivo móvil (disponible en Google Play Store y App Store) o un emulador/simulador configurado (Android Studio / Xcode).

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio o descargar el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
cd ExpoApp
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar Firebase

El archivo `firebase.js` contiene la configuración de inicialización de Firebase. Asegúrate de tener habilitado el proveedor de **Email/Password** en tu consola de Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Selecciona tu proyecto y ve a **Authentication** > **Sign-in method**.
3. Habilita el proveedor **Correo electrónico/Contraseña** (Email/Password).
4. Verifica que las credenciales en `firebase.js` coincidan con las de tu proyecto:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

---

## ▶️ Ejecución del Proyecto

Inicia el servidor de desarrollo de Expo con:

```bash
npx expo start
```
o con el script de npm:
```bash
npm start
```

### Opciones de visualización:
- **Dispositivo físico**: Abre la aplicación **Expo Go** y escanea el código QR que aparece en la terminal o navegador.
- **Android Emulator**: Presiona `a` en la terminal o ejecuta `npm run android`.
- **iOS Simulator** (solo macOS): Presiona `i` en la terminal o ejecuta `npm run ios`.
- **Web**: Presiona `w` en la terminal o ejecuta `npm run web`.

---

## 📜 Scripts Disponibles

En el archivo `package.json` dispones de los siguientes comandos:

- `npm start`: Inicia el servidor de desarrollo de Expo.
- `npm run android`: Inicia la aplicación directamente en un emulador o dispositivo Android conectado.
- `npm run ios`: Inicia la aplicación en el simulador de iOS.
- `npm run web`: Inicia la aplicación en el navegador web local.

---

## 👥 Autores y Créditos

Proyecto desarrollado como parte de la formación académica en desarrollo de software para prácticas con React Native y Firebase.
