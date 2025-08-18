# Chemical Website - Multi-Page Structure

## Overview
The website has been restructured from a single-page application to a multi-page website with separate routes for each section.

## Page Structure

### 1. Home Page (`/`)
- **Route**: `/`
- **Component**: `src/pages/Home.tsx`
- **Content**: Landing page with Hero section and overview of all sections
- **Components Used**: Hero, About, Programs, Faculty, Research, Events, Contact

### 2. About Page (`/about`)
- **Route**: `/about`
- **Component**: `src/pages/About.tsx`
- **Content**: Detailed information about the department
- **Components Used**: About component

### 3. Academics Page (`/academics`)
- **Route**: `/academics`
- **Component**: `src/pages/Academics.tsx`
- **Content**: Academic programs and curriculum information
- **Components Used**: Programs component

### 4. Faculty Page (`/faculty`)
- **Route**: `/faculty`
- **Component**: `src/pages/Faculty.tsx`
- **Content**: Faculty member information
- **Components Used**: Faculty component

### 5. Research Page (`/research`)
- **Route**: `/research`
- **Component**: `src/pages/Research.tsx`
- **Content**: Research initiatives and projects
- **Components Used**: Research component

### 6. Events Page (`/events`)
- **Route**: `/events`
- **Component**: `src/pages/Events.tsx`
- **Content**: Department events and activities
- **Components Used**: Events component

### 7. Contact Page (`/contact`)
- **Route**: `/contact`
- **Component**: `src/pages/Contact.tsx`
- **Content**: Contact information and form
- **Components Used**: Contact component

## Technical Implementation

### Dependencies Added
- `react-router-dom`: For client-side routing
- `@types/react-router-dom`: TypeScript types for React Router

### Key Changes Made

1. **App.tsx**: Updated to use React Router with Routes and Route components
2. **Header.tsx**: Updated navigation to use React Router Link components instead of hash links
3. **New Page Components**: Created separate page components for each section
4. **Routing**: Implemented proper routing between pages

### File Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page-level components
│   ├── Home.tsx        # Landing page
│   ├── About.tsx       # About page
│   ├── Academics.tsx   # Academics page
│   ├── Faculty.tsx     # Faculty page
│   ├── Research.tsx    # Research page
│   ├── Events.tsx      # Events page
│   ├── Contact.tsx     # Contact page
│   └── index.ts        # Page exports
└── App.tsx             # Main app with routing
```

## Navigation Features

- **Active Page Highlighting**: Current page is highlighted in the navigation
- **Responsive Design**: Mobile-friendly navigation with hamburger menu
- **Dropdown Menus**: Sub-navigation for About and Academics sections
- **Smooth Transitions**: Page transitions handled by React Router

## Benefits of New Structure

1. **Better SEO**: Each page has its own URL and can be indexed separately
2. **Improved Performance**: Only loads content for the current page
3. **Better User Experience**: Clear navigation between different sections
4. **Maintainability**: Easier to manage and update individual pages
5. **Scalability**: Easy to add new pages in the future

## Usage

To add a new page:
1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update the navigation in `src/components/Header.tsx`
4. Export the component in `src/pages/index.ts`
