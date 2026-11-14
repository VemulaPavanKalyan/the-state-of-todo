Exactly! You've understood the main concept. Just one small correction.

fetch() does not require an external API. It requires an HTTP endpoint (a server URL) that can receive requests.

That server can be:
1. An external API — JSONPlaceholder, GitHub API, etc.
2. Your own backend — Node.js, Python Flask, Java Spring Boot, etc.
3. A locally running server — for example, http://localhost:3000.
What can fetch() do?
Task	fetch()
Retrieve API data	Yes
Send data using POST	Yes
Update data using PATCH/PUT	Yes
Delete data using DELETE	Yes
Directly edit local JSON files	No
Directly read arbitrary local files	No

Remember this distinction
- fetch() → Communicates over HTTP.
- Node.js → Executes JavaScript on the server and can access files.
- fs → Handles file operations in Node.js.
One interesting exception: browsers can access user-selected files through APIs such as the File API, and sometimes the File System Access API with permission. But that's different from freely accessing files on your computer.

Our learning sequence: Fetch API → CRUD operations → Async/Await → Node.js → File handling → Build our own Todo API.

You're getting the right idea!

## **What have we implemented?**

GET

**Load Todos**

Retrieve 10 tasks from the API.

POST

**Add Todo**

Send a new task to the API.

PATCH

**Complete Todo**

Update the completed status.

DELETE

**Delete Todo**

Send a deletion request.

## **Important: Understand these three things**

**1.&#x20;**`JSON.stringify()`

Converts a JavaScript object into a JSON string so we can send it in an HTTP request.

**2.&#x20;**`response.json()`

Converts the JSON response received from the server into JavaScript data.

**3.&#x20;**`async/await`

Allows us to write asynchronous API requests in a readable way.

## **One limitation**

JSONPlaceholder is a fake REST API. POST, PATCH and DELETE return simulated successful responses, but they don't permanently save your changes. So newly added or modified tasks will disappear or revert after reloading the page.

That's expected for this exercise.

## **Your assignment**

Run this using VS Code Live Server and test:

1. Are 10 todos loading?
2. Can you add a task?
3. Can you mark it completed?
4. Can you delete it?
5. What happens when you refresh?

**Don't try to memorize this entire script.** We will understand each function individually, especially how `fetch()`, `async/await`, and HTTP methods work.