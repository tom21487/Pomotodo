window.onload = function() {
    console.log("Page loaded");
    let selector = document.getElementById('modeSelection');
    selector.selectedIndex = 0;
    changeModes();
  }

  let initConditions = {
    minutes: 0,
    seconds: 10,
  }
  
  let mode = "work";
  let intervalStarted = false;

  class SDTime {
    constructor() {
      this.minutes = initConditions.minutes;
      this.seconds = initConditions.seconds;
    }

    decrement() {
      if (this.seconds === 0) {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          console.log("Timer is up!");
          let selector = document.getElementById('modeSelection');
          if (selector.selectedIndex === 0) {
            selector.selectedIndex = 1;
          } else if (selector.selectedIndex === 1) {
            selector.selectedIndex = 0;
          }
          audio.play();
          changeModes();
          stopTimer();
        }
      } 
      else {
        this.seconds--;
      }
    }
  }

  var countDown = new SDTime();
  var x;

  function startTimer() {
    if (!intervalStarted) {
      intervalStarted = true;
      x = setInterval(function() {
        countDown.decrement();
        if (countDown.seconds < 10) {
          document.getElementById("demo").innerHTML = countDown.minutes + ":0" + countDown.seconds;
        }
        else document.getElementById("demo").innerHTML = countDown.minutes + ":" + countDown.seconds;
      }, 1000); // Update every second
    }
  }

  function stopTimer() {
    if (x !== undefined) {
      clearInterval(x);
      intervalStarted = false;
    }
  }

  function resetTimer() {
    stopTimer();
    countDown.minutes = initConditions.minutes;
    countDown.seconds = initConditions.seconds;
    if (countDown.seconds < 10) {
        document.getElementById("demo").innerHTML = countDown.minutes + ":0" + countDown.seconds;
    }
    else {
      document.getElementById("demo").innerHTML = countDown.minutes + ":" + countDown.seconds;
    }
  }

  function changeModes() {
    let selector = document.getElementById('modeSelection');
    let value = selector[selector.selectedIndex].value;
    mode = value;
    if (mode === "work") {
      initConditions.minutes = 0;
      initConditions.seconds = 10;
    } else if (mode === "rest") {
      initConditions.minutes = 0;
      initConditions.seconds = 3;
    }
    resetTimer();
  }