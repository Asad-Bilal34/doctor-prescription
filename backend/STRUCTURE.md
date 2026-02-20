# Backend API Structure

## Folder Organization

```
backend/
├── index.js           # Main server file with all routes
├── package.json       # Project dependencies
├── .env               # Environment variables
├── .env.example       # Example environment variables
└── README.md          # API documentation
```

## Future Expansion (Optional)

When ready to scale, you can restructure as:

```
backend/
├── config/            # Configuration files
├── routes/            # API route handlers
├── models/            # Database models
├── controllers/       # Business logic
├── middleware/        # Custom middleware
├── utils/             # Utility functions
├── index.js           # Main server file
├── package.json
├── .env
└── README.md
```

## Current Implementation

The backend is a simple Express.js server with:
- RESTful API endpoints
- CORS enabled for frontend development
- In-memory data storage
- Basic validation
- Error handling

## Integration with Frontend

The frontend TypeScript/React application can integrate with this backend by:

1. Adding API service functions in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5000/api';

export const patientsAPI = {
  getAll: () => fetch(`${API_BASE_URL}/patients`).then(r => r.json()),
  getById: (id: string) => fetch(`${API_BASE_URL}/patients/${id}`).then(r => r.json()),
  create: (data) => fetch(`${API_BASE_URL}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  update: (id, data) => fetch(`${API_BASE_URL}/patients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  delete: (id: string) => fetch(`${API_BASE_URL}/patients/${id}`, {
    method: 'DELETE'
  }).then(r => r.json())
};
```

2. Update state management in React components to use these API functions

3. Run both frontend and backend during development:
   - Frontend: `npm run dev` (on port 5173)
   - Backend: `npm run dev` (on port 5000)
