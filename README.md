# TypeScript Next.js example

This is a really simple project that shows the usage of Next.js with TypeScript.

## Minimum Requirements

- **Node.js:** v20 or later (current version example: 22.16.0)
- **npm:** v8 or later (current version example: 10.9.2)

## Demo 

Url : (https://next-demo-chi-coral.vercel.app/)[https://next-demo-chi-coral.vercel.app/]

## Setup Instructions

1. **Clone the repository.**
2. **Install dependencies** using either:
    ```
    npm install
    ```
    or
    ```
    yarn install
    ```
3. **Set up githooks** by running:
    ```
    npm run prepare
    ```
    This configures local git hooks for linting and testing on commit.
4. **Run in development mode**:
    ```
    npm run dev
    ```
    or
    ```
    yarn run dev
    ```

## Project Structure

Below is an overview of the project's file and folder structure:

```
components/
├── CarCard.tsx  
│   └── Displays a single car’s details (title, image, price, etc.).
├── CarCard.test.tsx  
│   └── Tests for the CarCard component.
├── CarList.tsx  
│   └── Renders a list of car cards (each representing a car make/family).
├── CarList.test.tsx  
│   └── Tests for the CarList component.
├── Layout.tsx  
│   └── Provides a common layout (header with navigation, footer, etc.) with progress indicators; uses Next.js Head.
├── Layout.test.tsx  
│   └── Tests for Layout component functionality.
├── LightBox.tsx  
│   └── Implements an image lightbox for viewing car images with navigation.
├── LightBox.test.tsx  
│   └── Tests the LightBox functionality.
├── PageTemplate.tsx  
    └── A template component for page content structure and styling.
    
git-hooks/
└── ... (git hook scripts)
    └── Scripts to run linting/tests pre‑commit.

interfaces/
└── index.ts  
    └── Contains TypeScript interfaces and type definitions used throughout the project.

pages/
├── _app.tsx  
│   └── Custom App component (wraps all pages) with global CSS imports.
├── _app.test.tsx  
│   └── Tests for the custom App component.
├── about.tsx  
│   └── Renders the “About” page.
├── about.test.tsx  
│   └── Tests for the About page.
├── index.tsx  
│   └── Home page of the site.
├── index.test.tsx  
│   └── Tests for the Home page.
├── [carsUri]/
│   ├── index.tsx  
│   │   └── Dynamic page displaying cars for a specific make/URI with data fetched from the API.
│   └── index.test.tsx  
│       └── Tests for the dynamic cars page.
└── api/
    ├── cars/
    │   ├── index.ts  
    │   │   └── API endpoint serving cars data.
    │   └── index.test.ts  
    │       └── Tests for the cars API.
    └── page.ts  
        └── API endpoint for page (archive) information  
            (Note: Although an “index.ts” might be expected, the correct file is here as “page.ts”.)

public/
└── ... (static assets)
    └── Contains images, fonts, and other public resources.

styles/
├── global.scss  
│   └── Main global stylesheet importing core CSS/SCSS files.
├── core/
│   ├── _base-init.scss  
│   │   └── Imports core variables, breakpoints, spacing, functions, etc.
│   ├── _breakpoints.scss  
│   │   └── SCSS mixins and settings for responsive breakpoints.
│   ├── _forms.scss  
│   │   └── Styles for form elements with hover effects.
│   ├── _functions.scss  
│   │   └── Custom SCSS functions (e.g. rem converter, unit stripping).
│   ├── _header.scss  
│   │   └── Styles for the header and navigation styling.
│   ├── _init.scss  
│   │   └── Main initialization file for core styles.
│   ├── _layout.scss  
│   │   └── Layout-related spacing and layout helpers.
│   ├── _spacing.scss  
│   │   └── Spacing utilities (margins, paddings, etc.).
│   ├── _spacing-css-elements.scss  
│   │   └── Predefined spacing classes for CSS elements.
│   ├── _typography.scss  
│   │   └── Default typography settings for headings, paragraphs, etc.
│   └── _variables.scss  
│       └── SCSS variables including color palette, font sizes, and breakpoints.
├── modules/
│   ├── _car-card.module.scss  
│   │   └── Styles explicitly for the CarCard component.
│   ├── _car-list.module.scss  
│   │   └── Styles for the CarList layout (using masonry/multi‑column or grid layout).
│   ├── _light-box.module.scss  
│   │   └── Styles for the LightBox component, including overlay, thumbnails, and navigation buttons.
│   ├── _page-info.module.scss  
│   │   └── Styles for displaying page information (title, content).
│   └── _page-template.module.scss  
│       └── Specific styling for page template components.
       
utils/
├── helpers.ts  
│   └── Utility functions used throughout the project.
├── helpers.test.ts  
│   └── Tests for helper functions.
├── page-data.ts  
│   └── Contains logic or data structure for page data.
└── sample-data.ts  
    └── Contains sample JSON data for cars and families; used for testing or local development.

package.json  
└── Contains project dependencies, scripts, and metadata.

README.md  
└── Project overview, setup instructions, file structure summary, and task requirements.

tsconfig.json  
└── TypeScript compiler configuration.
```

## Task

The task is to fetch cars data and pageData from the local API (`/api/cars` and `/api/page`) respectively and use that data to build an archive cars page.

## The Requirements are:

* Only display cars by make name that has at least one family image.
* Each make's families must be ordered by image first priority.
* The order between families of the same make is not important when family have more than one or two images.
* Display pageInfo title, content at the top of the page. You can use your creative imagination to style it but please follow W3C best practices standards of HTML elements.
* Display the structured make in a list with 3 column fashion. Please use modern flexbox or grid CSS.

## Things to Consider

* Any data fetching and structuring logic should consider efficiency, performance, and code readability in mind.

## Implementation Notes

- **Masonry Layout with Sticky Header:**  
  We have implemented a masonry layout with a sticky header to give the page a slightly cooler look and better usability.

- **Overboarded with Test and Lint Setup:**  
  Extensive testing is implemented with Jest and React Testing Library. Linting is enforced using ESLint (for TypeScript/JavaScript) and Stylelint (for CSS/SCSS) to maintain a high-quality codebase.

## Available Scripts

- **Development:**  
  `npm run dev` or `yarn run dev`

- **Production Build:**  
  `npm run build` or `yarn build`

- **Start Production Server:**  
  `npm run start` or `yarn start`

- **Linting:**  
  `npm run lint` (runs lint tasks for both TS/TSX and CSS/SCSS)

- **Testing:**  
  `npm run test`

Happy coding!
