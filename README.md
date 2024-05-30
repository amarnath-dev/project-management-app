## Run this locally in your system:

1. Clone the repository:
   ```bash
   git clone https://github.com/amarnath-dev/project-management-app.git
2. Navigate to the project directory:
    ```bash
   cd project-management-app
3. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd server
    npm install
4. Set up environment variables:
   - Create a .env file in the server directory and add necessary environment variables.
   - Example:
     ```makefile

     ## server-env
    PORT = 8000
    DB_URI = <mongo-URI> 
    JWT_SECRETE = <jwt-secrete-key>
    

  1. Start the development server:
     ```bash
     cd frontend
     npm start
     cd ..
     cd server
     npm run dev
  2. Access application in your browser at [http://localhost:3000/](http://localhost:3000/).

## Technologies Used:
- React.js
- Node.js
- Express
- MongoDB
- Bootstrap