CREATE DATABASE home_service_db;
USE home_service_db;
SHOW DATABASES;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(20),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    place VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SHOW TABLES;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(20),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    place VARCHAR(100),
    address VARCHAR(255),
    pincode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users
(name, age, gender, phone, email, place, address, pincode)
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 100
)
SELECT
    CONCAT('Customer ', n),
    20 + MOD(n, 41),
    CASE WHEN MOD(n,2)=0 THEN 'Female' ELSE 'Male' END,
    CONCAT('90000', LPAD(n,5,'0')),
    CONCAT('customer',n,'@gmail.com'),
    CASE MOD(n,10)
        WHEN 0 THEN 'Chennai'
        WHEN 1 THEN 'Bangalore'
        WHEN 2 THEN 'Hyderabad'
        WHEN 3 THEN 'Coimbatore'
        WHEN 4 THEN 'Madurai'
        WHEN 5 THEN 'Salem'
        WHEN 6 THEN 'Pune'
        WHEN 7 THEN 'Mumbai'
        WHEN 8 THEN 'Kochi'
        ELSE 'Delhi'
    END,
    CONCAT('House No ',n,', Main Road'),
    CONCAT('600',LPAD(n,3,'0'))
FROM nums;


CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    base_price DECIMAL(10,2),
    duration_minutes INT
);

INSERT INTO services
(service_name, description, base_price, duration_minutes)
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 100
)
SELECT
    CASE MOD(n,10)
        WHEN 0 THEN 'Plumbing'
        WHEN 1 THEN 'Electrical Repair'
        WHEN 2 THEN 'AC Repair'
        WHEN 3 THEN 'Carpentry'
        WHEN 4 THEN 'Painting'
        WHEN 5 THEN 'Washing Machine Repair'
        WHEN 6 THEN 'Refrigerator Repair'
        WHEN 7 THEN 'RO Service'
        WHEN 8 THEN 'Pest Control'
        ELSE 'Home Cleaning'
    END,
    CONCAT('Professional home service'),
    400 + MOD(n,10) * 100,
    45 + MOD(n,6) * 30
FROM nums;


CREATE TABLE locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    place VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO locations
(user_id, place, address, city, pincode, latitude, longitude)
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 100
)
SELECT
    n,
    CONCAT('Area ',n),
    CONCAT('House No ',n,', Service Road'),
    CASE MOD(n,10)
        WHEN 0 THEN 'Chennai'
        WHEN 1 THEN 'Bangalore'
        WHEN 2 THEN 'Hyderabad'
        WHEN 3 THEN 'Coimbatore'
        WHEN 4 THEN 'Madurai'
        WHEN 5 THEN 'Salem'
        WHEN 6 THEN 'Pune'
        WHEN 7 THEN 'Mumbai'
        WHEN 8 THEN 'Kochi'
        ELSE 'Delhi'
    END,
    CONCAT('600',LPAD(n,3,'0')),
    10.0000000 + n/100,
    70.0000000 + n/100
FROM nums;


CREATE TABLE technicians (
    technician_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),
    specialization VARCHAR(100),
    availability VARCHAR(30),
    rating DECIMAL(2,1)
);

INSERT INTO technicians
(name, phone, email, specialization, availability, rating)
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 100
)
SELECT
    CONCAT('Technician ',n),
    CONCAT('91000',LPAD(n,5,'0')),
    CONCAT('technician',n,'@gmail.com'),
    CASE MOD(n,10)
        WHEN 0 THEN 'Plumbing'
        WHEN 1 THEN 'Electrical'
        WHEN 2 THEN 'AC Repair'
        WHEN 3 THEN 'Carpentry'
        WHEN 4 THEN 'Painting'
        WHEN 5 THEN 'Appliance Repair'
        WHEN 6 THEN 'RO Service'
        WHEN 7 THEN 'Cleaning'
        WHEN 8 THEN 'Pest Control'
        ELSE 'General Repair'
    END,
    CASE WHEN MOD(n,3)=0 THEN 'Busy' ELSE 'Available' END,
    4.0 + MOD(n,10)/10
FROM nums;


CREATE TABLE service_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    location_id INT NOT NULL,
    request_date DATE NOT NULL,
    preferred_date DATE,
    preferred_time TIME,
    problem_description VARCHAR(500),
    request_status VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

INSERT INTO service_requests
(user_id, service_id, location_id, request_date,
 preferred_date, preferred_time, problem_description, request_status)
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 100
)
SELECT
    n,
    n,
    n,
    DATE_ADD('2026-08-01', INTERVAL MOD(n,40) DAY),
    DATE_ADD('2026-09-01', INTERVAL MOD(n,30) DAY),
    MAKETIME(9 + MOD(n,8),0,0),
    'Customer requires home service',
    CASE
        WHEN n <= 40 THEN 'Completed'
        WHEN n <= 70 THEN 'Confirmed'
        WHEN n <= 85 THEN 'Started'
        ELSE 'Pending'
    END
FROM nums;


CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    technician_id INT NOT NULL,
    booking_date DATE NOT NULL,
    scheduled_start_time TIME,
    scheduled_end_time TIME,
    service_started_at DATETIME,
    service_completed_at DATETIME,
    status VARCHAR(30),
    FOREIGN KEY (request_id) REFERENCES service_requests(request_id),
    FOREIGN KEY (technician_id) REFERENCES technicians(technician_id)
);

INSERT INTO bookings
(request_id, technician_id, booking_date,
 scheduled_start_time, scheduled_end_time,
 service_started_at, service_completed_at, status)
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 100
)
SELECT
    n,
    n,
    DATE_ADD('2026-09-01', INTERVAL MOD(n,30) DAY),
    MAKETIME(9 + MOD(n,8),0,0),
    MAKETIME(10 + MOD(n,8),0,0),
    CASE
        WHEN n <= 60 THEN
            DATE_ADD(
                TIMESTAMP(
                    DATE_ADD('2026-09-01', INTERVAL MOD(n,30) DAY),
                    MAKETIME(9 + MOD(n,8),0,0)
                ),
                INTERVAL 5 MINUTE
            )
        ELSE NULL
    END,
    CASE
        WHEN n <= 60 THEN
            DATE_ADD(
                TIMESTAMP(
                    DATE_ADD('2026-09-01', INTERVAL MOD(n,30) DAY),
                    MAKETIME(10 + MOD(n,8),0,0)
                ),
                INTERVAL -5 MINUTE
            )
        ELSE NULL
    END,
    CASE
        WHEN n <= 60 THEN 'Completed'
        WHEN n <= 80 THEN 'Started'
        ELSE 'Confirmed'
    END
FROM nums;


CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2),
    payment_method VARCHAR(30),
    payment_status VARCHAR(30),
    payment_time DATETIME,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

INSERT INTO payments
(booking_id, amount, payment_method, payment_status, payment_time)
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 100
)
SELECT
    n,
    400 + MOD(n,10) * 100,
    CASE MOD(n,3)
        WHEN 0 THEN 'UPI'
        WHEN 1 THEN 'Card'
        ELSE 'Cash'
    END,
    CASE
        WHEN n <= 60 THEN 'Paid'
        ELSE 'Pending'
    END,
    CASE
        WHEN n <= 60
        THEN DATE_ADD('2026-09-01 10:00:00', INTERVAL n DAY)
        ELSE NULL
    END
FROM nums;


SELECT 'users' AS table_name, COUNT(*) AS records FROM users
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'locations', COUNT(*) FROM locations
UNION ALL
SELECT 'technicians', COUNT(*) FROM technicians
UNION ALL
SELECT 'service_requests', COUNT(*) FROM service_requests
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'payments', COUNT(*) FROM payments;


SELECT
    (SELECT COUNT(*) FROM users) +
    (SELECT COUNT(*) FROM services) +
    (SELECT COUNT(*) FROM locations) +
    (SELECT COUNT(*) FROM technicians) +
    (SELECT COUNT(*) FROM service_requests) +
    (SELECT COUNT(*) FROM bookings) +
    (SELECT COUNT(*) FROM payments)
    AS TOTAL_RECORDS;
    SELECT * FROM users;
    SELECT * FROM technicians;
    USE home_service_db;

	UPDATE users
SET name = 'Arjun Kumar'
WHERE user_id = 1;
SELECT * FROM users
WHERE user_id = 1;
UPDATE users SET name = 'Arjun Kumar' WHERE user_id = 1;
UPDATE users SET name = 'Priya Sharma' WHERE user_id = 2;
UPDATE users SET name = 'Rahul Verma' WHERE user_id = 3;
UPDATE users SET name = 'Sneha Reddy' WHERE user_id = 4;
UPDATE users SET name = 'Vikram Singh' WHERE user_id = 5;
UPDATE users SET name = 'Ananya Rao' WHERE user_id = 6;
UPDATE users SET name = 'Karthik Raj' WHERE user_id = 7;
UPDATE users SET name = 'Divya Nair' WHERE user_id = 8;
UPDATE users SET name = 'Rohan Patel' WHERE user_id = 9;
UPDATE users SET name = 'Meera Iyer' WHERE user_id = 10;
UPDATE users SET name = 'Aditya Menon' WHERE user_id = 11;
UPDATE users SET name = 'Kavya Das' WHERE user_id = 12;
UPDATE users SET name = 'Sanjay Kumar' WHERE user_id = 13;
UPDATE users SET name = 'Pooja Shah' WHERE user_id = 14;
UPDATE users SET name = 'Naveen Reddy' WHERE user_id = 15;
UPDATE users SET name = 'Aishwarya Rao' WHERE user_id = 16;
UPDATE users SET name = 'Manoj Kumar' WHERE user_id = 17;
UPDATE users SET name = 'Harini Devi' WHERE user_id = 18;
UPDATE users SET name = 'Surya Prakash' WHERE user_id = 19;
UPDATE users SET name = 'Keerthana S' WHERE user_id = 20;
UPDATE users SET name = 'Ravi Teja' WHERE user_id = 21;
UPDATE users SET name = 'Lakshmi Priya' WHERE user_id = 22;
UPDATE users SET name = 'Nikhil Reddy' WHERE user_id = 23;
UPDATE users SET name = 'Swathi Rao' WHERE user_id = 24;
UPDATE users SET name = 'Abhishek Sharma' WHERE user_id = 25;
UPDATE users SET name = 'Neha Gupta' WHERE user_id = 26;
UPDATE users SET name = 'Varun Kumar' WHERE user_id = 27;
UPDATE users SET name = 'Sravani Devi' WHERE user_id = 28;
UPDATE users SET name = 'Rakesh Singh' WHERE user_id = 29;
UPDATE users SET name = 'Deepika Nair' WHERE user_id = 30;
UPDATE users SET name = 'Harish Kumar' WHERE user_id = 31;
UPDATE users SET name = 'Madhuri Rao' WHERE user_id = 32;
UPDATE users SET name = 'Sandeep Raj' WHERE user_id = 33;
UPDATE users SET name = 'Nandini Sharma' WHERE user_id = 34;
UPDATE users SET name = 'Vishal Reddy' WHERE user_id = 35;
UPDATE users SET name = 'Keerthi Nair' WHERE user_id = 36;
UPDATE users SET name = 'Rohit Kumar' WHERE user_id = 37;
UPDATE users SET name = 'Shreya Patel' WHERE user_id = 38;
UPDATE users SET name = 'Ajay Singh' WHERE user_id = 39;
UPDATE users SET name = 'Pallavi Rao' WHERE user_id = 40;
UPDATE users SET name = 'Tarun Kumar' WHERE user_id = 41;
UPDATE users SET name = 'Bhavya Reddy' WHERE user_id = 42;
UPDATE users SET name = 'Akash Sharma' WHERE user_id = 43;
UPDATE users SET name = 'Manasa Devi' WHERE user_id = 44;
UPDATE users SET name = 'Chaitanya Rao' WHERE user_id = 45;
UPDATE users SET name = 'Sonia Nair' WHERE user_id = 46;
UPDATE users SET name = 'Vivek Kumar' WHERE user_id = 47;
UPDATE users SET name = 'Ramya Patel' WHERE user_id = 48;
UPDATE users SET name = 'Kiran Reddy' WHERE user_id = 49;
UPDATE users SET name = 'Sowmya Rao' WHERE user_id = 50;
SELECT user_id, name
FROM users
WHERE user_id BETWEEN 1 AND 50;
UPDATE users
SET name = 'Chaitanya Rao'
WHERE user_id = 45;
SELECT * FROM users;
UPDATE users
SET name = CASE user_id
    WHEN 2 THEN 'Priya Sharma'
    WHEN 3 THEN 'Rahul Verma'
    WHEN 4 THEN 'Sneha Reddy'
    WHEN 5 THEN 'Vikram Singh'
    WHEN 6 THEN 'Ananya Rao'
    WHEN 7 THEN 'Karthik Raj'
    WHEN 8 THEN 'Divya Nair'
    WHEN 9 THEN 'Rohan Patel'
    WHEN 10 THEN 'Meera Iyer'
    WHEN 11 THEN 'Aditya Menon'
    WHEN 12 THEN 'Kavya Das'
    WHEN 13 THEN 'Sanjay Kumar'
    WHEN 14 THEN 'Pooja Shah'
    WHEN 15 THEN 'Naveen Reddy'
    WHEN 16 THEN 'Aishwarya Rao'
    WHEN 17 THEN 'Manoj Kumar'
    WHEN 18 THEN 'Harini Devi'
    WHEN 19 THEN 'Surya Prakash'
    WHEN 20 THEN 'Keerthana S'
    WHEN 21 THEN 'Ravi Teja'
    WHEN 22 THEN 'Lakshmi Priya'
    WHEN 23 THEN 'Nikhil Reddy'
    WHEN 24 THEN 'Swathi Rao'
    WHEN 25 THEN 'Abhishek Sharma'
    WHEN 26 THEN 'Neha Gupta'
    WHEN 27 THEN 'Varun Kumar'
    WHEN 28 THEN 'Sravani Devi'
    WHEN 29 THEN 'Rakesh Singh'
    WHEN 30 THEN 'Deepika Nair'
    WHEN 31 THEN 'Harish Kumar'
    WHEN 32 THEN 'Madhuri Rao'
    WHEN 33 THEN 'Sandeep Raj'
    WHEN 34 THEN 'Nandini Sharma'
    WHEN 35 THEN 'Vishal Reddy'
    WHEN 36 THEN 'Keerthi Nair'
    WHEN 37 THEN 'Rohit Kumar'
    WHEN 38 THEN 'Shreya Patel'
    WHEN 39 THEN 'Ajay Singh'
    WHEN 40 THEN 'Pallavi Rao'
    WHEN 41 THEN 'Tarun Kumar'
    WHEN 42 THEN 'Bhavya Reddy'
    WHEN 43 THEN 'Akash Sharma'
    WHEN 44 THEN 'Manasa Devi'
    WHEN 45 THEN 'Chaitanya Rao'
    WHEN 46 THEN 'Sonia Nair'
    WHEN 47 THEN 'Vivek Kumar'
    WHEN 48 THEN 'Ramya Patel'
    WHEN 49 THEN 'Kiran Reddy'
    WHEN 50 THEN 'Sowmya Rao'
    ELSE name
END
WHERE user_id BETWEEN 2 AND 50;
SELECT user_id, name
FROM users
WHERE user_id BETWEEN 1 AND 50;
SELECT * FROM users;
UPDATE users
SET name = CASE user_id
    WHEN 51 THEN 'Rahul Kumar'
    WHEN 52 THEN 'Nisha Sharma'
    WHEN 53 THEN 'Varun Reddy'
    WHEN 54 THEN 'Sanjana Rao'
    WHEN 55 THEN 'Amit Singh'
    WHEN 56 THEN 'Ishita Patel'
    WHEN 57 THEN 'Rakesh Kumar'
    WHEN 58 THEN 'Deepa Nair'
    WHEN 59 THEN 'Suresh Raj'
    WHEN 60 THEN 'Anjali Iyer'
    WHEN 61 THEN 'Ravi Kumar'
    WHEN 62 THEN 'Swetha Reddy'
    WHEN 63 THEN 'Naveen Kumar'
    WHEN 64 THEN 'Lavanya Rao'
    WHEN 65 THEN 'Karthik Singh'
    WHEN 66 THEN 'Pavani Sharma'
    WHEN 67 THEN 'Mahesh Reddy'
    WHEN 68 THEN 'Reshma Nair'
    WHEN 69 THEN 'Vamsi Krishna'
    WHEN 70 THEN 'Aparna Devi'
    WHEN 71 THEN 'Rohit Sharma'
    WHEN 72 THEN 'Divya Reddy'
    WHEN 73 THEN 'Srinivas Rao'
    WHEN 74 THEN 'Tejaswini Kumar'
    WHEN 75 THEN 'Manoj Singh'
    WHEN 76 THEN 'Bhavani Patel'
    WHEN 77 THEN 'Sai Kiran'
    WHEN 78 THEN 'Mounika Reddy'
    WHEN 79 THEN 'Praveen Kumar'
    WHEN 80 THEN 'Hema Nair'
    WHEN 81 THEN 'Dhanush Raj'
    WHEN 82 THEN 'Sravya Rao'
    WHEN 83 THEN 'Vijay Kumar'
    WHEN 84 THEN 'Pooja Reddy'
    WHEN 85 THEN 'Nikhil Sharma'
    WHEN 86 THEN 'Haritha Devi'
    WHEN 87 THEN 'Ajith Kumar'
    WHEN 88 THEN 'Sushmitha Rao'
    WHEN 89 THEN 'Mohan Reddy'
    WHEN 90 THEN 'Kavitha Nair'
    WHEN 91 THEN 'Suraj Kumar'
    WHEN 92 THEN 'Divya Sharma'
    WHEN 93 THEN 'Ganesh Rao'
    WHEN 94 THEN 'Keerthi Reddy'
    WHEN 95 THEN 'Abhinav Singh'
    WHEN 96 THEN 'Riya Patel'
    WHEN 97 THEN 'Chandra Kumar'
    WHEN 98 THEN 'Sowjanya Rao'
    WHEN 99 THEN 'Ashok Reddy'
    WHEN 100 THEN 'Maya Nair'
    ELSE name
END
WHERE user_id BETWEEN 51 AND 100;


