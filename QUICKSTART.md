# Quick Start Guide

## Prerequisites
- Python 3.8+
- Node.js 14+ and npm
- Git (optional)

## Step 1: Backend Setup

```bash
# Navigate to project directory
cd myproject

# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start Django server (will run on http://localhost:8000)
python manage.py runserver
```

Keep this terminal open. You should see:
```
Starting development server at http://127.0.0.1:8000/
```

## Step 2: Frontend Setup (Open new terminal)

```bash
# Navigate to frontend directory
cd myproject/frontend

# Install dependencies
npm install

# Start React development server (will run on http://localhost:3000)
npm start
```

Your browser should automatically open to `http://localhost:3000`

## Step 3: Start Using the App

1. **Add a Task**: Click "ADD" in the navigation
   - Enter task title and description
   - Click "+ ADD TASK"

2. **View Tasks**: 
   - HOME - see all active tasks
   - COMPLETE - see completed tasks
   - TRASH - see deleted tasks

3. **Manage Tasks**:
   - Click "✓ COMPLETE" to mark as complete
   - Click "✎ UPDATE" to edit a task
   - Click "✕ DELETE" to move to trash
   - Click "↶ RESTORE" to restore from trash/complete
   - Use bulk actions to complete/delete multiple tasks at once

## Troubleshooting

### Port Already in Use?

**Django:**
```bash
python manage.py runserver 8001
```
Then update `.env` in frontend to `REACT_APP_API_URL=http://localhost:8001/api`

**React:**
```bash
PORT=3001 npm start
```

### Dependencies Not Installing?

**Python:**
```bash
# Try upgrading pip
pip install --upgrade pip
pip install -r requirements.txt
```

**Node:**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues?

1. Check Django is running on `http://localhost:8000`
2. Verify `.env` file has correct API URL
3. Check browser console for CORS errors

## Stopping the Servers

Press `Ctrl+C` in both terminal windows to stop the servers.

## Admin Panel

Access Django admin at `http://localhost:8000/admin`

Create a superuser first:
```bash
python manage.py createsuperuser
```

Then login with your credentials.

---

**Need Help?** Check the main [README.md](./README.md) for more detailed information.
