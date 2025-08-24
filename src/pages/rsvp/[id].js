import { useRouter } from "next/router";
import { useState } from "react";

export default function RSVPPage() {
  const router = useRouter();
  const { id } = router.query;
  const [status, setStatus] = useState("Maybe");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,      // hardcoded for now
          event_id: id,    // ✅ event_id must come from router.query
          status,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ RSVP submitted!");
      } else {
        setMessage("❌ Failed: " + data.error);
      }
    } catch (err) {
      console.error("❌ Error submitting RSVP:", err);
      setMessage("❌ Error submitting RSVP");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">RSVP</h1>
      <p>Event ID: {id}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <label>Your response:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="ml-2 border px-2"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
