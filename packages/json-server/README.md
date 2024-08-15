# SERVER with Json-Server

<p align="center">
  <img src="./screenshots/logo.png" alt="Cinema Manager Logo">
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/sytnikovzp/Cinema-manager-json-server" alt="Last Commit">
</p>

## Project Description

Cinema manager server is a project that implements the ability to store and organize information about movies, actors, directors, and studios. It allows users to store and view information about actors and directors, as well as view movie storylines and trailers.

## Changelog by history commit

<details>
  <summary><strong>Warning! There is a lot of information here, click to expand:</strong></summary>

### August 2024

- **Aug 15**:

  - Refactoring server with middleware & tests

- **Aug 13**:

  - Replacing Unicode characters with regular ones [A-z] in db.json

- **Aug 8**:

  - Filled 'logo' for genres in db.json
  - Filled 'flag' for countries in db.json
  - Filled 'coat_of_arms' for locations in db.json
  - Renamed 'logo' to 'coat_of_arms' for 'locations' in db.json
  - Added 'logo' field to genres, countries & location entities in db.json

- **Aug 7**:

  - Renamed 'nationality' to 'country' in db.json
  - Moved genres, countries & locations to db.json

- **Aug 5**:

  - Changed 'start' script

- **Aug 4**:

  - Refactoring reverseOrderMiddleware

- **Aug 4**:
  - Added reverseOrderMiddleware

### July 2024

- **Jul 12**:

  - Changed db.json file
  - Added redirect to '/'
  - Fixed errors
  - Added chokidar
  - Added CORS
  - Added argument to json-server
  - Changed path to db.json
  - Changed path to certs
  - Changed json-server version
  - Fixed path to certs (https)
  - Fixed package.json
  - Added script to start server
  - Created HTTPS server for Cinema manager
  - Initial commit

  </details>

## Key Highlights

- **Main Entities**:

  - **Actors**: Information about actors
  - **Directors**: Information about directors
  - **Movies**: Information about movies
  - **Studios**: Information about studios

- **Secondary Entities**:
  - **Genres**: Movie genres
  - **Countries**: Countries
  - **Locations**: Locations

## Features

- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for movies, actors, directors, studios, genres, countries, and locations.
- **Pagination**: Implemented pagination with customizable limits and sorting for efficient data retrieval in controllers for genres, countries, locations, and actors.
- **Logging**: Added logging functionality for debugging and tracking operations.
- **Middleware**: Custom middleware for reverting data.
- **Express Integration**: Uses Express to serve your JSON data.
- **CORS Support**: Enabled by default using the 'cors' library.
- **File Watching**: Automatically reloads the server when changes are detected using 'chokidar'.
- **HTTPS Ready**: Includes the 'https' module for secure connections (only 'server' branch).

## Technologies and Libraries

The server-side project is built using the Express framework. The following libraries are used:

- **chokidar**: Minimal and efficient cross-platform file watching library.
- **cors**: To handle cross-domain requests.
- **express**: A fast, flexible, minimalist web framework for Node.js applications
- **json-server**: Its a library that allows you to "get a full fake REST API" without any pre-configuration.
- **https**: HTTPS is the HTTP protocol over TLS/SSL. In Node.js this is implemented as a separate module.

Middleware includes:

- **reverseOrder**: For reverse order data.
- **time**: For formatted console output.

## System Requirements

- **Git**: 2.46
- **NodeJS**: v18.20
- **NPM**: 10.8

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:sytnikovzp/Cinema-manager-json-server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Cinema-manager-json-server
   ```
3. Install dependencies:
   ```bash
   npm i
   ```

## Start server

```bash
npm start
```

## Client-Side Links

- [CINEMA MANAGER client (with Vite)](https://github.com/sytnikovzp/Cinema-manager-client)
