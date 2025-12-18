# Eventor (Mini Event Platform)

A full-stack MERN application for managing events with a robust RSVP system handling capacity and concurrency.

## Features
- **User Authentication**: Secure Login/Register using JWT.
- **Event Management**: Create, Read, Delete events.
- **RSVP System**: Join/Leave events with strict capacity enforcement.
- **Concurrency Handling**: Prevents overbooking using atomic database operations.
- **Responsive UI**: Built with React and Vanilla CSS.

## Running Locally

### Prerequisites
- Node.js (v14+)
- MongoDB (Running locally or Atlas URI)

### Steps

1.  **Clone the repository**
    ```bash
    git clone <repo-url>
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env file with:
    # MONGO_URI=your_mongo_uri
    # JWT_SECRET=your_secret
    # PORT=5000
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access App**
    Open `http://localhost:5173` (or port shown in terminal).

## Technical Explanation: RSVP Concurrency

To handle race conditions where multiple users try to RSVP for the last spot simultaneously, we utilize MongoDB's **Atomic Updates** with query conditions.

### The Strategy
Instead of fetching the event, checking capacity in application memory, and then saving (which is prone to race conditions), we use `findOneAndUpdate` with a specific condition.


### Why it works
- **Atomicity**: MongoDB operations on a single document are atomic.
- **Condition**: The `$expr` condition ensures the update *only* happens if the capacity constraint is met at the exact moment of execution.
- **Result**: If the condition fails (event is full), `event` is `null`, and we return an error to the user, ensuring no overbooking ever occurs.

## Tech Stack
- **Frontend**: React, Vite, Vanilla CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT, bcryptjs.
