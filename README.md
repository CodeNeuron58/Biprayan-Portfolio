# Biprayan Choudhuri - AI/ML Engineer Portfolio

A modern, production-ready portfolio website built with TypeScript, Vite, and SCSS.

## Features

- **Modern Tech Stack**: TypeScript, Vite, SCSS
- **Component Architecture**: Modular HTML components
- **Data-Driven**: Projects and skills managed via JSON
- **Performance Optimized**: Code splitting, minification, and asset optimization
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Ready**: Meta tags, structured data, and semantic HTML
- **CI/CD**: Automated deployment via GitHub Actions

## Project Structure

```
Biprayan-Portfolio/
|-- public/                 # Built assets (generated)
|-- src/
|   |-- components/         # HTML components
|   |-- data/              # JSON data files
|   |-- pages/             # Main HTML pages
|   |-- scripts/           # TypeScript modules
|   |-- styles/            # SCSS stylesheets
|-- .github/workflows/     # CI/CD configuration
|-- package.json
|-- vite.config.ts
|-- tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Biprayan-Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `public`
4. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `public` folder to your hosting provider.

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NODE_ENV=development
```

### Customization

- **Profile**: Edit `src/data/profile.json`
- **Projects**: Modify `src/data/projects.json`
- **Skills**: Update `src/data/skills.json`
- **Styles**: Customize `src/styles/main.scss`

## Technologies Used

- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: SCSS
- **Deployment**: Netlify
- **CI/CD**: GitHub Actions

## License

MIT License - feel free to use this as a template for your own portfolio!

## Contact

- Email: biprayanc@gmail.com
- LinkedIn: https://linkedin.com/in/biprayanchoudhuri
- GitHub: https://github.com/CodeNeuron58

# GitHub Pages Deployment Configured