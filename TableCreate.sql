CREATE DATABASE events_platform;

USE events_platform;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_by INT NOT NULL,
    CONSTRAINT fk_events_user
        FOREIGN KEY (created_by) REFERENCES Users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE RSVPs (
    rsvp_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    status ENUM('Yes', 'No', 'Maybe') NOT NULL,
    CONSTRAINT fk_rsvps_user
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_rsvps_event
        FOREIGN KEY (event_id) REFERENCES Events(event_id)
        ON DELETE CASCADE,
    CONSTRAINT uq_user_event UNIQUE (user_id, event_id)
);
