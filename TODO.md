# Portfolio CMS Roadmap
> Making your portfolio content editable with admin access

---

## Phase 1 — Database Setup

- [ ] Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free M0 tier)
- [ ] Create a new project → cluster → database named `portfolio_db`
- [ ] Create the following collections:
  - [ ] `skills`
  - [ ] `reels`
  - [ ] `certificates`
  - [ ] `hobbies`
  - [ ] `projects`
  - [ ] `admin`
- [ ] Get your connection string from Atlas → store it in `.env` as `MONGODB_URI`
- [ ] Install Mongoose: `npm install mongoose`
- [ ] Write a `lib/db.js` connection helper

```js
// lib/db.js
import mongoose from 'mongoose';
export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};
```

- [ ] Seed the database — migrate your existing JSON files into the collections

---

## Phase 2 — Backend API

- [ ] Choose your backend approach:
  - [ ] **Option A** — Next.js API routes (if you move to Next.js) — no separate server needed
  - [ ] **Option B** — Express server — `npm install express cors dotenv`
- [ ] Create REST endpoints for each collection:

```
GET    /api/skills          → returns all skills (public)
PUT    /api/skills          → updates skills (admin only)

GET    /api/reels           → public
PUT    /api/reels           → admin only

GET    /api/certificates    → public
PUT    /api/certificates    → admin only

GET    /api/hobbies         → public
PUT    /api/hobbies         → admin only

GET    /api/projects        → public
PUT    /api/projects        → admin only
```

- [ ] Add a middleware that checks for a valid JWT on all `PUT`/`POST`/`DELETE` routes

```js
// middleware/auth.js
import jwt from 'jsonwebtoken';
export const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};
```

---

## Phase 3 — Authentication

- [ ] Install auth packages: `npm install jsonwebtoken bcrypt`
- [ ] Add to `.env`:
  ```
  MONGODB_URI=your_atlas_connection_string
  JWT_SECRET=some_long_random_string
  ADMIN_USERNAME=your_chosen_username
  ```
- [ ] Hash your password once and store it in the `admin` collection:

```js
// run once as a script: node scripts/seedAdmin.js
import bcrypt from 'bcrypt';
import { AdminModel } from '../models/Admin.js';
await AdminModel.create({
  username: process.env.ADMIN_USERNAME,
  passwordHash: await bcrypt.hash('your_password_here', 12),
});
```

- [ ] Create `POST /api/auth/login` endpoint:

```js
// Returns a JWT if credentials match
const user = await AdminModel.findOne({ username });
const valid = await bcrypt.compare(password, user.passwordHash);
if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });
```

- [ ] Store the token in `localStorage` on the frontend after login
- [ ] Create a `useAdmin` hook that reads the token and exposes `isAdmin`

```js
// hooks/useAdmin.js
export function useAdmin() {
  const token = localStorage.getItem('admin_token');
  if (!token) return { isAdmin: false };
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = payload.exp * 1000 < Date.now();
    return { isAdmin: !expired, token };
  } catch {
    return { isAdmin: false };
  }
}
```

- [ ] Build a minimal login page/modal — just a username + password form that hits `/api/auth/login`

---

## Phase 4 — Frontend Editable Components

- [ ] Create an `AdminContext` that provides `isAdmin` + `token` throughout the app:

```jsx
// context/AdminContext.jsx
export const AdminContext = createContext({ isAdmin: false, token: null });
export function AdminProvider({ children }) {
  const admin = useAdmin();
  return <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>;
}
```

- [ ] Wrap your app root in `<AdminProvider>`
- [ ] Add `editable` prop to each component — only rendered when `isAdmin` is true:

```jsx
// Pattern used in every component:
const { isAdmin } = useContext(AdminContext);
// ...
{isAdmin && <EditButton onClick={openEditPanel} />}
```

- [ ] Implement editable UI per component:
  - [ ] **TechSkills** — edit skill name, level slider, category, toggle commented-out skills
  - [ ] **Certificates** — add/remove/edit certificate entries
  - [ ] **Hobbies** — edit title, description, image URL, tags
  - [ ] **ReelCarousel** — edit label, caption, accent color, image URL
  - [ ] **Learning/Projects** — add/remove/edit project entries
  - [ ] **ContributionMap** — stats are live from GitHub API, nothing to edit here
  - [ ] **AboutIntro** — edit bio text, tag pills
- [ ] On save, call the relevant `PUT /api/<collection>` with the `Authorization: Bearer <token>` header
- [ ] Optimistic UI updates — update local state immediately, roll back if the API call fails

---

## Phase 5 — Deployment

- [ ] Deploy the backend:
  - [ ] **Option A (Next.js)** — Vercel handles API routes automatically
  - [ ] **Option B (Express)** — Railway, Render, or Fly.io (all have free tiers)
- [ ] Add all `.env` variables to your hosting provider's environment config
- [ ] Whitelist your deployment domain in MongoDB Atlas → Network Access
- [ ] Test the full auth flow in production before going live

---

## `.env` Reference

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_db
JWT_SECRET=replace_with_long_random_string
ADMIN_USERNAME=anandita
```

---

## Notes

- The JWT expires after 7 days — you'll need to log in again after that
- Never commit `.env` to git — add it to `.gitignore`
- MongoDB Atlas free tier (512MB) is more than enough for a portfolio
- Visitors always hit the read-only `GET` endpoints — no auth needed for them
- If you move to Next.js later, Express routes map 1:1 to Next.js API routes