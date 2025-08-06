CREATE TABLE IF NOT EXISTS users (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    role            ENUM('user', 'admin') DEFAULT 'user',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS problems (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    code            VARCHAR(20) UNIQUE NOT NULL,  -- VD: P1001
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    input_format    TEXT,
    output_format   TEXT,
    constraints     TEXT,
    sample_input    TEXT,
    sample_output   TEXT,
    time_limit      FLOAT NOT NULL,  -- seconds
    memory_limit    INT NOT NULL,    -- MB
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testcases (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    problem_id      INT NOT NULL,
    input           TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample       BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS submissions (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    user_id         INT NOT NULL,
    problem_id      INT NOT NULL,
    code            TEXT NOT NULL,
    language        VARCHAR(20) NOT NULL, -- vd: C++, Python
    status          ENUM('pending', 'judging', 'accepted', 'wrong_answer', 'compile_error', 'runtime_error', 'time_limit_exceeded') DEFAULT 'pending',
    score           FLOAT DEFAULT 0,
    submitted_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (problem_id) REFERENCES problems(id)
);

CREATE TABLE IF NOT EXISTS submission_details (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    submission_id   INT NOT NULL,
    testcase_id     INT NOT NULL,
    status          ENUM('accepted', 'wrong_answer', 'runtime_error', 'time_limit_exceeded'),
    time            FLOAT,   -- seconds
    memory          INT,     -- MB
    FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE,
    FOREIGN KEY (testcase_id) REFERENCES testcases(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contests (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    start_time      DATETIME NOT NULL,
    end_time        DATETIME NOT NULL,
    created_by      INT NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS contest_problems (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    contest_id      INT NOT NULL,
    problem_id      INT NOT NULL,
    index_label     CHAR(1), -- A, B, C,...
    FOREIGN KEY (contest_id) REFERENCES contests(id),
    FOREIGN KEY (problem_id) REFERENCES problems(id)
);

