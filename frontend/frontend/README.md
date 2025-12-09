# Prescription Management System – Frontend

## 1. Overview

- **Purpose**
  - Single Page Application (SPA) for managing medical prescriptions.
  - Provides authentication, prescription CRUD, date-range filters, pagination, and reporting charts.
- **Tech stack (frontend)**
  - Angular 16 (TypeScript, SCSS)
  - RxJS 7
  - `@swimlane/ngx-charts` for reports (charting UI)

## 2. Project Structure

- **Monorepo layout (top-level)**
  - `backend/` – Spring Boot 3, Java 17 REST API (JWT auth, H2 database).
  - `frontend/` – Angular 16 application (this project).
- **This Angular project**
  - Root: `frontend/` (this folder)
  - Key files/directories:
    - `package.json` – npm scripts and dependencies.
    - `src/` – Angular source code.
    - `src/app/` – application modules, components, services.
    - `src/assets/` – static assets.

## 3. Prerequisites

- **Frontend requirements**
  - Node.js **18.x+** (recommended)
  - npm (comes with Node.js)
  - Angular CLI **16.x** installed globally (optional but convenient):
    - `npm install -g @angular/cli@16`
- **Backend requirements**
  - Java **17** (JDK)
  - Maven **3.9+** (`mvn` on your PATH)

## 4. Environment Setup

- **1) Clone / open the repository**
  - Ensure you have the full project with:
    - `backend/` (Spring Boot API)
    - `frontend/` (this Angular app)
- **2) Configure Java & Maven (backend)**
  - Install JDK 17 and ensure `java -version` shows 17.x.
  - Install Maven and ensure `mvn -v` works.
- **3) Configure Node & Angular CLI (frontend)**
  - Install Node.js from https://nodejs.org.
  - In a terminal:
    - `node -v` → should show 18.x or higher.
    - `npm -v` → npm version.
  - (Optional) install Angular CLI globally:
    - `npm install -g @angular/cli@16`

## 5. Backend – How to Run (Spring Boot)

- **Location**
  - `backend/` (sibling of this `frontend/` folder).
- **Steps**
  - Open a terminal:
    - Change directory: `cd backend`
    - Start the server: `mvn spring-boot:run`
  - The backend will start on:
    - `http://localhost:8080`
- **API highlights**
  - `POST /API/v1/auth/login` – login (JWT)
  - `GET /API/v1/prescription` – list prescriptions (with date filters)
  - `GET /API/v1/prescription/page` – paginated list
  - `POST /API/v1/prescription` – create
  - `PUT /API/v1/prescription/{id}` – update
  - `DELETE /API/v1/prescription/{id}` – delete
  - `GET /API/v1/prescription/report/daily` – day-wise prescription counts
- **Default credentials**
  - Username: `admin`
  - Password: `admin123`

## 6. Frontend – How to Run (Angular)

- **Install dependencies (one-time per machine / after clone)**
  - From the `frontend/` folder (this README location):
    - `npm install`
- **Start development server**
  - Run: `npm start`
  - This runs `ng serve` under the hood.
  - Default dev URL:
    - `http://localhost:4200`
- **Development server behavior**
  - The app automatically reloads when you change source files in `src/`.
  - Console will display any TypeScript or template errors.

## 7. Frontend – NPM Scripts

- **Available scripts (from `package.json`)**
  - `npm start`
    - **Purpose**: Run the dev server using `ng serve`.
  - `npm run build`
    - **Purpose**: Build the application for production.
    - Output directory: `dist/`.
  - `npm run watch`
    - **Purpose**: Continuous build in development mode.
  - `npm test`
    - **Purpose**: Run unit tests via Karma.

## 8. End-to-End Flow (Recommended Order)

- **Step 1 – Start backend**
  - `cd backend`
  - `mvn spring-boot:run`
- **Step 2 – Start frontend**
  - `cd frontend`
  - `npm install` (first time only)
  - `npm start`
- **Step 3 – Use the application**
  - Open browser: `http://localhost:4200`.
  - Login with:
    - Username: `admin`
    - Password: `admin123`
  - Navigate using the UI sidebar / routes to:
    - **Prescriptions list** – view, filter by date range, paginate, delete.
    - **Prescription form** – create or edit prescriptions.
    - **Reports** – view daily prescription counts (bar chart via ngx-charts).

## 9. Build & Deployment Notes

- **Production build**
  - Run: `npm run build`
  - Artifacts are generated under `dist/` and can be served by any static web server (nginx, Apache, cloud hosting, etc.).
- **Backend deployment**
  - Package with Maven in the `backend/` folder:
    - `mvn package -DskipTests`
  - Deploy resulting JAR on a Java 17-compatible environment.

## 10. Troubleshooting

- **Frontend doesn’t load**
  - Check that `npm start` is running without errors.
  - Verify you are opening `http://localhost:4200`.
- **Login fails / API errors**
  - Confirm backend is running on `http://localhost:8080`.
  - Check browser dev tools → Network tab for failed requests.
- **TypeScript or template errors**
  - Watch the terminal where `npm start` is running for error messages.
  - Fix the indicated file and save; Angular will recompile.

