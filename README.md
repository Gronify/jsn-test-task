# Superhero Test

This repository contains a fullstack **Superhero** application. The backend is built with **NestJS** and **PostgreSQL** is used as the database. Docker is used for the database and Adminer.  

This project uses **Feature-Sliced Design (FSD)** - an architectural methodology for scaffolding front-end applications.


---

## Setup

### 1. Start PostgreSQL and Adminer

You need a PostgreSQL database for the backend. You have two options:

**Option 1: Start via Docker (recommended)** 
From the root directory:

```
docker-compose up -d
```

- PostgreSQL: localhost:5432
- Adminer: localhost:8080
- Credentials: user=`root`, password=`secret`, database=`superhero`

**Option 2: Use your existing PostgreSQL instance**  
Make sure you have a database named `superhero` and that credentials match the `.env` file:

### 2. Backend


1. Go to backend folder:
```bash
cd backend
```

2. Copy .env file from example:
```bash
cp example.env .env
```

3. Install dependencies:
```bash
npm install
```

4. Run database migrations:
```bash
npm run migration:run
```

5. Start backend in development mode:
```bash
npm run start:dev
```

Backend will run on: http://localhost:3001

### 3. Frontend

1. Go to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on: http://localhost:3000


### Running Backend Tests

The backend comes with unit tests written using **Jest**. To run them, follow these steps:

1. Go to the backend folder:
```bash
cd backend
```

2. Run all unit tests:
```bash
npm run test
```

### API

Backend exposes REST API at:
http://localhost:3001/api/v1/superheroes

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/superheroes?page=1&limit=5` | List superheroes with pagination |
| `POST` | `/superheroes` | Create a new superhero. Accepts `multipart/form-data` including images. |
| `PATCH` | `/superheroes/:id` | Edit an existing superhero by ID. Accepts `multipart/form-data`, including `removeImages` array for deleting old images. |
| `DELETE` | `/superheroes/:id` | Delete a superhero by ID |

### Notes

- `superpowers` should be sent as multiple values in `multipart/form-data`.
- Image files should be uploaded as part of the `images` field.
- To remove existing images during edit, include their IDs in the `removeImages` array.

#### Functional Requirements

- [x] Create a superhero
- [x] Edit a superhero
- [x] Remove a superhero
- [x] Assign images when creating or editing a superhero
- [x] Remove images when editing a superhero
- [x] List all superheroes with pagination (5 items per page). Show only one image per superhero in the list
- [x] View details of a particular superhero with all information and images
- [x] Have unit test of superheroes service backend

---

## Screenshots

1. **Superhero catalog**  
![Catalog](https://github.com/Gronify/jsn-test-task/blob/master/assets/Screenshot_1.jpg?raw=true)

2. **Create superhero form**  
![Create](https://github.com/Gronify/jsn-test-task/blob/master/assets/Screenshot_2.jpg?raw=true)

3. **Update superhero form**  
![Update](https://github.com/Gronify/jsn-test-task/blob/master/assets/Screenshot_3.jpg?raw=true)

4. **Update superhero with added image**  
![Update with image](https://github.com/Gronify/jsn-test-task/blob/master/assets/Screenshot_4.jpg?raw=true)

---