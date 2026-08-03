mysql> SELECT * FROM users;
+---------+------------+-----------+----------------------+-----+-----------+----------+--------------+---------------------+
| user_id | first_name | last_name | email                | age | city      | salary   | joining_date | created_at          |
+---------+------------+-----------+----------------------+-----+-----------+----------+--------------+---------------------+
|       1 | Omkar      | Kudtarka  | omkar@gmail.com      |  27 | Goa       | 85000.00 | 2024-02-15   | 2026-07-24 10:15:00 |
|       2 | Rohan      | Mehta     | rohan@gmail.com      |  31 | Hyderabad | 62000.00 | 2025-06-01   | 2026-07-24 10:16:30 |
|       3 | Ananya     | Roy       | ananya@gmail.com     |  25 | Kolkata   | 58000.00 | 2024-11-20   | 2026-07-24 10:17:10 |
|       4 | Vikram     | Joshi     | vikram@gmail.com     |  38 | Chennai   | 92000.00 | 2023-04-12   | 2026-07-24 10:17:10 |
|       5 | Sneha      | Nair      | sneha@gmail.com      |  29 | Kochi     | 67000.00 | 2025-09-05   | 2026-07-24 10:17:10 |
+---------+------------+-----------+----------------------+-----+-----------+----------+--------------+---------------------+
5 rows in set (0.02 sec)

mysql> 
mysql> 
mysql> 
mysql> 
mysql> SELECT first_name, city, salary
    -> FROM users;
+------------+-----------+----------+
| first_name | city      | salary   |
+------------+-----------+----------+
| Omkar      | Goa       | 85000.00 |
| Rohan      | Hyderabad | 62000.00 |
| Ananya     | Kolkata   | 58000.00 |
| Vikram     | Chennai   | 92000.00 |
| Sneha      | Kochi     | 67000.00 |
+------------+-----------+----------+
5 rows in set (0.00 sec)

mysql> _