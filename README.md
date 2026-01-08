# Notes Application - Full Stack Next.js with MongoDB

A complete full-stack notes application built with Next.js 13, MongoDB, NextAuth.js, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration system
- **Create Notes**: Add new notes with title, content, and categories
- **View Notes**: Display all your notes in an organized grid layout
- **Edit Notes**: Update existing notes
- **Delete Notes**: Remove unwanted notes
- **Categories**: Organize notes with custom categories/groups
- **Timestamps**: Automatic creation and update timestamps
- **User-specific**: Each user only sees their own notes
- **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

- **Frontend**: Next.js 13, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

## Installation

1. **Clone the repository** (or you already have the files)

2. **Install dependencies**:
```bash
npm install
```

3. **Install additional required packages**:
```bash
npm install mongoose next-auth bcryptjs
npm install --save-dev @types/bcryptjs
```

4. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Update the values:

```env
MONGODB_URI=mongodb://localhost:27017/notes-app
# For MongoDB Atlas, use: mongodb+srv://<username>:<password>@cluster.mongodb.net/notes-app

NEXTAUTH_SECRET=generate-a-random-secret-here
# Generate with: openssl rand -base64 32

NEXTAUTH_URL=http://localhost:3000
# In production, set to your domain
```

## Database Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB:
   - **Windows**: MongoDB starts automatically as a service
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
3. The app will automatically create the database and collections

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI` in `.env.local`

## Running the Application

1. **Development mode**:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)

3. **Build for production**:
```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth configuration
│   │   ├── notes/                   # Notes CRUD endpoints
│   │   └── register/                # User registration
│   ├── dashboard/                   # Main notes dashboard
│   ├── login/                       # Login page
│   ├── register/                    # Registration page
│   └── layout.tsx                   # Root layout
├── components/
│   ├── notes/
│   │   ├── NoteCard.tsx            # Individual note card
│   │   ├── NoteModal.tsx           # Create/Edit modal
│   │   └── NotesList.tsx           # Notes grid layout
│   └── auth/
│       └── AuthProvider.tsx         # Session provider
├── lib/
│   ├── mongodb.ts                   # MongoDB connection
│   └── models/
│       ├── User.ts                  # User model
│       └── Note.ts                  # Note model
└── types/
    └── note.ts                      # TypeScript types
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Note Model
```javascript
{
  title: String (required),
  content: String (required),
  category: String (optional),
  userId: ObjectId (required, ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout

### Notes
- `GET /api/notes` - Get all notes for logged-in user
- `POST /api/notes` - Create new note
- `PUT /api/notes` - Update existing note
- `DELETE /api/notes` - Delete note

## Usage

1. **Register**: Create a new account on the register page
2. **Login**: Sign in with your credentials
3. **Create Note**: Click "New Note" button
4. **Edit Note**: Click the edit icon on any note
5. **Delete Note**: Click the trash icon on any note
6. **Filter by Category**: Use category badges to filter notes

## Default Categories

The app comes with default categories:
- Personal
- Work
- Ideas
- Todo
- Important

You can also create custom categories when creating/editing notes.

## Security Features

- Password hashing with bcryptjs
- JWT-based session management
- Protected API routes
- User-specific data isolation

## Troubleshooting

### MongoDB Connection Issues

If you see connection errors:

1. **Check MongoDB is running**:
```bash
# Mac
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Windows - Check Services app
```

2. **Verify connection string**: Make sure `MONGODB_URI` in `.env.local` is correct

3. **Check firewall**: Ensure MongoDB port (27017) is accessible

### NextAuth Issues

If authentication doesn't work:

1. Verify `NEXTAUTH_SECRET` is set in `.env.local`
2. Clear browser cookies and try again
3. Check that `NEXTAUTH_URL` matches your actual URL

## Customization

### Adding New Categories

Edit the `CATEGORIES` array in `components/notes/NoteModal.tsx`

### Changing Theme Colors

Update Tailwind classes in components or modify `tailwind.config.ts`

### Adding More Fields

1. Update the Note model in `lib/models/Note.ts`
2. Update the TypeScript interface in `types/note.ts`
3. Update the UI components to handle new fields

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Make sure to:
- Set all environment variables
- Use MongoDB Atlas for database
- Set `NEXTAUTH_URL` to your production domain

## License

MIT

## Support

For issues and questions, please open an issue on GitHub or contact the developer.

## Future Enhancements

- Rich text editor for note content
- Note sharing between users
- File attachments
- Search functionality
- Tags system
- Dark mode toggle
- Export notes as PDF/Markdown
- Trash/Archive feature
- Note templates
