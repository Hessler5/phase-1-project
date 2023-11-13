document.addEventListener("DOMContentLoaded", () => {

let submissionForm = document.querySelector("form")
submissionForm.addEventListener("submit", () => {




  
fetch(`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?${type}${and1}${muscle}${and2}${difficulty}`, {
    method: 'GET',
	  headers: {
		  'X-RapidAPI-Key': 'affff5fc7cmsh5968ae8730f2592p11fb2bjsn6c0de3b97452',
	  	'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'}
}).then(resp => resp.json())
.then(data => console.log(data))