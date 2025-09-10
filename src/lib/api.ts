import { API_URL } from "./config";

export async function loginUser(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login gagal");
  }

  return res.json(); // { token: "string" }
}

export async function registerUser(username: string, password: string, role: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      role: role === "user" ? "User" : "Admin",
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Register gagal");
  }

  return res.json();
}

export async function getArticles(page = 1, limit = 10, category?: string, search?: string) {
  let url = `${API_URL}/articles?page=${page}&limit=${limit}`;
  if (category) url += `&category=${category}`;
  if (search) url += `&search=${search}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // kalau butuh auth
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export async function getProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}