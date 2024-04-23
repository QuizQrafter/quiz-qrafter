# backend

## Getting Started

### Prerequisite(s)

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Run

#### 1. Set environment variables

Copy the contents of the `.env.example` file to a new `.env` file

#### 2. Start Database (Docker Desktop)

Ensure Docker Desktop is installed, or download it from [here](https://www.docker.com/products/docker-desktop/).

Open a new terminal session and run the following command:

```sh
$ docker run --rm --name qqdb --env=POSTGRES_USER=myusername --env=POSTGRES_PASSWORD=mypassword --env=POSTGRES_DB=mydb -p 5432:5432 postgres:15-alpine
```

> [!NOTE]
>
> `Ctrl+C` in this terminal to stop the database process

#### 3. Start MD2PDF Service (Docker Desktop)

See `md2pdf/README.md`

#### 4. (Optional) Start Redis Server (Docker Desktop)

1. Open a new terminal session and run the following command:

```
$ docker run --rm --name qqredis -d -p 6379:6379 redis:7.0-alpine
```

2. Set the `REDIS_URL` variable in `.env` to `redis://localhost:6379`


This will start up a redis server in Docker and will be used as a session storage for tracking user login sessions.
This step is optional during development because the server will use an in-memory storage by default.

#### 5. Install dependencies

```sh
$ npm install
```

#### 6. Run application

```sh
$ npx prisma migrate dev
$ npm run dev
```
