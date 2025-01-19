import 'dotenv/config';

import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URL);

async function createDatabase() {
    try {
        await client.connect();
        const db = client.db('recipes');
        const collections = [
            {
                name: 'recipes',
                options: {
                    validator: {
                        $jsonSchema: {
                            bsonType: 'object',
                            required: ['name'],
                            properties: {
                                name: {
                                    bsonType: 'string',
                                    description:
                                        'Must be a string and is required'
                                },
                                categories: {
                                    bsonType: 'array',
                                    description:
                                        'Array of ObjectIds referencing categories'
                                },
                                ingredients: {
                                    bsonType: 'array',
                                    description:
                                        'Array of ObjectIds referencing ingredients'
                                },
                                steps: {
                                    bsonType: 'array',
                                    description:
                                        'Array of ObjectIds referencing steps'
                                }
                            }
                        }
                    }
                }
            },
            {
                name: 'categories',
                options: {
                    validator: {
                        $jsonSchema: {
                            bsonType: 'object',
                            required: ['name'],
                            properties: {
                                name: {
                                    bsonType: 'string',
                                    description:
                                        'Must be a string and is required'
                                }
                            }
                        }
                    }
                }
            },
            {
                name: 'ingredients',
                options: {
                    validator: {
                        $jsonSchema: {
                            bsonType: 'object',
                            required: ['name'],
                            properties: {
                                name: {
                                    bsonType: 'string',
                                    description:
                                        'Must be a string and is required'
                                }
                            }
                        }
                    }
                }
            },
            {
                name: 'steps',
                options: {
                    validator: {
                        $jsonSchema: {
                            bsonType: 'object',
                            required: ['description'],
                            properties: {
                                description: {
                                    bsonType: 'string',
                                    description:
                                        'Must be a string and is required'
                                }
                            }
                        }
                    }
                }
            }
        ];

        for (const { name, options } of collections) {
            const collectionExists = await db
                .listCollections({ name })
                .hasNext();
            if (!collectionExists) {
                await db.createCollection(name, options);
                console.log(`Collection '${name}' created.`);
            } else {
                console.log(`Collection '${name}' already exists.`);
            }
        }

        console.log('Database and collections are ready.');

        const categories = [
            { name: 'Cake' },
            { name: 'No-Bake' },
            { name: 'Vegetarian' },
            { name: 'Vegan' },
            { name: 'Gluten-Free' },
            { name: 'Japanese' }
        ];

        const ingredients = [
            { name: 'Condensed milk' },
            { name: 'Cream Cheese' },
            { name: 'Lemon Juice' },
            { name: 'Pie Crust' },
            { name: 'Cherry Jam' },
            { name: 'Brussels Sprouts' },
            { name: 'Sesame seeds' },
            { name: 'Pepper' },
            { name: 'Salt' },
            { name: 'Olive Oil' },
            { name: 'Macaroni' },
            { name: 'Butter' },
            { name: 'Flour' },
            { name: 'Milk' },
            { name: 'Shredded Cheddar cheese' },
            { name: 'Eggs' },
            { name: 'Soy sauce' },
            { name: 'Sugar' }
        ];

        const steps = [
            { description: 'Beat Cream Cheese' },
            { description: 'Add condensed Milk and blend' },
            { description: 'Add Lemon Juice and blend' },
            { description: 'Add the mix to the pie crust' },
            { description: 'Spread the Cherry Jam' },
            { description: 'Place in refrigerator for 3h' },
            { description: 'Preheat the oven' },
            { description: 'Mix the ingredients in a bowl' },
            { description: 'Spread the mix on baking sheet' },
            { description: 'Bake for 30 minutes' },
            { description: 'Cook Macaroni for 8 minutes' },
            { description: 'Melt butter in a saucepan' },
            { description: 'Add flour, salt, pepper and mix' },
            { description: 'Add Milk and mix' },
            { description: 'Cook until mix is smooth' },
            { description: 'Add cheddar cheese' },
            { description: 'Add the macaroni' },
            { description: 'Beat the eggs' },
            { description: 'Add soy sauce, sugar, and salt' },
            { description: 'Add oil to a saucepan' },
            { description: 'Bring to medium heat' },
            { description: 'Add some mix to the saucepan' },
            { description: 'Let it cook for 1 minute' },
            { description: 'Add oil to a saucepan' },
            { description: 'Add some mix to the saucepan' },
            { description: 'Let it cook for 1 minute' },
            { description: 'Remove pan from heat' }
        ];

        const insertData = async (collectionName, data) => {
            const collection = db.collection(collectionName);
            const existingData = await collection.countDocuments();
            if (existingData === 0) {
                await collection.insertMany(data);
                console.log(`Data inserted into '${collectionName}'.`);
            } else {
                console.log(
                    `Data already exists in '${collectionName}', skipping insertion.`
                );
            }
        };

        await insertData('categories', categories);
        await insertData('ingredients', ingredients);
        await insertData('steps', steps);

        const categoriesData = await db
            .collection('categories')
            .find()
            .toArray();
        const ingredientsData = await db
            .collection('ingredients')
            .find()
            .toArray();
        const stepsData = await db.collection('steps').find().toArray();

        const recipes = [
            {
                name: 'No-Bake Cheesecake',
                categories: [
                    categoriesData[0]._id,
                    categoriesData[1]._id,
                    categoriesData[2]._id
                ],
                ingredients: [
                    ingredientsData[0]._id,
                    ingredientsData[1]._id,
                    ingredients[2]._id,
                    ingredientsData[3]._id,
                    ingredientsData[4]._id
                ],
                steps: [
                    stepsData[0]._id,
                    stepsData[1]._id,
                    stepsData._id,
                    stepsData[3]._id,
                    stepsData[4]._id,
                    stepsData[5]._id
                ]
            },
            {
                name: 'Roasted Brussels Sprouts',
                categories: [categoriesData[3]._id, categoriesData[4]._id],
                ingredients: [
                    ingredientsData[5]._id,
                    ingredientsData[2]._id,
                    ingredientsData[6]._id,
                    ingredientsData[7]._id,
                    ingredientsData[8]._id,
                    ingredientsData[9]._id
                ],
                steps: [
                    stepsData[6]._id,
                    stepsData[7]._id,
                    stepsData[8]._id,
                    stepsData[9]._id
                ]
            },
            {
                name: 'Mac & Cheese',
                categories: [categoriesData[2]._id],
                ingredients: [
                    ingredientsData[10]._id,
                    ingredientsData[11]._id,
                    ingredientsData[12]._id,
                    ingredientsData[8]._id,
                    ingredientsData[7]._id,
                    ingredientsData[13]._id,
                    ingredientsData[14]._id
                ],
                steps: [
                    stepsData[10]._id,
                    stepsData[11]._id,
                    stepsData[12]._id,
                    stepsData[13]._id,
                    stepsData[14]._id,
                    stepsData[15]._id,
                    stepsData[16]._id
                ]
            },
            {
                name: 'Tamagoyaki Japanese Omelette',
                categories: [categoriesData[2]._id, categoriesData[5]._id],
                ingredients: [
                    ingredientsData[15]._id,
                    ingredientsData[16]._id,
                    ingredientsData[17]._id,
                    ingredientsData[8]._id,
                    ingredientsData[9]._id
                ],
                steps: [
                    stepsData[17]._id,
                    stepsData[18]._id,
                    stepsData[19]._id,
                    stepsData[20]._id,
                    stepsData[21]._id,
                    stepsData[22]._id,
                    stepsData[23]._id,
                    stepsData[24]._id,
                    stepsData[25]._id,
                    stepsData[26]._id
                ]
            }
        ];

        for (const recipe of recipes) {
            const existingRecipe = await db.collection('recipes').findOne({
                name: recipe.name
            });

            if (existingRecipe) {
                console.log(
                    `Recipe '${recipe.name}' already exists, skipping insertion.`
                );
            } else {
                await db.collection('recipes').insertOne(recipe);
                console.log(`Recipe '${recipe.name}' inserted.`);
            }
        }
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        await client.close();
    }
}

createDatabase();
