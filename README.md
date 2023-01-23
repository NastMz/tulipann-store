
# Tulipann Store

Welcome to the Tulipann Store repository! This repository contains the code for an ecommerce platform, including the frontend, dashboard, and API.

## Table of Contents

- [Features](#features)
- [Frontend](#frontend)
- [Dashboard](#dashboard)
- [API](#api)
- [File Structure](#file-structure)
  - [Frontend](#frontend-1)
  - [Dashboard](#dashboard-1)
  - [API](#api-1)
- [Getting Started](#getting-started)
- [Starting the Projects](#starting-the-projects)
- [Documentation](#documentation)

## Features

- Responsive design
- TypeScript support
- TailwindCSS for styling
- Vite for fast development
- Django Rest Framework for the API

## Frontend

The frontend is a single-page application built with React, TypeScript, and TailwindCSS. It is powered by the [Vite](https://vitejs.com/) build tool.

## Dashboard

The dashboard is a React-based application that provides a user interface for managing the ecommerce platform. It is also built with TypeScript and TailwindCSS, and uses Vite as the build tool.

## API

The API is built with Django Rest Framework and provides a RESTful interface for the frontend and dashboard to interact with the ecommerce platform's data.

## File Structure

Each project has a similar file structure, with a few differences depending on the specifics of the project.

### Frontend

The frontend project has the following file structure:

```markdown
frontend/
├── docs/                   # directory containing documentation for the project
├── public/                 # directory containing public assets
├── src/                    # main source code directory
│ ├── api/                  # directory containing code for making API requests
│ │ ├── client/             # directory containing API client code
│ │ ├── data/               # directory containing data models and data manipulation functions
│ │ └── request/            # directory containing code for handling API requests
│ ├── assets/               # directory containing static assets such as images
│ │ └── images/             # directory containing image files
│ ├── components/           # directory containing reusable UI components
│ │ ├── common/             # directory containing common components used throughout the application
│ │ ├── layout/             # directory containing layout components
│ │ ├── pages/              # directory containing top-level pages
│ │ ├── sections/           # directory containing sections of a page
│ │ ├── templates/          # directory containing templates for page layout
│ │ ├── ui/                 # directory containing UI elements such as buttons and forms
│ │ └── utils/              # directory containing utility functions for components
│ ├── config/               # directory containing application configuration files
│ │ ├── options/            # directory containing options for configuring the application
│ │ └── routes/             # directory containing routing configuration
│ ├── models/               # directory containing data models
│ │ └── utils/              # directory containing utility functions for data models
│ ├── redux/                # directory containing code for the application's state management using the Redux library
│ │ ├── actions/            # directory containing action creators
│ │ ├── reducer/            # directory containing reducers
│ │ ├── selector/           # directory containing selectors
│ │ └── store/              # directory containing store configuration
│ ├── utils/                # directory containing utility functions
│ ├── App.css               # styles for the root component
│ ├── App.ts                # root component of the application
│ ├── index.css             # global styles for the application
│ ├── main.tsx              # entry point for the application
│ └── vite-env.d.ts         # types for the development server
├── .env.example            # example environment variables file
├── .eslintrc.json          # ESLint configuration file
├── index.html              # HTML template for the application
├── package-lock.json       # lockfile for installed packages
├── package.json            # project configuration and dependencies
├── postcss.config.cjs      # configuration file for PostCSS
├── tailwind.config.cjs     # configuration file for Tailwind CSS
├── tsconfig.json           # TypeScript configuration file
├── tsconfig.node.json      # TypeScript configuration file for Node.js
└── vite.config.ts          # configuration file for the development server
```

### Dashboard

The dashboard project has the following file structure:

```markdown
dashboard/
├── src/
│ ├── components/    # directory containing reusable UI components
│ ├── pages/         # directory containing top-level pages
│ ├── services/      # directory containing utility functions and API clients
│ ├── App.tsx        # root component of the application
│ ├── index.tsx      # entry point for the application
│ ├── router.tsx     # routing configuration for the application
│ └── types.ts       # shared type definitions for the application
├── public/          # directory containing static assets (e.g. images)
├── .vite.config.js  # configuration file for the Vite build tool
└── package.json     # metadata for the project and its dependencies
```

### API

The API project has the following file structure:

```markdown
api/
│ ├── checkout/       # directory containing the file with the payment confirmation
│ ├── migrations/     # directory containing database migration files
│ ├── models/         # directory containing the files for the creation of the models in the DB
│ ├── serializers/    # directory containing the files that serialize the data of all models
│ ├── templates/      # directory containing HTML templates
│ ├── urls/           # directory containing the files for the configuration of urls in the API
│ ├── utils/          # directory containing utilities for different parts of the project
│ ├── views/          # directory containing directories sorted by view 
│ │ ├── auth/         # directory containing all views for authorization implementation
│ │ ├── client/       # directory containing all views for client implementation
│ │ ├── crud/         # directory containing all views for crud implementation
│ │ └── data/         # directory containing all views for user data implementation
│ ├── admin.py        # file to register application models with the Django admin panel
│ └── apps.py         # file used to configure the application
└── requirements.txt  # file containing project dependencies
└── manage.py         # command-line utility for interacting with the Django project
```

## Getting Started

1. Install the dependencies for each project by running `npm install` or `pip install -r requirements.txt` in the root directory of the project.
2. Follow the [Starting the Projects](#starting-the-projects) instructions to start each project.
3. Explore the application and make any desired modifications.```

## Starting the Projects

To start the projects in this repository, you will need to have Node.js and Python installed on your machine. You will also need to install the dependencies for each project by running `npm install` or `pip install -r requirements.txt` in the root directory of the project.

### Frontend

To start the frontend project, navigate to the `frontend` directory and run the following command:

```markdown
> cd frontend
> npm run dev
```

This will start the development server for the frontend project, and you can view the application in your web browser at `http://localhost:3000`.

### Dashboard

To start the dashboard project, navigate to the `dashboard` directory and run the following command:

```markdown
> cd dashboard
> npm run dev
```

This will start the development server for the dashboard project, and you can view the application in your web browser at `http://localhost:3000`.

### API

To start the API project, navigate to the `api` directory and run the following command:

```markdown
> cd api
> python manage.py runserver
```

This will start the development server for the API project, and you can view the API at `http://localhost:8000`.

## Documentation

The frontend and dashboard projects include documentation generated by the [TSDocs](https://tsdocs.org/) tool. You can find the documentation in the `docs` directories of those projects.

The API's documentation can be found in ....

- Documentation for the frontend project: [frontend/docs](frontend/docs)
- Documentation for the dashboard project: [dashboard/docs](dashboard/docs)
- Documentation for the api project: [api/...](api/...)

## Sending Requests to the API

The API in this ecommerce platform is built with Django Rest Framework and provides a RESTful interface for the frontend and dashboard to interact with the ecommerce platform's data. You can send requests to the API using any HTTP client, such as cURL or a browser extension like Postman.

To send a request to the API, you will need to specify the following information:

- The HTTP method (e.g. `GET`, `POST`, `PUT`, `DELETE`)
- The endpoint (e.g. `/api/products`, `/api/orders`)
- Any necessary request parameters or body data
- An `Authorization` header with a valid JWT token, if the endpoint requires authentication

Here is an example of a `GET` request to retrieve a list of products from the API using cURL:

```markdown
curl -X GET http://localhost:8000/api/products -H 'Authorization: Bearer <your-jwt-token>'
```

This will send a `GET` request to the `/api/products` endpoint, with an `Authorization` header containing a JWT token for authentication. The API will return a list of products in the response.

You can find more information on the available endpoints and request parameters in the [API's documentation](#documentation).
