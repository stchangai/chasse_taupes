<template>
  <div v-on:click="KillTheMole" :class="'mole '+ numHoleArray[numHole-1]" :style="{top:position[0] + '%', left:position[1] + '%', zIndex:-numHole}" >
      <div></div>
      <div class="taupe"></div>
      <div class="kill"></div>
  </div>
</template>

<script>
export default {
  name: 'Mole',
  props: {
    numHole: Number,
    position:Array
  },
  data(){
    return{
      numHoleArray:["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
      word:'',
      classeParent:''
    }
  },
  updated(){
    console.log("position = ", this.position)
  },
  methods:{
    DizzyTaupe : function() {
      console.log('Dizzy taupe is ovver')
      document.querySelector('.' + this.classeParent + ' .taupe').classList.remove('dizzy');
      // document.querySelector('.' + this.classeParent+ ' .taupe').classList.remove('appear');
    },
    KillTheMole: function(event) {
    // console.log(event.target.previousSibling)
    //   console.log('you killed the mole ' + element.className);
    const Myclass = event.target.previousSibling.className.split(' ');
    const TheParentNode = event.target.parentNode.className.split(' ');
    this.word = Myclass[0];
    // console.log(this.word)
    this.classeParent = TheParentNode[1]
    // console.log(TheParentNode)
    // console.log('.' + TheParentNode[1] + ' .taupe.appear')
    let moleToKill = document.querySelector('.' + TheParentNode[1] + ' .taupe.appear');
    if (moleToKill != null) {
      moleToKill.classList.add('dizzy');
      document.querySelector('.' + TheParentNode[1]+ ' .taupe').classList.remove('appear');
      setTimeout(this.DizzyTaupe, 500);
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
    height:30vh;
    width:15vw;
    /* background:red; */
    transition: background-position 1s;
}

.mole div:first-child{
    background:url('../assets/trou_arriere.png') no-repeat;
    background-position:center;
}
.mole div:nth-child(2){
    background:url('../assets/taupe.png') no-repeat;
    background-position:center;
}
.mole div:nth-child(3){
    background:url('../assets/trou_avant.png') no-repeat;
    background-position:center;
}

.appear{
    background-position:center top !important;
    
}
</style>
