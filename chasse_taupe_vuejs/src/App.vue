<template>
  <div id="app">
    <Menu :level="level" :nbHoles="nbHoles" :taupesKilled="taupesKilledCount" :stop="false" :restart="false" :state="level<=5"  v-on:PlayGame="PlayGame"  v-on:StopGame="StopGame" v-on:RestartGame="RestartGame" v-on:AddMole="AddMole" />
    <GameBoard :level="level" :nbHoles="nbHoles" :position="positionRandom" v-on:TaupeJustKilled="RegisterTaupeJustKilled" v-on:LaunchTheBooster="LaunchTheBooster"/>
    <GameOver v-if="boosterOn==true" v-on:RestartLevel="ResetLevel"/>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue'
import Menu from './components/Menu.vue'
import GameOver from './components/GameOver.vue'
export default {
  name: 'App',
  components: {
    GameBoard,
    Menu,
    GameOver,
  },
  watch:{
    level:function(newLevel){
      this.NumberofTaupesToEndLevel = this.NumberOfTaupesByLevels[newLevel-1]
      if(newLevel == 2){
        this.difficultyTaupeCasque = this.GetFromUserLevelDifficulty()
        this.probaPile-=0.1
        
        
      }
      console.log("newLevel", newLevel)
      clearTimeout(this.timerSpecialTaupe)
      this.NumberofTaupesAlchimistes = this.NumberofTaupesAlchimistesByLevel(0.02*this.NumberOfTaupesByLevels[newLevel-1])
      console.log("number of taupes alchimistes pour le niveau ", newLevel, " : ", this.NumberofTaupesAlchimistes)
      // let tempsDeTransition=0;
      let randTaupeSpeciale = this.randomTime(0.5,4)*2000*this.NumberofTaupesAlchimistes;
      console.log("randTaupeSpeciale", randTaupeSpeciale)
      //si ça ne fonctionne pas : rajouter +1 à this.numberoftaupesalchimistes
      if(this.NumberofTaupesAlchimistes != 0)setTimeout(()=>{console.log("entrer dans le 1e settimeout");this.TaupeSpeciale()}, randTaupeSpeciale)
      // let timerSpecialTaupe = setTimeout(()=>{
      //   if(this.NumberofTaupesAlchimistes >=0){
      //     this.MakeSpecialTaupeAppears()
      //     this.NumberofTaupesAlchimistes--
      //     // tempsDeTransition = this.randomTime(0.5)*2000*(-Math.log(this.NumberofTaupesAlchimistes/10));
      //     console.log("tempsDeTransition ", 2000*this.NumberofTaupesAlchimistes)
      //   }else clearTimeout(timerSpecialTaupe)
      // }, 2000*this.NumberofTaupesAlchimistes)
      this.probaPile-=0.2
      this.nbHoles = this.GetNumbersOfMolesByLevel(newLevel, this.probaPile)
  
      this.positionRandom=[]
      this.positionsAlreadlyTaken=[]
      for(let i =0; i<this.nbHoles;i++){
        this.PutMolesInBeginning();
      }
    },
    taupesKilledCount:function(newTaupesKilledCount){
      this.ReachNumberOfTaupe(this.level, newTaupesKilledCount)
    },
    NumberofTaupesToEndLevel:function(newNumberofTaupesToEndLevel){
      if(newNumberofTaupesToEndLevel == 0){
        console.log("LIMITE NOMBRE DE TAUPE ATTEINTE")
        this.LaunchGameOver(this.level)
      }
    },
  },
  data(){
    return{
      numHoleArray:["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
      objectivesByLevels:[20/4,30/5,40/5,50/5,60/10,75/5,70],
      NumberOfTaupesByLevels:[10*2,15*2,20*2,25*2,30*2,35*2,40*2],
      timer:null,
      timerEmptyArray:null,
      timerRemoveAppear:null,
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
      NumberofTaupesAlchimistes:0,
      NumberofTaupesToEndLevel:0,
      IsItGameOver:false,
      lastTaupe:null,
      lastHole:null,
      timerSpecialTaupe:null,
      booster:1,
      boosterOn:false,
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
    // console.log("nb de trous à création du jeu", this.nbHoles)
    for(let i =0; i<this.nbHoles;i++){
      this.PutMolesInBeginning();
    }
    this.NumberofTaupesToEndLevel = this.NumberOfTaupesByLevels[this.level-1]
    this.taupes = document.getElementsByClassName('mole');
  },
  methods:{
    LaunchTheBooster:function(){
      this.booster = 4
      this.boosterOn=true
      console.log("Launch the Booster", this.booster)
      setTimeout(()=>{this.booster = 1;this.boosterOn=false}, 15000) // 15s mais peut être changé
    },
    TaupeSpeciale:function(){
      
       if(this.NumberofTaupesAlchimistes >0){
          this.MakeSpecialTaupeAppears()
          this.NumberofTaupesAlchimistes--
          // tempsDeTransition = this.randomTime(0.5)*2000*(-Math.log(this.NumberofTaupesAlchimistes/10));
          console.log("NumberofTaupesAlchimistes ", this.NumberofTaupesAlchimistes)
        }else {clearTimeout(this.timerSpecialTaupe)}
      this.timerSpecialTaupe = setTimeout(this.TaupeSpeciale, this.randomTime(0.5,10)*2000*this.NumberofTaupesAlchimistes)
      // this.timerSpecialTaupe = setTimeout(this.MoleAppearition, randTime * 2000 );
    },
    MoleAppearition:function(){
      let test = 0
      // let tableauIndexTaupes=[];
      this.taupes = document.getElementsByClassName('mole');
      // création d'un tableau double ["one", 1], ["two", 2]....
      // for(let i =0;i<this.taupes.length;i++){
      //   tableauIndexTaupes.push({"class":this.numHoleArray[i], "id":i+1})
      // }
      // console.log(tableauIndexTaupes)
      //on vérifie que MoleJustKilled n'est pas vide et qu'elle existe bien dans le tableau des taupes sur le terrain
      // si elle existe, on la retire du tableau pour éviter qu'elle soit rappeler par le random trop vite
      // console.log(tableauIndexTaupes.findIndex(element => { return element.class == this.MoleJustKilled[0]}))
      // if(this.MoleJustKilled.length==0 && tableauIndexTaupes.findIndex(element => { return element.class == this.MoleJustKilled[0]}) != -1){
      //   tableauIndexTaupes.splice(tableauIndexTaupes.findIndex(element => { return element.class == this.MoleJustKilled[0]}), 1)
      // } 
      // console.log(tableauIndexTaupes)
      this.randTaupe = Math.floor(
          Math.random() *
          (this.taupes.length));  // Generate Random number between 0 et numbers of moles
          // console.log("Randtaupe avant vérif ", this.randTaupe)
      // while(tableauIndexTaupes.includes(this.randTaupe) == false && test<20 && this.MoleJustKilled.length == 0){
      //   test++
      //   // console.log("verif")
      //   this.randTaupe = Math.floor(Math.random() *(this.taupes.length));
      // }
      // console.log("randTaupe 1 ", this.randTaupe)
      while(this.randTaupe == this.lastTaupe && test < 20){
        // console.log("duplicate taupe")
        test++
        this.randTaupe = Math.floor(Math.random() * (this.taupes.length)); 
        // console.log("randTaupe WHILE ", this.randTaupe)
      }
      this.lastTaupe = this.randTaupe
      // console.log("randTaupe 2 ", this.randTaupe)
      
      // if(test == 20)console.log("test", test)
      test=0
      // console.log("RandTaupe après vérif", this.randTaupe)
      // utilise la loi Exponentielle pour déterminer le temps d'apparition des taupes
      let alpha = 1;
      var randTime = this.randomTime(alpha); 
      // console.log("randTime", randTime)
      while(randTime < 0.5){
        randTime = this.randomTime(alpha); 
        // console.log("randTime 2", randTime)
      }

      let HasCasque = this.IsThisMoleHasCasque(this.difficultyTaupeCasque)
      if(HasCasque){
        document.querySelector("."+this.taupes[this.randTaupe].classList[0]+"."+this.taupes[this.randTaupe].classList[1] +" .casque").classList.add('appear');
      }
      // fait apparaître la taupe avec la classe appear
      document.querySelector("."+this.taupes[this.randTaupe].classList[0]+"."+this.taupes[this.randTaupe].classList[1] +" .taupe").classList.add('appear');
      this.timerRemoveAppear = setTimeout(()=> { 
        
          if(document.querySelector("."+this.taupes[this.randTaupe].classList[0]+"."+this.taupes[this.randTaupe].classList[1] +" .casque") != null){
            document.querySelector("."+this.taupes[this.randTaupe].classList[0]+"."+this.taupes[this.randTaupe].classList[1] +" .casque").classList.remove('appear');
          }
          // fait apparaître la taupe avec la classe appear
          document.querySelector("."+this.taupes[this.randTaupe].classList[0]+"."+this.taupes[this.randTaupe].classList[1] +" .taupe").classList.remove('appear');
          this.NumberofTaupesToEndLevel--
          console.log("this.NumberofTaupesToEndLevel", this.NumberofTaupesToEndLevel)
        
      }, randTime * 2000 * this.booster)
      this.timer = setTimeout(this.MoleAppearition, randTime * 2000);

    },
    RegisterTaupeJustKilled:function(){
      // if(this.MoleJustKilled.includes(taupekilled)==false){
      //   this.MoleJustKilled.push(taupekilled)
        
      // }
      this.taupesKilledCount++
      // console.log("nombre de taupes killed", this.taupesKilledCount)
    },
    PlayGame: function(){
      console.log("Play from App.vue")
      this.MoleAppearition()
    },
    StopGame : function() {
      console.log("Enter in StopGame from App.vue")
      clearTimeout(this.timer)
      clearTimeout(this.timerEmptyArray)
      clearTimeout(this.timerSpecialTaupe)
      clearTimeout(this.timerRemoveAppear)
      //LANCER LES STATS
      this.DisplayStats()
    },
    RestartGame: function() {
      if(this.level <=5){this.level++}
    },
    AddMole : function(){
      console.log("ReSet terrain");
      this.SetTerrain(true)
    },
    ResetLevel: function(){
      console.log("restart after game over")
      this.SetTerrain(true)
      
    },
    DisplayStats:function(){
      //Loi EXPONENTIELLE
          // variance
          // let alphaTaupeNormale = 1, alphaTaupeSpeciale = 0.5, alphaTaupeSpecialeHorsTrou = 0.8;
          // let varianceExpoTaupeNormale = 1/(alphaTaupeNormale*alphaTaupeNormale);
          // let varianceExpoTaupeSpecialeHorsTrou = 1/(alphaTaupeSpecialeHorsTrou*alphaTaupeSpecialeHorsTrou); // mais quel alpha ? Utilisation de plusieurs alpha 
          // let varianceExpoTaupeSpecialeApparition = 1/(alphaTaupeSpeciale*alphaTaupeSpeciale);

        //Loi POISSON
          //moyenne
          //equart-type

        //Loi GEOMETRIQUE
          //moyenne
          //equart-type

        //Loi BERNOULLI
          //moyenne
          //equart-type
    },
    LaunchGameOver: function(level){
      let displayGameOver = confirm("And that's a game over for you ! Do you want to restart this level ?")
      if(displayGameOver){ //Le joueur restart le niveau 
         clearTimeout(this.timerSpecialTaupe)
         this.NumberofTaupesToEndLevel = this.NumberOfTaupesByLevels[level-1]
         this.taupesKilledCount = 0
         console.log("this.NumberOfTaupesToENdLevel at RESTART", this.NumberofTaupesToEndLevel)
         this.SetTerrain(true)
         this.NumberofTaupesAlchimistes = this.NumberofTaupesAlchimistesByLevel(0.02*this.NumberOfTaupesByLevels[this.level-1])
          console.log("number of taupes alchimistes pour le niveau ", this.level, " : ", this.NumberofTaupesAlchimistes)
          //si ça ne fonctionne pas : rajouter +1 à this.numberoftaupesalchimistes
          if(this.NumberofTaupesAlchimistes != 0)setTimeout(()=>{console.log("entrer dans le 1e settimeout");this.TaupeSpeciale()}, this.randomTime(0.5)*2000*this.NumberofTaupesAlchimistes)
          this.PlayGame()
      }
      else this.StopGame()
      // this.IsItGameOver = true;
    },
    randomTime: function(alpha, limiteMin=0) {
      return (-alpha * Math.log(1-Math.random()))+limiteMin;
    },
    randomHole: function(holes) {
      const idx = Math.floor(Math.random() * holes.length);
      const hole = holes[idx];
      if (hole === this.lastHole || hole === this.lastTaupe) { //pour ne pas sortir une taupe spéciale dans le même trou qu'une taupe normale en même temps
        console.log('Ah nah thats the same one bud');
        return this.randomHole(holes);
      }
      this.lastHole = hole;
      return idx;
    },
    MakeSpecialTaupeAppears:function(){
      // this.taupes = document.getElementsByClassName('mole');
      const time = this.randomTime(0.8,1+this.NumberofTaupesAlchimistes)
      const specialTaupe = this.randomHole(this.taupes)
      console.log("time = ", time, " and specialTaupe = ", specialTaupe)
      // console.log(this.taupes)
      // console.log(this.taupes[specialTaupe])
      document.querySelector("."+this.taupes[specialTaupe].classList[0]+"."+this.taupes[specialTaupe].classList[1] +" .taupe").classList.add('appear');
      document.querySelector("."+this.taupes[specialTaupe].classList[0]+"."+this.taupes[specialTaupe].classList[1] +" .timer").classList.add('appearTimer');
      setTimeout(()=> { 
          // fait disparaitre la taupe avec la classe appear
          document.querySelector("."+this.taupes[specialTaupe].classList[0]+"."+this.taupes[specialTaupe].classList[1] +" .taupe").classList.remove('appear');
          document.querySelector("."+this.taupes[specialTaupe].classList[0]+"."+this.taupes[specialTaupe].classList[1] +" .timer").classList.remove('appearTimer');
          // this.NumberofTaupesToEndLevel--
          // console.log("this.NumberofTaupesToEndLevel", this.NumberofTaupesToEndLevel)
        
      }, time * 1500)
      
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
          // if(found == undefined){console.log("c'est bon tu vas bientot sortir normalement")}
      }
      this.positionRandom.push(this.positions[j])
      this.positionsAlreadlyTaken.push(this.positions[j])
     
      // console.log(this.positionRandom);
    },
    // 1) tirage d'une piece pile ou face de parametre de probabilité de pile =p
    pileOuFace:function(p) { //Bernouilli
      //p = 0.5 // juste pour tester, peut-être à changer selon conditions
      let random = Math.random(); // ramene sur 1
      if (random < p) {
        // console.log("pile");
        return -1
      } else {
        // console.log("face");
        return 1
      }
    },
    GetNumbersOfMolesByLevel: function(level, p=0.6){
      console.log("LEVEL =", level)
      for(let i = 0; i<=level;i++){
        if(this.pileOuFace(p)==-1){ // si le tirage sort pile 
          return i+2 //retourne le nombre de trous qu'il y aura sur le terrain
        }
      }
      return level+2 //s'il n'y a pas de pile tiré alors il y aura le maximum de trous pour le niveau
    },
    SetTerrain:function(test=false){
      if(!test)this.probaPile-=0.1
      this.nbHoles = this.GetNumbersOfMolesByLevel(this.level, this.probaPile)
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
    NumberofTaupesAlchimistesByLevel:function(lambda){ //loi de Poisson
      let p=Math.random() //p est un nombre aléatoire entre 0 et 1
      console.log("p",p)
      //lambda = 1.5
      
      let x=0
      let y=Math.exp(-lambda)
      console.log("Py0",y)
      let z=y //on affecte à z la valeur F(0) de la
      //fonction de répartition de la variable aléatoire en 0
      while(z<p){//tant que p>F(x)
        x+=1 //on augmente de 1 la valeur de x
        y=y*lambda /x //y prend par récurrence la valeur de P(X=x)
        // console.log("Py",x, "= ", y)
        z+=y // z prend par récurrence la valeur de F(x)
      }
      //on sort de la boucle quand F(x−1)<=p<F(x)
      //p ayant bien une probabilité P(X=x)=F(x)−F(x−1) de tomber dans cet intervalle
      return x
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
.appearTimer{
    background-position:left top !important;
    
}

.dizzy{
    /* background:center / no-repeat url('./img/taupe.png'), top / no-repeat url('./img/dizzy.gif') !important; */
    background: url('./assets/dizzy.gif') top no-repeat, url('./assets/taupe_dizzy_RACCOURCI.png') top no-repeat !important;
    background-size: 50%,auto !important;
}
</style>


