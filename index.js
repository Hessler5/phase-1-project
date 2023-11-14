document.addEventListener("DOMContentLoaded", () => {

  //creating empty array to add exercises into 
  let savedExercises = [];
  let bottomExercisesTable = document.getElementById("bottom-table");

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


  //Populates search functionality based off of selections
  
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
     // bottomHalf(data);
      sortTable(0);
    })
  
  //function to create cards at the top
  function renderCards(exerciseList){
    let initialCardList = document.querySelector("#initial-exercises-list")
    initialCardList.innerHTML = " "
    
    for (let i = 0; i < exerciseList.length; i++) {
      let index = exerciseList[i];


      //for index.instructions, need to create an array of the first 50 characters
      //add event listener to expand the array to show the entire description
      let instructions = index.instructions;
      var instrucBrief = instructions.split(' ').slice(0,20).join(' ')+"...";




      let newCardDiv = document.createElement("div");
      newCardDiv.className = "product-card";
      newCardDiv.innerHTML = `
        <h3>${index.name} <button type="button" id='${index.name} Button'>+</button></h3>
        <div class="inner-card-container">
        <p>Type of Exercise: ${index.type.toUpperCase()}</p>
        <p>Muscle Group: ${index.muscle.toUpperCase()}</p>
        <p>Difficulty: ${index.difficulty.toUpperCase()}</p>
        <p>Equipment: ${index.equipment.toUpperCase()}</p>
        </div>
        <p id="exercise-instructions">${instrucBrief}</p>`;
    
      initialCardList.appendChild(newCardDiv);

         //add event listener to exercise instructions and replace HTML with index.instructions
         let expandInstruc = document.getElementById(`exercise-instructions`);
         expandInstruc.addEventListener('click', () => {
           expandInstruc.textContent = index.instructions;
         })
    
      let button = document.getElementById(`${index.name} Button`);
      button.addEventListener('click', () => { 
        savedExercises.push(index);
        //remove all current rows with the class name "table-rows"
        let tableRows = document.querySelectorAll('.table-rows')
        for (const el of tableRows) {
          el.parentNode.removeChild(el);
        }
        bottomHalf(savedExercises);
      });
    }
    let numberofResults = document.createElement("p")
    numberofResults.textContent = `${exerciseList.length} Results`
    initialCardList.appendChild(numberofResults)

  }
  
  })



  
  function bottomHalf(savedExercises) {
    console.log(savedExercises);
    //Table Below!!
  
    var tr, td;
  
    for (i = 0; i < savedExercises.length; i++) {
      tr = bottomExercisesTable.insertRow(bottomExercisesTable.rows.length);
      tr.classList.add("table-rows")
      td = tr.insertCell(tr.cells.length);
      td.setAttribute("align", "center");
      td.innerHTML = savedExercises[i].type;
      td = tr.insertCell(tr.cells.length);
      td.innerHTML = savedExercises[i].name;
      td = tr.insertCell(tr.cells.length);
      td.innerHTML = savedExercises[i].muscle;
      td = tr.insertCell(tr.cells.length);
      td.innerHTML = savedExercises[i].difficulty;
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
  
  let bottomName = document.getElementById("bottom-name")
  let bottomExercise = document.getElementById("bottom-exercise")
  let bottomMuscle = document.getElementById("bottom-muscle")
  let bottomDifficulty = document.getElementById("bottom-difficulty")

  let clickCounterName = 0;
  let clickCounterExercise = 0;
  let clickCounterMuscle = 0;
  let clickCounterDifficulty = 0;

  
  bottomName.addEventListener('dblclick', () => {
    sortTable(0);

    clickCounterName++;

    if (clickCounterName % 2 === 1) {
        bottomName.textContent = "Category ▲";
    } else {
        bottomName.textContent = "Category ▼";
    }
});

bottomExercise.addEventListener('dblclick', () => {
  sortTable(0);

  clickCounterExercise++;

  if (clickCounterExercise % 2 === 1) {
      bottomExercise.textContent = "Exercise ▲";
  } else {
      bottomExercise.textContent = "Exercise ▼";
  }
});

bottomMuscle.addEventListener('dblclick', () => {
  sortTable(0);

  clickCounterMuscle++;

  if (clickCounterMuscle % 2 === 1) {
      bottomMuscle.textContent = "Muscle Group ▲";
  } else {
      bottomMuscle.textContent = "Muscle Group ▼";
  }
});

bottomDifficulty.addEventListener('dblclick', () => {
  sortTable(0);

  clickCounterDifficulty++;

  if (clickCounterDifficulty % 2 === 1) {
      bottomDifficulty.textContent = "Difficulty ▲";
  } else {
      bottomDifficulty.textContent = "Difficulty ▼";
  }
});
  
  })
