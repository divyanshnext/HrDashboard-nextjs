import { promises as fs } from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "users.json");

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export async function POST(request) {
  const data = await request.json();
  const users = await readUsers();
  const user = { ...data, id: data.id || Date.now() };
  users.unshift(user);
  await writeUsers(users);
  return new Response(JSON.stringify(user), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  const users = await readUsers();
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
