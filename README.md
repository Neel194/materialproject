# Material Mining Platform

A full-stack educational content management system for managing study materials, syllabi, and previous year question papers.

## Features

- Upload and manage study materials, syllabi, and PYQs
- Admin approval system for uploads
- Filter content by year, branch, and subject
- Modern UI with responsive design
- Secure file upload and management
- Admin dashboard for content moderation

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Vite
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Multer (for file uploads)
- JWT Authentication

## Project Structure

```
material-mining/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   └── App.jsx
│   └── package.json
│
├── backend/           # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── index.js
│
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/material-mining
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   ADMIN_PASSWORD=your_admin_password_here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Materials

- `POST /api/materials` - Upload new material
- `GET /api/materials` - Get approved materials
- `GET /api/materials/admin` - Get all materials (admin)
- `POST /api/materials/admin/:id/approve` - Approve material
- `POST /api/materials/admin/:id/reject` - Reject material

### Admin

- `POST /api/admin/login` - Admin login

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
