# PercyBuilder Hire

PercyBuilder Hire is a full-stack job portal platform built with Spring Boot, PostgreSQL, React, Redux Toolkit, RTK Query, Tailwind CSS, JWT authentication, logging, and AOP.

## Project Structure

```text
percybuilder-hire/
  backend/   Spring Boot REST API
  frontend/  React + Vite frontend
  Backend

The backend is a Spring Boot API with:

PostgreSQL database
Spring Security with JWT authentication
User registration and login
Role-based users
Swagger/OpenAPI documentation
Global exception handling
Logging with Logback
AOP performance and exception auditing
Frontend

The frontend is a React application with:

Vite
Tailwind CSS
Redux Toolkit
RTK Query
Login and registration pages
Protected profile page
JWT-based API access
Running Locally
Backend
cd backend
./mvnw spring-boot:run
Frontend
cd frontend
npm install
npm run dev
