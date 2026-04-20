# TODO App - React + Django

This is a complete conversion of the Django TODO app frontend from HTML/CSS to React.js with a Django REST API backend.

## Project Structure

```
myproject/
├── myproject/          # Django project settings
├── base/               # Django app with models and API
│   ├── models.py
│   ├── serializers.py  # DRF serializers (NEW)
│   ├── api_views.py    # DRF viewsets (NEW)
│   ├── api_urls.py     # API routes (NEW)
│   └── ...
├── frontend/           # React frontend (NEW)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Add.js
│   │   │   ├── Complete.js
│   │   │   ├── Trash.js
│   │   │   ├── Update.js
│   │   │   └── About.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── api.js      # API service
│   │   └── .env
│   ├── package.json
│   └── ...
├── requirements.txt    # Python dependencies (UPDATED)
└── manage.py

```

## Setup Instructions

### Backend Setup

1. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

2. **Apply migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

3. **Create a superuser (optional):**
```bash
python manage.py createsuperuser
```

4. **Run Django development server:**
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install Node dependencies:**
```bash
npm install
```

3. **Start React development server:**
```bash
npm start
```

The React app will open at `http://localhost:3000`

## API Endpoints

### Tasks
- `GET /api/tasks/` - Get all active tasks
- `POST /api/tasks/` - Create a new task
- `GET /api/tasks/{id}/` - Get a specific task
- `PUT/PATCH /api/tasks/{id}/` - Update a task
- `DELETE /api/tasks/{id}/` - Delete a task
- `POST /api/tasks/{id}/complete_task/` - Mark task as complete
- `POST /api/tasks/{id}/delete_task/` - Move task to trash
- `POST /api/tasks/complete_all/` - Complete all tasks

### Completed Tasks
- `GET /api/completed/` - Get all completed tasks
- `POST /api/completed/{id}/restore_task/` - Restore to active tasks
- `POST /api/completed/{id}/delete_task/` - Move to trash
- `POST /api/completed/delete_all/` - Delete all completed tasks

### Trash
- `GET /api/trash/` - Get all deleted tasks
- `POST /api/trash/{id}/restore_task/` - Restore to active tasks
- `POST /api/trash/{id}/delete_task/` - Permanently delete
- `POST /api/trash/delete_all/` - Permanently delete all
- `POST /api/trash/restore_all/` - Restore all to active tasks

## Features

✅ **Create Tasks** - Add new tasks with title and description
✅ **View Tasks** - See active, completed, and deleted tasks
✅ **Update Tasks** - Edit existing tasks
✅ **Mark Complete** - Move tasks to completed list
✅ **Delete Tasks** - Move tasks to trash
✅ **Restore Tasks** - Restore from trash or completed
✅ **Bulk Operations** - Complete all, delete all, restore all
✅ **Responsive Design** - Works on desktop, tablet, and mobile

## Technologies Used

### Backend
- Django 6.0.3
- Django REST Framework 3.14.0
- django-cors-headers 4.0.0
- SQLite (default database)

### Frontend
- React 18.2.0
- React Router 6.8.0
- Axios 1.3.0
- CSS3 with responsive design

## Key Changes from Django Templates to React

1. **Replaced Django Templates** with React components
2. **Created REST API endpoints** using Django REST Framework
3. **Implemented React Router** for client-side navigation
4. **Used Axios** for API communication
5. **State Management** with React Hooks (useState, useEffect)
6. **Responsive CSS** converted to work with React
7. **Added CORS headers** to allow frontend-backend communication

## Development Notes

- The frontend proxy is configured to `http://localhost:8000` in `package.json`
- CORS is enabled for all origins in development (set to `CORS_ALLOW_ALL_ORIGINS = True`)
- API URLs should be configured in `frontend/src/api.js` via `REACT_APP_API_URL` env variable

## Building for Production

### Backend
```bash
# Collect static files
python manage.py collectstatic

# Use a production server like gunicorn
pip install gunicorn
gunicorn myproject.wsgi
```

### Frontend
```bash
cd frontend
npm run build
```

This creates a production-ready build in the `frontend/build` directory.

## Troubleshooting

1. **CORS Errors**: Make sure Django backend is running and CORS is enabled
2. **API Connection Issues**: Check that the proxy URL in `package.json` matches your Django server
3. **Port Conflicts**: If ports are already in use, specify different ports:
   - Django: `python manage.py runserver 8001`
   - React: `PORT=3001 npm start`

## Next Steps

- Add user authentication
- Implement task categories/tags
- Add due dates to tasks
- Add task filtering and search
- Deploy to production (e.g., Heroku, AWS, Azure)
