# Anime Streaming Platform

## Overview

This project is a **streaming platform for anime** where you can watch, manage, and publish anime content. It leverages a combination of modern technologies to provide a seamless experience for both users and administrators. 

### Features
- **Watch Anime:** Browse and stream anime directly from the platform.
- **Publish Anime:** Add new anime to the platform with ease.
- **Episode Management:** Add episodes with multiple streaming server options.
- **Dynamic Data Fetching:** Automatically populate anime details using the Jikan API.

---

## Technologies Used

### Backend
- **Node.js**: Core server-side runtime environment.
- **Express.js**: Framework for building server-side APIs.
- **MongoDB**: Database for storing anime and episode information.
- **Mongoose**: ORM for MongoDB.

### Frontend
- **EJS**: Template engine for dynamic rendering.
- **HTML & CSS**: Base structure and styling for the platform.
- **JavaScript**: Client-side interactivity.

### APIs
- **Jikan API**: Fetches anime information dynamically, including details like title, description, and poster.

---

## Installation & Setup

Follow these steps to run the project locally:

1. **Clone the Repository**
   ```bash
   git clone <https://github.com/ZOXXII/anime-streaming-platform.git>
   cd anime-streaming-platform
   ```
2. **Install Dependencies Make sure you have Node.js and npm installed, then run:
   
   
    ```bash
    npm install
    ```
3. **Install Additional Requirements Install Python dependencies (if required) using the provided requirements.txt file:
    

   ```bash
   pip install -r requirements.txt
   ```
4. **Start the Server Run the server using the command:
   
   ```bash
   npm start
   ```
The server will start at http://localhost:3000.

## How to Use

### Adding Anime
1. Open `POST.HTML` in your browser.
2. Fill in the form with the anime name and upload a poster.
3. The anime information will be fetched automatically via the Jikan API.
4. Once submitted, the anime will appear on the homepage.

### Viewing Anime
- All added anime are listed at [http://localhost:3000/animes](http://localhost:3000/animes).
- Click on any anime to view its details and available episodes.

### Adding Episodes
1. Open `POST.HTML` in your browser.
2. Use the **"Add Episode"** form to:
   - Select the anime.
   - Provide episode details (title, duration, etc.).
   - Add streaming server links.
3. Submitted episodes will be associated with the selected anime.

## Future Enhancements
- **Search Functionality**: Allow users to search for anime by genre or name.
- **User Authentication**: Add user accounts for tracking favorite anime and progress.
- **Improved Episode Player**: Enhance the player with more interactive features.
- **Responsive Design**: Optimize the platform for mobile devices.

## Disclaimer
This project was built for educational .i am not responsible for any misuse of the platform. It is not intended for commercial use or public distribution.

have fun :)


  

