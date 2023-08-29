<img src="images/logo_readme_hor.png" width="140" />

<p align="center">
  <img src="images/screens_readme_large.png" width="960" />
</p>

# Share More, Own Less - Welcome to the Future of Lending!

Lendify is a community marketplace platform with a focus on lending where users can leverage what they have and access what they need while earning credits and saving money. We strive to revolutionize the way people use and share everyday items, making ownership an option, not a necessity.

## Installation

1. Clone this repo and enter!

   ```bash
   git clone https://github.com/kevin-kowalski/lendify.git
   ```

2. Install dependencies.

   ```bash
   cd client  # Change into the client directory
   npm install
   cd ../server  # Change into the server directory
   npm install
   ```

## Getting started

Except for the regular suspects: git, Node, npm, you need nothing else to work on Lendify.

1. Create a .env file in the `/server` directory with the following variables and populate with your local values:
    ```bash
    PORT = (Preferred port)
    DB_URL = (MongoDB connection string)
    GEO_API_KEY = (API key from Google Maps Geocoding API)
    JWT_SECRET = (JWT secret)
    ```

2. Run the application.

   ```bash
   npm run start # Run the backend server
   cd ../client  # Change into the client directory and run the frontend server
   npm start
   ```

## Tech Stack

* [React](https://reactnative.dev/)
* [Koa](https://koajs.com/)
* [Socket.io](https://socket.io/)
* [JWT](https://jwt.io/)
* [Google Maps](https://github.com/googlemaps/google-maps-services-js)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

## Developers

* Adam Griffiths - [GitHub](https://github.com/sumdgy-g) - [LinkedIn](https://www.linkedin.com/in//)
* Magdalena Keller - [GitHub](https://github.com/makekema) - [LinkedIn](https://www.linkedin.com/in//)
* Kevin Kowalski - [GitHub](https://github.com/kevin-kowalski) - [LinkedIn](https://www.linkedin.com/in//)
