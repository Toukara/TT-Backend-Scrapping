# Table Tennis Hub Backend (TTBackend)

This is a simple backend for the [Lorem Ipsum](https://github.com/Toukara/TTScraping-front) project. (This project is still in development)

## Getting Started

### Prerequisites

Be sure to have the following installed on your system:

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/) (or a MySQL server)
- [Yarn](https://yarnpkg.com/en/) (optional - if you prefer to use NPM, you can skip this step and use NPM instead of Yarn)

### Installation

1. Clone the repository

```bash
git clone https://github.com/Toukara/TTBackend
```

2. Install dependencies

```bash
yarn install
```

3. Create a `.env` file in the root directory of the project and fill it with the following information:

```bash

# Database
DB_HOST = # Host Database
DB_PORT = # Port Database
DB_DATABASE = # Database Name
DB_USERNAME = # Database Username
DB_PASSWORD = # Database Password

```

### Usage

1. Start the server

```bash
yarn start
```

2. Go to [http://localhost:1000](http://localhost:1000) to see the API documentation

## Built With

![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white) The web framework used\
![Sequelize](https://img.shields.io/badge/sequelize-000000?style=for-the-badge&logo=sequelize&logoColor=white) The ORM used\
![MySQL](https://img.shields.io/badge/mysql-000000?style=for-the-badge&logo=mysql&logoColor=white) The database used
