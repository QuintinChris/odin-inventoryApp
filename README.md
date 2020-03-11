# Objectives from The Odin Project:

### Before you begin, take a moment to write down all of the models you’ll need and the fields that should go in them. It might help to grab a pencil and some paper and literally draw a diagram like you saw in the MDN tutorial on databases. - Items should at least have: a name, description, category, price, number-in-stock and URL, though you should feel free to add more fields if it seems relevant to the type of business you’ve chosen. - Categories should at least have a name, a description and a URL.
- [X] Complete

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



### We’re going to follow the basic path that was demonstrated by the MDN tutorial to set up and flesh out your app, so first choose a templating language and generate the boilerplate skeleton with express-generator.
- [X] Complete

### Create a new Mongo Collection using the web-interface as demonstrated in the tutorial and then 
- [X] Complete

### Set up your database schemas and models.
- [X] Complete

In the Library tutorial you populated your database with some sample data that was provided in a populatedb.js file. Actually understanding how that worked was over your head at the time, but now that you’ve finished that tutorial you’ll be able to understand how it works. Download the file here and edit it, or re-write it using the specifics of your models and then run it to populate your database!
- Getting errors, think ability to add images should be implemented first

### Set up the routes and controllers you’re going to need.
- [X] Create routes
- [X] Create controllers

### Create all of the ‘READ’ views (i.e. view category, and view item)
- [X] Create views

Create all the forms and build out the controllers you need for the rest of the CRUD actions.
- [ ] Create form views
- [ ] Create form controllers 
- [ ] Create Shoe, Edit Shoe, Delete shoe
- For now. make it so anyone could do it. Later we'll add auth.

EXTRA CREDIT: For bonus points, try to figure out how to add and upload images for each item. Use this middleware which was created by the Express team. The documentation in the README there should be enough to get you going.
- [ ] Add methods and views to upload photo

EXTRA CREDIT: We will learn about creating users with secure passwords in a later lesson, but for now we don’t want just anyone to be able to delete and edit items in our inventory! Figure out how to protect destructive actions (like deleting and updating) by making users enter a secret admin password to confirm the action.
- [ ] Add admin authentication/authorization

Deploy it and show off what you’ve done!
- [ ] Deployed

## Stretch Goals:

Add Favorites
- Ability to sort through, create folders / collection like pinterest
- Closet
  - name
  - username
  - password
  - favorites
  - profilePic

Add Seach Method

Add filters to search (most popular, latest release, etc)

Add "player" category (like genre, but for sneakers belonging to a specific player + brand)

Add styling (Sass)

Make store like (add instock, sizes, and prices)
