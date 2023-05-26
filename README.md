
# Twitter Clone
### Problem Definition

"How can I develop a Twitter clone using React JS and Firebase?"

### Project Description

We (Webdevelopment students at IBA, Kolding) were tasked to let our minds free. We had all the freedom in the world to make anything we wanted (webdevelopment related of course). I chose to make a Twitter Clone, diving into new territory, using React JS and Firebase. Two "libraries" that I have never worked with before. It went about as well as expected (okay, maybe a lot worse).



## Sources/help

 - [React](https://react.dev/)
 - [Firebase](https://firebase.google.com/docs)
 - [Tailwind CSS](https://tailwindcss.com/ )
 - [Web Dev Simpllified - YouTube](https://www.youtube.com/@WebDevSimplified )
 - [Stackoverflow](https://stackoverflow.com/)
  - [UUID](https://www.npmjs.com/package/uuid )


## Installation

Prerequisites/Get Started


```bash
  npm install
  cd twitter-clone
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_STORAGE_BUCKET`

`VITE_FIREBASE_MESSAGING_SNEDING_ID`

`VITE_FIREBASE_APP_ID`

## My thoughts on the project/What I have learned

I have learnt the basics concepts of React JS and Firebase. This project was supposed to be a "React JS Course" for myself, but Firebase ended up being the biggest hurdle of them all. I wish I had spent more time researching NoSQL databases, but the authentication features of Firebase baited me into using it. I could have used Supabase, which I know is easier to work with, but thanks to this project, I now know how to use Firebase somewhat.

React JS is a fantastic frontend framework, and once I got the hang of it, I knew it like the back of my hand. I do have to keep in mind that I still only know the basics, but that was enough to almost get me through the project


If I had done my research, I would have known that my database structure just wouldn't work in Firebase.

### The project is almost done. This is what I didn't have time to implement/get to work/bugs:

- Deleting a user using the "apps" "Delete Account" function does not delete the users comments

- You cannot follow anyone. This feature wasn't implemented because of Firebase complications

- Clicking on a new comment does nothing

- You cannot delete comments due to the bad database infrastructure
