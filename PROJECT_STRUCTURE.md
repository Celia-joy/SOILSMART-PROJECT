# SoilSmart Project Structure

## Overview

This document outlines the structure and organization of the SoilSmart web application.

## Technology Stack

### Core Technologies
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: React Icons

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier
- **CSS Processing**: PostCSS with Autoprefixer

## Directory Structure

```
soilsm-web/
├── public/                      # Static assets
│   └── robots.txt              # SEO robots configuration
│
├── src/                        # Source code
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with fonts and metadata
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles and Tailwind directives
│   │
│   ├── components/             # React components
│   │   ├── Navbar.tsx         # Navigation bar with mobile menu
│   │   ├── Hero.tsx           # Hero section with animations
│   │   ├── ProblemStatement.tsx  # Problem section
│   │   ├── Objectives.tsx     # Objectives/solutions section
│   │   ├── Features.tsx       # Features showcase
│   │   ├── HowItWorks.tsx     # Process explanation
│   │   ├── CallToAction.tsx   # CTA with email signup
│   │   └── Footer.tsx         # Footer with links and contact
│   │
│   └── lib/                    # Utility functions and constants
│       ├── constants.ts        # App constants and configuration
│       └── utils.ts            # Helper functions
│
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js configuration
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
├── README.md                  # Project documentation
├── CONTRIBUTING.md            # Contribution guidelines
└── PROJECT_STRUCTURE.md       # This file

```

## Component Architecture

### Layout Components
- **Navbar**: Responsive navigation with mobile menu, scroll effects
- **Footer**: Multi-column footer with links, contact info, social media

### Page Sections
1. **Hero**: Eye-catching landing section with animated elements
2. **ProblemStatement**: Highlights agricultural challenges
3. **Objectives**: Showcases SoilSmart solutions
4. **Features**: Lists platform capabilities
5. **HowItWorks**: Step-by-step process explanation
6. **CallToAction**: Email signup and conversion section

## Styling System

### Tailwind Configuration
- Custom color palette (primary green, secondary yellow)
- Custom fonts (Inter for body, Poppins for headings)
- Custom animations (fade-in, slide-up, float)
- Responsive breakpoints (sm, md, lg, xl)

### Custom CSS Classes
- `.container-custom`: Max-width container with responsive padding
- `.btn-primary`: Primary button style
- `.btn-secondary`: Secondary button style
- `.section-title`: Section heading style
- `.section-subtitle`: Section subtitle style
- `.card`: Card component style

## State Management

Currently using React hooks for local state management:
- `useState` for component state
- `useEffect` for side effects (scroll listeners, etc.)

## Routing

Using Next.js App Router with file-based routing:
- `/` - Home page (landing page)

Future routes will be added as needed:
- `/dashboard` - User dashboard
- `/pricing` - Pricing plans
- `/about` - About page
- `/contact` - Contact page

## Data Flow

### Current Implementation
- Static content rendered on the server
- Client-side interactivity with React hooks
- Smooth scroll navigation between sections

### Future Implementation
- API integration for sensor data
- User authentication and authorization
- Real-time data updates with WebSockets
- Database integration for user data

## Performance Optimizations

1. **Image Optimization**: Next.js Image component (to be implemented)
2. **Code Splitting**: Automatic with Next.js App Router
3. **Font Optimization**: Google Fonts with `next/font`
4. **CSS Optimization**: Tailwind CSS purging unused styles
5. **Animation Performance**: Framer Motion with GPU acceleration

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Responsive design for all devices

## SEO

- Metadata configuration in layout.tsx
- robots.txt for search engine crawlers
- Semantic HTML structure
- Fast page load times
- Mobile-friendly design

## Git Workflow

### Branches
- `main` - Production-ready code
- `develop` - Development integration branch
- `feature/*` - Feature development
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Commit Convention
Following Conventional Commits specification:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Testing
- `chore:` - Maintenance

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format
```

## Environment Variables

See `.env.example` for required environment variables:
- `NEXT_PUBLIC_APP_URL` - Application URL
- `NEXT_PUBLIC_API_URL` - API endpoint
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

## Future Enhancements

### Phase 1 (Current)
- ✅ Landing page with all sections
- ✅ Responsive design
- ✅ Animations and interactions

### Phase 2 (Next)
- [ ] User authentication
- [ ] Dashboard interface
- [ ] Sensor data visualization
- [ ] Real-time monitoring

### Phase 3 (Future)
- [ ] Mobile app integration
- [ ] Payment processing
- [ ] Community features
- [ ] AI recommendations engine

## Testing Strategy

### Unit Tests
- Component testing with Jest and React Testing Library
- Utility function testing

### Integration Tests
- API integration testing
- User flow testing

### E2E Tests
- Critical user journeys
- Cross-browser testing

## Deployment

### Recommended Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

### Build Process
1. Install dependencies
2. Run linter
3. Build production bundle
4. Deploy to hosting platform

## Support

For questions or issues:
- Email: dev@soilsmart.com
- GitHub: https://github.com/Echo-Sols-Ltd/SoilSM-web

---

Last Updated: November 2025

