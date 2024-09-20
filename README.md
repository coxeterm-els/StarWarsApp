# Star Wars App

### Setup Instructions

1. Run `git clone https://github.com/harrytidball/StarWarsApp.git` to clone the repository.
2. Navigate to the project directory with `cd StarWarsApp`.
3. Ensure Node.js is installed on your machine and run `npm install` to install the project dependencies.
4. Enter `npm start` to start the development server.
5. The application can be found at http://localhost:3000 by default.

### Implementation Decisions

1. Utilized pagination to display the characters in a more user-friendly manner.
2. Utilized a Star Wars-esque color scheme to provide a theme for the application.
3. Implemented film searching based on whether the inputted value is contained within any of the movie titles.
4. Implemented a shareable link by appending a search URL parameter, which maintains the state of the search.
5. Utilized asynchronous API calls to improve the performance of data retrieval.

### Future Improvements

1. Display error messages to the user rather than simply logging them to the console.
2. Add animations for loading messages to enhance the loading experience for the user.
3. Cache the character data after it is initially loaded to reduce the need to re-request the API data.
4. Add unit tests for the API calls and conditionally displayed UI components.
5. Set up variables for commonly used HEX color codes.
6. Utilize context to pass the formatted film title between components, rather than re-formatting when required.
7. Load a subset of film characters initially, rather than all of them, to provide a quicker initial load.
8. Implement sorting and ordering functionality.
9. Improve the user experience on mobile and smaller devices.