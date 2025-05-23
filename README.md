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
- **Create New Employee** (with modal form, persists to local JSON)
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

### Dashboard

![Dashboard Screenshot] ![Screenshot 2025-05-24 040119](https://github.com/user-attachments/assets/3e78a5ae-70bd-4144-aec3-17901a61f851)

)

### Employee Details

![Employee Details Screenshot]![Screenshot 2025-05-24 040153](https://github.com/user-attachments/assets/d8589c2c-2916-45f3-ab69-709440221aff)

)

### Analytics

![Analytics Screenshot]![Screenshot 2025-05-24 040211](https://github.com/user-attachments/assets/25e7707f-e2eb-4da4-876b-e9c4ca816ad4)

)

---

## 📁 Project Structure

- `app/` - Next.js app directory (pages, API routes)
- `components/` - Reusable UI components
- `context/` - React context for bookmarks
- `hooks/` - Custom React hooks
- `public/` - Static assets (SVGs, images)
- `users.json` - Local user data (created at runtime)

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 Deploy

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.

---

## 🔄 How to Push New Changes to GitHub

1. **Check status of your changes:**
   ```bash
   git status
   ```

2. **Add changed files:**
   ```bash
   git add .
   ```

3. **Commit your changes:**
   ```bash
   git commit -m "Describe your changes"
   ```

4. **Push to GitHub:**
   ```bash
   git push
   ```
