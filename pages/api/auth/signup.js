// pages/api/register.js

import { hashSync } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import db from "@/components/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = ? ;";
    const values = [username];

    const existingUsers = await db({ query, values });

    console.log("hello");

    if (existingUsers.length > 0) {
      return res
        .status(409)
        .json({ message: "User with this username already exists" });
    }

    const hashedPassword = hashSync(password, 10);

    const query1 =
      "INSERT INTO users  (username, password, name) VALUES (?, ?, ?   );";
    const values1 = [username, hashedPassword, name];

    const result = await db({ query: query1, values: values1 });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
