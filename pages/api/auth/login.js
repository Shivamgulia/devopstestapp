import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

import db from "@/components/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  console.log(username, password);

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = ? ;";
    const values = [username];

    const rows = await db({ query, values });
    console.log(rows);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid Username or password" });
    }

    const user = rows[0];

    if (!compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = sign(
      { userId: user.id, userName: user.username, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "365d",
      }
    );

    const returnUser = {
      userId: user.id,
      name: user.name,
      username: user.username,
    };

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
