export async function loginUser(username: string, password: string) {
  const res = await fetch("https://test-fe.mysellerpintar.com/api/auth/login", {
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
