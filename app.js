const API = require("./lib/API");
const readlineSync = require("readline-sync");



// user choose a movie from option
const chooseAMovie = (movies) =>{

// show list of each movies
  for (const movie of movies) {
    console.log(`- ${movie.id}: ${movie.title}`);
  }

  //user selection for movie
  console.log("                       ") // blank between question
  const chooseOne = readlineSync.questionInt("Choose the number of movie you want to watch: ")
  console.log("----------------------------------------------") // blank between question


  // if the API can't find that movie from chooseOne input
  // run chooseABook again
  const movie = API.read("movies", chooseOne);
  if (movie !== undefined) {
    chooseATime(movies, chooseOne);
  }
  else {
    console.log("***********************************")
    console.log("* Sorry we don't have that option *")
    console.log("* Please choose again from below  *")
    console.log("***********************************")

    return chooseAMovie(movies);
  }
  
}


// user choose the time from the movie they have chosen
const chooseATime = (movies,chooseOne) => {
  let whatTime = [];
  for (const movie of movies) {
    if (movie.id === chooseOne) {
      // user selection for screen time
      whatTime = readlineSync.keyInSelect(movie.times, "What time do you want to watch?: ")   
      console.log("                                 ") // blank between question
      

      // update selected time to ticketsSold but only update time
      // movie.ticketsSold.push({
      //   time: movie.times[whatTime]
      // });
      // API.update("movies",movie)

    } 
 }
  if (whatTime === -1) {
    chooseAMovie(movies);
   }
  // const time = API.read("movies", whatTime);
  // console.log(time);
  else if (whatTime !== undefined) {
    chooseARow(movies, chooseOne);
   }
    
}

const chooseARow = (movies, chooseOne) => {
  let whichRows = [];

  console.log("    ---------------------- SCREEN ----------------------- ")
  console.log("                                                       ")
  console.log("ROW  A:1 | A:2 | A:3 | A:4 | A:5 | A:6 | A:7 | A:8 | A:9")
  console.log("ROW  B:1 | B:2 | B:3 | B:4 | B:5 | B:6 | B:7 | B:8 | B:9")
  console.log("ROW  C:1 | C:2 | C:3 | C:4 | C:5 | C:6 | C:7 | C:8 | C:9")
  console.log("ROW  D:1 | D:2 | D:3 | D:4 | D:5 | D:6 | D:7 | D:8 | D:9")
  console.log("                                                       ")
  console.log("ROW  E:1 | E:2 | E:3 | E:4 | E:5 | E:6 | E:7 | E:8 | E:9")
  console.log("ROW  F:1 | F:2 | F:3 | F:4 | F:5 | F:6 | F:7 | F:8 | F:9")
  console.log("ROW  G:1 | G:2 | G:3 | G:4 | G:5 | G:6 | G:7 | G:8 | G:9")



  for (const movie of movies) {    
    if (movie.id === chooseOne) {
       whichRows = readlineSync.keyInSelect(movie.seating.rows, "Which ROW do you want?: ")
       // update the date to db.json
       //but it shows like {row: A}...
      // movie.ticketsSold.push({
      //   seat: movie.seating.rows[whichRows]
      // });
      // API.update("movies", movie)                                                


      //  whichSeat = readlineSync.keyInSelect(movie.seating.seats, "Which seat do you want?: ")
      // console.log(`Your seat is ${movie.seating.rows[whichRows]}:${movie.seating.seats[whichSeat]}`);  
    }
    
    // const whichRows = API.read("movies", whichRows);
    
  }
  if (whichRows === -1) {

    chooseAMovie(movies);

  } else if (whichRows !== undefined) {
      chooseASeat(movies, chooseOne);
   }

}

const chooseASeat = (movies,chooseOne) => {
  let whichSeats = [];

  console.log("---------------------- SCREEN ----------------------- ")
  console.log("                                                      ")
  console.log(" SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT  SEAT ")
  console.log(" A:1 | A:2 | A:3 | A:4 | A:5 | A:6 | A:7 | A:8 | A:9")
  console.log(" B:1 | B:2 | B:3 | B:4 | B:5 | B:6 | B:7 | B:8 | B:9")
  console.log(" C:1 | C:2 | C:3 | C:4 | C:5 | C:6 | C:7 | C:8 | C:9")
  console.log(" D:1 | D:2 | D:3 | D:4 | D:5 | D:6 | D:7 | D:8 | D:9")
  console.log("                                                       ")
  console.log("E:1 | E:2 | E:3 | E:4 | E:5 | E:6 | E:7 | E:8 | E:9")
  console.log("F:1 | F:2 | F:3 | F:4 | F:5 | F:6 | F:7 | F:8 | F:9")
  console.log("G:1 | G:2 | G:3 | G:4 | G:5 | G:6 | G:7 | G:8 | G:9")



  for (const movie of movies) {
    if (movie.id === chooseOne) {
      whichSeats = readlineSync.keyInSelect(movie.seating.seats, "Which SEAT do you want?: ")

      //  whichSeat = readlineSync.keyInSelect(movie.seating.seats, "Which seat do you want?: ")
      // console.log(`Your seat is ${movie.seating.rows[whichRows]}:${movie.seating.seats[whichSeat]}`);  
    }

    const seats = API.read("movies", whichSeats);
    if (seats !== undefined) {
      ticketPrice(movies);
    }

  }

  if (whichSeats === -1) {

    chooseAMovie(movies);
  }
}

const ticketPrice = (movies) => {
  console.log(`Selected movie `)
  console.log();

}


const mainMenu = () => {
  const movies = API.read("movies");

  console.log("                        ");
  console.log("---------------------");
  console.log(" --- Cinema.watch ---");
  console.log("---------------------");
  console.log("- 1. View  ticket");
  console.log("- 2. Movie description");
  console.log("----------------------");

  console.log("                  ")
  const choose = readlineSync.question("Please choose 1 or 2: ");
  console.log("                        ");


  if (choose === "1") { // show ticket
    console.log("-----------------");
    console.log("--- Our movie ---");
    console.log("-----------------");
    console.log("                 ");

    // ageVerify();

    const movies = API.read("movies");
    chooseAMovie(movies);



    mainMenu();
  } 
  else if (choose === "2") {
    for (const movie of movies) {
      console.log(`Title: ${movie.title}`);
      console.log(`Age rating: ${movie.ageRating}`);
      console.log(`Duration: ${movie.duration}`);
      console.log(`Comments: ${movie.comments}`);
      console.log("-------------------------")
      
      
    }


    // const rating = readlineSync.question("What do you think about the movie? ")


  }
}

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


    // display movie title
    // for (const movie of movies) {
    //   console.log(movie["title"]);
    // }

    // const showMovie = showMovieTicket(movies);
    // choseMovie(showMovie);
