# Application Architecture

## Overview

This is a full-stack notes application with a clear separation between frontend and backend, connected via REST API.

```
┌─────────────────┐         ┌─────────────────┐         ┌──────────────┐
│  React Frontend │ ◄─────► │  NestJS Backend │ ◄─────► │   MongoDB    │
│  (Port 5173)    │   HTTP  │   (Port 3001)   │  CRUD   │  Database    │
└─────────────────┘         └─────────────────┘         └──────────────┘
```

## Frontend Architecture

### Technology Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Component Structure

```
src/
├── components/
│   ├── Login.tsx              # Login form
│   ├── Register.tsx           # Registration form
│   ├── Dashboard.tsx          # Main app container
│   ├── NoteCard.tsx           # Individual note display
│   ├── NoteModal.tsx          # Create/edit note modal
│   └── CategoryModal.tsx      # Create/edit category modal
├── contexts/
│   └── AuthContext.tsx        # Global auth state management
├── App.tsx                    # Root component with routing logic
└── main.tsx                   # Entry point
```

### State Management

**Authentication State (Context API):**
- User information
- JWT token
- Login/logout functions
- Stored in localStorage for persistence

**Component State (useState):**
- Notes list
- Categories list
- Modal states
- Form inputs
- Filters and search

### Data Flow

1. **Authentication Flow:**
   ```
   User Input → Login/Register Component → API Call →
   AuthContext Update → localStorage → App Re-render
   ```

2. **Notes CRUD Flow:**
   ```
   User Action → Dashboard Component → API Call with JWT →
   Database Update → Fetch Updated Data → UI Re-render
   ```

## Backend Architecture

### Technology Stack
- **NestJS** framework (opinionated, modular)
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Passport** for auth middleware
- **bcrypt** for password hashing

### Module Structure

```
backend/src/
├── auth/
│   ├── auth.module.ts         # Auth module configuration
│   ├── auth.service.ts        # Login/register logic
│   ├── auth.controller.ts     # Auth endpoints
│   ├── jwt.strategy.ts        # JWT validation
│   ├── jwt-auth.guard.ts      # Protected route guard
│   └── dto/                   # Data transfer objects
├── notes/
│   ├── notes.module.ts        # Notes module
│   ├── notes.service.ts       # Notes business logic
│   ├── notes.controller.ts    # Notes endpoints
│   └── dto/                   # DTOs for notes
├── categories/
│   ├── categories.module.ts   # Categories module
│   ├── categories.service.ts  # Categories logic
│   ├── categories.controller.ts
│   └── dto/                   # DTOs for categories
├── schemas/
│   ├── user.schema.ts         # User MongoDB schema
│   ├── note.schema.ts         # Note MongoDB schema
│   └── category.schema.ts     # Category MongoDB schema
├── app.module.ts              # Root module
└── main.ts                    # Application entry point
```

### Request Flow

1. **Unauthenticated Request (Login/Register):**
   ```
   Client → Controller → Service → MongoDB →
   Hash Password → Create JWT → Response
   ```

2. **Authenticated Request:**
   ```
   Client (with JWT) → JWT Guard → JWT Strategy →
   Validate Token → Extract User → Controller →
   Service → MongoDB → Response
   ```

### Security

**Authentication:**
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Tokens sent in Authorization header

**Authorization:**
- All note/category endpoints require authentication
- User can only access their own data
- MongoDB queries filter by `userId`

**Data Validation:**
- DTOs with class-validator decorators
- Email format validation
- Minimum password length (6 characters)
- Required fields enforcement

## Database Schema

### Collections

**users:**
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password: String (hashed),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

**notes:**
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  userId: ObjectId (ref: User, indexed),
  categoryId: ObjectId (ref: Category, optional),
  createdAt: Date,
  updatedAt: Date
}
```

**categories:**
```javascript
{
  _id: ObjectId,
  name: String,
  color: String (hex color),
  userId: ObjectId (ref: User, indexed),
  createdAt: Date,
  updatedAt: Date
}
```

### Relationships

- **User → Notes**: One-to-many (one user has many notes)
- **User → Categories**: One-to-many (one user has many categories)
- **Category → Notes**: One-to-many (one category can be assigned to many notes)

### Indexes

- `users.email`: Unique index for fast lookup and constraint
- `notes.userId`: Index for fast filtering by user
- `categories.userId`: Index for fast filtering by user

## API Communication

### REST Endpoints

**Authentication:**
- `POST /auth/register` - Create new user
- `POST /auth/login` - Authenticate user
- `GET /auth/me` - Get current user

**Notes:**
- `GET /notes` - List user's notes
- `GET /notes/:id` - Get specific note
- `POST /notes` - Create note
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

**Categories:**
- `GET /categories` - List user's categories
- `GET /categories/:id` - Get specific category
- `POST /categories` - Create category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Request/Response Format

**Authentication Request:**
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Authentication Response:**
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Protected Request:**
```
GET /notes
Authorization: Bearer eyJhbGc...
```

**Error Response:**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Invalid credentials"
}
```

## Development Workflow

### Frontend Development
1. Edit components in `src/`
2. Vite hot-reloads changes instantly
3. Components communicate with backend via fetch API
4. React DevTools for debugging

### Backend Development
1. Edit modules in `backend/src/`
2. NestJS watches for changes and recompiles
3. API automatically restarts
4. Use Postman/Insomnia for API testing

### Full Stack Development
1. Run backend: `npm run backend` (Terminal 1)
2. Run frontend: `npm run dev` (Terminal 2)
3. Frontend proxies API calls to port 3001
4. Both hot-reload on file changes

## Deployment Considerations

### Frontend
- Build with `npm run build`
- Serve `dist/` folder with any static host
- Update API URL for production

### Backend
- Build with `npm run build` in backend/
- Run with `npm run start:prod`
- Set production environment variables
- Use production MongoDB instance

### Environment Variables

**Development:**
- MongoDB: localhost
- JWT secret: development key
- CORS: localhost:5173

**Production:**
- MongoDB: Cloud instance (Atlas)
- JWT secret: Strong random key
- CORS: Production domain
- HTTPS enforced

## Performance Considerations

### Frontend
- Lazy loading for modals
- Debounced search input
- Optimistic UI updates
- Local state before API calls

### Backend
- Database indexes on foreign keys
- Connection pooling
- Pagination for large datasets (not implemented yet)
- Caching for category lists (future enhancement)

### Database
- Proper indexes
- Lean queries (select only needed fields)
- Connection pooling via Mongoose
- Regular backups

## Future Architecture Improvements

1. **Microservices**: Split auth, notes, categories into separate services
2. **Caching**: Redis for frequently accessed data
3. **Real-time**: WebSocket for collaborative editing
4. **File Storage**: S3 for note attachments
5. **Search**: Elasticsearch for full-text search
6. **Queue**: Bull for background jobs (exports, emails)
7. **API Gateway**: Kong or NGINX for routing and rate limiting
