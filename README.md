My 12th mini-project! In this one I created a simple task manager that is a protected route, and implemented authentication with auth0. Most of the heavy lifting is done by auth0 so we can have a very light application!

There is a dashboard where you can create, edit, and delete tasks. I bundled the separate pages for create and edit into modals since I vastly prefer the look and functionality.  

I also added both a provider for auth context as well as a login page and logout button. All interface with auth0, and I am taking advantage of their hosted login to remove the need for separate pages for logout, password reset and sign up. 