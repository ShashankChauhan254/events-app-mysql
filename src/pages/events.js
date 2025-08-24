"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Upcoming Events</h1>
      {loading && <p className="mt-4">Loading…</p>}
      <ul className="mt-4 space-y-4">
        {!loading && events.length === 0 && <p>No events found.</p>}
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="mt-1">{event.description}</p>
            <p className="mt-1"><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
            <p className="mt-1"><b>City:</b> {event.city}</p>
            <Link
              href={`/rsvp/${event.id}`}
              className="mt-3 inline-block bg-blue-600 text-white px-3 py-1 rounded"
            >
              RSVP
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
