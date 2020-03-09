# Objectives from The Odin Project:

[X] Before you begin, take a moment to write down all of the models you’ll need and the fields that should go in them. It might help to grab a pencil and some paper and literally draw a diagram like you saw in the MDN tutorial on databases. - Items should at least have: a name, description, category, price, number-in-stock and URL, though you should feel free to add more fields if it seems relevant to the type of business you’ve chosen. - Categories should at least have a name, a description and a URL.

- Shoe
  - name
  - image
  - price
  - brand
  - inStock
  - URL
  - sizes
- Image
  - URL
  - Shoe
- Brand
  - name
  - logo
  - desc
  - shoes
  - url



[X] We’re going to follow the basic path that was demonstrated by the MDN tutorial to set up and flesh out your app, so first choose a templating language and generate the boilerplate skeleton with express-generator.

[X] Create a new Mongo Collection using the web-interface as demonstrated in the tutorial and then 

[X] set up your database schemas and models.

#### [ ] In the Library tutorial you populated your database with some sample data that was provided in a populatedb.js file. Actually understanding how that worked was over your head at the time, but now that you’ve finished that tutorial you’ll be able to understand how it works. Download the file here and edit it, or re-write it using the specifics of your models and then run it to populate your database!

**[ ] Set up the routes and controllers you’re going to need.**

**[ ] Create all of the ‘READ’ views (i.e. view category, and view item)**

**[ ] Create all the forms and build out the controllers you need for the rest of the CRUD actions.**

[ ] EXTRA CREDIT: For bonus points, try to figure out how to add and upload images for each item. Use this middleware which was created by the Express team. The documentation in the README there should be enough to get you going.

[ ] EXTRA CREDIT: We will learn about creating users with secure passwords in a later lesson, but for now we don’t want just anyone to be able to delete and edit items in our inventory! Figure out how to protect destructive actions (like deleting and updating) by making users enter a secret admin password to confirm the action.

[ ] Deploy it and show off what you’ve done!

## Stretch Goals:

Admin methods (create/delete shoe, brand)

Authenticate, add ability to favorite shoes
- Closet
  - name
  - username
  - password
  - favorites
  - profilePic

Add Favorites
- Ability to sort through, create folders / collection like pinterest

Add Seach Method

Add filters to search (most popular, latest release, etc)

Add "player" category (like genre, but for sneakers belonging to a specific player + brand)


