# NéoDétect Deployment Configuration

## Live URLs

### Frontend
- **URL**: https://neodetect-frontend.onrender.com
- **Service**: Render Static Site

### Backend API
- **URL**: https://neodetect-2.onrender.com
- **API Base**: https://neodetect-2.onrender.com/api
- **Service**: Render Web Service

## Configuration Files Updated

### Frontend Configuration
- `frontend/src/services/api.js` - API base URL
- `frontend/src/pages/Analyze.jsx` - Direct fetch URL

### Backend Configuration
- `backend/server.js` - CORS configuration for frontend domain

## Development Commands

```bash
# Install all dependencies
npm run install-all

# Run both frontend and backend locally
npm run dev
```

## API Endpoints

- `GET /` - Health check
- `POST /api/analyze` - Text analysis
- `GET /api/words` - Word management
- `GET /api/dictionary` - Dictionary operations