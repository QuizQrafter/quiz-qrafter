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

#### 3. Install dependencies

```sh
$ npm install
```

#### 4. Run application

```sh
$ npx prisma migrate dev
$ npm run dev
```
