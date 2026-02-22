# Cognitive Canvas — Student Portfolio

A personal portfolio website showcasing projects, certifications, skills, and creative work. Built as a modern, interactive single-page application with a focus on quantum computing, cybersecurity, AI/ML, and astrophysics.

## Features

- **Interactive Sections**: Hero, About, Skills, Certifications, Projects, Photography, and more
- **Skills Lab**: Interactive demos including chatbot, password strength checker, data visualization, quantum circuit simulator, and exoplanet calculator
- **Systems Map**: Interactive force-directed graph visualization
- **Responsive Design**: Mobile-first approach with smooth animations
- **GitHub Pages Deployment**: Automatically deployed via GitHub Actions

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **shadcn/ui** components
- **D3.js** for data visualization
- **Recharts** for charts

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Git

### Installation

```sh
# Clone the repository
git clone https://github.com/dumbbyperson/cognitive-canvas.git

# Navigate to the project directory
cd cognitive-canvas

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:8080`

### Building for Production

```sh
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
cognitive-canvas/
├── src/
│   ├── components/      # React components
│   │   ├── sections/   # Page sections
│   │   └── ui/         # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── public/             # Static assets
│   └── data/           # JSON data files
├── scripts/            # Build and sync scripts
└── .github/workflows/  # CI/CD configuration
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

**Live Site**: [https://dumbbyperson.github.io/cognitive-canvas/](https://dumbbyperson.github.io/cognitive-canvas/)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Updating Certifications

Certifications can be synced from a LinkedIn data export:

```sh
node scripts/sync-linkedin-certs.js <path-to-linkedin-export>
```

See `public/data/README.md` for detailed instructions.

## License

This project is open source and available under the MIT License.

---

**Built with** [Cursor](https://cursor.sh) and [Lovable](https://lovable.dev)
