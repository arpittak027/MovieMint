# MovieMint Project Structure

## Root Directory Files
- `package.json` - Project configuration, dependencies, and scripts
- `package-lock.json` - Exact dependency tree for reproducible builds
- `tsconfig.json` - TypeScript configuration
- `netlify.toml` - Netlify deployment configuration
- `.gitignore` - Specifies which files Git should ignore
- `README.md` - Project documentation and setup instructions

## /public
Static files that are served directly:
- `index.html` - Main HTML file
- `manifest.json` - Web app manifest for PWA support
- `favicon.ico` - Website favicon
- Other static assets

## /src
Source code of the application:

### /components
Reusable UI components:
- `/Auth` - Authentication-related components (Login, Signup forms)
- `/ErrorBoundary` - Error handling components
- `/Loading` - Loading spinners and placeholders
- `/LocationSelector` - City and state selection components
- `/MovieCard` - Movie display card component
- `/MovieFilters` - Search and filter components
- `/Navbar` - Navigation header component
- `/Payment` - Payment processing components
- `/ReminderDialog` - Movie reminder functionality
- `/TrailerModal` - Movie trailer display modal

### /context
React Context providers:
- `MovieContext.tsx` - Movie-related state management
- `AuthContext.tsx` - Authentication state management

### /data
Static data and mock APIs:
- `moviesData.ts` - Movie information and data
- `locationData.ts` - Cities and theaters data

### /hooks
Custom React hooks:
- Authentication hooks
- Data fetching hooks
- UI state hooks

### /pages
Main application pages:
- `/HomePage` - Landing page with featured movies
- `/MovieDetails` - Individual movie information
- `/BookingPage` - Ticket booking interface
- `/MoviesPage` - Movie listing and search
- `/AuthPages` - Login/Signup pages
- `/ProfilePage` - User profile management

### /styles
Styling related files:
- Global styles
- Theme configuration
- Shared style utilities

### /types
TypeScript type definitions:
- `movieTypes.ts` - Movie-related interfaces
- `userTypes.ts` - User and authentication types

### /utils
Utility functions:
- Date formatting
- Price calculations
- Validation helpers
- API helpers

### Core Files
- `index.tsx` - Application entry point
- `App.tsx` - Root component
- `reportWebVitals.ts` - Performance monitoring

## /node_modules
Third-party dependencies (not tracked in Git)

## /build
Production build output (generated, not tracked in Git)

## Key Features by Directory

### Components (/components)
- Modular, reusable UI components
- Each component has its own directory with related files
- Follows atomic design principles

### Context (/context)
- Global state management
- Authentication state
- Movie data state
- Location/theater state

### Pages (/pages)
- Main application views
- Route-level components
- Page-specific logic and layout

### Data Layer (/data, /context, /hooks)
- Data management and state
- API integration
- Custom hooks for data access
- Mock data for development

### Types (/types)
- TypeScript interfaces
- Type definitions
- Ensures type safety across the application

### Utilities (/utils)
- Helper functions
- Common calculations
- Shared logic

This structure follows React best practices and provides:
- Clear separation of concerns
- Modular and maintainable code
- Easy navigation and file location
- Scalable architecture for future additions
