# elearn
[View App](https://elearn.herokuapp.com)

> An online education platform for learning and upskilling
# User stories
- User signup
- User login
- Identify loggedIn User as student || teacher
- Teacher can CRUD courses 
- Teacher CRUD lessons for courses
- User view courses 
    - by category
    - by ID
- User enroll for courses
- User goes to classroom and starts learning

# API DOCs
> success returns status in the 2xx range

> Pick what you wnat from the data
- User sign up
> POST 201 /api/signup
<pre><code>
{
	"name": "Test Tester",
	"email": "test@test.com",
	"password": "123456"
}
</code></pre>
Response:
<pre><code>
{
  "status": true,
  "message": "User signup successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjUyZGQ4MGFhODRkMWI1MGFmMmQ1NiIsImlhdCI6MTU4ODkzMzA1OSwiZXhwIjoxNTg5MTQ5MDU5fQ.Zw1F79RsrwXOLJi8HgNuqjSvEvjINvQ494O_JNzRi-A"
}
</code></pre> 

- User login up
> POST 200 /api/login
<pre><code>
{
	"email": "test@test.com",
	"password": "123456"
}
</code></pre>
Response:
<pre><code>
{
  "status": true,
  "message": "User login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjUyZGQ4MGFhODRkMWI1MGFmMmQ1NiIsImlhdCI6MTU4ODkzMzA1OSwiZXhwIjoxNTg5MTQ5MDU5fQ.Zw1F79RsrwXOLJi8HgNuqjSvEvjINvQ494O_JNzRi-A"
}
</code></pre> 

- Get user by token
> GET 200 private /api/auth
<pre><code>
Headers:
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjUyZGQ4MGFhODRkMWI1MGFmMmQ1NiIsImF1dGgiOltdLCJpYXQiOjE1ODg5NDA4NjUsImV4cCI6MTU4OTE1Njg2NX0.d6aN6SSUAQONdR59DnmDYVhnYlRFtUX5G3fyF_6SaQc
</code></pre>
Response:
<pre><code>
{
  "status": true,
  "message": "User records",
  "data": {
    "id": "5eb52dd80aa84d1b50af2d56",
    "name": "Test Tester",
    "email": "test@test.com",
    "avartar": "",
    "auth": []
  }
}
</code></pre> 

- Admin Assign new roles to users
> PUT 200 private /api/users/:userId
<pre><code>
Body: 
{
	"action": {
		"type": "BECOME_ADMIN" //REMOVE_TEACHER
	}
}
</code></pre>
Response:
<pre><code>
{
  "status": true,
  "meesage": "Auth roles adjusted",
  "data": {
    "avartar": "",
    "auth": [
      "student",
      "admin",
      "teacher" //has teacher
    ],
   .
   .
  }
}
</code></pre>

- Assign/Unassign admin roles to a users
> PUT private  /api/users/admin/:userId
<pre><code>
{
	"action": {
		"type": "TOGGLE_ADMIN"
	}
}
</code></pre>
Response:
<pre><code>
{
  "status": true,
  "meesage": "Admin roles adjusted",
  "data": {
    "avartar": "",
    "auth": [
      "student",
      "admin" //is toggled
    ],
    .
    .
    "_id": "5eb6b3efd8d31402102895e9",
    
  }
}
</code></pre>

# Screenshot
<img src='./screenshot.png' alt='Application screenshot'>

# Resources
- []()

# CHANGELOG