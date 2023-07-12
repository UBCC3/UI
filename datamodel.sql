# PostGreSQL definitions for the Quantum Chemistry application

CREATE TABLE USERS (
    EMAIL VARCHAR(255) PRIMARY KEY NOT NULL,
    CREATED TIMESTAMP DEFAULT NOW(),
    LASTLOGIN TIMESTAMP NOT NULL,
    ACTIVE BOOLEAN NOT NULL,
    ADMIN BOOLEAN NOT NULL
);


CREATE TYPE STRUCTURE_ORIGIN AS ENUM ('UPLOADED', 'CALCULATED');

CREATE TABLE STRUCTURES (
    ID UUID PRIMARY KEY,
    SOURCE STRUCTURE_ORIGIN NOT NULL,
    NAME VARCHAR(255) NOT NULL,
    CREATED TIMESTAMP DEFAULT NOW(),
    USERID VARCHAR(255) NOT NULL,
    FOREIGN KEY (USERID) REFERENCES USERS(EMAIL)
);
