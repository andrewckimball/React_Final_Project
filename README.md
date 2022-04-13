# IS 542 React App - Final Project

This application is built using React for the frontend and Fast API for the backend API. This app allows the user to search among the 100 United States senators and view a summary biography from Wikipedia and the location of the capital city of the state the senator represents. The marker icon can be selected to view a summary of the capital city, pulled from Wikipedia's public API. In addition to searching for a particular senator, the applicaion also allows the user to toggle the sliding checkbox to write a Tweet (maximum 280 characters) that a pre trained machine learning model will process and use to predict the author. This machine learning model was trained on over 50,000 tweets from the accounts of all 100 US senators, and is deployed in the backend of the application. Once a custom tweet is entered and submitted, the model will guess the most likely author among all 100 senators, and pull up the relevant information regarding the predicted senator.


To run the application locally, enter into the backend_api folder and run 'uvicorn main:app --reload' in the terminal. Open a new terminal, enter into the react-app folder, install node modules ('npm install node modules'), and run 'npm start'. This will redirect you to a browser where you can interact with the application.

To see the project running on a live server, nagivate to https://main.d2w10j7wwyg83i.amplifyapp.com/.


