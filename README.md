🍅 Tomato Food - MERN Stack Application
Tomato Food is a food ordering platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application provides user authentication via JWT and integrates with Stripe for seamless payment processing.

🌟 Features
User Authentication: Secure user authentication using JWT.
Role-based Access Control: Users and admins have different access rights.
Food Ordering: Browse through the restaurant's menu, select food items, and place orders.
Cart Management: Add and remove items from the cart with quantity adjustments.
Payment Integration: Secure payments handled by Stripe API.
Order Tracking: Users can track the status of their orders in real-time.
Admin Portal: Admins can manage restaurants, menus, and order statuses.
🛠️ Tech Stack
Frontend: React.js, Tailwind CSS (for styling)
Backend: Node.js, Express.js
Database: MongoDB (NoSQL)
Authentication: JWT (JSON Web Token)
Payment Integration: Stripe API
Other Tools: Axios, Mongoose, dotenv, cookie-parser
🚀 Setup and Installation
Prerequisites
Make sure you have the following installed on your system:

Node.js (v14 or higher)
MongoDB (local or cloud-based like MongoDB Atlas)
Stripe Account (for payment integration)
Clone the Repository
bash
Copy code
git clone https://github.com/<your-username>/tomato-food.git
cd tomato-food
Backend Setup
Navigate to the server directory:
bash
Copy code
cd server
Install the dependencies:
bash
Copy code
npm install
Create a .env file and add your environment variables:
bash
Copy code
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
Start the server:
bash
Copy code
npm run dev
Frontend Setup
Navigate to the client directory:
bash
Copy code
cd client
Install the dependencies:
bash
Copy code
npm install
Start the client application:
bash
Copy code
npm start
Running the Application
After both the frontend and backend are set up, you can access the application on:

arduino
Copy code
http://localhost:3000
API Endpoints
Below are some important backend API endpoints used in the application:

User Authentication:
POST /api/auth/login - Login user.
POST /api/auth/signup - Register a new user.
Menu and Orders:
GET /api/menu - Fetch all menu items.
POST /api/order - Place a new order.
GET /api/order/:userId - Get user orders.
Payment:
POST /api/payment - Create a payment session using Stripe.
🛡️ Security
JWT Authentication: All protected routes are secured using JWT tokens.
CORS: Configured to allow access from specific origins.
Stripe: Secure and trusted payment gateway used for transactions.
📦 Deployment
Frontend
For deployment, build the React app using:

bash
Copy code
npm run build
Then serve the static files via a platform like Vercel, Netlify, or any other static hosting service.

Backend
You can deploy the Node.js server on platforms like Heroku, AWS, DigitalOcean, or any cloud provider. Make sure to:

Set up environment variables on the deployment platform.
Use a production database (MongoDB Atlas, for example).
Ensure secure handling of JWT secrets and Stripe keys.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
