import { query } from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const rows = await query(
      "SELECT event_id AS id, title, description, date, city FROM events WHERE date >= CURDATE() ORDER BY date ASC"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Events API error:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
}
