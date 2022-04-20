'use strict';
let timer, word;
document.addEventListener('DOMContentLoaded', function() {
  let kill = document.getElementsByClassName('kill');
  let stopButton = document.getElementById('stop');
  let restartButton = document.getElementById('restart');
  restartButton.addEventListener('click', RestrartGame)
  stopButton.addEventListener('click', StopGame);
  myFunction()
  for (let i = 0; i < kill.length; i++) {
    kill[i].addEventListener('click', function() {
      KillTheMole(kill[i])
    })
  }
});

function myFunction() {
  let taupes = document.getElementsByClassName('taupe');
  var min = 5, max = 10;
  var randTaupe = Math.floor(
      Math.random() *
      (taupes.length));  // Generate Random number between 0 et numbers of moles
  var randTime = Math.floor(
      Math.random() * (max - min + 1) +
      min);  // Generate Random number between 5 - 10
  // console.log(
  //     'Wait for ' + randTime + ' seconds and the mole selected is at index
  //     ' + randTaupe);

  // for (let i = 0; i < taupes.length; i++) {
  // console.log(taupes[randTaupe])
  taupes[randTaupe].classList.toggle('appear');
  // };
  timer = setTimeout(myFunction, randTime * 500);
}

function KillTheMole(element) {
  //   console.log(element)
  //   console.log('you killed the mole ' + element.className);
  const Myclass = element.className.split(' ');
  word = Myclass[0];
  //   console.log(document.querySelector('.' + word + '.taupe'))

  document.querySelector('.' + word + '.taupe').classList.add('dizzy');
  document.querySelector('.' + word + '.taupe').classList.remove('appear');
  setTimeout(DizzyTaupe, 500);
}

function StopGame() {
  clearTimeout(timer)
}

function RestrartGame() {
  myFunction();
}

function DizzyTaupe() {
  console.log('Dizzy taupe is ovver')
  document.querySelector('.' + word + '.taupe').classList.remove('dizzy');
}