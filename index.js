document.addEventListener("DOMContentLoaded", () => {

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
		newCardDiv.innerHTML = `
		<h5>${index.name}</h5>
		<p>${index.type}</p>
		<p>${index.muscle}</p>
		<p>${index.difficulty}</p>
		<p>${index.equipment}</p>
		<p>${index.instructions}</p>
		`
		initialCardList.appendChild(newCardDiv)
	}
}














})


})