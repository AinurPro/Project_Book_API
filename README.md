# Project_Book_API
A Project_Book API allows the user to users Schema. User receives a Token at the header and can access the books at the endpoint, also can get/ post/delete the book with id.
The API protects API with a hashed password. 

## Tech Stack
Server: Node, Express

Database: Mongo DB

Tools: Mongoose

##Environment Variables

In order to run the Book_API project, you need to add the environment variables to .env file

MONGODB_URI
JWT_SECRET
SALT

## Run Locally
Clone the project You must follow all steps and have all dependencies in order to run the project locally.
git clone 

Go to the project directory
cd 

Install dependencies
npm init -y

npm i:

-bcrypt
-dotenv
-express
-helmet
-jsonwebtoken
-mongoose
-morgan
Routes
Endpoints, Parameters, Schema
server -app.get('/') returns message "API up"

Auth('/auth') creates Login
userRouter.post('/'): create Users, userSchema is used, password is hashed
booksRouter.get('/'): create, reads, reads by id, updates and deletes books, booksSchema is used 
authRouter('/'): creates login

### User Schema:

username: type: String, required: true,
email:type: String, required: true,
birthday: type: Number, required: true,
age: type: Number
password:type: String, required: true

### Books Schema:

username: type: String, require: true
created_by:type: String, required: true,
created_at: type: String, required: true,
book_title: type: String, required: true,
book_content: type: String, required: true,


### Middleware

authMiddleware: it takes token from the header and is used to protect the routes
