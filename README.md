# Food-My-Thought
The A to Z plan for this web-app is in the Food My Thought.docx. However, I am marking a handful of issues as "Good First Issues". Thus, I presumibally should provide a rough outline of this app.

Eventually, this app shall be beseech strangers on the internet for recipies to use up all the leftover food they have in their Kitchen.

However, before that, this program first needs to be able to list all the food a prospective user has in their kitchen.

A user gets granted a Larder upon Logging in. With such a Larder, they can list all the food they currently have, along with their estimated expiration date, and their values for two user-defined categories.

# Program Start-up 
The front-end is in React. The back-end is in Django. In order for all of the features of this program to be present, both React & Django have to be running at the same time.
Normally, this requires 2 different powershells running two different commands: 
One powershell open in FMTBackEnd, running the django server (Command: " python manage.py runserver 8080 " [The 8080 is optional. Django defaults to 8000. I switched to 8080 in the hopes of enabling https connection, but didn't switch back after my hopes were dashed.])
Another powershell open in FMTFrontEnd, running React (Command: " npm start ")

Opening 2 powershells, remembering the respective commands, and typing them manually is a bit too labour-intensive. Thus, one may run
# RunBoth.bat
instead. 
After running this, you have one powershell running the react server, the front-end open in the browser tab, and a powershell running the django server, from which one can observe the HTTP requests sent to said django server.
Django doesn't automatically open a browser tab (it's a server, after all), but if you go to http://localhost:8080/ , you can view the debug page. At least if you have DEBUG = True in FMTBackAppManager\settings.py .

# .env Variable
You've followed the instructions above, only for the login page to not work. Nor does anything back-end related work, for that matter. 
For testing, React calls Django, on port 8080 ( http://127.0.0.1:8080 , AKA localhost:8080 ). Manually Writing " [127.0.0.1](http://127.0.0.1:8080) " every location I want to query Django is a non-starter.
It'll mean I have to grep my React if my preferred port fluctuates. Instead, React uses the environmental Variable " REACT_APP_DJANGO_ORIGIN ".

Environmental variables are defined in the .env . My .env is .gitignored, as per convention (.envs have a tendancy to include more sensitive data than just the back-end localhost port number. For example, it could contain the back-end non-localhost url.). 
As for .envs, I got mine, so screw you!

What happens if you don't have a .env? The environmental variable " REACT_APP_DJANGO_ORIGIN " is undefined, so React queries "http://localhost:3000/undefined/" every time it should call Django. React gives its'self a high-five, and calls the job done.

Thus, before expecting this program to work, you should add a .env file to FMTFrontEnd , which defines REACT_APP_DJANGO_ORIGIN as http://127.0.0.1:8080
