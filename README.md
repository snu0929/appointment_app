# Appointment App

This is a web application that allows users to book appointments for available slots. The application is built using React for the frontend and Node.js with Express and MongoDB for the backend. The frontend and backend are deployed separately, and the system follows a simple booking logic where users can select a time slot and book it.

## Features

- **User Registration:** Users can enter their unique ID to begin booking appointments.
- **Available Slots:** Displays available time slots for the selected date.
- **Slot Booking:** Allows users to book slots. Past slots are disabled, and only available future slots can be selected.
- **CORS Support:** The backend API has CORS enabled to allow communication between the frontend and backend.

## Tech Stack

- **Frontend:**
  - React
  - Vite (for faster development and bundling)

  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - CORS (for cross-origin requests)

## Routes Used
### Backend (Node.js + Firebase Cloud Functions)
GET /api/slots?date=YYYY-MM-DD
Purpose: Fetch available 30-minute slots for the given date.

Input: Date in YYYY-MM-DD format.
Output: List of available slots for the selected date.
POST /api/bookSlot
Purpose: Book a slot for a user.

Input: Date, Slot, and User ID.
Output: Success or failure message.

- **Deployment:**
  - **Frontend:** Deployed on [Vercel](https://appointment-app-cncx.vercel.app/)
  - **Backend:** Deployed on [Render](https://appointment-app-imai.onrender.com/)

## Setup

### 1. Clone the repository
To run the project locally, first clone the repository:

```bash
git clone https://github.com/your-username/appointment_app.git
cd appointment_app
```
2. Frontend (React App)
Navigate to the frontend folder and install dependencies:
```
cd frontend
yarn add
```
Start the frontend development server:
```
Copy code
yarn run dev
```
The frontend will be available at http://localhost:5173.

4. Backend (Node.js Server)
Navigate to the backend folder and install dependencies:
```
cd backend
npm install
```
Start the backend server:
```
Copy code
npm start
```
The backend will be available at http://localhost:4500.

## SCREENSHOT

![image](https://github.com/user-attachments/assets/3ce5e3e8-8e22-4174-b242-e037d7b6d6fd) ![image](https://github.com/user-attachments/assets/87200c3c-dfe4-4add-ba30-e28fa96d01dc)
![image](https://github.com/user-attachments/assets/62e5cc86-2e3a-4f96-9fe6-7a087a8b1056)




### How to Use
User Registration: Enter your unique user ID on the landing page to begin booking slots.
Select Date: Choose a date to view available time slots.
Book Slot: Select an available time slot to book the appointment. Slots that have already passed are disabled.

### Future Enhancements
Add email notifications after booking a slot.
Allow users to cancel or reschedule appointments.
Add a user dashboard to view booked slots.
License
This project is licensed under the MIT License - see the LICENSE file for details.


### Explanation of Sections:

1. **Title & Introduction:** Briefly describes the application and what it does.
2. **Features:** Lists out the major features of your application.
3. **Tech Stack:** Lists the technologies and tools used in the project.
4. **Setup Instructions:** Explains how to clone and run both the frontend and backend of the project locally.
5. **How to Use:** A simple guide on how to use the application once it's set up.
6. **CORS Issue:** Gives some insight into how to solve CORS issues if they arise during development.
7. **Future Enhancements:** Lists potential improvements for the project.
8. **License:** Specifies the license for the project.

You can copy and paste this into your `README.md` file, and feel free to adjust or add more specific details based on your project.
