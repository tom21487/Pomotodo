let allTasks = [];
var currentTask = null;
var audio = new Audio("beeps.mp3");

window.onload = function() {
    allTasks.push("Purchase stationary");
    showTasks();
}

function addTask() {
  let newTask = document.getElementById("textbox").value;
  if (newTask != "") {
    /* Dot parsing
    if (newTask.length > 20) {
      var tempNewTask = newTask.substr(0, 19);
      tempNewTask += "...";
      allTasks.push(tempNewTask);
    }
    else*/
    allTasks.push(newTask);
    showTasks();
    document.getElementById("textbox").value = "";
  }
}

function showTasks() {
    let taskHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
      taskHTML += `<div class="task">
        <input id="taskName${i}" class="taskName" value="${allTasks[i]}" onchange="handleNameChange(${i})"/>
        <span class="buttonBox">
          <button onclick="pushToPomodoro(${i})" id="push"><span>^</span></button>

          <button onclick="completeTask(${i})" id="complete" class="completeBtn"><div id="circleShape" data-click-mode="blank"></div></button>

          <button onclick="removeTask(${i})" id="remove"><span >x</span></button>

          <!--button onclick="completeTask(${i})" class="completeBtn"><img src="blank-check.jpg" style="height: 10px" id="btn${i}" data-click-mode="blank" /></button-->
        </span>
        </div>`;
    }
    document.getElementById("taskArea").innerHTML = taskHTML;
}

function removeTask(i) {
  allTasks.splice(i, 1);
  showTasks();
  document.getElementById("mainTask").innerHTML = "Push task here";
}

function pushToPomodoro(i) {
  document.getElementById("mainTask").innerHTML = allTasks[i];
  currentTask = i;
}

function completeTask(i) {
  let btnText = document.getElementById("circleShape").dataset.clickMode;
  if (btnText === 'blank') {
    document.getElementById("circleShape").style.backgroundColor = "rgb(150, 150, 150)";
    document.getElementById("circleShape").dataset.clickMode = "filled";
  } else {
    document.getElementById("circleShape").style.backgroundColor = "white";
    document.getElementById("circleShape").dataset.clickMode = "blank";
  }
}

function handleNameChange(i) {
  allTasks[i] = document.getElementById(`taskName${i}`).value;
  if (currentTask === i) {
    document.getElementById("mainTask").innerHTML = allTasks[i];
  }
}