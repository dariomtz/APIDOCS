# Open API Docs

Open API Docs is the place the website to host your API documentation. Designed to easily document your project and instantly share with others.

## How to contribute?

### Running the project in your computer

1. Install the [Firebase Command Line Interface](https://firebase.google.com/docs/cli).

2. Create a new Firebase Project in [the Firebase console](https://console.firebase.google.com/).

3. Fork this repository and clone it to your computer.
 
3. Using Terminal or Cmd, navigate to the location of the project and run the following commands:

  > firebase login
  >
  > firebase init
  
4. Choose the Firebase project you just created in the console.

5. Then, pick Firebase Hosting and Firebase Functions.

6. Chose public as your public directory. 

7. Install npm dependecies.

8. Delete all HTML files from the project directory.

9. .Run your project by typing:

  >firebase serve --only hosting,functions --host 0.0.0.0

If you have any problems following the previous steps, let us know by submiting an issue.

### About the project

#### Core concepts:

+ User: The user creates projects and can have as many as he or she wants.

+ Project: The project has the main information of the documentation.

+ Resource: A resource represents a data structure of the API. Can have many endpoints.

+ Endpoint: An endpoint represents a specific form of comunicating with the API. They specify how to interact and how to modify the data.

#### About the Model View Controller design

The `Model`, `View` and `Controller` classes are abstract, meaning they should not be instanciated. Instead, another class must extend them.

##### Model

It is the data structure that directly communicates with the database. It is also in charge of validating the input it receives from the `Controller`. 

To understand how to implement a class that extends `Model`, read the documentation in its file at `public/Model.js`.

##### View

It is the user interface. The way the user sees the information.

To understand how to implement a class that extends `View`, read the documentation in its file at `public/View.js`.

##### Controller

It is the handler of the input from the user. It sends the input to the model and shows the user when something in the input is wrong. In this case, all controllers are forms.

To understand how to implement a class that extends `Controller`, read the documentation in its file at `public/Controller.js`.

##### Showable

Also, the `View` and `Controller` classes are "showable" objects, meaning that they have to be render on the page. Therefore, they inherit from another abstract class, called `Showable`.

To properly understand how to implement a class that extends `Showable`, which includes any class that inherits from `View` and `Controller`,  read the documentation in its file at `public/Showable.js`.
