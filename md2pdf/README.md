# md2pdf

## Getting Started

### Prerequisite(s)

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Run

#### 1. Set environment variables

Copy the contents of the `.env.example` file to a new `.env` file

#### 2. Start Service (Docker Desktop)

Ensure Docker Desktop is installed, or download it from [here](https://www.docker.com/products/docker-desktop/).

Open a new terminal session and run the following command:

```sh
$ docker build -t md2pdf:1.0 .
$ docker run --rm -it --name qqconverter -p 8081:8080 md2pdf:1.0
```

> [!NOTE]
>
> `Ctrl+C` in this terminal to stop the service
