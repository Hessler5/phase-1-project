document.addEventListener("DOMContentLoaded", () => {

//Main test
//update test
//test1

let submissionForm = document.querySelector("form")
submissionForm.addEventListener("submit", (e) => {
e.preventDefault()


//button values
let exerciseDropDown = document.querySelector("#dropdown1")
let muscleDropDown = document.querySelector("#dropdown2")
let difficultyDropDown = document.querySelector("#dropdown3")

//Search Variable

let muscle;
let type;
let difficulty;
let and1;
let and2;

//Populages search functionality based off of selections

function setButtonValue() {
	if(exerciseDropDown.value != ""){
		type = "type=" + exerciseDropDown.value;
	} else { type = ""}
	if(muscleDropDown.value != ""){
		muscle = "muscle=" + muscleDropDown.value;
	} else { muscle = ""}
	if(difficultyDropDown.value != ""){
		difficulty = "difficulty=" + difficultyDropDown.value;
	} else { difficulty = ""}
}

setButtonValue()

//adds and value if moer than one selection is made

function andOne () {
	if(muscle != "" && type != "") {
		and1 = "&"
	} else { and1 = "" }
}

function andTwo(){
	if(difficulty != ""){
		if(muscle != "" || type != ""){
			and2 = "&"
		} else { and2 = "" }
	} else { and2 = "" }
}

andOne()
andTwo()

//Array that gets pushed from the API

let unsavedExercises = [];

//fetch from API 

let fetchValue = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?${type}${and1}${muscle}${and2}${difficulty}`


fetch(fetchValue, {
    method: 'GET',
	  headers: {
		  'X-RapidAPI-Key': 'affff5fc7cmsh5968ae8730f2592p11fb2bjsn6c0de3b97452',
	  	'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'}
}).then(resp => {return resp.json()})
.then(data => {
	for(let i = 0; i < data.length; i++){
		unsavedExercises.push(data[i])
	}
	console.log(unsavedExercises)
	renderCards(unsavedExercises)
	})

//function to create cards at the top
function renderCards(exerciseList){
	let initialCardList = document.querySelector("#initial-exercises-list")
	initialCardList.innerHTML = ""
	for(index of exerciseList){
		let newCardDiv = document.createElement("div")
		newCardDiv.className = "product-card"
		newCardDiv.innerHTML = `
		<h5>${index.name}</h5>
		<p>${index.type}</p>
		<p>Muscle Type:${index.muscle}</p>
		<p>Difficulty:${index.difficulty}</p>
		<p>${index.equipment}</p>
		<p>${index.instructions}</p>
		`
		initialCardList.appendChild(newCardDiv)
	}
}














})


fetch("https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises", {
  method: "GET",
  params: {
    difficulty: "beginner",
    offset: "40",
  },
  headers: {
    "X-RapidAPI-Key": "affff5fc7cmsh5968ae8730f2592p11fb2bjsn6c0de3b97452",
    "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    bottomHalf(data);
    sortTable(0);
  });

function bottomHalf(testArray) {
  console.log(testArray);
  let bottomExercisesTable = document.getElementById("bottom-table");
  //Table Below!!

  var tr, td;

  for (i = 0; i < testArray.length; i++) {
    tr = bottomExercisesTable.insertRow(bottomExercisesTable.rows.length);
    td = tr.insertCell(tr.cells.length);
    td.setAttribute("align", "center");
    td.innerHTML = testArray[i].type;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = testArray[i].muscle;
    td = tr.insertCell(tr.cells.length);
    td.innerHTML = testArray[i].difficulty;
    td.setAttribute("align", "center");
  }
}

function sortTable(columnIndex) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("bottom-table");
  switching = true;
  console.log(columnIndex);
  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      // Check if rows[i] and rows[i + 1] are defined
      if (rows[i] && rows[i + 1]) {
        x = rows[i]
          .getElementsByTagName("td")
          [columnIndex].innerText.toLowerCase();
        y = rows[i + 1]
          .getElementsByTagName("td")
          [columnIndex].innerText.toLowerCase();

        if (x > y) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

let bottomExercise = document.getElementById("bottom-exercise")
let bottomMuscle = document.getElementById("bottom-muscle")
let bottomDifficulty = document.getElementById("bottom-difficulty")

bottomExercise.addEventListener('click', () => sortTable(0));
bottomMuscle.addEventListener('click', () => sortTable(1));
bottomDifficulty.addEventListener('click', () => sortTable(2));

})