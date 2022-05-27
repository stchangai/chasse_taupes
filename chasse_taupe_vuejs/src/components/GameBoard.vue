<template>
  <div id="game" >
    <Mole v-for="index in nbHoles" :key="index" :numHole="index" :position="position[index-1]" v-on:TaupeKilled="SendTaupeJustKilled"/>
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
    level: Number,
    nbHoles:Number,
    position:Array
  },
  data(){
    return{
      top:0,
      left:0,
      positionRandom:[{"top":0, "left":0}],
      positions:[],
    }
  },
  mounted(){
    //this.RandomPosition()
    // for(let i = 0; i<4;i++){
    //   for(let j = 0; j< 4;j++){
    //     position.push([i*25, j*25])
    //   }
    // }
  },
  updated(){
    console.log("position = ", this.position)
  },
  methods:{
    SendTaupeJustKilled: function(taupekilled){
      this.$emit("TaupeJustKilled", taupekilled)
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
    // GetRandomPosition : function(){
      
    //   for(let i = 0; i < this.nbHoles;i=i+1){
    //     let random = Math.floor(Math.random() * this.positions.length);
    //     this.positionRandom[i] = {"top":this.position[random],"left":position[random]};
    //   }
    //   console.log(this.positionRandom);
    // },
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
      this.shuffle(ypos)
      // let ypos = this.shuffle([...Array(gCols).keys()])
      console.log(vals)
      console.log(xpos)
      console.log(ypos)

      for(let i = 0; i < vals.length;i=i+1){
        this.positionRandom[i] = {"top":ypos[i]*25,"left":xpos[i]*25};
      }
      console.log(this.positionRandom)
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
    z-index: 10;
}
</style>
