CREATE TABLE book(
  id SERIAL PRIMARY KEY,
  code VARCHAR(25) NOT NULL,
  author VARCHAR(100) NOT NULL,
  name VARCHAR(100) UNIQUE NOT NULL,
  publisher VARCHAR(100) NOT NULL,
  published_at TIMESTAMP,
  pages INTEGER NOT NULL,
  topic VARCHAR(100) NOT NULL,
  costs MONEY NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  removed_at TIMESTAMP
);
GRANT ALL PRIVILEGES ON TABLE book TO hero;

CREATE TABLE reader(
  id SERIAL PRIMARY KEY,
  last_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  home_phone VARCHAR(13) NOT NULL,
  work_phone VARCHAR(13),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  removed_at TIMESTAMP
);
GRANT ALL PRIVILEGES ON TABLE reader TO hero;

CREATE TABLE issue(
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES book(id),
  reader_id INTEGER NOT NULL REFERENCES reader(id),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  return_at TIMESTAMP,
  updated_at TIMESTAMP,
  removed_at TIMESTAMP
);
GRANT ALL PRIVILEGES ON TABLE issue TO hero;
