const API = require("./lib/API");
const readlineSync = require("readline-sync");

// user choose a movie from the option
const chooseAMovie = (movies) => {
  // show list of each movies
  for (const movie of movies) {
    console.log(`- ${movie.id}: ${movie.title}`);
  }

  //user selection for movie
  console.log(" "); // blank between question
  const chooseOne = readlineSync.questionInt(
    "Choose the number of the movie you want to watch: "
  );
  console.log("----------------------------------------------"); // blank between question

  // if the API can't find that movie from chooseOne input
  // run chooseABook again after warning
  const movie = API.read("movies", chooseOne);
  if (movie !== undefined) {
    chooseATime(movies, chooseOne);
  } else {
    console.log(`***********************************
                 * Sorry we don't have that option *
                 * Please choose again from below  *
                ***********************************`);

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
        "What time do you want to watch?: "
      );
      console.log(" "); // blank between question
    }
  } // end of for loop

  // cancel button go back to movie list
  if (whatTime === -1) {
    chooseAMovie(movies);
  } // if time has been chose then go to select seat row
  else if (whatTime !== undefined) {
    chooseARow(movies, chooseOne);
  }
};

// user selection for seat row
let whichRows = [];
const arrayRows = [];
const chooseARow = (movies, chooseOne) => {
  console.log(`    
      ---------------------- SCREEN ----------------------- 
   
  ROW  A:1 | A:2 | A:3 | A:4 | A:5 | A:6 | A:7 | A:8 | A:9
  ROW  B:1 | B:2 | B:3 | B:4 | B:5 | B:6 | B:7 | B:8 | B:9
  ROW  C:1 | C:2 | C:3 | C:4 | C:5 | C:6 | C:7 | C:8 | C:9
  ROW  D:1 | D:2 | D:3 | D:4 | D:5 | D:6 | D:7 | D:8 | D:9
   
  ROW  E:1 | E:2 | E:3 | E:4 | E:5 | E:6 | E:7 | E:8 | E:9
  ROW  F:1 | F:2 | F:3 | F:4 | F:5 | F:6 | F:7 | F:8 | F:9
  ROW  G:1 | G:2 | G:3 | G:4 | G:5 | G:6 | G:7 | G:8 | G:9`);

  for (const movie of movies) {
    if (movie.id === chooseOne) {
      whichRows = readlineSync.keyInSelect(
        movie.seating.rows,
        "Which ROW do you want?: "
      );
    }
  } // end of for loop
  console.log(whichRows);

  // cancel option, go back to movie list
  if (whichRows === -1) {
    chooseAMovie(movies);

    // if row has been selected go to seat selection
  } else if (whichRows !== undefined) {
    chooseASeat(movies, chooseOne);
  }
};

// user selection for seat
let whichSeats = [];
const chooseASeat = (movies, chooseOne) => {
  console.log(`
  ---------------------- SCREEN ------------------------ 
   
  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT 
   A:1 | A:2 | A:3 | A:4 | A:5 | A:6 | A:7 | A:8 | A:9
   B:1 | B:2 | B:3 | B:4 | B:5 | B:6 | B:7 | B:8 | B:9
   C:1 | C:2 | C:3 | C:4 | C:5 | C:6 | C:7 | C:8 | C:9
   D:1 | D:2 | D:3 | D:4 | D:5 | D:6 | D:7 | D:8 | D:9
   
   E:1 | E:2 | E:3 | E:4 | E:5 | E:6 | E:7 | E:8 | E:9
   F:1 | F:2 | F:3 | F:4 | F:5 | F:6 | F:7 | F:8 | F:9
   G:1 | G:2 | G:3 | G:4 | G:5 | G:6 | G:7 | G:8 | G:9
   `);

  for (const movie of movies) {
    if (movie.id === chooseOne) {
      whichSeats = readlineSync.keyInSelect(
        movie.seating.seats,
        "Which SEAT do you want?: "
      );
    }
  }

  // cancel option, go back to movie list
  if (whichSeats === -1) {
    chooseAMovie(movies);

    // if seat has been choose go to confirmation
  } else if (whichSeats !== undefined) {
    soldRows(movies, chooseOne);
  }
  const movie = API.read("movies");
  console.log(movie.ticketsSold);
};

const soldRows = (movies, chooseOne) => {
  for (const movie of movies) {
    if (movie.id === chooseOne) {
      // check the stored tickets that has been selected before this user
      const placeTaken = movie.ticketsSold;
      for (let i = 0; i < placeTaken.length; i++) {
        const element = placeTaken[i];
        console.log(element);

        //checking the stored row and current selected row
        const takenRow = movie.seating.rows;
        for (let i = 0; i < takenRow.length; i++) {
          const elementRow = takenRow[i];
          if (element.seat[0] === elementRow) {
            // soldSeats(movies, chooseOne);
            console.log(elementRow);

            return console.log("hi");

            // The stored row and current selected row did not match, move to confirmation
          } else {
            return confirmation(movies, chooseOne);
          }
        }
        return chooseARow(movies, chooseOne);
      }
    }
  }
};

// const soldSeats = (movies,chooseOne) => {
//   for (const movie of movies) {
//     if (movie.id === chooseOne) {

//       const placeTaken = movie.ticketsSold;
//         for (let i = 0; i < placeTaken.length; i++) {
//           const element = placeTaken[i];

//         //checking the stored seat and current selected seat
//         const takenSeat = movie.seating.seats;
//         for (let i = 0; i < takenSeat.length; i++) {
//           const elementSeat = takenSeat[i];
//           // console.log(elementSeat);
//           // console.log(element.seat[1]);
//           if (element.seat[1] === elementSeat) {
//             console.log(`******************************`);
//             console.log(`* Your seat already is taken *`);
//             console.log(`* Please choose another one  *`);
//             console.log(`******************************`);

//           } // The stored row and current selected row match but,
//           // The stored seat and current selected seat did not match, move to confirmation
//           else {
//             confirmation(movies, chooseOne);
//           }
//         }
//       }
//     }
//   }
// }

const confirmation = (movies, chooseOne) => {
  console.log(`
  ---------------------- SCREEN ---------------------
              
  A:1 | A:2 | A:3 | A:4 | A:5 | A:6 | A:7 | A:8 | A:9
  B:1 | B:2 | B:3 | B:4 | B:5 | B:6 | B:7 | B:8 | B:9
  C:1 | C:2 | C:3 | C:4 | C:5 | C:6 | C:7 | C:8 | C:9
  D:1 | D:2 | D:3 | D:4 | D:5 | D:6 | D:7 | D:8 | D:9
    
  E:1 | E:2 | E:3 | E:4 | E:5 | E:6 | E:7 | E:8 | E:9
  F:1 | F:2 | F:3 | F:4 | F:5 | F:6 | F:7 | F:8 | F:9
  G:1 | G:2 | G:3 | G:4 | G:5 | G:6 | G:7 | G:8 | G:9
  `);

  for (const movie of movies) {
    if (movie.id === chooseOne) {
      console.log(movie.title);
      console.log(movie.times[whatTime]);
      console.log(
        `${movie.seating.rows[whichRows]}:${movie.seating.seats[whichSeats]}`
      );
      console.log("Ticket price is £5");

      const continueTo = readlineSync.keyInYN("Do you want to buy?: ");

      if (continueTo === true) {
        console.log(`
      Thank you for purchasing!
       Have a good movie time!
                  `);
      }
      // if user choose n, return to main menu
      else if (continueTo === false) {
        mainMenu();
      }

      // // if user choose y push selected time and seat to data

      //  if (continueTo) {
      //    movie.ticketsSold.push(
      //      {
      //        time: movie.times[whatTime],
      //        seat: [movie.seating.rows[whichRows],movie.seating.seats[whichSeats]]
      //      });
      //    API.update("movies",movie)

      //  } else {
      //   mainMenu();

      // }
    }
  }
};

const mainMenu = () => {
  console.log(`                        
  ---------------------
   --- Cinema.watch ---
  ---------------------
  - 1. View  ticket
  - 2. Movie description
  ----------------------`);

  console.log(" ");
  const choose = readlineSync.question("Please choose 1 or 2: ");
  console.log(" ");

  if (choose === "1") {
    // show movie list
    console.log(`
    -----------------
    --- Our movie ---
    -----------------
    `);

    const movies = API.read("movies");
    chooseAMovie(movies);

    mainMenu();
  } else if (choose === "2") {
    for (const movie of movies) {
      console.log(`Title: ${movie.title}`);
      console.log(`Age rating: ${movie.ageRating}`);
      console.log(`Duration: ${movie.duration}`);
      console.log(`Comments: ${movie.comments}`);
      console.log("-------------------------");
    }

    const backToMainMenu = readlineSync.question(
      `Press "0" to go back to main menu: `
    );

    if (backToMainMenu === "0") {
      mainMenu();
    }
  }
};

mainMenu();

// junk code use in case of need

// const ageVerify = () => {
//   const howOld = readlineSync.parseInt("How old are you? ");

//   if (howOld <= 12){
//     console.log("You can choose from: ");

//   }
//   else if(howOld <= 16){
//     console.log("You can choose from: ");
//   }
//   else {
//     console.log("Any movie");
//   }
// }

// const showMovieTicket = (movies) => {
//   console.log(`--- ${movies.title} ---`);

// }
