import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
});

const create_database_query = `CREATE DATABASE IF NOT EXISTS recipes`;
const use_database_query = `USE recipes`;
const create_recipe_query = `CREATE TABLE IF NOT EXISTS recipe(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)`;

const create_category_query = `CREATE TABLE IF NOT EXISTS category(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
)`;

const create_recipe_category_query = `CREATE TABLE IF NOT EXISTS recipe_category(
  recipe_id INT,
  category_id INT,
  PRIMARY KEY (recipe_id, category_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
)`;

const create_ingredients_query = `CREATE TABLE IF NOT EXISTS ingredients(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
)`;

const create_recipe_ingredients_query = `CREATE TABLE IF NOT EXISTS recipe_ingredients(
  recipe_id INT,
  ingredient_id INT,
  quantity VARCHAR(255),
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
)`;

const create_steps_query = `CREATE TABLE IF NOT EXISTS steps(
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) UNIQUE NOT NULL
)`;

const create_recipe_steps_query = `CREATE TABLE IF NOT EXISTS recipe_steps(
  recipe_id INT,
  step_id INT,
  step_order INT,
  PRIMARY KEY (recipe_id, step_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (step_id) REFERENCES steps(id)
)`;

await connection.query(create_database_query);
await connection.query(use_database_query);
await connection.query(create_recipe_query);
await connection.query(create_category_query);
await connection.query(create_recipe_category_query);
await connection.query(create_ingredients_query);
await connection.query(create_recipe_ingredients_query);
await connection.query(create_steps_query);
await connection.query(create_recipe_steps_query);

const insert_recipes_query = `INSERT IGNORE INTO recipe (name) VALUES 
    ('Borshch'),
    ('Varenyky'),
    ('Cheesecake')`;

const insert_categories_query = `INSERT IGNORE INTO category (name) VALUES 
    ('Soup'),
    ('Dessert'),
    ('Main Course')`;

const insert_recipe_category_query = `INSERT IGNORE INTO recipe_category (recipe_id, category_id) VALUES 
    (1, 1),
    (2, 3),
    (3, 2)`;

const insert_ingredients_query = `INSERT IGNORE INTO ingredients (name) VALUES 
    ('Beetroot'),
    ('Flour'),
    ('Sugar'),
    ('Cheese')`;

const insert_recipe_ingredients_query = `INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES 
    (1, 1, '2 pcs'),
    (2, 2, '200g'),
    (3, 4, '100g')`;

const insert_steps_query = `INSERT IGNORE INTO steps (description) VALUES 
    ('Boil the ingredients'),
    ('Mix the dough'),
    ('Bake in the oven')`;

const insert_recipe_steps_query = `INSERT IGNORE INTO recipe_steps (recipe_id, step_id, step_order) VALUES 
    (1, 1, 1),
    (2, 2, 1),
    (3, 3, 1)`;

await connection.query(insert_recipes_query);
await connection.query(insert_categories_query);
await connection.query(insert_recipe_category_query);
await connection.query(insert_ingredients_query);
await connection.query(insert_recipe_ingredients_query);
await connection.query(insert_steps_query);
await connection.query(insert_recipe_steps_query);

console.log('Database setup complete with sample data!');

connection.end();
