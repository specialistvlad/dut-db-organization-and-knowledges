INSERT INTO issue(
  book_id,
  reader_id,
  created_at,
  return_at,
  removed_at
)
VALUES
(6, 1, '2018-08-25', '2018-09-25', NULL),
(5, 1, '2018-08-28', '2018-09-28', '2018-09-28'),
(7, 1, '2018-10-12', '2018-12-12', NULL),
(2, 2, '2018-11-18', '2018-12-18', NULL);
