import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user_id, event_id, status } = req.body;

      // Insert if not exists, otherwise update status
      const result = await query(
        `INSERT INTO rsvps (user_id, event_id, status) 
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
        [user_id, event_id, status]
      );

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error("RSVP insert error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
