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
  name VARCHAR(255) UNIQUE NOT NULL
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
  step_order INT NOT NULL,
  PRIMARY KEY (recipe_id, step_id, step_order),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (step_id) REFERENCES steps(id),
  CONSTRAINT unique_step_order UNIQUE (recipe_id, step_order);
)`;

await connection.query(create_database_query);
await connection.query(use_database_query);
await connection.query(create_recipe_query);
await connection.query(create_category_query);
await connection.query(create_ingredients_query);
await connection.query(create_recipe_category_query);
await connection.query(create_recipe_ingredients_query);
await connection.query(create_steps_query);
await connection.query(create_recipe_steps_query);

const insert_recipes_query = `INSERT INTO recipe (name) VALUES 
    ('No-Bake Cheesecake'),
    ('Roasted Brussels Sprouts'),
    ('Mac & Cheese'),
    ('Tamagoyaki Japanese Omelette');`;

const insert_categories_query = `INSERT IGNORE INTO category (name) VALUES 
    ('Cake'),
    ('No-Bake'),
    ('Vegetarian'),
    ('Vegan'),
    ('Gluten-Free'),
    ('Japanese');`;

const insert_ingredients_query = `INSERT IGNORE INTO ingredients (name) VALUES
    ('Condensed milk'),
    ('Cream Cheese'),
    ('Lemon Juice'),
    ('Pie Crust'),
    ('Cherry Jam'),
    ('Brussels Sprouts'),
    ('Sesame seeds'),
    ('Pepper'),
    ('Salt'),
    ('Olive Oil'),
    ('Macaroni'),
    ('Butter'),
    ('Flour'),
    ('Milk'),
    ('Shredded Cheddar cheese'),
    ('Eggs'),
    ('Soy sauce'),
    ('Sugar');
`;

const insert_recipe_category = `INSERT INTO recipe_category (recipe_id, category_id) VALUE 
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5),
  (3, 3),
  (4, 3),
  (4, 6)`;

const insert_recipe_ingredients_query = `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (2, 6),
  (2, 3),
  (2, 7),
  (2, 8),
  (2, 9),
  (2, 10),
  (3, 11),
  (3, 12),
  (3, 13),
  (3, 9),
  (3, 8),
  (3, 14),
  (3, 15),
  (4, 16),
  (4, 17),
  (4, 18),
  (4, 9),
  (4, 10)`;

const insert_steps_query = `INSERT INTO steps (description) VALUES
  ('Beat Cream Cheese'),
  ('Add condensed Milk and blend'),
  ('Add Lemon Juice and blend'),
  ('Add the mix to the pie crust'),
  ('Spread the Cherry Jam'),
  ('Place in refrigerator for 3h'),
  ('Preheat the oven'),
  ('Mix the ingredients in a bowl'),
  ('Spread the mix on baking sheet'),
  ('Bake for 30 minutes'),
  ('Cook Macaroni for 8 minutes'),
  ('Melt butter in a saucepan'),
  ('Add flour, salt, pepper and mix'),
  ('Add Milk and mix'),
  ('Cook until mix is smooth'),
  ('Add cheddar cheese'),
  ('Add the macaroni'),
  ('Beat the eggs'),
  ('Add soya sauce, sugar and salt'),
  ('Add oil to a sauce pan'),
  ('Bring to medium heat'),
  ('Add some mix to the sauce pan'),
  ('Let it cook for 1 minute'),
  ('Remove pan from fire')`;

const insert_recipe_steps_query = `INSERT INTO recipe_steps (recipe_id, step_id, step_order) VALUES
  (1, 1, 1),
  (1, 2, 2),
  (1, 3, 3),
  (1, 4, 4),
  (1, 5, 5),
  (1, 6, 6),
  (2, 7, 1),
  (2, 8, 2),
  (2, 9, 3),
  (2, 10, 4),
  (3, 11, 1),
  (3, 12, 2),
  (3, 13, 3),
  (3, 14, 4),
  (3, 15, 5),
  (3, 16, 6),
  (3, 17, 7),
  (4, 18, 1),
  (4, 19, 2),
  (4, 20, 3),
  (4, 21, 4),
  (4, 22, 5),
  (4, 23, 6),
  (4, 24, 7)`;

await connection.query(insert_recipes_query);
await connection.query(insert_categories_query);
await connection.query(insert_ingredients_query);
await connection.query(insert_recipe_category);
await connection.query(insert_recipe_ingredients_query);
await connection.query(insert_steps_query);
await connection.query(insert_recipe_steps_query);

console.log('Database setup complete with sample data!');

try {
    const query_vegetarian_potato = `SELECT recipe.name FROM recipe
      JOIN recipe_category ON recipe.id = recipe_category.recipe_id
      JOIN category ON recipe_category.category_id = category.id
      JOIN recipe_ingredients ON recipe.id = recipe_ingredients.recipe_id
      JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id
      WHERE category.name = 'Vegetarian' AND ingredients.name = 'Potato';
    `;

    const query_cake_no_bake = `SELECT recipe.name FROM recipe
      JOIN recipe_category ON recipe.id = recipe_category.recipe_id
      JOIN category ON recipe_category.category_id = category.id
      WHERE category.name = 'Cake'
      AND recipe.id IN (
        SELECT recipe_category.recipe_id 
        FROM recipe_category
        JOIN category ON recipe_category.category_id = category.id
        WHERE category.name = 'No-Bake'
        );
    `;

    const query_vegan_japanese = `SELECT recipe.name FROM recipe
      JOIN recipe_category ON recipe.id = recipe_category.recipe_id
      JOIN category ON recipe_category.category_id = category.id
      WHERE category.name = 'Vegan'
      AND recipe.id IN (
        SELECT recipe_category.recipe_id 
        FROM recipe_category
        JOIN category ON recipe_category.category_id = category.id
        WHERE category.name = 'Japanese'
        );
    `;

    const [vegetarianPotato] = await connection.execute(
        query_vegetarian_potato
    );
    console.log('Vegetarian Recipes with Potato:', vegetarianPotato);

    const [cakeNoBake] = await connection.execute(query_cake_no_bake);
    console.log('No-Bake Cakes:', cakeNoBake);

    const [veganJapanese] = await connection.execute(query_vegan_japanese);
    console.log('Vegan Japanese Recipes:', veganJapanese);
} catch (error) {
    console.error('Error executing query:', error.message);
}

connection.end();
