# React Multi-Page Application

A React application featuring counter, user form, rich text editor, and dashboard components with data persistence.

# Link
react-project-git-main-shreyas-projects-780dee06.vercel.app

## Features

- **Counter**: Interactive counter with animated background using Bezier curve
- **User Form**: Data collection with localStorage persistence and unsaved changes detection
- **Rich Text Editor**: Text formatting with ReactQuill and user data visualization
- **Dashboard**: Data display with counter value, user profile, and growth chart

## Tech Stack

- React
- React Router for navigation
- React Spring for animations
- Material UI components
- ReactQuill for rich text editing
- Recharts for data visualization
- UUID for generating unique identifiers
- CSS for styling

## Project Structure

- `App.js`: Main component with routing setup
- `components/`: Individual page components
  - `CounterPage.js`
  - `UserFormPage.js`
  - `RichTextEditorPage.js`
  - `Dashboard.js`
- `styles/`: CSS files for styling components

## Screenshots
![image](https://github.com/user-attachments/assets/a95d933d-5dea-4e94-b3cc-ebd075d32fbd)
![image](https://github.com/user-attachments/assets/c69453f8-7aa2-4ee3-aa64-9eeda88cdb1a)
![image](https://github.com/user-attachments/assets/f209873b-2abc-48e8-a29e-41f86fb379d6)
![image](https://github.com/user-attachments/assets/801d4a28-8e2d-40c1-9dbb-65eac562502f)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open browser to `http://localhost:3000`

## Data Persistence

The application uses localStorage to maintain state between sessions for:
- Counter value
- User form data
- Rich text editor content
