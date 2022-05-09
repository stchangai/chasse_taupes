<template>
  <div id="app">
    <Menu level="0" :nbHoles="nbHoles" :stop="false" :restart="false" :state="nbHoles<limitHoles"  v-on:PlayGame="PlayGame"  v-on:StopGame="StopGame" v-on:RestartGame="RestartGame" v-on:AddMole="AddMole" />
    <GameBoard level="0" :nbHoles="nbHoles" :position="positionRandom" @created="myFunction"/>
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
      limitHoles:8,
      positionRandom:[],
      positions:[],
    }
  },
  created(){
    for(let i = 0; i<4;i++){
      for(let j = 0; j< 4;j++){
        this.positions.push([i*25, j*25])
      }
    }
    this.PutMolesInBeginning();
     
  },
  mounted(){
    //this.RandomPosition();
  },
  methods:{
    myFunction: function () {
      let taupes = document.getElementsByClassName('mole');
      // console.log(taupes.length)
      var /*min = 5, max = 10,*/ alpha = 1;
      
      var randTaupe = Math.floor(
          Math.random() *
          (taupes.length));  // Generate Random number between 0 et numbers of moles
      // var randTime = Math.floor(
      //     Math.random() * (max - min + 1) +
      //     min);  // Generate Random number between 5 - 10
        
      var randTime = Math.floor(
          -alpha * Math.log(1-Math.random())); 
      // console.log(
      //     'Wait for ' + randTime + ' seconds and the mole selected is at index
      //     ' + randTaupe);

      // for (let i = 0; i < taupes.length; i++) {
      // console.log(document.querySelector(".one .taupe"))
      // console.log(document.querySelector("."+taupes[randTaupe].classList[1] +" .taupe"))
      document.querySelector("."+taupes[randTaupe].classList[0]+"."+taupes[randTaupe].classList[1] +" .taupe").classList.toggle('appear');
      // };
      this.timer = setTimeout(this.myFunction, randTime * 1000);
    },
  //   KillTheMole : function(element) {
  //   //   console.log(element)
  //   //   console.log('you killed the mole ' + element.className);
  //   const Myclass = element.className.split(' ');
  //   word = Myclass[0];
  //   //   console.log(document.querySelector('.' + word + '.taupe'))

  //   let moleToKill = document.querySelector('.' + word + '.taupe.appear');
  //   if (moleToKill != null) {
  //     moleToKill.classList.add('dizzy');
  //     document.querySelector('.' + word + '.taupe').classList.remove('appear');
  //     setTimeout(DizzyTaupe, 500);
  //   }
  // },
    PlayGame: function(){
      console.log("Play from App.vue")
      this.myFunction()
    },
    StopGame : function() {
      console.log("Enter in StopGame from App.vue")
      clearTimeout(this.timer)
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
        this.GetRandomPosition();
        console.log("nbHoles : "+ this.nbHoles);
      }
    },
    shuffle: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    range: function(start, end) {
      /* generate a range : [start, start+1, ..., end-1, end] */
      var len = end - start + 1;
      var a = new Array(len);
      for (let i = 0; i < len; i++) a[i] = start + i;
      return a;
    },
    PutMolesInBeginning: function(){
      for(let i = 0; i < this.nbHoles;i=i+1){
        let random = Math.floor(Math.random() * this.positions.length);
        this.positionRandom[i] = this.positions[random]; //{"top":this.position[random],"left":position[random]};
        this.positions.splice(random, 1);
        console.log("nb elements positions = ", this.positions.length)
      }
      console.log(this.positionRandom);
    },
    GetRandomPosition : function(){
      
      // for(let i = 0; i < this.nbHoles;i=i+1){
        let random = Math.floor(Math.random() * this.positions.length);
        this.positionRandom.unshift(this.positions[random]); //{"top":this.position[random],"left":position[random]};
        this.positions.splice(random, 1);
        console.log("nb elements positions = ", this.positions.length)
      // }
      console.log(this.positionRandom);
    },
    // GetRandomPosition: function(){
    //   let moleSize=290, moleCount = this.nbHoles;
    //   let gRows = Math.floor(936/moleSize);
    //   let gCols = Math.floor(678/moleSize)

    //   //let vals =[];
    //   let vals = this.range(1,moleCount)
    //   let xpos = this.range(0,gRows)
    //   let ypos = this.range(0,gCols)

    //   let possibilities = [];
    //   let counter = 0;
    //   for(let i=0; i< xpos.length;i++){
    //     for(let j=0; j< ypos.length;j++){
    //       possibilities[counter]=[ypos[j]*25,xpos[i]*25]
    //       counter++
    //     }
    //   }
    //   // console.log(vals)
    //   // console.log(xpos)
    //   this.shuffle(vals)
    //   this.shuffle(xpos)
    //   this.shuffle(ypos)
    //   // let ypos = this.shuffle([...Array(gCols).keys()])
    //   console.log(vals)
    //   console.log(xpos)
    //   console.log(ypos)
    //   let temp = []
    //   for(let i = 0; i < vals.length;i=i+1){
    //      temp[0] = [ypos[i%ypos.length]*25,xpos[i%xpos.length]*25];
    //      //console.log(JSON.stringify([50,75])==JSON.stringify([50,75]));

    //     let found = this.positionRandom.findIndex(element => JSON.stringify(element) == JSON.stringify(temp[0]));
    //     console.log(found)
    //     let count = 0;
    //     while(found > -1){
    //       count++
    //       console.log("entries " + temp[0] + " already in positionRandom ")
    //       temp[0] = [ypos[(i+count)%ypos.length]*25,xpos[i%xpos.length]*25];
    //       found = this.positionRandom.findIndex(element => JSON.stringify(element) == JSON.stringify(temp[0]));
    //       console.log("found in the while : " + found)
    //     }
    //     this.positionRandom[i] = temp[0]
    //   }
    
    //   console.log(this.positionRandom[0][0])
    //   // console.log([this.position[0].top, this.position[0].left])
    //   // return {"top":this.position[0].top, "left":this.position[0].left}
    // },  
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
    background-position:center top !important;
    
}

.dizzy{
    /* background:center / no-repeat url('./img/taupe.png'), top / no-repeat url('./img/dizzy.gif') !important; */
    background: url('./assets/dizzy.gif') top no-repeat, url('./assets/taupe_dizzy.png') top no-repeat !important;
    background-size: 50%,auto !important;
}
</style>


