# Getting Started with SoilSmart Web Application

Welcome to the SoilSmart project! This guide will help you get up and running quickly.

## 🚀 Quick Start

### 1. Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- A code editor (VS Code recommended)

### 2. Clone the Repository

```bash
git clone https://github.com/Echo-Sols-Ltd/SoilSM-web.git
cd SoilSM-web
```

### 3. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

You should see the SoilSmart landing page! 🎉

## 📁 Project Structure

```
soilsm-web/
├── src/
│   ├── app/              # Next.js pages and layouts
│   ├── components/       # React components
│   └── lib/             # Utilities and constants
├── public/              # Static files
└── ...config files
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
```

## 🎨 Key Features

### Current Implementation

1. **Responsive Navigation**
   - Mobile-friendly menu
   - Smooth scroll to sections
   - Sticky header with scroll effects

2. **Hero Section**
   - Animated elements with Framer Motion
   - Call-to-action buttons
   - Statistics display

3. **Problem Statement**
   - Highlights agricultural challenges
   - Visual cards with icons
   - Impact statement

4. **Objectives Section**
   - SoilSmart solutions showcase
   - Interactive hover effects
   - Gradient backgrounds

5. **Features Section**
   - Platform capabilities
   - Icon-based presentation
   - Grid layout

6. **How It Works**
   - Step-by-step process
   - Visual progression
   - Dark theme section

7. **Call to Action**
   - Email signup form
   - Trust indicators
   - Conversion-focused design

8. **Footer**
   - Multi-column layout
   - Contact information
   - Social media links

## 🎯 Development Workflow

### Creating a New Feature

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit files in `src/`
   - Add new components in `src/components/`
   - Update styles as needed

3. **Test your changes**
   ```bash
   npm run dev
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to GitHub
   - Create PR from your branch to `develop`
   - Request review

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Testing
- `chore:` - Maintenance

**Examples:**
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve mobile menu issue"
git commit -m "docs: update README with new instructions"
```

## 🎨 Styling Guide

### Tailwind CSS

We use Tailwind CSS for styling. Key classes:

```tsx
// Buttons
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>

// Containers
<div className="container-custom">Content</div>

// Typography
<h2 className="section-title">Title</h2>
<p className="section-subtitle">Subtitle</p>

// Cards
<div className="card">Card content</div>
```

### Custom Colors

```javascript
// Primary (Green)
bg-primary-500, text-primary-600, border-primary-700

// Secondary (Yellow)
bg-secondary-500, text-secondary-600, border-secondary-700
```

### Animations

```tsx
// Framer Motion
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## 🧩 Component Structure

### Creating a New Component

1. Create file in `src/components/YourComponent.tsx`
2. Use this template:

```tsx
'use client'

import { motion } from 'framer-motion'

const YourComponent = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="section-title">Your Title</h2>
        {/* Your content */}
      </div>
    </section>
  )
}

export default YourComponent
```

3. Import in `src/app/page.tsx`:

```tsx
import YourComponent from '@/components/YourComponent'

export default function Home() {
  return (
    <main>
      {/* Other components */}
      <YourComponent />
    </main>
  )
}
```

## 🔧 Configuration Files

### `next.config.js`
Next.js configuration (images, optimization, etc.)

### `tailwind.config.js`
Tailwind CSS theme customization (colors, fonts, animations)

### `tsconfig.json`
TypeScript configuration

### `.eslintrc.json`
ESLint rules for code quality

### `.prettierrc`
Prettier formatting rules

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### React
- [React Documentation](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Check for TypeScript errors
npm run build

# Fix linting issues
npm run lint -- --fix
```

## 💡 Tips for Beginners

1. **Start Small**: Begin by modifying existing components
2. **Use DevTools**: Browser DevTools and React DevTools are your friends
3. **Read Error Messages**: They usually tell you exactly what's wrong
4. **Check the Console**: Look for warnings and errors
5. **Ask for Help**: Create an issue or ask in discussions

## 🤝 Getting Help

- **Documentation**: Check `README.md`, `PROJECT_STRUCTURE.md`, `CONTRIBUTING.md`
- **GitHub Issues**: [Create an issue](https://github.com/Echo-Sols-Ltd/SoilSM-web/issues)
- **Email**: dev@soilsmart.com

## 🎉 Next Steps

Now that you're set up:

1. ✅ Explore the codebase
2. ✅ Make a small change and see it live
3. ✅ Read through the components
4. ✅ Try adding a new section
5. ✅ Check out the issues for tasks to work on

Happy coding! 🌱

---

**Need more help?** Check out:
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Detailed architecture
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions

