# snakeGameWithLeaderboard
Basic snake game with integrated leaderboard functionality. Using HTML, CSS and Javascipt to create the frontend. Using MongoDB and monk to create the backend. 

You need to have a MongoDB database with the desired number of entries for the leaderboard already created on your computer. The code effectively just replaces the worst score on the leaderboard with any scores that make it onto the leaderboard to save memory. 

Most of the code for the snake game can be found in views/snake.ejs. To run the game, just go to a folder with these files and run the command 'npm start' (you need to have npm installed). 
