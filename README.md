# Quiz Qrafter

### Requirement(s)
- [Node.js](https://nodejs.org/) with `npm`
- [Docker](https://www.docker.com/)

### Development Setup
```bash
# Initialize environment variable file
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Start postgres and redis containers
docker compose up -d

# Start application(s)
npm install
npm run dev -- --ui=tui

# ClEAN UP
# docker compose down
```
