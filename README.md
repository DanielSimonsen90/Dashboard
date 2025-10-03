# Human Risks Dashboard Challenge
[by Daniel Simonsen](https://danielsimonsen90-portfolio.netlify.app/)

Project created to follow the design and criteria provided by Julius Bendt. During the interview, I provided some feedback on the design before receiving the assignment. These feedback points were not implemented, since I wanted to follow the design as closely as possible.
Despite this, I replaced the design's Human Risks logo with the user's avatar image for a better UX and to avoid looking for a clean version of the Human Risks logo.

![Design preview](https://github.com/DanielSimonsen90/Dashboard/blob/main/resources/Design.png?raw=true)

## 🗒️ Implementation Status 

### ✅ Completed Requirements
- **Multiple chart support**: Implemented Bar, Line, Pie, Doughnut charts + custom Number/"Procentage" displays
- **Endpoint mocking with spinners/skeletons**: Custom Suspense component with skeleton states and gradient animations
- **Code quality**: TypeScript, SCSS with BEM methodology, modular component structure

### ⚠️ Partially Implemented
- **Addition/Removal of charts**: UI buttons present but handlers not implemented

### ❌ Not Implemented  
- **Chart resizing**: Charts are implemented, but manual resizing not yet available
- **Drag & Drop support**: Architecture prepared but not implemented (would use react-beautiful-dnd)

## 🛠️ Installation
To run the project, make sure you download or clone the repository, then run:
```bash
npm install
npm run dev
```

## 📁 Project setup
Although the company works in Angular and wishes to migrate to Tailwind, these are not technologies I have extensive experience with at the moment, so the project is created using a Vite template with TypeScript, React and SCSS.

Additionally, I've installed the following 3rd party packages:
* FontAwesome: Since no design manual was provided, FontAwesome icons were used to mock the icons in the design.
* Chart.js & React-Chartjs-2: The mock data provided was already heavily modified to fit the chart.js format, so to save time, I've used Chart.js and React-Chartjs-2 to draw the charts easily.
* Classnames: In some components, conditional class names are necessary for a better developer experience
* Although not installed, beautiful-react-dnd is an intuitive drag-and-drop library that I would have used to implement drag-and-drop functionality for dashboard widget scaling.

### 📁 My folder structure
My folder structure consists of various sub-folders within the src directory. These will be explained further down the page.

To ensure code splitting for easy readability and maintainability, each component has its own folder with the following files:
* index.ts - Main export file for the component and additional internal types, hooks or constants if necessary. This is so imports look cleaner as '\~/components/ComponentName' instead of '\~/components/ComponentName/ComponentName'. This file also imports the component's styles.
* ComponentName.tsx - The main component file where everything is imported aside from styles.
* ComponentName.scss - The component's styles, using BEM methodology and SCSS nesting for better organization.

Additionally, a component folder can hold ComponentNameTypes, ComponentNameConstants or a hooks/components directory for specific internal hooks or sub-components.

The project is structured with the following folders:

#### src/components
The components directory contains all intended reusable components, that is or could be used in multiple places of the application.

#### src/data
The data directory contains mock data used to simulate API responses. In a real-world application, this would be replaced with actual API calls and the data directory would not exist.

#### src/pages
Although the project only consists of a single dashboard page, the structure should support a whole application regardless, and therefore a pages directory is created to hold our only page.

#### src/providers
To easily manage asynchronous state like user and statistic data, a context-based provider system is created. These providers ensure that the child components of a provider will not be shown until the data is fully loaded. This is also where the mocked API calls are simulated.

#### src/styles
Despite each component having its own custom styles, a global styles directory is still necessary to hold global styles and SCSS variables and mixins.
Additionally, these could be stored within the App.scss file (or move the styles folder in the App directory), but for better src folder structure, I prefer to keep them there.

#### src/types
Custom application/domain types used to define data structures.

## 📚 References
* [Dashboard design](https://github.com/DanielSimonsen90/Dashboard/blob/main/resources/Design.png)
* [Dashboard criteria](https://github.com/DanielSimonsen90/Dashboard/blob/main/resources/Criteria.md)
