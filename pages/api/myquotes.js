import db from "@/components/lib/db";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const id = req.query.id;
    console.log(id);

    const query = "SELECT * FROM quotes WHERE userid = ?;";
    const values = [id];

    const rows = await db({ query, values });

    console.log(rows);
    return res.status(200).json(rows);
  }

  if (req.method == "DELETE") {
    const id = req.query.id;
    console.log(id);

    const query = "DELETE FROM quotes WHERE id = ?;";
    const values = [id];

    const rows = await db({ query, values });

    console.log(rows);
    return res.status(200).json(rows);
  }

  return res.status(500).json({ message: "method not allowed" });
}
