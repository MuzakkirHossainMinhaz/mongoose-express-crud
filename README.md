# mongoose-express-crud-mastery

This repository houses a robust Mongoose and Express API designed for user and order management. The API offers essential CRUD operations for users and includes additional features for order management, making it a versatile solution for developers building applications that require user and order handling.

## Features

- **User Management:**
  - Create a new user
  - Retrieve a list of all users
  - Retrieve a specific user by ID
  - Update user information
  - Delete a user

- **Order Management (Bonus Section):**
  - Add a new product to an existing order or create a new order
  - Retrieve all orders for a specific user
  - Calculate the total price of orders for a specific user

## Getting Started

To use this API in your project, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/MuzakkirHossainMinhaz/mongoose-express-crud.git
   ```

2. **Install Dependencies:**
   ```bash
   cd mongoose-express-crud
   npm install
   ```

3. **Configure Database:**
   - Create a MongoDB database.
   - Update the `.env` file with your MongoDB connection details.

4. **Setup `.env`**
   - Define `PORT`
   - Define `DATABASE_URL`
   - Define `BCRYPT_SALT`

4. **Run the Server:**
   ```bash
   npm start
   ```

5. **API Endpoints:**
   - User Management:
     - `POST /api/users` - Create a new user
     - `GET /api/users` - Retrieve a list of all users
     - `GET /api/users/:userId` - Retrieve a specific user by ID
     - `PUT /api/users/:userId` - Update user information
     - `DELETE /api/users/:userId` - Delete a user

   - Order Management (Bonus):
     - `PUT /api/users/:userId/orders` - Add a new product to an order or create a new order
     - `GET /api/users/:userId/orders` - Retrieve all orders for a specific user
     - `GET /api/users/:userId/orders/total-price` - Calculate the total price of orders for a specific user

Feel free to contribute by submitting issues or pull requests. Your contributions are valuable, and we encourage you to help make this API even more powerful and user-friendly.

## License

This project is licensed under the [MIT License](LICENSE).
