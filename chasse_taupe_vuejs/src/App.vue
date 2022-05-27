<template>
  <div id="app">
    <Menu :level="level" :nbHoles="nbHoles" :taupesKilled="taupesKilledCount" :stop="false" :restart="false" :state="level<=5"  v-on:PlayGame="PlayGame"  v-on:StopGame="StopGame" v-on:RestartGame="RestartGame" v-on:AddMole="AddMole" />
    <GameBoard :level="level" :nbHoles="nbHoles" :position="positionRandom" v-on:TaupeJustKilled="RegisterTaupeJustKilled"/>
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
  watch:{
    level:function(newLevel){
      if(newLevel == 2){
        this.difficultyTaupeCasque = this.GetFromUserLevelDifficulty()
        this.probaPile-=0.1
      }
      console.log("newLevel", newLevel)
      this.probaPile-=0.2
      this.nbHoles = this.GetNumbersOfMolesByLevel(newLevel, this.probaPile)
      console.log("nb de trous nouveau level", this.nbHoles)
      this.positionRandom=[]
      this.positionsAlreadlyTaken=[]
      for(let i =0; i<this.nbHoles;i++){
        this.PutMolesInBeginning();
      }
    },
    taupesKilledCount:function(newTaupesKilledCount){
      this.ReachNumberOfTaupe(this.level, newTaupesKilledCount)
    }
  },
  data(){
    return{
      numHoleArray:["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
      objectivesByLevels:[20,30,40,50,60,75,70,75],
      timer:null,
      timerEmptyArray:null,
      nbHoles:4,
      limitHoles:8,
      positionRandom:[],
      positionsAlreadlyTaken:[],
      positions:[],
      randTaupe:0,
      taupes:[],
      level:1,
      probaPile:0.6,
      difficultyTaupeCasque:null,
      MoleJustKilled:[],
      taupesKilledCount:0,
    }
  },
  created(){
    //rempli un tableau de toutes les coordonnées possibles sur le terrain
    this.positions=[];
    for(let i = 0; i<4;i++){
      for(let j = 0; j< 4;j++){
        this.positions.push([i*25, j*25])
      }
    }
    // console.log(this.positions)
    this.nbHoles = this.GetNumbersOfMolesByLevel(this.level)
    console.log("nb de trous à création du jeu", this.nbHoles)
    for(let i =0; i<this.nbHoles;i++){
      this.PutMolesInBeginning();
    }
     
  },
  methods:{
    MoleAppearition:function(){
      let test = 0
      let tableauIndexTaupes=[];
      this.taupes = document.getElementsByClassName('mole');
      // création d'un tableau double ["one", 1], ["two", 2]....
      for(let i =0;i<this.taupes.length;i++){
        tableauIndexTaupes.push({"class":this.numHoleArray[i], "id":i+1})
      }
      // console.log(tableauIndexTaupes)
      //on vérifie que MoleJustKilled n'est pas vide et qu'elle existe bien dans le tableau des taupes sur le terrain
      // si elle existe, on la retire du tableau pour éviter qu'elle soit rappeler par le random trop vite
      console.log(tableauIndexTaupes.findIndex(element => { return element.class == this.MoleJustKilled[0]}))
      if(this.MoleJustKilled.length==0 && tableauIndexTaupes.findIndex(element => { return element.class == this.MoleJustKilled[0]}) != -1){
        tableauIndexTaupes.splice(tableauIndexTaupes.findIndex(element => { return element.class == this.MoleJustKilled[0]}), 1)
      } 
      // console.log(tableauIndexTaupes)
      this.randTaupe = Math.floor(
          Math.random() *
          (this.taupes.length));  // Generate Random number between 0 et numbers of moles
          // console.log("Randtaupe avant vérif ", this.randTaupe)
      while(tableauIndexTaupes.includes(this.randTaupe) == false && test<20 && this.MoleJustKilled.length == 0){
        test++
        // console.log("verif")
        this.randTaupe = Math.floor(Math.random() *(this.taupes.length));
      }
      if(test == 20)console.log("test", test)
      test=0
      // console.log("RandTaupe après vérif", this.randTaupe)
      // utilise la loi Exponentielle pour déterminer le temps d'apparition des taupes
      let alpha = 1;
      var randTime = Math.floor(
          -alpha * Math.log(1-Math.random())); 

      document.querySelectorAll('.appear').forEach(function(element){
          element.classList.remove('appear')
      })

      let HasCasque = this.IsThisMoleHasCasque(this.difficultyTaupeCasque)
      if(HasCasque){
        document.querySelector("."+this.taupes[this.randTaupe].classList[0]+"."+this.taupes[this.randTaupe].classList[1] +" .casque").classList.add('appear');
      }
      // fait apparaître la taupe avec la classe appear
      document.querySelector("."+this.taupes[this.randTaupe].classList[0]+"."+this.taupes[this.randTaupe].classList[1] +" .taupe").classList.add('appear');
      this.timer = setTimeout(this.MoleAppearition, randTime * 2000);

    },
    RegisterTaupeJustKilled:function(taupekilled){
      console.log("La taupe ", taupekilled, " est rentrée dans le tableau justKilled")
      if(this.MoleJustKilled.includes(taupekilled)==false){
        this.MoleJustKilled.push(taupekilled)
        
      }
      this.taupesKilledCount++
    },
    EmptyTaupeJustKilled:function(){
      if(this.MoleJustKilled != []){
        
        this.MoleJustKilled.shift()
        console.log("empty tableau taupe killed ", this.MoleJustKilled.length)
        this.timerEmptyArray = setTimeout(this.EmptyTaupeJustKilled, 3000)
      }
    },
    PlayGame: function(){
      console.log("Play from App.vue")
      this.MoleAppearition()
      this.EmptyTaupeJustKilled()
    },
    StopGame : function() {
      console.log("Enter in StopGame from App.vue")
      clearTimeout(this.timer)
      clearTimeout(this.timerEmptyArray)
    },
    RestartGame: function() {
      if(this.level <=5){this.level++}
    },
    AddMole : function(){
      console.log("Enter in AddMole from App.vue");
      this.SetTerrain(true)
    },
    PutMolesInBeginning: function(){
      let tab_proba = [
        0.1, 0.4, 0.3, 0.2,
        0.2, 0.3, 0.4, 0.1,
        0.3, 0.2, 0.2, 0.3,
        0.4, 0.1, 0.1, 0.4
      ]
      let found = -1;
      let sum = 0;
      let random;
      // console.log("random", random)
      let i = 0, j;
      let test = 0
      while(found != undefined && test<10){
        test++
        // console.log("entrer dans la boucle while car found != undefined")
          i = 0;
          random = Math.random();
        // console.log("random ligne", random)
          sum = tab_proba[i]
          while(sum < random){ //while(sum < random && random < tab_proba[i]){
            i++
            sum += tab_proba[i]
          }          
          j=i;
          sum = tab_proba[j]
          random = Math.random();
        // console.log("random colonne ", random)
          while(sum < random){
            j+=4
            sum+=tab_proba[j]
          }
          // on vérifie que la position n'a pas déjà été attribuée à un trou précédent
          found = this.positionsAlreadlyTaken.find(element => element==this.positions[j])
          if(found == undefined){console.log("c'est bon tu vas bientot sortir normalement")}
      }
      this.positionRandom.push(this.positions[j])
      this.positionsAlreadlyTaken.push(this.positions[j])
     
      console.log(this.positionRandom);
    },
    // 1) tirage d'une piece pile ou face de parametre de probabilité de pile =p
    pileOuFace:function(p) { //Bernouilli
      //p = 0.5 // juste pour tester, peut-être à changer selon conditions
      let random = Math.random(); // ramene sur 1
      if (random < p) {
        console.log("pile");
        return -1
      } else {
        console.log("face");
        return 1
      }
    },
    GetNumbersOfMolesByLevel: function(level, p=0.6){
      console.log("LEVEL =", level)
      for(let i = 0; i<=level;i++){
        if(this.pileOuFace(p)==-1){ // si le tirage sort pile 
          return i+1 //retourne le nombre de trous qu'il y aura sur le terrain
        }
      }
      return level+2 //s'il n'y a pas de pile tiré alors il y aura le maximum de trous pour le niveau
    },
    SetTerrain:function(test=false){
      if(!test)this.probaPile-=0.1
      this.nbHoles = this.GetNumbersOfMolesByLevel(this.level, this.probaPile)
      console.log("nb de trous nouveau level", this.nbHoles)
      this.positionRandom=[]
      this.positionsAlreadlyTaken=[]
      for(let i =0; i<this.nbHoles;i++){
        this.PutMolesInBeginning();
      }
    },
    IsThisMoleHasCasque:function(difficulty){
      if(difficulty != null){
        let difficultiesWithProbability = [["0", 0.2],["1",0.5],["2",0.8]]
        if(this.pileOuFace(difficultiesWithProbability[difficulty][1]) == -1){
          return true;
        }else return false
      }
    },
    GetFromUserLevelDifficulty:function(){
      let casqueDifficulty = prompt("Please enter difficulty level for traps (0 => facile, 1=>moyen, 2=>difficile", "0");
      if (["0", "1", "2"].includes(casqueDifficulty)) {
        return parseInt(casqueDifficulty)
      }else{
        return 0
      }
    },
    ReachNumberOfTaupe:function(level, taupesKilled){
      if(taupesKilled >= this.objectivesByLevels[level-1]){
        alert("Bravo, tu as completé le niveau avec succès. On passe au suivant maintenant !")
        this.level++
        this.taupesKilledCount=0
      }
    },
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
  background: url('./assets/background.jpg');
}

.appear{
    background-position:center top !important;
    
}

.dizzy{
    /* background:center / no-repeat url('./img/taupe.png'), top / no-repeat url('./img/dizzy.gif') !important; */
    background: url('./assets/dizzy.gif') top no-repeat, url('./assets/taupe_dizzy_RACCOURCI.png') top no-repeat !important;
    background-size: 50%,auto !important;
}
</style>


