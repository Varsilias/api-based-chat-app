## Setup

### Server Setup

- clone this repository and type the command ```cd laravel-test``` to enter the server directory
- Copy the contents of the `.env.example` file over to the `.env` file which you will create
- Run `composer install` to install all the server dependecies
- Update the newly create `.env` file with your database credentials as well as your `pusher` credentials
- Run `php artisan server` to startup the local development server

### Client Setup

- clone this repository and type the command ```cd react-test``` to enter the client directory
- Run `npm install` or `yarn install` or `yarn` to iinstall all the required dependecies
- Run `npm run dev` or `yarn dev` to start up the local development server
