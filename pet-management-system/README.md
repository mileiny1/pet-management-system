# Pet Management System

A comprehensive web application for pet owners to manage their pets' information, food logs, vet visits, appointments, and medications.

## Features

- **User Authentication**: Register and login to access your pet data
- **Pet Management**: Add, edit, and delete pets with details and photos
- **Food Logging**: Track your pet's feeding schedule and diet
- **Vet Visit Records**: Document vet visits and treatments
- **Appointment Scheduling**: Manage upcoming appointments for your pets
- **Medication Tracking**: Keep track of medications, dosages, and schedules

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **View Engine**: EJS
- **Authentication**: bcryptjs, express-session
- **File Upload**: Multer
- **Styling**: Bootstrap 5, Font Awesome

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/pet-management-system.git
   cd pet-management-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/pet-management
   SESSION_SECRET=your_secret_key
   ```

4. Create an uploads directory:
   ```
   mkdir -p public/uploads
   ```

5. Start the application:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

The application follows the MVC (Model-View-Controller) architecture:

- `models/`: MongoDB schemas 
- `views/`: EJS templates
- `controllers/`: Route handlers
- `routes/`: Express routes
- `middleware/`: Custom middleware
- `public/`: Static assets
- `config/`: Configuration files

## Data Models

The system uses the following data models:

- **User**: User authentication and profile information
- **Pet**: Core pet information including species, breed, weight
- **Food Log**: Records of pet feeding times and portions
- **Vet Visit**: Documentation of veterinary visits and treatments
- **Appointment**: Scheduled appointments for pets
- **Medication**: Medicine prescriptions and schedules

## License

MIT