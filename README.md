- Cloning the project for the first time:  
`npm install`  

- To run this project:  
`npm start`

  This will run the build script and start the node server afterwards.  

- To build this project:  
`npm run build`

  The bundle file is created as /public/javascripts/index_bundle.js and /views/index.html has a script tag to include the bundle file.

**To Test the sign in/up workflow:**  
1. Click the login menu at top right of screen.
2. Click the corresponding "Sign in" or "Sign up" button.
3. Fill in the required fields in the pop up window.(with validations)
4. Hit "Submit".
5. If successful, the pop up window will be closed. Clicking on the same login menu
will now display an avatar, the user's email address and a logout button.
6. Click "Logout" button to gain access to the sign in/up workflow again.