<template>
  <div id="game" >
    <Mole v-for="index in nbHoles" :key="index" :numHole="index" :position="[position[index], position[index+1]]" />
  </div>
</template>

<script>
import Mole from './Mole.vue'
export default {
  name: 'GameBoard',
  components: {
    Mole
  },
  props: {
    level: String,
    nbHoles:Number,
  },
  data(){
    return{
      top:0,
      left:0,
      position:[],
    }
  },
  updated(){
    this.RandomPosition()
  },
  methods:{
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
    RandomPosition: function(){
      let moleSize=200, moleCount = this.nbHoles;
      let gRows = Math.floor(document.querySelector('#game').offsetWidth/moleSize);
      let gCols = Math.floor(document.querySelector('#game').offsetHeight/moleSize)

      //let vals =[];
      let vals = this.range(1,moleCount)
      let xpos = this.range(1,gRows)
      let ypos = this.range(1,gCols)
      // console.log(vals)
      // console.log(xpos)
      this.shuffle(vals)
      this.shuffle(xpos)
      // let ypos = this.shuffle([...Array(gCols).keys()])
      console.log(vals)
      console.log(xpos)
      console.log(ypos)
      let i = 0;
      vals.forEach(element => {
        console.log(element)
        this.position[i] = ypos[i]*25;
        this.position[i+1]=xpos[i]*25;
        i=i+2;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game{
    height:70vh;
    width:70vw;
    background: url('../assets/background.jpg');
    position:relative;
}
</style>
