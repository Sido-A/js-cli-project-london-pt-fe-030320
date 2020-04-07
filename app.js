const API = require("./lib/API");
const readlineSync = require("readline-sync");
const chalk = require("chalk");

// user choose a movie from the option
const chooseAMovie = (movies) => {
  // show list of each movies
  for (const movie of movies) {
    console.log(chalk.bold.blue(`- ${movie.id}: ${movie.title}`));
  }

  //user selection for movie
  console.log(" "); // blank between question
  const chooseOne = readlineSync.questionInt(
    chalk.bold("Choose the number of the movie you want to watch: ")
  );
  console.log(
    chalk.bold.yellow("----------------------------------------------")
  ); // blank between question

  // if the API can't find that movie from chooseOne input
  // run chooseABook again after warning
  const movie = API.read("movies", chooseOne);
  if (movie !== undefined) {
    return chooseATime(movies, chooseOne);
  } else {
    console.log(
      chalk.bold.red(`
    ***********************************
    * Sorry we don't have that option *
    * Please choose again from below  *
    ***********************************
    `)
    );

    return chooseAMovie(movies);
  }
};

let whatTime = [];

// user choose the screen time from the movie they have chosen
const chooseATime = (movies, chooseOne) => {
  for (const movie of movies) {
    if (movie.id === chooseOne) {
      // user selection for screen time
      whatTime = readlineSync.keyInSelect(
        movie.times,
        chalk.bold("What time do you want to watch?: ")
      );
      console.log(" "); // blank between question
    }
  }

  // cancel button go back to movie list
  if (whatTime === -1) {
    return chooseAMovie(movies);
  } // if time has been chose then go to select seat row
  else if (whatTime !== undefined) {
    return chooseARow(movies, chooseOne);
  }
};

// user selection for seat row
let whichRows = [];
const arrayRows = [];
const chooseARow = (movies, chooseOne) => {
  console.log(
    chalk.bold.yellow(`    
    ---------------------- SCREEN ----------------------- 

ROW  A:1 | A:2 | A:3 | A:4 | A:5 | A:6 | A:7 | A:8 | A:9
ROW  B:1 | B:2 | B:3 | B:4 | B:5 | B:6 | B:7 | B:8 | B:9
ROW  C:1 | C:2 | C:3 | C:4 | C:5 | C:6 | C:7 | C:8 | C:9
ROW  D:1 | D:2 | D:3 | D:4 | D:5 | D:6 | D:7 | D:8 | D:9

ROW  E:1 | E:2 | E:3 | E:4 | E:5 | E:6 | E:7 | E:8 | E:9
ROW  F:1 | F:2 | F:3 | F:4 | F:5 | F:6 | F:7 | F:8 | F:9
ROW  G:1 | G:2 | G:3 | G:4 | G:5 | G:6 | G:7 | G:8 | G:9
  `)
  );

  for (const movie of movies) {
    if (movie.id === chooseOne) {
      // show list of ROW
      const showRow = movie.seating.rows;
      for (let i = 0; i < showRow.length; i++) {
        const showRowElement = showRow[i];
        console.log(chalk.bold(`--> ${showRowElement}`));
      }

      //user selection for ROW
      console.log(
        chalk.bold.yellow("----------------------------------------------")
      ); // blank between question
      whichRows = readlineSync
        .question(chalk.bold.blue("Type the alphabet of the ROW you want : "))
        .toUpperCase();
      // console.log(whichRows)
      // console.log(arrayRows);

      // check if user typed ROW is valid == true case
      for (let i = 0; i < showRow.length; i++) {
        const showRowElement = showRow[i];

        // if user input alphabet is valid move to SEAT selection
        if (whichRows == showRowElement) {
          arrayRows.push(whichRows);
          return chooseASeat(movies, chooseOne);
        }
      }

      // check if user typed ROW is valid == false case
      for (let i = 0; i < showRow.length; i++) {
        const showRowElement = showRow[i];

        // if user input is not valid go back to ROW selection
        if (whichRows !== showRowElement) {
          console.log(
            chalk.bold.red(`

    ***********************************
    * Sorry we don't have that option *
    * Please choose again from below  *
    ***********************************`)
          );

          return chooseARow(movies, chooseOne);
        }
      }
    }
  }
};

// user selection for seat
let whichSeats = [];
const chooseASeat = (movies, chooseOne) => {
  console.log(
    chalk.bold.yellow(`


---------------------- SCREEN ------------------------ 
   
  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT 
   A:1 | A:2 | A:3 | A:4 | A:5 | A:6 | A:7 | A:8 | A:9
   B:1 | B:2 | B:3 | B:4 | B:5 | B:6 | B:7 | B:8 | B:9
   C:1 | C:2 | C:3 | C:4 | C:5 | C:6 | C:7 | C:8 | C:9
   D:1 | D:2 | D:3 | D:4 | D:5 | D:6 | D:7 | D:8 | D:9
   
   E:1 | E:2 | E:3 | E:4 | E:5 | E:6 | E:7 | E:8 | E:9
   F:1 | F:2 | F:3 | F:4 | F:5 | F:6 | F:7 | F:8 | F:9
   G:1 | G:2 | G:3 | G:4 | G:5 | G:6 | G:7 | G:8 | G:9
   `)
  );

  for (const movie of movies) {
    if (movie.id === chooseOne) {
      whichSeats = readlineSync.keyInSelect(
        movie.seating.seats,
        chalk.bold("Which SEAT do you want?: ")
      );
      return checkSoldTicket(movies, chooseOne);
    }
  }

  // cancel option, go back to movie list
  if (whichSeats === -1) {
    chooseAMovie(movies);
  }
};

const checkSoldTicket = (movies, chooseOne) => {
  for (const movie of movies) {
    if (movie.id === chooseOne) {
      //loop to check stored sold ticket
      const soldTicket = movie.ticketsSold;
      for (let i = 0; i < soldTicket.length; i++) {
        const soldTicketElement = soldTicket[i];
        //  console.log(soldTicketElement);  // return obj
        // console.log(soldTicketElement["seat"]);
        // console.log(soldTicketElement["seat"][0]);
        // console.log(soldTicketElement["seat"][1]);

        const storedTime = soldTicketElement["time"];

        const timeWhat = movie.times;
        for (let i = 0; i < timeWhat.length; i++) {
          // console.log(soldTicketElement);  // return obj
          console.log(soldTicketElement["seat"]);
          console.log(soldTicketElement["seat"][0]);
          // console.log(arrayRows);

          // console.log(soldTicketElement["seat"][1]);
          // console.log(whichSeats +1);

          // console.log(storedTime);
          // console.log(timeWhat[whatTime]);
          console.log(arrayRows);

          // if time& row& seat matches message SEAT TAKEN logged
          if (
            storedTime === timeWhat[whatTime] &&
            soldTicketElement["seat"][1] === whichSeats + 1 //&&

//*****************//when adding this it doesnt work************************** */
            // soldTicketElement["seat"][0] === arrayRows !!! Adding this line wont work
          ) {
            // && soldTicketElement["seat"][0] === arrayRows
            console.log(arrayRows);
            console.log(soldTicketElement["seat"]);

            console.log(`ST: ${storedTime}, TW: ${timeWhat[whatTime]}`);
            console.log(arrayRows);

            console.log(
              chalk.bold.red(`
                         This seat is already taken
                         Please choose another one
                         `)
            );

            return chooseARow(movies, chooseOne);
          } else {
            // if no match move to confirmation
            return confirmation(movies, chooseOne);
          }
        }
      }
      return confirmation(movies, chooseOne);
    }
  }
};

// user confirm, to check what user selected at very end
const confirmation = (movies, chooseOne) => {
  console.log(
    chalk.bold.yellow(`
  ---------------------- SCREEN ---------------------
              
  A:1 | A:2 | A:3 | A:4 | A:5 | A:6 | A:7 | A:8 | A:9
  B:1 | B:2 | B:3 | B:4 | B:5 | B:6 | B:7 | B:8 | B:9
  C:1 | C:2 | C:3 | C:4 | C:5 | C:6 | C:7 | C:8 | C:9
  D:1 | D:2 | D:3 | D:4 | D:5 | D:6 | D:7 | D:8 | D:9
    
  E:1 | E:2 | E:3 | E:4 | E:5 | E:6 | E:7 | E:8 | E:9
  F:1 | F:2 | F:3 | F:4 | F:5 | F:6 | F:7 | F:8 | F:9
  G:1 | G:2 | G:3 | G:4 | G:5 | G:6 | G:7 | G:8 | G:9
  `)
  );

  for (const movie of movies) {
    // display user previous selected options
    if (movie.id === chooseOne) {
      console.log(chalk.bold(movie.title));
      console.log(chalk.bold(movie.times[whatTime]));
      console.log(
        chalk.bold(`${arrayRows}:${movie.seating.seats[whichSeats]}`)
      );
      console.log(chalk.bold("Ticket price is £5"));

      const continueTo = readlineSync.keyInYNStrict(
        chalk.bold("Do you want to buy?: ")
      );

      // if user choose y, push the selected time& row& seat to data
      if (continueTo == true) {
        movie.ticketsSold.push({
          time: movie.times[whatTime],
          seat: [arrayRows, movie.seating.seats[whichSeats]],
        });
        API.update("movies", movie);

        arrayRows.shift();

        return console.log(
          chalk.bold.yellow(`
      Thank you for purchasing!
       Have a good movie time!
                  `)
        );
      }
      // if user choose n, return to main menu
      else if (continueTo == false) {
        console.log(
          chalk.bold.yellow(`
      Thank you for coming!
         Have a good day!`)
        );

        mainMenu();
      }
    }
  }
};

const mainMenu = () => {
  const movies = API.read("movies");

  console.log(
    chalk.blue.bold(`                        
  ---------------------
   --- Cinema.watch ---
  ---------------------
  - 1. Choose  Movie
  - 2. Movie Description
  ----------------------`)
  );

  console.log(" ");
  const choose = readlineSync.question(chalk.bold("Please choose 1 or 2: "));
  console.log(" ");

  if (choose === "1") {
    // show movie list
    console.log(
      chalk.bold(`
    -----------------
    --- Our movie ---
    -----------------
    `)
    );

    const movies = API.read("movies");
    chooseAMovie(movies);

    mainMenu();
  } else if (choose === "2") {
    for (const movie of movies) {
      console.log(chalk.bold(`Title: ${movie.title}`));
      console.log(`Age rating: ${movie.ageRating}`);
      console.log(`Duration: ${movie.duration}`);
      console.log(`Comments: ${movie.comments}`);
      console.log("-------------------------");
    }

    const backToMainMenu = readlineSync.question(
      chalk.bold(`Press "0" to go back to main menu: `)
    );

    if (backToMainMenu === "0") {
      mainMenu();
    }
  }
};

mainMenu();
