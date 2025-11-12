# StoneSmart - Smart Inventory & Sales Dashboard for Stone
Supply Businesses

## Project Title
StoneSmart – Smart Inventory & Sales Dashboard for Stone Supply Businesses

## Problem Statement
Stone supply businesses often face challenges managing inventory, leads, and sales data in
real time. Tracking stock levels, slab details, customer requests, and delivery status can
become disorganized when handled manually. StoneSmart provides a centralized web
dashboard for inventory and sales management, where admins and sales reps can add,
update, and monitor slab details, leads, and orders, while clients can browse slabs and request
quotes online.

## System Architecture

Frontend → Backend (API) → Database

### Frontend:
React.js + CSS for responsive and dynamic UI
React Router for page navigation
Axios for API integration and data fetching


### Backend:
Node.js + Express.js for REST API creation
Handles authentication, CRUD operations, and business logic

### Database:
MongoDB (via MongoDB Atlas)
Stores slabs, leads, orders, and user data
Authentication:
JWT-based login/signup system with role-based access (Admin, Sales Rep, Client)
Hosting:
Frontend → Vercel or Netlify
Backend → Render or Railway
Database → MongoDB Atlas

## Key Features

Category Features
Authentication & Authorization – User registration, login, JWT-based role access
(Admin, Sales Rep, Client)
CRUD Operations – Add, edit, delete, and view slabs (granite/quartz), orders, and
leads
Filtering / Searching / Sorting / Pagination – Filter slabs by material, color, origin, price,
or thickness; sort by price or availability; and paginate results
Frontend Routing – Pages include Home, Login, Dashboard, Inventory, Orders, Leads,
and Client Browse
Hosting – Fully deployed full-stack web app accessible publicly

## Tech Stack
Layer Technologies
Frontend – React.js, CSS, Axios, React Router
Backend – Node.js, Express.js
Database – MongoDB Atlas
Authentication – JWT (JSON Web Tokens)
Hosting – Vercel (Frontend), Render/Railway (Backend), MongoDB Atlas (Database)

## API Overview

### Endpoint Method Description Access

/api/auth/signup POST Register new user (Admin, Sales Rep, Client) Public
/api/auth/login POST Authenticate user Public
/api/slabs GET Get all slab records Authenticated
/api/slabs/:id PUT Update slab details Authenticated
/api/slabs/:id DELETE Delete a slab entry Admin only
/api/orders POST Create a new order Authenticated
/api/leads GET Retrieve all leads with filters (status/date) Admin / Sales Rep