# News Explorer

A modern news application that allows users to search, filter, and personalize their news experience with a clean, responsive interface.

## Features

- **Personalized News Feed**: Configure your feed based on preferred sources, categories, and authors
- **Dual Search Modes**: 
  - Category-based search for topic-focused browsing
  - Advanced search with date ranges and source filtering
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **User Preferences**: Save your preferences for a tailored experience

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for lightning-fast development and optimized production builds
- **State Management**: Redux Toolkit with slice pattern
- **Routing**: React Router for navigation
- **Testing**: Jest with React Testing Library
- **APIs**: Integration with News API

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/news-explorer.git
   cd news-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your News API key:
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Testing

Run tests using Jest:

```bash
npm test
# or
yarn test
```

To run tests with coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

### Docker Support

To run the application using Docker:

1. Build the Docker image:
   ```bash
   docker build -t news-explorer .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 -e VITE_NEWS_API_KEY=your_api_key_here news-explorer
   ```

3. Access the application at [http://localhost:8080](http://localhost:8080)

## Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Testing Strategy

### Testing Framework
- **Jest**: Comprehensive JavaScript testing solution
- **React Testing Library**: Provides testing utilities focused on user interactions

### Test Coverage
- Unit tests for components
- Mocking of external dependencies (Redux, hooks)

### Key Testing Approaches
- Component rendering
- User interaction simulation
- State management verification
- Edge case handling

## API Integration Details

News Explorer integrates with the News API with two distinct search modes:

- **Category Search**: Uses the `/top-headlines` endpoint for category-based filtering
- **Advanced Search**: Uses the `/everything` endpoint for more flexible searching with sources and date ranges

Note: Due to API limitations, category filtering cannot be combined with source filtering in a single request.

## Project Structure

```
news-explorer/
├── public/          # Static assets
├── src/
│   ├── api/         # API services
│   ├── components/  # React components
│   │   ├── Elements/  # Reusable UI elements
│   │   └── Modules/   # Larger components
│   │   └── Features/  # Feature components
│   ├── constants/   # App constants
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # App pages
│   ├── store/       # Redux store setup
│   │   └── slices/  # Redux Toolkit slices
│   ├── __tests__/   # Test files
│   ├── App.tsx      # Root component
│   └── main.tsx     # Entry point
└── ...
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- News data provided by [News API](https://newsapi.org/)
- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- State managed with [Redux Toolkit](https://redux-toolkit.js.org/)
- Tested with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)