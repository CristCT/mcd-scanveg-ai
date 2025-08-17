# MCD ScanVeg AI - Frontend

Frontend application for tomato leaf disease detection using artificial intelligence.

## 🚀 Features

- **Feature-based Architecture**: Code organized by functionality
- **TypeScript**: Static typing with comprehensive JSDoc documentation
- **React 19**: Latest React version with modern hooks
- **Chakra UI**: Modern component library with consistent design
- **Vite**: Fast build tool and development server
- **ESLint + Prettier**: Code linting and automatic formatting
- **Explicit Exports**: Tree-shakable imports for better performance

## 📁 Project Structure

```
src/
├── features/                # Application features
│   ├── dashboard/           # Analytics and statistics dashboard
│   │   ├── components/      # Dashboard-specific components
│   │   ├── hooks/           # Dashboard custom hooks
│   │   ├── services/        # Dashboard API services
│   │   └── utils/           # Dashboard utility functions
│   └── scan/                # Image scanning feature
│       ├── components/      # Scan-specific components
│       ├── hooks/           # Scan custom hooks
│       ├── services/        # Scan API services
│       └── types/           # Scan type definitions
├── shared/                  # Shared code across features
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Shared custom hooks
│   ├── services/            # HTTP and API services
│   ├── types/               # Shared type definitions
│   └── utils/               # Utility functions
└── pages/                   # Application pages
    ├── HomePage.tsx         # Landing and scan page
    └── DashboardPage.tsx    # Analytics dashboard
```

## 🛠️ Installation and Setup

1. Install dependencies:

```bash
npm install
```

2. Run in development mode:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## 🎯 Main Features

### Image Upload and Analysis

- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **File Validation**: Type and size validation with user-friendly errors
- **Image Preview**: Real-time preview of selected images
- **AI Analysis**: Machine learning-powered disease detection
- **Results Display**: Confidence scores and treatment recommendations

### Analytics Dashboard

- **Statistics Overview**: Total analyses, daily counts, confidence metrics
- **Weekly Analysis Charts**: Interactive charts showing analysis trends
- **Disease Distribution**: Visual breakdown of detected diseases
- **Health Status Indicators**: Plant health percentage with visual indicators
- **Recent Analyses**: Paginated list of recent scans with details

### Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Loading States**: Smooth animations and progress indicators
- **Error Handling**: Comprehensive error messages and recovery options
- **Navigation**: Intuitive navigation between scan and dashboard
- **Icons**: Lucide React icons for better visual communication

## 🔧 Backend Configuration

The frontend is configured to connect to the backend at `http://localhost:5000`. API calls to `/api/*` are automatically proxied by Vite during development.

## 📡 API Endpoints

### Scan Endpoints

- `POST /api/scan` - Submit image for analysis
  - Body: FormData with 'image' field
  - Response: Analysis results with confidence and recommendations

### Dashboard Endpoints

- `GET /api/statistics` - Get general statistics
- `GET /api/analyses/recent` - Get recent analyses with pagination
- `GET /api/analyses/week-stats` - Get weekly analysis statistics
- `GET /api/diseases/distribution` - Get disease distribution data

## 🎨 Key Components

### Shared Components

- **Button** - Reusable button with multiple variants and sizes
- **Navbar** - Main navigation bar with active state indicators
- **Layout** - Base layout wrapper for consistent page structure
- **ErrorAlert** - Standardized error display component
- **PaginationControls** - Reusable pagination with navigation
- **ServerStatus** - Real-time server connection indicator

### Scan Feature Components

- **FileUpload** - Advanced file upload with drag & drop
- **ImagePreview** - Image preview with metadata display
- **ScanResult** - Comprehensive results display with recommendations
- **LoadingState** - Animated loading indicator for scan process
- **ErrorState** - Error handling with retry functionality

### Dashboard Feature Components

- **StatisticsCard** - Metric display cards with icons
- **WeeklyAnalysisCard** - Interactive weekly analysis charts
- **DiseaseDistributionCard** - Disease breakdown visualization
- **HealthStatusCard** - Plant health status with pie charts
- **RecentAnalysesCard** - Paginated recent analyses table

## 🪝 Custom Hooks

### Scan Hooks

- **useScan** - Manages scan state, file upload, and results

### Dashboard Hooks

- **useDashboard** - Handles dashboard data loading and state management
- **useWeeklyStats** - Manages weekly statistics with pagination

### Shared Hooks

- **useFileDrop** - Drag & drop functionality with validation
- **useServerStatus** - Real-time server connection monitoring
- **usePagination** - Reusable pagination state management

## 📚 Documentation

The codebase includes comprehensive JSDoc documentation for:

- All functions and methods with parameter and return type descriptions
- Interface and type definitions with property explanations
- Custom hooks with usage examples and parameter details
- Service classes with method documentation

## 🔄 State Management

- **Local State**: React useState for component-specific state
- **Custom Hooks**: Encapsulated state logic for reusability
- **Context-free**: No global state management for simplicity
- **Type Safety**: Full TypeScript coverage with strict typing

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code analysis
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run preview` - Preview production build

## 🚀 Performance Optimizations

- **Explicit Exports**: Tree-shaking enabled for smaller bundles
- **Code Splitting**: Feature-based code organization
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo and useCallback for performance
- **Optimized Images**: Proper image handling and compression

## 📄 License

This project is part of the MCD ScanVeg AI system for educational and research purposes.
