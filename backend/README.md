# DocScript Backend

A Node.js/Express backend API for the DocScript doctor prescription SaaS application.

## Installation

```bash
cd backend
npm install
```

## Configuration

Create a `.env` file in the backend folder with the following variables:

```
PORT=5000
NODE_ENV=development
API_BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000` (or the PORT specified in `.env`)

## API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get single patient by ID
- `POST /api/patients` - Create new prescription/patient
- `PUT /api/patients/:id` - Update prescription/patient
- `DELETE /api/patients/:id` - Delete patient record
- `GET /api/patients/search/:query` - Search patients by name or mobile

### Clinic Configuration
- `GET /api/config` - Get clinic configuration
- `PUT /api/config` - Update clinic configuration

### Statistics
- `GET /api/stats` - Get dashboard statistics

## Request/Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Data Models

### Patient
```javascript
{
  id: string,
  name: string,
  age: string,
  sex: string,
  mobile: string,
  date: string (YYYY-MM-DD),
  complaints: string,
  diseases: {
    hypertension: boolean,
    diabetesMellitus: boolean,
    hepatitisB: boolean,
    hepatitisC: boolean
  },
  advice: string,
  treatment: string,
  createdAt: string (ISO 8601),
  updatedAt: string (ISO 8601)
}
```

### Clinic Config
```javascript
{
  drNameEn: string,
  drDegreesEn: string,
  drNameUr: string,
  drDegreesUr: string,
  clinicName: string,
  clinicAddress: string,
  clinicContact: string,
  logo: string | null (base64 URL)
}
```

## Notes

- Currently uses in-memory storage. For production, integrate with a database like PostgreSQL or MongoDB.
- All timestamps are in ISO 8601 format.
- CORS is enabled for frontend development.
- Validation is performed on required fields (patient name, mobile, date).
