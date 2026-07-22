# Wordly-SPA-Dictionary

Project Description
Wordly Dictionary SPA is a Single Page Application (SPA) built using HTML, CSS, JavaScript, Bootstrap, and the Free Dictionary API. The application allows users to search for English words and instantly view their meanings, pronunciation, examples, synonyms, and audio pronunciation without reloading the page.

Users can also save their favorite words, which are stored using Local Storage for future reference.

##Features
Search for English words
Display word definitions
Show pronunciation
Display part of speech
Show example sentences
Display synonyms
Play audio pronunciation (when available)
Save favorite words
Store favorites using Local Storage
Responsive and user-friendly interface
Error handling for invalid words or API failures
Tools & Resources
-Text editor or Integrated Development Environment (IDE), VS Code -GitHub -Public API: Free Dictionary APILinks to an external site.

API Used
Free Dictionary API https://dictionaryapi.dev/

-Development references like a CSS libraries(Bootstrap)

Project Structure
Wordly-SPA/

index.html# Application core framework and UI structural layer -style.css # Visual design system and light/dark theme rules
script.js # Fetch logic engine, state tracking, and event handlers
README.md # Technical project documentation and user guide

##How to Run the Project
Clone or download the repository.
Open the project folder in Visual Studio Code.
Open index.html in your preferred web browser.
Enter a word in the search box.
Click Search to display the word information.
##Overview & Objectives

--Asynchronous API Consumption: Requesting external data using fetch() and async/await syntax. --DOM Manipulation: Dynamically building, clearing, and appending DOM nodes based on JSON responses.

Document & Maintain
Git Version Control
--Initialize Git (only the first time):

bash git init

--Add all project files:

bash git add .

--Commit the files:

bash git commit -m "Initial commit - Wordly Dictionary SPA"

--Push the project to GitHub:

bash git branch -M main git push -u origin main

For future updates:

bash git add . git commit -m "Describe your changes" git push