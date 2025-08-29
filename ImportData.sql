USE events_platform;

INSERT INTO Users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'),
('Brown', 'brown@example.com'),
('Prince', 'prince@example.com'),
('Hunt', 'hunt@example.com'),
('Harry', 'harry@example.com'),
('Miller', 'miller@example.com'),
('Lee', 'lee@example.com'),
('Ivan', 'ivan@example.com'),
('Julia', 'julia@example.com');

INSERT INTO Events (title, description, date, city, created_by) VALUES
('Tech Meetup', 'A meetup for tech enthusiasts.', '2025-09-10', 'Bangalore', 1),
('Startup Pitch', 'Pitch your startup idea to investors.', '2025-09-15', 'Delhi', 2),
('Music Festival', 'Live performances by bands.', '2025-09-20', 'Mumbai', 3),
('Art Exhibition', 'Display of local art and paintings.', '2025-09-25', 'Kolkata', 4),
('AI Conference', 'Conference on AI and ML trends.', '2025-09-30', 'Hyderabad', 5);

INSERT INTO RSVPs (user_id, event_id, status) VALUES
(1, 1, 'Yes'),
(2, 1, 'Maybe'),
(3, 1, 'No'),
(4, 2, 'Yes'),
(5, 2, 'Yes'),
(6, 2, 'Maybe'),
(7, 3, 'Yes'),
(8, 3, 'No'),
(9, 3, 'Maybe'),
(10, 3, 'Yes'),
(1, 4, 'Maybe'),
(2, 4, 'Yes'),
(3, 4, 'Yes'),
(4, 5, 'No'),
(5, 5, 'Yes'),
(6, 5, 'Maybe'),
(7, 5, 'Yes'),
(8, 1, 'No'),
(9, 2, 'Yes'),
(10, 4, 'Maybe');

SELECT e.title, COUNT(r.rsvp_id) AS total_rsvps
FROM Events e
LEFT JOIN RSVPs r ON e.event_id = r.event_id
GROUP BY e.event_id;