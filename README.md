<img src="images/logo_readme_hor.png" width="140" />

<p align="center">
  <img src="images/screens_readme.png" width="1000" />
</p>

# Share More, Own Less - Welcome to the Future of Lending!
We're revolutionizing the way you use and share everyday items, making ownership an option, not a necessity.


Welcome to our platform, where lending and borrowing items is as easy as a few taps on your screen. We've built a community where users can leverage what they have and access what they need, all while earning credits and saving money.
Add an item, set a lending value in credits, and earn a bonus for contributing to our platform. Discover and reserve items you need, chat with owners, and arrange pick-ups. Confirm receipt of an item to trigger credit transfer, then return it when you're done. With each completed lending cycle, you're not just done with an item, you're opening up new possibilities for someone else.
Join us, and let's transform the way we consume and share. After all, why buy when you can borrow?

**1.** **Add an Item:**
   Click a photo or upload an image of the item you want to lend. Give it a lending value in credits. As a thank you for adding a new item, we'll top up your account with 100 credits!

**2.** **Discover and Reserve:**
   Explore items on our discover page or use the search bar to find something specific. Once you've found something you need, reserve it. You'll be directed to a chat with the owner to arrange the pickup.

**3.** **Receive and Transfer:**
   Meet the owner, get your item, and confirm receipt in the app. This will trigger the transfer of the agreed credits to the owner's account.

**4.** **Return and Wrap Up:**
   When it's time to return the item, chat with the owner to arrange the meetup. Once the item is back with the owner and they confirm it in the app, the lending cycle concludes, and the item becomes available for lending again.

Remember, our platform thrives on trust and community. Please respect the items and the people you interact with. Happy sharing!

## Screenshots

<p align="center">
  <img src="images/screenshot-readme-1-a.png" />
  <img src="images/screenshot-readme-1-b.png" />
</p>

## Installation

1. Clone this repo and enter!

   ```bash
   git clone https://github.com/kevin-kowalski/lendify.git
   ```

2. Install dependencies.

   ```bash
   cd client  # ! Change into the client folder !
   npm install
   cd ./server  # ! Change into the server folder !
   npm install
   ```

## Getting started

Except for the regular suspects; git, Node, npm, you need nothing else to work on Lendify.

1. Create a .env file in the server folder with the following variables and populate with your local values:
    ```bash
    PORT =
    DB_URL = mongodb+srv://public:kfk17FfOW2QjFzY7@lentdb.scvc9hr.mongodb.net/?retryWrites=true&w=majority
    GEO_API_KEY = (your own api key from Google Maps Geocoding API)
    JWT_SECRET =
    ```

2. Run the application.

   ```bash
   npm run start # ! Run the backend server !
   cd ./client  # ! Change into the client folder and run the frontend server !
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
