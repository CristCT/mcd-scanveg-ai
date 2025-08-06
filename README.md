# MCD ScanVeg AI - Frontend

Frontend para la aplicación de detección de enfermedades en hojas de tomate usando inteligencia artificial.

## 🚀 Características

- **Arquitectura basada en features**: Código organizado por funcionalidades
- **TypeScript**: Tipado estático
- **React 19**: Versión de React
- **Tailwind CSS**: Diseño responsivo
- **ESLint + Prettier**: Linting y formateo automático de código

## 📁 Estructura del Proyecto

```
src/
├── features/         # Features de la aplicación
│   └── scan/         # Feature de escaneo de imágenes
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── shared/           # Código compartido
│   ├── components/   # Componentes reutilizables
│   ├── hooks/        # Hooks personalizados
│   ├── services/     # Servicios HTTP
│   └── types/        # Tipos compartidos
└── pages/            # Páginas de la aplicación
```

## 🛠️ Instalación y Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Construir para producción:

```bash
npm run build
```

## 🎯 Funcionalidades

### Upload de Imágenes

- Drag & drop de archivos
- Validación de tipo y tamaño
- Preview de imagen seleccionada

### Análisis AI

- Envío de imagen al backend
- Estados de carga, error y resultado
- Visualización de resultados con confianza

### Interfaz Moderna

- Diseño responsivo con Tailwind CSS
- Navbar con navegación
- Estados de carga animados
- Mensajes de error informativos

## 🔧 Configuración del Backend

El frontend está configurado para conectarse al backend en `http://localhost:5000`. Las llamadas a `/api/*` son redirigidas automáticamente por el proxy de Vite.

## 📡 API Endpoints

- `POST /api/scan` - Envía imagen para análisis
  - Body: FormData con campo 'image'
  - Response: Resultado del análisis

## 🎨 Componentes Principales

### Shared Components

- `Button` - Botón reutilizable con variantes
- `Navbar` - Barra de navegación principal
- `Layout` - Layout base de la aplicación

### Scan Feature

- `FileUpload` - Componente de subida de archivos
- `ImagePreview` - Preview de imagen seleccionada
- `ScanResult` - Visualización de resultados
- `LoadingState` - Estado de carga
- `ErrorState` - Estado de error

## 🪝 Hooks Personalizados

- `useScan` - Maneja el estado del análisis
- `useFileDrop` - Funcionalidad de drag & drop

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run lint` - Linter de código
- `npm run lint:fix` - Corregir errores de linting automáticamente
- `npm run format` - Formatear código con Prettier
- `npm run format:check` - Verificar formato del código
- `npm run type-check` - Verificar tipos de TypeScript
- `npm run preview` - Preview del build
