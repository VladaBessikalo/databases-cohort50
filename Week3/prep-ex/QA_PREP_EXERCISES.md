# Prep exercise week 3

As a preparation step for the upcoming Q&A, you need to work on the following exercise, which is based on the prep
exercise of the previous week.

## Exercise

Last week you created an ERD for the database for storing food recipes.
How can you normalize your database based on what you learned this week?
In particular, try answering following questions and provide table definitions from the last week
and this week to explain the changes.

-   Was your database already in 2NF / 3 NF?

Answer: Yes.

2NF (Second Normal Form):

1. All non-key columns are fully dependent on the primary key.
2. Composite keys (e.g., in recipe_category, recipe_ingredients, and recipe_steps) ensure that attributes depend on the full key, not just part of it.
3. Example: recipe_id and category_id together form the primary key in recipe_category, and no other data in the table depends on only one part of the composite key.

3NF (Third Normal Form):

1. There are no transitive dependencies, no non-key attribute depends on another non-key attribute.
2. Example: The recipe table has no columns like category_name because those are stored in the category table and connected via foreign keys.

-   What changes did you have to do to normalize your database?

Answer: No changes.
Only added constraint to the recipe_steps table to enforce that each recipe can only have one step per step_order. This avoids duplicate or inconsistent step orders:
CONSTRAINT unique_step_order UNIQUE (recipe_id, step_order)

## Discussion

-   If you want to add thousands of recipes to your database, what challenges do you foresee?
-   Try to write answers to these questions in text, provide queries and commands when necessary.

As the database grows, querying large datasets can become slow.
Adding indexes on frequently queried columns like name or category_id can speed up search operations:

CREATE INDEX idx_recipe_name ON recipe(name)

CREATE INDEX idx_category_name ON category(name)
