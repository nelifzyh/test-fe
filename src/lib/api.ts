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

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // supaya selalu fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function fetchArticleById(id: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`❌ Failed to fetch article ${id}:`, errorText);
    throw new Error("Failed to fetch article");
  }

  const data = await res.json();
  console.log("✅ Article fetched:", data);
  return data;
}


export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("token");

  console.log("🔼 Uploading image to /upload ...");

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    console.error("❌ Failed to upload image");
    throw new Error("Failed to upload image");
  }

  const data = await res.json();
  console.log("✅ Image uploaded:", data);
  return data; // { imageUrl: "https://..." }
}

export async function createArticle({
  title,
  content,
  categoryId,
  imageUrl, // ganti dari thumbnailUrl
}: {
  title: string;
  content: string;
  categoryId: string;
  imageUrl?: string; // opsional
}) {
  const token = localStorage.getItem("token");

  const body = {
    title,
    content,
    categoryId,
    ...(imageUrl ? { imageUrl } : {}), // backend minta "imageUrl"
  };

  console.log("🔼 Creating article with body:", body);

  const res = await fetch(`${API_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text(); // untuk debug
    console.error("❌ Failed to create article:", errorText);
    throw new Error("Failed to create article");
  }

  const data = await res.json();
  console.log("✅ Article created:", data);
  return data;
}

export async function updateArticle(
  id: string,
  {
    title,
    content,
    categoryId,
    imageUrl,
  }: {
    title: string;
    content: string;
    categoryId: string;
    imageUrl?: string;
  }
) {
  const token = localStorage.getItem("token");

  const body = {
    title,
    content,
    categoryId,
    ...(imageUrl ? { imageUrl } : {}),
  };

  console.log(`🔼 Updating article ${id} with body:`, body);

  const res = await fetch(`${API_URL}/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Failed to update article:", errorText);
    throw new Error("Failed to update article");
  }

  const data = await res.json();
  console.log("✅ Article updated:", data);
  return data;
}

export async function deleteArticle(id: string) {
  const token = localStorage.getItem("token");

  console.log(`🗑️ Deleting article ${id} ...`);

  const res = await fetch(`${API_URL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Failed to delete article:", errorText);
    throw new Error("Failed to delete article");
  }

  console.log("✅ Article deleted");
  return true;
}
