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

![Dashboard Screenshot](![image](https://github.com/user-attachments/assets/02302a2c-139b-4b92-b1ce-7dbe55293f9b)
)

### Employee Details

![Employee Details Screenshot](![image](https://github.com/user-attachments/assets/9564f64d-48ac-41f5-93f4-be39421b213d)
)

### Analytics

![Analytics Screenshot](![image](https://github.com/user-attachments/assets/34cdd08d-f196-4f81-b486-01e12bf196e0)
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

### Steps to Deploy:

1. **Build the project:**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Deploy on Vercel:**
   - Visit [Vercel](https://vercel.com/).
   - Log in or sign up for an account.
   - Click on "New Project" and import your GitHub repository.
   - Follow the prompts to configure and deploy your project.

3. **Set Environment Variables:**
   - Go to your Vercel project settings.
   - Add the following variables:
     - `NEXTAUTH_SECRET`: Generate a secure random string (e.g., using `openssl rand -base64 32`).
     - `NEXTAUTH_URL`: Set it to your deployed URL (e.g., `https://your-app.vercel.app`).

4. **Get the deployed link:**
   - Once deployed, Vercel will provide a live URL for your project. Replace the placeholder in the "Deployed Link" section above with this URL.

5. **Submit the deployed link:**
   - Use the form link provided: [https://tinyurl.com/Lyt3kdnwx](https://tinyurl.com/Lyt3kdnwx).

---

## 🌐 Deployed Link

- [Live Project URL](https://your-deployed-url.vercel.app) *(Replace `https://your-deployed-url.vercel.app` with your actual deployed link)*

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
