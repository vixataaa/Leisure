- # User
  - _id
  - username
  - passHash
  - join date
  - other information (birthday, join date, etc etc etc)
  - people followed - Array containing { username: username } objects
  - #### Handled by UserController(userData)
    - (Get profile) GET -> /users/:username
    - (Profile settings) GET -> /users/:username/settings
    - (Edit profile) POST -> /users/:username/settings
 
- # Status
  - _id
  - timeStamp
  - authorUsername
  - content
  - likes - Array containing { username: username } objects
  - comments - Array containing { author: username, timestamp: date, content: text } objects
  - #### Handled by StatusController(statusData)
    - (Like) POST -> /users/:username/:statusId/like
    - (Dislike) POST -> /users/:username/:statusId/dislike
    - (Add comment) POST -> /users/:username/:statusId/ **comment**
    - (Add status) POST -> /users/:username/posts
