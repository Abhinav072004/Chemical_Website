# Contributing to IIT Indore Chemical Engineering Website

Thank you for your interest in contributing to the IIT Indore Chemical Engineering Department website! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- VS Code (recommended)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/iit-indore-chemical-engineering.git
   cd iit-indore-chemical-engineering
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing code structure and naming conventions
- Use Tailwind CSS for styling
- Ensure responsive design for all components
- Add proper TypeScript types for all props and functions

### Component Structure
```typescript
// Component template
import React from 'react';
import { IconName } from 'lucide-react';

interface ComponentProps {
  // Define props with proper types
}

const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  return (
    <div className="component-container">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### Commit Messages
Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example:
```bash
git commit -m "feat: add faculty search functionality"
git commit -m "fix: resolve mobile navigation issue"
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Add real faculty data and photos
- [ ] Implement search functionality
- [ ] Add more research project details
- [ ] Create admin panel for content management
- [ ] Add multilingual support (Hindi/English)

### Medium Priority
- [ ] Improve SEO optimization
- [ ] Add more interactive elements
- [ ] Implement dark mode
- [ ] Add accessibility improvements
- [ ] Create automated testing

### Low Priority
- [ ] Add animations and micro-interactions
- [ ] Implement PWA features
- [ ] Add social media integration
- [ ] Create mobile app version

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Write unit tests for utility functions
- Add component tests for complex components
- Include integration tests for critical user flows
- Ensure minimum 80% code coverage

## 📋 Pull Request Process

1. **Before submitting**
   - Ensure your code follows the style guidelines
   - Run tests and ensure they pass
   - Update documentation if needed
   - Test on multiple devices and browsers

2. **Pull Request Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tests pass locally
   - [ ] Added new tests for new functionality
   - [ ] Tested on mobile devices

   ## Screenshots
   (If applicable)
   ```

3. **Review Process**
   - All PRs require at least one review
   - Address all review comments
   - Ensure CI/CD checks pass
   - Squash commits before merging

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Screenshots or videos if applicable

Use the bug report template:
```markdown
**Bug Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: [e.g., Chrome 91]
- Device: [e.g., iPhone 12]
- OS: [e.g., iOS 14.6]
```

## 💡 Feature Requests

For feature requests, please:
- Check if the feature already exists
- Provide clear use case and benefits
- Include mockups or examples if possible
- Consider implementation complexity

## 📞 Getting Help

- Create an issue for bugs or feature requests
- Join our development discussions
- Contact the maintainers directly for urgent issues

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Annual department newsletter
- GitHub contributors page

Thank you for contributing to the IIT Indore Chemical Engineering website! 🎉