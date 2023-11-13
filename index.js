document.addEventListener("DOMContentLoaded", () => {

let submissionForm = document.querySelector("form")
submissionForm.addEventListener("submit", (e) => {
e.preventDefault()


//button values
let exerciseDropDown = document.querySelector("#dropdown1")
let muscleDropDown = document.querySelector("#dropdown2")
let difficultyDropDown = document.querySelector("#dropdown3")

let muscle;
let type;
let difficulty;
let and1;
let and2;


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

console.log(muscle)


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

console.log(and1)
console.log(and2)
  
let fetchValue = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?${type}${and1}${muscle}${and2}${difficulty}`


fetch(fetchValue, {
    method: 'GET',
	  headers: {
		  'X-RapidAPI-Key': 'affff5fc7cmsh5968ae8730f2592p11fb2bjsn6c0de3b97452',
	  	'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'}
}).then(resp => {
	console.log(fetchValue)
	return resp.json()
})
.then(data => console.log(data))















})


})