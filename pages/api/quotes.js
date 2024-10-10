import db from "@/components/lib/db";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const query = "SELECT * FROM quotes;";
    const values = [];

    const rows = await db({ query, values });

    console.log(rows);
    return res.status(200).json(rows);
  }

  if (req.method == "POST") {
    // const body = await req.body.json();

    let { author, quote, userid } = req.body;

    console.log(userid, quote);

    if (!author) {
      author = "Anonymous";
      console.log("hello");
    }

    try {
      if (!userid || !quote) {
        return res.status(500).json({ message: "All Fields are Required" });
      }

      const query =
        "INSERT INTO quotes (quote, author, userid) VALUES (?, ?, ?) ;";
      const values = [quote, author, userid];

      const rows = await db({ query, values });

      return res.status(201).json({ message: "quote created" });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.status(500).json({ message: "method not allowed" });
}
