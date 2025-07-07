# Simple React Authentication System

This project demonstrates a basic user authentication system built with **React**, **Redux Toolkit** for state management, and **localStorage** for client-side data persistence. It includes functionalities for user **registration**, **login**, and **logout**.


---


## Features

* **User Registration**: Create an account using name, email, and password.
* **User Login**: Authenticate using registered email and password.
* **User Logout**: End user session and clear stored user data.
* **Redux State Management**: Authentication state managed using Redux Toolkit.
* **Persistence**: User session and account data are persisted in `localStorage`.
* **Tailwind UI**: Clean, responsive forms styled using Tailwind CSS.

---

## Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (LTS version recommended)
* npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)

---

## 🚀 Installation


### 1. Create a React App

```bash
npx create-react-app my-auth-app
cd my-auth-app
```

### 2. Install Dependencies

```bash
npm install @reduxjs/toolkit react-redux
# OR
yarn add @reduxjs/toolkit react-redux
```

### 3. Install and Configure Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```


Update `tailwind.config.js`:

```js
content: ["./src/**/*.{js,jsx,ts,tsx}"]
```


Update `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.input {
  @apply w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.btn-primary {
  @apply w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors;
}
```

---

## 📁 Project Structure

```bash
src/
├── app/
│   └── store.js         # Redux store configuration
├── features/
│   └── authSlice.js     # Redux slice for authentication
├── components/
│   ├── Register.jsx     # Registration form component
│   └── Login.jsx        # Login form component
├── App.js               # Main app component
└── index.js             # React entry point
```

---

## 🧠 State Management (authSlice.js)

```js
// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
  isLoggedIn: !!localStorage.getItem("loggedInUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { registerSuccess, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
```

---


## 📝 Register Component




```js
// src/components/Register.jsx
import { useDispatch } from "react-redux";
import { registerSuccess } from "../features/authSlice";
import { useState } from "react";

function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    dispatch(registerSuccess(newUser));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input" />
        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
```

---

## 🔑 Login Component



```js
// src/components/Login.jsx
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useState } from "react";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email && u.password === password);
    if (existingUser) {
      dispatch(loginSuccess(existingUser));
      console.log("Login successful!");
    } else {
      console.log("Invalid credentials");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input" />
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
```

---

## 🧹 Redux Store Setup

```js
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

---

## 📅 Entry Point Setup

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---


## ⚙️ Main App Logic

```js
// src/App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import { logout } from './features/authSlice';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
          <p className="text-lg mb-6">You are logged in.</p>
          <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-around items-center min-h-screen bg-gray-100 p-4">
          <Register />
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
```

---

##  Data Persistence

Data is stored in the browser's `localStorage`:

* `users`: Array of all registered users.
* `loggedInUser`: Object of the currently logged-in user.

---

## ⚠ Security Note

This demo is for learning purposes. **Never store plain-text passwords or sensitive user data in localStorage** in real applications. Always use secure backend authentication with password hashing and proper security measures.

---

## Tailwind Styling Snippet (Optional)


```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

.input {
  @apply w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.btn-primary {
  @apply w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors;
}
```

---
