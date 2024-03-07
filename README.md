# Hospitality Connect

## Overview

The Student Locator project is designed to provide a platform for ingesting student data from a CSV file, storing it in a database, and then allowing users to search for nearby students based on their geographical coordinates. The backend is built with PHP Laravel, providing a robust foundation for API development, while the frontend utilizes the React framework to create an intuitive user interface.

## Technology Stack

-   Backend: PHP Laravel
-   Frontend: React
-   Database: SQLite

## Project Setup

1. **Download from GitHub**
    - Clone this repository to your local machine.
        ```bash
        git clone https://github.com/sunyang-629/HospitalityConnect.git
        ```
2. **Laravel Setup**

    - Navigate to the root directory of your Laravel project.
    - Install dependencies using Composer.
        ```bash
        composer install
        ```
    - Copy environment configuration file (`.env`) to root directory
    - Run migrations to set up the database schema.
        ```bash
        php artisan migrate
        ```

3. **Frontend Setup**
    - Navigate to the root directory of your project.
    - Install dependencies using npm or yarn.
        ```bash
        npm install
        ```
        or
        ```bash
        yarn install
        ```

## Getting Started

-   Navigate to the root directory of your Laravel project.
-   Run Laravel Project
    ```bash
    ./vendor/bin/sail up
    ```
-   Run React Project
    ```bash
    npm run dev
    ```
-   The project will run on the port that you set as the APP_PORT in the .env file

## Core Functionality

### Backend (Laravel API)

-   **`/api/students` (POST):**
    -   Endpoint to ingest data from the CSV file and store it in the database.
    -   Call it from Postman:
    1. Set the request method to POST.
    2. Enter the URL of your Laravel application followed by /api/students.
    3. Go to the "Body" tab of the request.
    4. Select the "form-data" option.
    5. Add a new key-value pair where the key is file and the value is the CSV file you want to upload. Click on "Select Files" to upload the CSV file from your local system.
    6. Click on the "Send" button to make the request.
-   **`/api/students/nearby` (GET):**
    -   Endpoint that accepts latitude, longitude, and radius as query parameters.
    -   Responds with JSON data of students within the specified radius, including the calculated distance from the query point.

### Frontend

-   Search Nearby Students Page **`/students`**
    -   A simple form with input fields to enter the user's latitude and longitude, and specify the desired search radius in kilometers.
    -   Submit the form data to the `/api/students/nearby` endpoint.
    -   Display the results in a clear list format, including student names and their distance from the user's location.

## Key Design Decision

-   Laravel Sail: it simplifies the development environment setup by providing a Docker-based environment out of the box.
-   SOLID: I made an effort to divide components according to the Single Responsibility Principle (SRP), ensuring that each component is responsible for a single functionality. This approach facilitates easier maintenance and future updates.
-   React Hook Form: offers a lightweight and performant solution that leverages React hooks for managing form state and validation logic, resulting in cleaner code and improved user experience.
