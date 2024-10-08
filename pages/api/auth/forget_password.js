import { compareSync, hashSync } from "bcrypt";

import db from "@/components/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const ship = req.body.shipname;
    const password = req.body.oldpassword;
    const newpassword = req.body.newpassword;

    if (!email || !ship || !password || !newpassword) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    try {
      const query = "SELECT * FROM users WHERE username = ? AND ship = ?";
      const values = [email, ship];

      const rows = await db({ query, values });

      if (rows.length === 0) {
        return res.status(401).json({ message: "User doesn't Exist" });
      }

      const user = rows[0];

      if (!compareSync(password, user.password)) {
        return res.status(401).json({ message: "Incorrect old password" });
      }

      const hashedPassword = hashSync(newpassword, 10);

      const query1 = `UPDATE users SET password = ? WHERE id = ?;`;
      const values1 = [hashedPassword, user.id];

      const result = await db({ query: query1, values: values1 });

      return res.status(200).json({ message: "Password Updated" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  return res.status(200).json({ message: "Method not Allowed" });
}
