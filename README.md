# HR Dashboard

A modern HR dashboard built with [Next.js](https://nextjs.org), featuring employee management, analytics, authentication, and more.

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/divyanshnext/HrDashboard-nextjs
   cd hr-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

5. **Login credentials (demo):**
   - Email: `admin@example.com`
   - Password: `password123`

---

## ✨ Features Implemented

- **User Authentication** (NextAuth.js, credentials provider)
- **Employee Directory** with search, filter by department & rating
- **Employee Details Page** (bio, department, rating, performance history)
- **Bookmark Employees** (localStorage, persistent bookmarks)
- **Analytics Dashboard** (charts for department ratings & bookmark trends)
- **Dark Mode Toggle**
- **Sidebar Navigation**
- **Responsive UI** (Tailwind CSS)
- **Promote Action** (UI only)
- **Feedback Form** (mock, per employee)
- **Persistent Data** (users stored in `users.json`)

---

## 🖼️ Screenshots

### landing page
![Screenshot 2025-06-15 141026](https://github.com/user-attachments/assets/82460273-9dd8-49a6-afc7-6aa2948dfcea)


### Login page
![Screenshot 2025-06-15 141248](https://github.com/user-attachments/assets/370b940e-06df-4b03-a99b-f07361f6115d)


### Dashboard after admin login
![Screenshot 2025-06-15 141406](https://github.com/user-attachments/assets/269c6fef-c706-42ba-80e0-8ff614960868)

### Analytics page
![Screenshot 2025-06-15 141451](https://github.com/user-attachments/assets/22498e72-8448-4f5a-bf34-b1291b5fb0c4)

### Bookmarks page
![Screenshot 2025-06-15 141531](https://github.com/user-attachments/assets/c0ee0380-86b0-43ce-9f9d-26a6c11298eb)

### Employee detals view page
![Screenshot 2025-06-15 141610](https://github.com/user-attachments/assets/b8cbe84a-1997-4a9d-b2f0-ed82006a9268)

---

## 📁 Project Structure

- `app/` - Next.js app directory (pages, API routes)
- `components/` - Reusable UI components
- `context/` - React context for bookmarks
- `hooks/` - Custom React hooks
- `public/` - Static assets (SVGs, images)
- `users.json` - Local user data (created at runtime)

---

## 🌐 Deployed Link

- [Live Project URL]https://hr-dashboard-nextjs-beryl.vercel.app/ 
