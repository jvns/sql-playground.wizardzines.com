.mode csv

-- cats
CREATE TABLE cats (
  owner INTEGER NOT NULL,
  name TEXT NOT NULL 
);
.import databases/cats.csv cats

-- dogs
CREATE TABLE dogs (
  owner INTEGER NOT NULL,
  name TEXT NOT NULL 
);
.import databases/dogs.csv dogs


-- sales
CREATE TABLE sales (
  month TEXT NOT NULL,
  item TEXT NOT NULL,
  client INTEGER NOT NULL,
  price INTEGER NOT NULL 
);
.import databases/sales.csv sales

-- users
CREATE TABLE users (
  id INTEGER NOT NULL,
  email TEXT NOT NULL 
);
.import databases/users.csv users

-- owners
CREATE TABLE owners (
  id INTEGER NOT NULL,
  name TEXT NOT NULL 
);
.import databases/owners.csv owners

-- clients
CREATE TABLE clients (
  name TEXT NOT NULL,
  id INTEGER NOT NULL
);
.import databases/clients.csv clients

-- grades
CREATE TABLE grades (
  name TEXT NOT NULL,
  class INTEGER NOT NULL,
  grade INTEGER NOT NULL
);
.import databases/grades.csv grades

-- pets
CREATE TABLE pets (
  owner INTEGER NOT NULL,
  type INTEGER NOT NULL
);
.import databases/pets.csv pets

-- addresses
CREATE TABLE addresses (
  customer INTEGER NOT NULL,
  mailing_state TEXT NOT NULL,
  billing_state TEXT NOT NULL,
  ip_address_state TEXT NOT NULL
);
.import databases/addresses.csv addresses

-- baby_log
CREATE TABLE baby_log (
  event TEXT NOT NULL,
  time INTEGER NOT NULL
);
.import databases/baby_log.csv baby_log

-- pets
CREATE TABLE fish (
  name TEXT NOT NULL,
  owner TEXT NOT NULL
);
.import databases/fish.csv fish


-- products
CREATE TABLE products (
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  discount INTEGER NOT NULL
);
.import databases/products.csv products


-- people
CREATE TABLE people (
  name TEXT NOT NULL,
  age INTEGER NOT NULL
);
.import databases/people.csv people


