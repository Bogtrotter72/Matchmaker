# Milestone Project 2
 
The game was designed to fulfill several key goals. Above all else, as a game it should be entertaining; it should involve elements of play and fun.  Nevertheless, the game was born from an idea to produce a game that would also help improve spatial reasoning abilties; subsequently improving performance during psychometric testing.  Finally, the game hopes to serve as a display of my work to potential employers and collaborators.

Playful imagery, animations and sounds were selected as a means to satisfy the primary goal.

In order to create an engaging way to improve spatial reasoning abilities, a relatively simple model was chosen as the beginner stage, providing a correspondingly low entry level.  Complexity increases in later stages by first altering the axes upon which the image is mirrored and then introducing an aspect of three-dimensionality.  As the images are loaded dynamically, they can be exchanged at any point by the developer to respond to user demands.

The incorporation of HTML, CSS and JavaScript elements, in an organised, well-structured manner should satisfy the last goal of displaying the developers's talents as a junior web / game developer.
 
*** 
### Website
 
The game can be viewed and played [here]( https://bogtrotter72.github.io/Matchmaker/)

![Psychometric Match Demo](https://res.cloudinary.com/bogtrotter72/image/upload/v1582293116/Milestone%202/Final%20Images/Demo_enlolm.png)

***
## UX 

### Strategy & Planning
The UX design process centres on a mobile-first design.  As the focal point is the gameboard, all elements are centred on screen and the background is relatively nondescript. Nevertheless, the background is designed to subtly mirror the block graphic used in the game.  Card colors are soft and contrasting and were chosen from opposing sides of the colour wheel to ensure maximum contrast and minimal interference; the player should be able to focus on the objects in the game.

The opening animated character and title were chosen to signify that the game is a mental game, with a relationship to psychometric testing.

A simple geometric shape was chosen that, from the outset, is suggestive of a three-dimensional environment - a feature that becomes more obvious in the advanced level.

The 'Start Game' button has been given the bootstrap default 'btn-success' class, as green is suggestive of Go; the buttons for the level select feature have been given traffic light colours: 'btn-success', 'btn-warning', 'btn-danger' to reinforce the idea of pattern, of increasing difficulty, while offering something that users might also find familiar.

The overall green colour scheme provides a sense of relaxation, growth, success and youth.  (see <a href="https://www.amazon.com/Color-Design-Workbook-World-Graphic/dp/1592534333">Color Design Workbook</a> by Sean Adams, et. al.
(2008, p.28)).  For this reason, green was also chosen for the geometric image used on the cards.

#### User Stories
* As a player / user I want an entertaining, challenging and playful way to test and improve my spatial reasoning and awareness abilities. 
* As a talent acquisition specialist or freelance developer (collaborator), I am looking for evidence of the developer's skill level in responsive Front-End technologies.
* As a novice developer, I am looking for a platform to showcase my artistic (game design and graphics) and programming (use of HTML, CSS, JavaScript & jQuery) abilities. 

#### Research & Prioritization
There are a vast number of JavaScript libraries and frameworks available.
At project inception, it was therefore, deemed prudent to research a number of these, e.g.: P5.js; Babylon.js; Three.js; Phaser.js; Tone.js; WebGL.

That said, at the core of all the goals is a much simpler goal; a functioning game.  Priority was therefore given over to simple, clear, functioning code.  As the game seeks to reference spatial reasoning tests, some time was spent investigating the type of imagery used in these tests - resulting in the choice of a simple, geometric, three-dimensional shape.

Finally, in order to demonstrate an understanding of JavaScript and game design, means were sought by which the code would provide a game that could be easily expanded in future iterations.

### Scope
The scope centred around creating a core game framework that could, at a later date, be expanded upon to include more complex features.  The use of image arrays and the dynamic assignment of images are indicative of the developer's foundational work in creating such a framework.

* A landing screen that has a clearly identifiable image and text to identify the game and suggest its niche, and a clear indicator that it is the game start screen
* The ability for players to quickly access the game board
* A modal display to outline the game rules - also functioning as a game pause screen
* A beginner, intermediate and advanced level
* A modal display to allow the player to select the board levels - also functioning as a game pause screen
* An icon to allow the player to mute audio
* A button to restart the game on game completion
* A button to quit the game on game completion
* A clutter-free, minimalistic design to allow the player to concentrate on the game board.

### Structure
Considering the nature of the game, it was clear that using separate pages for each element (particularly the different levels) would be inefficient - considering load times, etc.  All game features were, therefore, consolidated into a single page website.

The game board is visible throughout the entire game and maintains a central position in the screen - clearly defining the nature of the website. 

Design elements are kept to a minimum, with modals being used to provide the player with additional information / features.  As game pausing is achieved through opening these modals, a button with this functionality was considered superfluous.  As the player can also quit the game at game end or by simply closing their browser, a button with this functionallity was also considered unnecessary. 

Visual and audio feedback for the player is provided in simple, recognizable forms (e.g. a simple shake and accompanying sound to indicate no match).  The Bootstrap buttons provide user feedback on click events.  All animations are suggestive of a card being turned over and are also used to provide a sense of continuity.  Each time a game is started, restarted or on level select, the same animation and game start audio inform the user that the game is starting and gives them sufficient time to prepare.

### Skeleton

The initial design (below), in practice, served more as an idea's platform or board.  As is apparent in the final design, the first four screens were incorporated into the main page and hidden until required.

A pdf of the wireframes is available [here](https://res.cloudinary.com/bogtrotter72/image/upload/v1582474102/Milestone%202/Final%20Images/Card_Match_Game2_uhqkzf.pdf)

The wireframes were constructed with a mobile platform in mind, however, it was clear that there would be little difficult in scaling the game board for tablet, laptop or desktop devices.

### Surface
As stated, the look of the game is purposefully designed to be relaxing yet playful.  This conscious design decision was made in an attempt to counteract the stress of preparing for tests.

### Design Decisions
The font was chosen to suggest an element of play.  The choice of a simple geometric shape was made following a trial with complex block shapes in three-dimensional space.  Test subjects found the game too difficult and were therefore not encouraged to explore the game further.  More accessible designs were developed in response to this feedback.

***
## Features
### Existing features
* **Rules & Select level** - The Rules and Select Level modals utilize Bootstrap features to disable the game screen.  The buttons to open the modals are disabled at appropriate times in order to prevent bugs with the timer function.
* **Sound / Mute** - The sound / mute icons provide the player with the ability to play the game with or without sound effects.
* **Time & Moves** - The Time and Moves displays provide the player the means of tracking their progress in the game.  
* **Animation & Sounds** - The animations and sounds further enhance the sense of play and, as a game feature, give the player essential feedback on their interactions as well as subtly reflecting their performance (match, no match, game win).
* **Game Win** - The Game Win screen presents the player with their score and the option to continue or quit the game.
* **Game Score** - The game scoring method is based on the number of cards in the game, the number of clicks and the time taken to complete a board.  In addition, the player is awarded a multiplier bonus for choosing more difficult levels - in anticipation of the level taking more time to solve.

### Planned features 
* Dynamic assignment of card backface images (allocate different images to the background dependent on the level selected).
* More complex levels / sub-levels (Master and Psychomaster levels) which increasingly mirror challenges used in psychometric testing.
* More advanced animations to provide improved player feedback.
* A leaderboard where players could compete against themselves (possible expansion / integration with other sites to allow sharing of scores with friends, etc.).
* With the inclusion of other technologies, it would be possible to develop the game so that it:
  * would be available to those using assistive technologies
  * offer a modicum of artificial intelligence, increasing or decreasing the level of difficulty dependent on player performance

***
## Technologies Used
* [HTML](https://en.wikipedia.org/wiki/HTML) - Main language used to structure the page.
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - Providing styling for the site.
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript) - Adding functionality to the skill circles, as well as 'on click', 'hidden' and 'scroll'. 
* [JQuery](https://jquery.com/) - Supporting library for much of the JavaScript functionality. 
* [Google fonts](https://fonts.google.com/) - For fancy game fonts (signs & popups etc)
* [Blender](https://www.blender.org/) - Creating graphics
* [Balsamiq](https://balsamiq.com/) - Creating wireframes 

***
## Testing 

### General Testing
The final *style.css* file was passed through the <a href="https://jigsaw.w3.org/css-validator/">W3C CSS Validation Service</a>.
All HTML files were passed through the <a href="https://validator.w3.org/">W3C Markup Validation Service</a>.
The files passed with no errors.

### Manual Testing
Throughtout the project, the console window was used extensively, in combination with console.log statements in the code, to check feedback from all user interactions.

All clickable elements were thoroughly tested, in order to identify any bugs that might occur through multiple function calls, double-click events, etc.

The appearance and performance of the game was checked by the developer on multiple devices, including desktop, laptop and mobile screens.  Friends and family also tested the game on mobile and desktop environments and provided verbal feedback.  The results of the initial feedback are most apparent in the deviation from the original wireframe design.  Users requested almost immediate game access and limited button clicks.

The website was also tested in the Blisk browser, on a variety of devices, including:
* Samsung Galaxy S5
* iPhone 5/SE
* iPhone 6/7/8
* iPhone X
* iPad
* iPad Pro

Chrome and Blisk developer tools were used for testing the site, and were of particular use in positioning the graphics, adjusting animation timings.

### Cross-Browser Compatability
The website was tested in the following browsers:
* Firefox
* Google Chrome
* Internet Explorer 11
* Google Chrome
* Microsoft Edge
* Opera

### Interesting bug - resolved
During testing, any attempt to reload the game created a bug which caused the second card of a matched pair to persist in memory so that, upon selecting another card, the card persisting in memory would be compared with it, found not to match and both cards would flip back to the starting position.  This would leave one card 'flipped' and ensure that the player could never complete a game.

Initially, this occurred after any game restart.  Following several attempts to resolve the issue, the bug was only evident if the game had been restarted twice.

A restructuring of the code was required to completely alleviate the issue.

### Interesting bug - resolved
During testing of the restructured code, short-spaced clicking of the start / restart button, immediately followed by opening and closing the modal windows in quick succession led to the timer attempting to display two timers.  If completed quickly enough, the time from the previous game could persist into a new game so that the timer would try to show time increments based on that timer, as well as attempting to display the timer for the new game board.

Adding short time delays to the code resolved the problem.
***
## Deployment
This site is hosted using Github pages, and is deployed directly from the master branch.
***

### Media

Favicon created at [favicon.io](https://favicon.io/favicon-converter/).

All the images for the game were designed by the developer, using Blender v2.81a with the exception of the opening graphic, which is an adaptation of a clipart image:
[Stick Man Thinking](https://www.clipartmax.com/middle/m2K9A0b1Z5Z5H7i8_stick-man-thinking-clipart-human-question-mark-png/).

All the sounds were adapted from open source sound files available from [Freesound](https://freesound.org/).

### Websites
* [Visual Studio Code](https://code.visualstudio.com/) - IDE and bug testing
* [Github](https://github.com/Bogtrotter72) - Code repository, website hosting & deployment


### Acknowledgements 
Thank you to my mentor for guiding me through the vast and complex world of JavaScript, and for keeping my feet on the ground.