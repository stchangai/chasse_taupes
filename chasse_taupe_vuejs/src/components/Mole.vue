<template>
  <div v-on:click="KillTheMole" v-on:dblclick="KillTheMoleCasquee" :class="'mole '+ numHoleArray[numHole-1]" :style="{top:position[0] + '%', left:position[1] + '%', zIndex:-numHole}" >
      <div></div>
      <div class="taupe"></div>
      <div class="casque"></div>
      <div class="timer"></div>
      <div class="kill"></div>
  </div>
</template>

<script>
export default {
  name: 'Mole',
  props: {
    numHole: Number,
    position:Array,
  },
  data(){
    return{
      numHoleArray:["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
      word:'',
      classeParent:''
    }
  },
  updated(){
    // console.log("position = ", this.position)
  },
  methods:{
    DizzyTaupe : function() {
      // console.log('Dizzy taupe is ovver')
      if(document.querySelector('.' + this.classeParent + ' .taupe') != null)document.querySelector('.' + this.classeParent + ' .taupe').classList.remove('dizzy');
      // document.querySelector('.' + this.classeParent+ ' .taupe').classList.remove('appear');
    },
    KillTheMole: function(event) {
      const classOfCasque = event.target.previousSibling.previousSibling.className.split(' ');
      if(classOfCasque.includes('appear')==false){
        // console.log(event.target.previousSibling)
        //   console.log('you killed the mole ' + element.className);

        const TheParentNode = event.target.parentNode.className.split(' ');

        this.classeParent = TheParentNode[1]
        // console.log(TheParentNode)
        // console.log('.' + TheParentNode[1] + ' .taupe.appear')
        let moleToKill = document.querySelector('.' + TheParentNode[1] + ' .taupe.appear');
        let IsThisaSpecialeTaupe = document.querySelector('.' + TheParentNode[1] + ' .timer.appearTimer')
        if (moleToKill != null) {
          moleToKill.classList.add('dizzy');
          if(IsThisaSpecialeTaupe!=null)this.$emit("BoosterDeclenche")
          this.$emit("TaupeKilled", TheParentNode[1])
          document.querySelector('.' + TheParentNode[1]+ ' .taupe').classList.remove('appear');
          document.querySelector('.' + TheParentNode[1]+ ' .timer').classList.remove('appearTimer');
          setTimeout(this.DizzyTaupe, 500);
        }
      }else{
        // console.log("cest une taupe casquée, il faut cliquer 2 fois")
      }
    },
    KillTheMoleCasquee: function(event) {
      const classOfCasque = event.target.previousSibling.previousSibling.className.split(' ');
      if(classOfCasque.includes('appear')==true){
        
        const TheParentNode = event.target.parentNode.className.split(' ');
        // console.log(this.word)
        this.classeParent = TheParentNode[1]
        // console.log(TheParentNode)
        // console.log('.' + TheParentNode[1] + ' .taupe.appear')
        let moleToKill = document.querySelector('.' + TheParentNode[1] + ' .taupe.appear');
        if (moleToKill != null) {
          moleToKill.classList.add('dizzy');
          this.$emit("TaupeKilled", TheParentNode[1])
          document.querySelector('.' + TheParentNode[1]+ ' .casque').classList.remove('appear');
          document.querySelector('.' + TheParentNode[1]+ ' .taupe').classList.remove('appear');
          
          setTimeout(this.DizzyTaupe, 500);
        }
      }else{
        // console.log("cest une taupe normale, pas besoin de double cliquer")
      }
    },
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game{
    height:80vh;
    width:70vw;
    background: url('../assets/background.jpg');
    position:relative;
    border-image: url('../assets/background.jpg') 30;
    z-index:10;
}
.mole{
  position:absolute;
  top:50%;
  left:50%;
  z-index:100;
}


.mole div{
    position:absolute;
    /* height:30vh; */
    height: 180px;
    width:15vw;
    /* background:red; */
    transition: background-position 1s;
}

.mole div:first-child{
    background:url('../assets/trou_arriere_RACCOURCI.png') no-repeat;
    background-position:bottom;
}

.mole div:nth-child(2){
    background:url('../assets/taupe_RACCOURCI.png') no-repeat;
    background-position:bottom;
}

.mole div:nth-child(3){
    background:url('../assets/casque_taupe_RACCOURCI.png') no-repeat;
    background-position:bottom;
    /* background-position:51% -7%; */
    background-size:50%;
}

.mole div:nth-child(4){
    background:url('../assets/timer.png') no-repeat;
    background-position:bottom left;
    /* background-position:51% -7%; */
    background-size:32%;
}

.mole div:nth-child(5){
    background:url('../assets/trou_avant_RACCOURCI.png') no-repeat;
    background-position:bottom;
}

.appear{
    background-position:center top !important;
    
}

</style>
