# Development Setup Guide

This guide will help you set up the IIT Indore Chemical Engineering website for local development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git**
- **VS Code** (recommended editor)

### Check Your Versions
```bash
node --version    # Should be v18+
npm --version     # Should be v8+
git --version     # Any recent version
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
# Clone your fork or the main repository
git clone https://github.com/YOUR_USERNAME/iit-indore-chemical-engineering.git
cd iit-indore-chemical-engineering
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Start Development Server
```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Development Environment Setup

### VS Code Configuration

#### Recommended Extensions
The project includes a `.vscode/extensions.json` file with recommended extensions:

- **Prettier** - Code formatter
- **ESLint** - Code linting
- **Tailwind CSS IntelliSense** - CSS class suggestions
- **TypeScript Importer** - Auto import for TypeScript
- **Auto Rename Tag** - Rename paired HTML tags
- **Bracket Pair Colorizer** - Colorize matching brackets

#### VS Code Settings
The project includes optimized VS Code settings in `.vscode/settings.json`:
- Format on save enabled
- Prettier as default formatter
- ESLint auto-fix on save
- Tailwind CSS suggestions enabled

### Git Configuration

#### Set up Git hooks (optional)
```bash
# Install husky for git hooks
npm install --save-dev husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

## 📁 Project Structure

```
iit-indore-chemical-engineering/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Programs.tsx
│   │   ├── Faculty.tsx
│   │   ├── Research.tsx
│   │   ├── Events.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── .github/              # GitHub workflows and templates
├── docs/                 # Documentation
├── .vscode/              # VS Code configuration
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier

# Testing (when implemented)
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🎨 Styling Guide

### Tailwind CSS
The project uses Tailwind CSS for styling. Key concepts:

#### Color Palette
```css
/* Primary Colors */
blue-800, blue-700, blue-600  /* Main brand colors */
orange-500, orange-600        /* Accent colors */
gray-50, gray-100, gray-900   /* Neutral colors */
```

#### Spacing System
The project uses an 8px spacing system:
```css
p-2   /* 8px padding */
p-4   /* 16px padding */
p-6   /* 24px padding */
p-8   /* 32px padding */
```

#### Responsive Design
```css
/* Mobile first approach */
sm:   /* 640px and up */
md:   /* 768px and up */
lg:   /* 1024px and up */
xl:   /* 1280px and up */
```

### Component Structure
```typescript
// Component template
import React from 'react';
import { IconName } from 'lucide-react';

interface ComponentProps {
  title: string;
  description?: string;
}

const ComponentName: React.FC<ComponentProps> = ({ title, description }) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-xl text-gray-600">{description}</p>
        )}
      </div>
    </section>
  );
};

export default ComponentName;
```

## 🔧 Configuration Files

### TypeScript Configuration
The project uses strict TypeScript settings for better code quality:
- Strict mode enabled
- No unused locals/parameters
- Module resolution set to bundler

### ESLint Configuration
ESLint is configured with:
- React hooks rules
- TypeScript support
- Automatic import sorting

### Prettier Configuration
Code formatting rules:
- Single quotes
- Semicolons
- 2-space indentation
- 80 character line width

## 🌐 Environment Variables

Create a `.env.local` file for local development:
```env
# Development settings
VITE_API_URL=http://localhost:3000
VITE_CONTACT_EMAIL=chemical@iiti.ac.in
VITE_PHONE=+91-732-2438-750
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

#### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

#### Tailwind CSS Not Working
```bash
# Ensure Tailwind directives are in index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Performance Issues
- Check for large images that need optimization
- Verify all imports are necessary
- Use React DevTools to identify re-renders

## 📚 Learning Resources

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)

### Vite
- [Vite Documentation](https://vitejs.dev/)
- [Vite React Plugin](https://github.com/vitejs/vite-plugin-react)

## 🤝 Getting Help

If you encounter issues:

1. **Check the documentation** in the `docs/` folder
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join the discussion** in GitHub Discussions

## 🎉 You're Ready!

Your development environment is now set up. Start by:

1. Exploring the existing components
2. Making small changes to see how they work
3. Reading the contributing guidelines
4. Checking out the open issues for ways to help

Happy coding! 🚀