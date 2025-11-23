# Leviro Utils

A collection of useful developer and daily utility tools, built with performance and usability in mind.

## Features

- **Age Calculator**: Calculate your exact age in years, months, weeks, and days with precision.
- **Currency Converter**: Real-time currency conversion using the latest exchange rates. Features a searchable dropdown with flags for all world currencies.
- **Secret Generator**: Generate secure, random secrets and passwords using `bcrypt` for your applications. Includes rate limiting for security.
- **World Info**: Explore detailed information about countries, states, and cities worldwide. Includes search functionality and detailed data views.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript templates), TailwindCSS v4.1
- **Database**: SQLite (via `better-sqlite3`)
- **PWA**: Fully installable Progressive Web App

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Abdodiab2005/leviro-utils.git
    cd leviro-utils
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Build the CSS:

    ```bash
    npm run build:css
    ```

4.  Start the server:

    ```bash
    npm start
    ```

5.  Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Development**: Run `npm run watch:css` to watch for TailwindCSS changes and `npm start` to run the server.
- **Production**: Ensure CSS is built using `npm run build:css` before deploying.

## License

This project is licensed under the ISC License.

## Author

Abdo Diab
