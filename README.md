<!-- PROJECT -->
<br />
<div align="center">
<h3 align="center">Workshop Locator API - Node | Express</h3>

  <p align="center">
    This is the repository for the "Workshop CRUD and locator" API, a backend service built with Node, Express and MongoDB.
  </p>
</div>
<!-- ABOUT THE PROJECT -->
The Workshop Locator API is a backend service built with Node and Express, which can be run locally or via Docker. A complete CRUD system has been created for the workshop resouce, including an locator endpoint to find nearby workshops using geolocation.
<br />

<!-- TECHNOLOGIES USED -->
## Technologies Used

* Node
* Express
* MongoDB
* Mongoose
* Jest
* Zod
* Postman

<!-- GETTING STARTED -->

The API can be run locally or using Docker. If you're running locally, you'll need a MongoDB connection string. This step can be skipped if using Docker, as it will create three containers: a MongoDB container, a testing container to run all unit tests, and finally, the container running the API.


### Installation

#### Running with Docker

1. Clone the repository
   ```sh
   git clone git@github.com:amandapccs/content-manager.git
   ```
2. Run the command:
   ```sh
   docker compose up
   ```
3. The application will be running at `http://localhost:3000/`

#### Running locally

1. Clone the repository
   ```sh
   git clone git@github.com:amandapccs/content-manager.git
   ```
2. Create a `.env` file in the root of the repository with the "MONGO" variable using your MongoDB connection string.
3. Install dependencies with the command:
   ```sh
   npm install
   ```
4. Start the application
   ```sh
   npm run dev
   ```
5. The application will be running at `http://localhost:3000/`

## Endpoints

| Method | Endpoint          | Description                                                                                   |
|--------|--------------------|-----------------------------------------------------------------------------------------------|
| GET    | /api/workshops/near       | Access workshops near a reference, by providing the latitude, longitude and radius via queryString                                |
| GET    | /api/workshops       | Access all workshops avaiable                              |
| POST   | /api/workshops             | Creates a workshop with the following properties: id, name, address, location (latitude, longitude) and createdAt |
| PUT    | /api/workshops/:id         | Edits workshop                                                                                   |
| GET    | /api/workshops/:id         | Access a workshop by using a valid id                                                                                |
| DELETE | /api/workshops/:id         | Delete a workshop                                                                           |


<!-- CONTACT -->
## Contact

Amanda Soares - amandchen@hotmail.com - <a href="https://www.linkedin.com/in/amandapccs/">LinkedIn</a>