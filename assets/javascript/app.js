// Initialize Firebase
var config = {
  apiKey: "AIzaSyDshP7fO_Kl7siJ3_EAQdEaWfRaC7Pd0bE",
  authDomain: "groupprojectawesome-4e15d.firebaseapp.com",
  databaseURL: "https://groupprojectawesome-4e15d.firebaseio.com",
  projectId: "groupprojectawesome-4e15d",
  storageBucket: "groupprojectawesome-4e15d.appspot.com",
  messagingSenderId: "757719809918"
};
firebase.initializeApp(config);

var database = firebase.database();


console.log("Hi, Brian!")



var search;

$(document).on("click", "#submit", search);

function search(event) {
  event.preventDefault();
  //clear movie-display for new search
  $(".show").html("");
  $(".user-data-input").html("");
  $(".movie-display").html("");
  $(".showclick").html("");
  $(".book-display").html("");

  search = $("#search").val().trim();
  console.log("search :" + search)

  //remove value after click button
  $("#search").val("");

  //this is for the check box 
  var moviesChecked = $("#moviesCheck").is(":checked");
  console.log("moviesChecked: ", moviesChecked)

  var booksChecked = $("#booksCheck").is(":checked");
  console.log("booksChecked: ", booksChecked);

  if (booksChecked === true) {
    console.log("runningbooks")
    searchBooks();
  }
  if (moviesChecked === true) {
    console.log("runningmovies")
    getMovie();
  }
  if ((booksChecked === false) && (moviesChecked === false)) {
    trend();
  }

  onhome();
};
//END

//search for book when input
function searchBooks() {
  // event.preventDefault();

  // var search = $("#search").val();
  // console.log("search: ", search);

  var queryURL = "https://www.googleapis.com/books/v1/volumes?q=title:" + search;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // I want to display a movie here:

    for (var i = 0; i < 10; i++) {

      //console.log(response.results[i].name)
      // console.log("---------------" + i + "--------------------------")
      // console.log(response.items[i].volumeInfo.title)
      // console.log(response.items[i].volumeInfo.averageRating)
      // console.log(response.items[i].volumeInfo.description)
      // console.log(response.items[i].volumeInfo.publishedDate)
      // console.log(response.items[i].volumeInfo.authors)
      // console.log(response.items[i].volumeInfo.imageLinks.smallThumbnail)

      var bookTitle = $("<div class='mTitle'><b>" + response.items[i].volumeInfo.title + "</b></div>")

      if (response.items[i].volumeInfo.imageLinks !== undefined &&
        response.items[i].volumeInfo.imageLinks !== null) {
        var bookImg = $("<img class='bookimgsearch' src='" + response.items[i].volumeInfo.imageLinks.smallThumbnail + "'>")
      } else {
        var bookImg = $("<div><b>No Image Found!!!</b></div>");
      }
      var id = $("<div style='display:none'>" + response.items[i].id + "</div>")
      var rating = $("<div><b>Rating: </b>" + response.items[i].volumeInfo.averageRating + "</div>")
      var overview = $("<div><b>Plot: </b>" + response.items[i].volumeInfo.description + "</div>")
      var release_date = $("<div><b>Release date: </b>" + response.items[i].volumeInfo.publishedDate + "</div>")
      var authors = $("<div><b>Authors: </b>" + response.items[i].volumeInfo.authors + "</div>")
      var bookDiv = $("<div id='bookDiv'>");

      $(".book-display").append(bookDiv).append(bookImg).append(id).append(bookTitle).append(authors).append(rating).append(release_date).append(overview);
    }

  })
};
//END


//https://www.googleapis.com/books/v1/volumes?q=
// var bookURL = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";


//$.ajax({
//	url:bookURL,
//	method: "GET",
//}).then(function (response){
//	console.log(response)	
//});


var moviekey = "d20e26475d03e462397cf346ba665e7a";
//search for movie when input
function getMovie() {

  if (search !== "") {
    var movieURL = "https://api.themoviedb.org/3/search/multi?api_key=" + moviekey + "&language=en-US&query=" + search + "&page=1&include_adult=false"
  } else {
    var movieURL = "https://api.themoviedb.org/3/trending/all/day?api_key=" + moviekey;
  }
  $.ajax({
    url: movieURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < 10; i++) {

      //console.log(response.results[i].name)

      if (response.results[i].original_title !== undefined) {
        var movieTitle = $("<div class='mTitle'>" + response.results[i].original_title + "</div>")
      } else {
        var movieTitle = $("<div class='mTitle'>" + response.results[i].name + "</div>")
      }

      var movieImg = $("<img class='movieimgsearch' src='https://image.tmdb.org/t/p/w185/" + response.results[i].poster_path + "'>")
      var rating = $("<div><b>Rating: </b>" + response.results[i].vote_average + "</div>")
      var overview = $("<div><b>Plot: </b>" + response.results[i].overview + "</div>")
      var release_date = $("<div><b>Release date: </b>" + response.results[i].release_date + "</div>")
      var movieDiv = $("<div id='movieDiv'>");
      $(".movie-display").append(movieImg).append(movieDiv).append(movieTitle).append(rating).append(release_date).append(overview);
    }
  })
};
//END


//home page trend movie
function trend() {
  var trendURL = "https://api.themoviedb.org/3/trending/all/day?api_key=" + moviekey;
  $.ajax({
    url: trendURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    $(".show").html("");
    $(".user-data-input").html("");
    $(".movie-display").html("");
    $(".showclick").html("");
    $(".book-display").html("");

    var ssshow = $('<div class="slideshow-container"></div>')
    var toptrend = $('<h2 id="toptrend">Top Trending Movies and TV Shows</h2>')

    var prev = $('<a class="prev" onclick="plusSlides(-1)">&#10094;</a>')

    var next = $('<a class="next" onclick="plusSlides(1)">&#10095;</a>')

    $(".show").prepend(ssshow)
    var dotSlide = $('<div class="mt-3" style="text-align:center"></div>');

    ssshow.append(prev).append(next)
    $(".show").prepend(toptrend).prepend($(".slideshow-container"));
    // $(".show").append(dotSlide);


    for (var i = 0; i < 10; i++) {
      //console.log(response.results[i].original_title);
      //console.log(response.results[i].poster_path);

      var mySlides = $('<div class="mySlides fade1"></div>')
      var numbertext = $('<div class="numbertext">' + (i + 1) + ' / 10</div>')
      var movieImg = $("<img class='movieimghome' src='https://image.tmdb.org/t/p/w185/" + response.results[i].poster_path + "' alt='No Poster' style='width:100%'>")


      if (response.results[i].original_title !== undefined) {
        var titleSlides = $('<div class="text mTitle mb-4">' + response.results[i].original_title + '</div>')
      } else {
        var titleSlides = $('<div class="text mTitle mb-4">' + response.results[i].name + '</div>')
      }

      mySlides.append(numbertext).append(movieImg).append(titleSlides);
      $(".slideshow-container").append(mySlides).append(dotSlide);

      //slideshow dot
      //dotSlide = $('<div style="text-align:center"></div>');
      var dot = $('<span class="dot" onclick="currentSlide(' + (i + 1) + ')"></span> ');
      dotSlide.append(dot);

    }

    // ssshow.append(prev).append(next)
    // $(".show").prepend(toptrend).prepend($(".slideshow-container"));
    // $(".show").append(dotSlide);

    showSlides(slideIndex);
    //run the slide show to next every 10 sec
    // setInterval(showSlides, 10000);
    // setInterval(plusSlides(1),2000);
    $(document).off("click", ".onhome");

    UserInput();
  })
};
//END

trend();

function UserInput() {
  var add = $('<div class="jumbotron add"></div>');
  var head = $('<div class="head font-weight-bold text-dark"><h1>User Information</h1></div>');
  var input = $('<div class="input"></div>');
  var form = $('<form class="user-input"></form>');
  add.append(head).append(input);
  input.append(form);

  var formgroupname = $('<div class="form-group"></div>');
  var lablename = $('<lable class="header font-weight-bold text-dark " for="name-input">Name</label>');
  var inputname = $('<input class="form-control" id="name-input" placeholder="John Doe" type="text" required>');
  formgroupname.append(lablename, inputname);

  var formgroupage = $('<div class="form-group"></div>');
  var labelage = $('<label class="header font-weight-bold text-dark" for="age-input">Age</label>');
  var inputage = $('<input class="form-control" id="age-input" placeholder="20" type="text" >');
  formgroupage.append(labelage, inputage);

  var formgroupemail = $('<div class="form-group"></div>');
  var labelemail = $('<label class="header font-weight-bold text-dark" for="email-input">Email</label>');
  var inputemail = $('<input class="form-control" id="email-input" placeholder="email" type="text" >');
  formgroupemail.append(labelemail, inputemail);

  var formgroupforum = $('<div class="form-group"></div>');
  var labelforum = $('<label class="header font-weight-bold text-dark" for="forum">Message</label>');
  var inputforum = $('<textarea placeholder="Type message.." class="form-control" name="forum" id="forum" ></textarea>');
  formgroupforum.append(labelforum, inputforum);

  var addbtn = $('<button type="submit" class="btn text-light" id="add-btn">Submit</button>');
  form.append(formgroupname, formgroupage, formgroupemail, formgroupforum, addbtn);

  $(".user-data-input").append(add);

};
//END



function onhome() {
  $(document).on("click", ".onhome", function () {
    trend();
    $(document).off("click", ".onhome")
  });
};
//END

//////////////////////////////////
//slide show home page

var slideIndex = 1;

//showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
};
//END

function currentSlide(n) {
  showSlides(slideIndex = n);
};
//END

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

};
//END

///////////////////////////////////
//could not cross-origin have to force download cross origin new update
function forceDownload(url, fileName) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement('a');
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  }
  xhr.send();
};
//END

//download poster
$(document).on("click", ".downloadmovie", function () {
  var url = $(this).parent().parent()[0].childNodes[0].currentSrc;
  var fileName = $(this).parent().parent()[0].childNodes[2].innerText;
  console.log("Link to download: " + url);
  console.log("File name to download: " + fileName);
  forceDownload(url, fileName);
});
//END


var keywork;

function showclick() {
  var queryURL = "https://api.themoviedb.org/3/search/multi?api_key=" + moviekey + "&language=en-US&query=" + keywork + "&page=1&include_adult=false"
  // "https://api.themoviedb.org/3/search/movie?api_key=d20e26475d03e462397cf346ba665e7a&language=en-US&query="+ keywork +"&page=1&include_adult=false"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    $(".show").html("");
    $(".user-data-input").html("");
    $(".movie-display").html("");
    $(".showclick").html("");
    $(".book-display").html("");

    var i = 0;
    if (response.results[i].original_title !== undefined) {
      var movieTitle = $("<div class='mTitle'>" + response.results[i].original_title + "</div>")
    } else {
      var movieTitle = $("<div class='mTitle'>" + response.results[i].name + "</div>")
    }
    // var checkBoxDiv = $("<div> </div>");
    // checkBoxDiv.append(checkBox);
    var checkBox = $("<div class='font-weight-bold'>Favorite: <i class='far fa-square' box='unchecked'></div>");
    // var checkBox = $("<div class='font-weight-bold'>Favorite: <i class='far fa-square'></div>");


    //checkBox.addClass("far fa-square");
    //checkBox.attr("box", "unchecked");

    var download = $("<div class='font-weight-bold'>Poster download: <button class='btn downloadmovie text-light ml-5 btn-warning'>Download</button></div>")

    var movieImg = $("<img class='movieimgshow' src='https://image.tmdb.org/t/p/w185/" + response.results[i].poster_path + "'>")
    var rating = $("<div><b>Rating: </b>" + response.results[i].vote_average + "</div>")
    var overview = $("<div><b>Plot: </b>" + response.results[i].overview + "</div>")
    var release_date = $("<div><b>Release date: </b>" + response.results[i].release_date + "</div>")

    // $(".showclick").append(movieImg).append(download).append(movieTitle).append(checkBox).append(rating).append(release_date).append(overview);
    $(".show").append(movieImg).append(download).append(movieTitle).append(checkBox).append(rating).append(release_date).append(overview);


    console.log(response.results[i].id)
    var movieId = response.results[i].id
    var actorURL = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + moviekey

    $.ajax({
      url: actorURL,
      method: "GET"
    }).then(function (response) {

      console.log(response)
      var actorDiv = $("<div class='actorDiv row mt-5'>")
      // $(".showclick").append(actorDiv);
      $(".show").append(actorDiv);

      actorDiv.append(innerActorDiv);

      for (var i = 0; i < 5; i++) {
        console.log(response.cast[i].name)
        console.log(response.cast[i].character)
        console.log(response.cast[i].profile_path)
        var innerActorDiv = $("<div class='row'>")
        var character = $("<div class='font-weight-bold'>" + response.cast[i].character + "</div>")
        var name = $("<div> <div class='font-weight-bold'>" + response.cast[i].name + "</div>")
        var profile_path = $("<img src='https://image.tmdb.org/t/p/w185/" + response.cast[i].profile_path + "'>")
        var innerActorDiv = $("<div class='mr-5 border-1 border border-warning text-center'>")

        innerActorDiv.append(character).append(profile_path).append(name);
        actorDiv.append(innerActorDiv);

      }
    })


    onhome();

  })
};
//END

function bookclick() {

  var queryURL = "https://www.googleapis.com/books/v1/volumes?q=title:" + keywork;
  // var queryURL = "https://www.googleapis.com/books/v1/volumes?q=title:wrOQLV6xB-wC";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    $(".show").html("");
    $(".user-data-input").html("");
    $(".movie-display").html("");
    $(".showclick").html("");
    $(".book-display").html("");

    // I want to display a book here:

    var i = 0;
    //console.log(response.results[i].name)
    // console.log("---------------" + i + "--------------------------")
    // console.log(response.items[i].volumeInfo.title)
    // console.log(response.items[i].volumeInfo.averageRating)
    // console.log(response.items[i].volumeInfo.description)
    // console.log(response.items[i].volumeInfo.publishedDate)
    // console.log(response.items[i].volumeInfo.authors)
    // console.log(response.items[i].volumeInfo.imageLinks.smallThumbnail)

    var bookTitle = $("<div class='mTitle'><b>" + response.items[i].volumeInfo.title + "</b></div>")

    if (response.items[i].volumeInfo.imageLinks !== undefined &&
      response.items[i].volumeInfo.imageLinks !== null) {
      var bookImg = $("<img class='bookimgshow' src='" + response.items[i].volumeInfo.imageLinks.smallThumbnail + "'>")
    } else {
      var bookImg = $("");
    }

    var categories = $("<div><b>Categories: </b>" + response.items[i].volumeInfo.categories + "</div>")
    var rating = $("<div><b>Rating: </b>" + response.items[i].volumeInfo.averageRating + "</div>")
    var overview = $("<div><b>Plot: </b>" + response.items[i].volumeInfo.description + "</div>")
    var release_date = $("<div><b>Release date: </b>" + response.items[i].volumeInfo.publishedDate + "</div>")
    var authors = $("<div><b>Authors: </b>" + response.items[i].volumeInfo.authors + "</div>")

    // $(".showclick").append(bookImg).append(bookTitle).append(categories).append(authors).append(rating).append(release_date).append(overview);
    $(".show").append(bookImg).append(bookTitle).append(categories).append(authors).append(rating).append(release_date).append(overview);

  })

};
//END

$(document).on("click", ".movieimghome", function () {
  console.log($(this).parent()[0].lastChild.innerHTML)
  keywork = $(this).parent()[0].lastChild.innerHTML
  showclick();
});
//END

$(document).on("click", ".movieimgsearch", function () {
  console.log($(this)[0].nextElementSibling.nextElementSibling.innerHTML)
  keywork = $(this)[0].nextElementSibling.nextElementSibling.innerHTML
  // $(".show").html("")

  showclick();
});
//END

$(document).on("click", ".bookimgsearch", function () {
  console.log($(this)[0].nextElementSibling.innerText)
  keywork = $(this)[0].nextElementSibling.nextElementSibling.innerHTML
  bookclick();
});
//END

/////////////////////////////////////////
////////////////Fire Base///////////////

var hadAddInput = false;
$(document).on("click", "#add-btn", function (event) {
  event.preventDefault();
  hadAddInput = true;

  var name = $("#name-input").val().trim();
  var age = $("#age-input").val().trim();
  var email = $("#email-input").val().trim();
  var forum = $("#forum").val().trim();
  

  var newData = {
    name: name,
    age: age,
    email: email,
    forum: forum
  };

  // Uploads train data to the database
  database.ref().push(newData);

  // Logs everything to console
  // console.log("New Name is: " + newData.name);
  // console.log("New Age is: " + newData.age);
  // console.log("New Email is: " + newData.email);
  // console.log("New Message is: " + newData.forum);

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#age-input").val("");
  $("#email-input").val("");
  $("#forum").val("");

  database.ref().child(userId + "/fav").set(arrFav);
});
//END

// var state;
var arrFav = [];
$(document).on("click", ".far", checkBox);

function checkBox() {
  var fav = $(this).parent().parent()[0].childNodes[2].innerText;
  // console.log(fav);

  var state = $(this).attr("box");
  //add favorite movie if check
  if (state === "unchecked") {
    $(this).attr("class", "far fa-check-square");
    $(this).attr("box", "checked");
    //check if the arrFav is empty
    if (arrFav.length === 0) {
      arrFav.push(fav);
      console.log(arrFav);

      // database.ref().child(userId+"/fav").set(arrFav);
      //???????????????????????????
    } else {
      var isexist = 0;
      for (var i = 0; i < arrFav.length; i++) {
        if (fav === arrFav[i]) {
          console.log("Already exist!")
          isexist++;
        } 
      }
    }
    //???????????????????????????????
    if (isexist === 0) {
      console.log("You can add!")
      arrFav.push(fav);
      console.log(arrFav);

      // database.ref().child(userId+"/fav").set(arrFav);
    }

  }
  //remove favorite movie if uncheck
  if (state === "checked") {
    $(this).attr("class", "far fa-square");
    $(this).attr("box", "unchecked");
    arrFav.pop();
    console.log(arrFav);
    database.ref().child(userId + "/fav/" + arrFav.length).remove();
  }

};
//END

var userId;
var userexist;
database.ref().on("value", function (snapshot) {
  if (snapshot.exists()) {
    userId = Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]
    console.log(userId);
  }
  userexist = snapshot.child(userId + "/name").exists();
  console.log(userexist);
})
//END

$(document).on("click", "#favorite", function (event) {
  event.preventDefault();
  if (arrFav.length !== 0) {
    if (hadAddInput === true) {
      if (userexist === true) {
        database.ref().child(userId + "/fav").set(arrFav);
      }
    }
  }
});
//END


$(document).on("click", "#output", function () {
  database.ref().on("child_added", function (childSnapshot) {
    var id = childSnapshot.key;
    console.log("ID: " + id);
    // console.log(Object.keys(childSnapshot));

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var userName = childSnapshot.val().name;
    var userAge = childSnapshot.val().age;
    var userEmail = childSnapshot.val().email;
    var userForum = childSnapshot.val().forum;
    var userFav = childSnapshot.val().fav;
    // User Info
    console.log("Firebase pull, User Name Info: " + userName);
    console.log("Firebase pull, User Age Info: " + userAge);
    console.log("Firebase pull, User Email Time Info: " + userEmail);
    console.log("Firebase pull, User Message Info: " + userForum);
    console.log("Firebase pull, User Message Info: " + userFav);

    var fDiv = $("<div class='fDiv'></div>");
    var ul = $('<ul style="list-style-type:none;">');
    var liName = $("<li class='liName'>"+userName+"</li>");
    var liAge = $("<li>"+userAge+"</li>");
    var liEmail = $("<li>"+userEmail+"</li>");
    ul.append(liName, liAge, liEmail);
    fDiv.append(ul);
    $(".show").append(fDiv);

    
  });

});
//END