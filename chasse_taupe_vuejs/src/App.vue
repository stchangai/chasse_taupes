<template>
  <div id="app">
    <Menu level="0" :nbHoles="nbHoles" :stop="false" :restart="false" :state="nbHoles<limitHoles" v-on:StopGame="StopGame" v-on:RestartGame="RestartGame" v-on:AddMole="AddMole" />
    <GameBoard level="0" :nbHoles="nbHoles" />
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue'
import Menu from './components/Menu.vue'
export default {
  name: 'App',
  components: {
    GameBoard,
    Menu
  },
  data(){
    return{
      timer:null,
      nbHoles:1,
      limitHoles:5,
    }
  },
  mounted(){

  },
  methods:{
    myFunction: function () {
      let taupes = document.getElementsByClassName('mole');
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
      this.timer = setTimeout(this.myFunction, randTime * 500);
    },
    StopGame : function() {
      console.log("Enter in StopGame from App.vue")
      // clearTimeout(this.timer)
    },
    RestartGame: function() {
      console.log("Enter in RestartGame from App.vue")
      // this.myFunction();
      this.nbHoles = 1;
    },
    AddMole : function(){
      console.log("Enter in AddMole from App.vue");
      if(this.nbHoles < this.limitHoles){
        this.nbHoles++;
        console.log("nbHoles : "+ this.nbHoles);
      }
    }
  }
}
</script>

<style>
html, body{
  margin:0;
  height:100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  height:100%;
}

.appear{
    background-position:top !important;
    
}

.dizzy{
    /* background:center / no-repeat url('./img/taupe.png'), top / no-repeat url('./img/dizzy.gif') !important; */
    background: url('./assets/dizzy.gif') top no-repeat, url('./assets/taupe_dizzy.png') top no-repeat !important;
    background-size: 50%,auto !important;
}
</style>
