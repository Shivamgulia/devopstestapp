import { hashSync } from "bcrypt";

import db from "@/components/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, shipName } = req.body;

  if (!email || !password || !shipName) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = ? AND ship = ?;";
    const values = [email, shipName];

    const existingUsers = await db({ query, values });

    if (existingUsers.length === 0) {
      return res
        .status(409)
        .json({ message: "No User with this email exists" });
    }

    const hashedPassword = hashSync(password, 10);

    const query1 = `UPDATE \`users\`
      SET \`password\` = "${hashedPassword}"
      WHERE \`id\` = ${existingUsers[0].id} ;`;

    const values1 = [];

    const result = await db({ query: query1, values: values1 });

    res.status(201).json({ message: "Password Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
