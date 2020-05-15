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
> private routes require x-auth-token Headers

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

- Admin can create courses
> POST 201 /api/courses
<pre><code>
{
	"title": "Hi course",
	"description": "Hi desc",
	"categoryId": "5eb907e1b6c5ed16a87d4327"
}
</code></pre>
Response: 
<pre><code>
{
  "status": true,
  "message": "new course created",
  "data": {
    "price": "free",
    "published": false,
    "_id": "5ebbd6a9c6a5912828544b52",
    "userId": "5eb6b3efd8d31402102895e9",
    "title": "Hi course",
    "description": "Hi desc",
    "categoryId": "5eb907e1b6c5ed16a87d4327",
    "lessons": [],
    "createdAt": "2020-05-13T11:14:49.028Z",
    "updatedAt": "2020-05-13T11:14:49.028Z",
    "__v": 0
  }
}
</code></pre>

- Admin can edit courses
> PUT 200 private /api/courses/:courseId
<pre><code>
{
	"title": "Hi course",
	"description": "Hi desc",
	"categoryId": "5eb907e1b6c5ed16a87d4327"
}
</code></pre>
Response: 
<pre><code>
{
  "status": true,
  "message": "new course updated",
  "data": {
    ...
  }
}
</code></pre>

- Admin can delete courses
> DELETE 200 private /api/courses/:courseId
<pre><code>

</code></pre>
Response: 
<pre><code>
{
  "status": true,
  "message": " course deleted"
}
</code></pre>

- List all courses
> GEt 200 /api/courses
<pre><code>
</code></pre>
Response: 
<pre><code>
{
  "status": true,
  "message": "all courses",
  "data": [{
    ...
  }]
}
</code></pre>

- Admin can create category
> POST 201 /api/category/
<pre><code>
{
	"title": "Hi course",
	"description": "Hi desc",
	"category_image": file/link
}
</code></pre>
Response: 
<pre><code>
{
  "status": true,
  "message": "Category created",
  "data": {
    "_id": "5ebbdea4683b6e23f420d1e4",
    "title": "My categorycloud",
    "description": "Hi category cloud",
    "image": {
      "imageUrl": "https://res.cloudinary.com/sechibueze/image/upload/v1589370530/ijppu0gf07d9upn5v4fs.png",
      "publicId": "ijppu0gf07d9upn5v4fs"
    },
    "createdAt": "2020-05-13T11:48:52.955Z",
    "updatedAt": "2020-05-13T11:48:52.955Z",
    "__v": 0
  }
}
</code></pre>


- Admin can edit category
> PUT 200 /api/category/categoryId
<pre><code>
{
	"title": "Hi course",
	"description": "Hi desc",
	"category_image": file/link
}
</code></pre>
Response: 
<pre><code>
{
  "status": true,
  "message": "Category created",
  "data": {
    "_id": 
}
</code></pre>

- Admin can delete category
> DELETE 200 /api/category/categoryId
<pre><code>

</code></pre>
Response: 
<pre><code>
{
  "status": true,
  "message": "Category deleted"
}
</code></pre>

- Admin can list all category
> GET 200 /api/category/
<pre><code>

</code></pre>
Response: 
<pre><code>
{
  "status": true,
  "message": "Categories",
  "data": [
    {
    }
  ]
}
</code></pre>

- Admin can add lesson to a course
> POST 201 /api/courses/:courseId/lessons/
<pre><code>
{
  type: String,
  note: String,
  content: file/url
}
</code></pre>
Response: Resturns the course
<pre><code>
{
  "status": true,
  "message": "Lesson created",
  "data": {
    "price": "free",
    "published": false,
    "_id": "5ebbd6a9c6a5912828544b52",
    "userId": "5eb6b3efd8d31402102895e9",
    "title": "Hi course",
    "description": "Hi desc",
    "categoryId": "5eb907e1b6c5ed16a87d4327",
    "lessons": [
      {
        "type": "image",
        "access": "public",
        "_id": "5ebbd6dac6a5912828544b53",
        "content": {
          "publicId": "vvkgsmagg4qdn0tt54v2",
          "lessonUrl": "https://res.cloudinary.com/sechibueze/image/upload/v1589368535/vvkgsmagg4qdn0tt54v2.png"
        },
        "note": "lesson content edit"
      }
    ],
    "createdAt": "2020-05-13T11:14:49.028Z",
    "updatedAt": "2020-05-13T11:15:38.280Z",
    "__v": 1
  }
}
</code></pre>

- Admin can edit lesson to a course
> PUT 200 /api/courses/:courseId/lessons/:lessonId
<pre><code>
{
  type: String,
  note: String,
  content: file/url
}
</code></pre>
Response: Resturns the course
<pre><code>
{
  "status": true,
  "message": "Lesson created",
  "data": {
    <!-- returns the edited course -->
  }
}
</code></pre>

- Admin can delete lesson to a course
> DELETE 200 /api/courses/:courseId/lessons/:lessonId
<pre><code>

</code></pre>
Response: Resturns the course
<pre><code>
{
  "status": true,
  "message": "Lesson created",
  "data": {
    <!-- returns the edited course -->
  }
}
</code></pre>
# Screenshot
<img src='./screenshot.png' alt='Application screenshot'>

# Resources
- []()

# CHANGELOG