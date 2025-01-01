# Chess-able
[![CI/CD Pipeline](https://github.com/Homemade-Cookies/Chess-able/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Homemade-Cookies/Chess-able/actions/workflows/ci-cd.yml)
[![CodeQL Advanced](https://github.com/Homemade-Cookies/Chess-able/actions/workflows/codeql.yml/badge.svg)](https://github.com/Homemade-Cookies/Chess-able/actions/workflows/codeql.yml)
[![Microsoft Defender For Devops](https://github.com/Homemade-Cookies/Chess-able/actions/workflows/defender-for-devops.yml/badge.svg)](https://github.com/Homemade-Cookies/Chess-able/actions/workflows/defender-for-devops.yml)

## Overview

Chess-able is a project designed to provide an interactive chess game with various features such as move validation, game status updates, and customizable board themes and piece designs.

## Setup Instructions

To get the project up and running, follow these steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/chess-able.git cd chess-able
   ``` 
2. Install the dependencies:
   ```sh
      npm install
   ```
3. Start the development server:
   ```sh
      npm start
   ```
4. Open your browser and navigate to:
   ```sh
      http://localhost:3000
   ```

## Usage Examples

Here are some examples of how to use the project:

- To change the board theme, use the dropdown menu labeled "Board Theme".
- To change the piece design, use the dropdown menu labeled "Piece Design".
- To toggle the display of possible moves, use the switch labeled "Show Possible Moves".
- To toggle the display of piece notation, use the switch labeled "Show Piece Notation".

## Screenshots

![Screenshot 1](screenshots/screenshot1.png)
![Screenshot 2](screenshots/screenshot2.png)

## Running Tests

To run the tests, use the following command:
```sh
npm test
```

## Contribution Guidelines

We welcome contributions from the community! To contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bugfix.
2. Write tests for your changes.
3. Ensure all tests pass.
4. Submit a pull request with a clear description of your changes.

## Technologies and Frameworks Used

- React
- MUI (Material-UI)
- Chess.js
- Babel
- Webpack
