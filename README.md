# Full-Stack Notes Application

A complete full-stack web application for managing notes with categories, built with NestJS backend and React frontend.

## Features

- **User Authentication**: Secure JWT-based authentication with login and registration
- **Notes Management**: Create, read, update, and delete notes
- **Categories**: Organize notes into color-coded categories
- **Search**: Search notes by title and content
- **Filter**: Filter notes by category
- **Timestamps**: Automatic tracking of creation and update times
- **Modern UI**: Beautiful, responsive design with Tailwind CSS

## Tech Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Token authentication
- **Passport**: Authentication middleware
- **bcrypt**: Password hashing

### Frontend
- **React**: UI library with TypeScript
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Project Structure

```
project/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── notes/          # Notes CRUD module
│   │   ├── categories/     # Categories module
│   │   ├── schemas/        # MongoDB schemas
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
└── src/                    # React frontend
    ├── components/         # UI components
    ├── contexts/          # React contexts
    ├── App.tsx
    └── main.tsx
```

## Database Schema

### User
- `email`: string (unique)
- `password`: string (hashed)
- `name`: string
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Note
- `title`: string
- `content`: string
- `userId`: reference to User
- `categoryId`: reference to Category (optional)
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Category
- `name`: string
- `color`: string (hex color)
- `userId`: reference to User
- `createdAt`: timestamp
- `updatedAt`: timestamp

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### 1. MongoDB Setup

Make sure MongoDB is installed and running on your system.

**For macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**For Windows:**
Download and install from [MongoDB Official Website](https://www.mongodb.com/try/download/community)

**For Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
```

**IMPORTANT**: Replace `your-super-secret-jwt-key-change-this-in-production` with a strong, random secret key.

5. Start the backend server:
```bash
npm run start:dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

1. Navigate to the project root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (requires authentication)

### Notes
- `GET /notes` - Get all notes for the authenticated user
- `GET /notes/:id` - Get a specific note
- `POST /notes` - Create a new note
- `PATCH /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

### Categories
- `GET /categories` - Get all categories for the authenticated user
- `GET /categories/:id` - Get a specific category
- `POST /categories` - Create a new category
- `PATCH /categories/:id` - Update a category
- `DELETE /categories/:id` - Delete a category

## Usage

### Register a New Account
1. Open `http://localhost:5173` in your browser
2. Click "Sign Up"
3. Enter your name, email, and password (minimum 6 characters)
4. Click "Sign Up" to create your account

### Login
1. Enter your email and password
2. Click "Sign In"

### Create a Category
1. In the sidebar, click the "+" icon next to "Categories"
2. Enter a category name and choose a color
3. Click "Create"

### Create a Note
1. Click the "New Note" button
2. Enter a title and content
3. Optionally select a category
4. Click "Create Note"

### Edit a Note
1. Click the edit icon on any note card
2. Modify the title, content, or category
3. Click "Update Note"

### Delete a Note
1. Click the trash icon on any note card
2. Confirm deletion

### Filter Notes by Category
1. Click on a category in the sidebar to filter notes

### Search Notes
1. Use the search bar to find notes by title or content

## Development

### Backend Development
```bash
cd backend
npm run start:dev
```

### Frontend Development
```bash
npm run dev
```

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
npm run build
npm run preview
```

## MongoDB Connection Troubleshooting

If you can't connect to MongoDB:

1. **Check if MongoDB is running:**
```bash
# macOS
brew services list

# Linux
sudo systemctl status mongod

# Windows
# Check Services app for MongoDB service
```

2. **Verify connection string:**
- Make sure `MONGODB_URI` in `.env` matches your MongoDB setup
- Default: `mongodb://localhost:27017/notes-app`

3. **Test MongoDB connection:**
```bash
# Using mongosh (MongoDB Shell)
mongosh

# Or using mongo (older versions)
mongo
```

4. **Common connection strings:**
- Local: `mongodb://localhost:27017/notes-app`
- Docker: `mongodb://host.docker.internal:27017/notes-app`
- MongoDB Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/notes-app`

## Security Notes

- Passwords are hashed using bcrypt before storage
- JWT tokens are used for authentication
- All note and category endpoints require authentication
- Users can only access their own notes and categories

## Future Enhancements

- Rich text editor for note content
- Note sharing between users
- Export notes to PDF/Markdown
- Dark mode
- Mobile app version
- File attachments
- Note tags in addition to categories
- Collaboration features
