📊 Lead Management System (Mini CRM)

A simple full-stack Lead Management System (Mini CRM) built using React, Node.js, Express, and Supabase PostgreSQL.
This project helps manage leads, update their status, and track conversion in a clean dashboard UI.

🚀 Features
➕ Add new leads (Name, Phone, Source)
📋 View all leads in dashboard
🔄 Update lead status (Interested / Not Interested / Converted)
🗑 Delete leads
🔍 Search & filter leads (backend supported)
📊 Dashboard-ready structure
🎨 Modern and clean UI
⚡ Real-time updates without page reload
🛠️ Tech Stack

Frontend
React.js
Axios
CSS (custom styling)

Backend
Node.js
Express.js
Supabase (PostgreSQL)

Database
Supabase PostgreSQL

📁 Project Structure
lead-management-system/
│
├── backend/
│   ├── routes/
│   │   └── leads.js
│   ├── supabase.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│
└── README.md

⚙️ Installation Setup
1. Clone the repository
git clone https://github.com/your-username/lead-management-system.git
2. Backend setup
cd backend
npm install

Create .env file:

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

Run backend:

node server.js
3. Frontend setup
cd frontend
npm install
npm start
🗄️ Database Schema (Supabase)

Table: leads

Column	Type
id	uuid (PK)
name	text
phone	text
source	text
status	text
created_at	timestamp
📡 API Endpoints
Leads
GET /api/leads → Get all leads
POST /api/leads → Add new lead
PATCH /api/leads/:id/status → Update status
DELETE /api/leads/:id → Delete lead
🎯 UI Preview
Dashboard style layout
Clean form for adding leads
Table view for lead management
Dropdown status updates
Delete button per lead
🔥 Future Improvements
Login / Authentication system
Role-based access (Admin / User)
Analytics dashboard (charts)
Export leads to Excel
Pagination for large data
Toast notifications
👨‍💻 Author

Built by Ayesha Shaikh

📌 Note

This project is for learning and internship demonstration purposes. It showcases full-stack development skills with real database integration.
