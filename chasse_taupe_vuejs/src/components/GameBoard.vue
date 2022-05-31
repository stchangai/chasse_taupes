<template>
  <div id="game" >
    <Mole v-for="index in nbHoles" :key="index" :numHole="index" :position="position[index-1]" v-on:TaupeKilled="SendTaupeJustKilled" v-on:BoosterDeclenche="BoosterDeclenche"/>
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
      positions:[],
    }
  },
  updated(){
    // console.log("position = ", this.position)
  },
  methods:{
    SendTaupeJustKilled: function(taupekilled){
      this.$emit("TaupeJustKilled", taupekilled)
    },
    BoosterDeclenche:function(){
      this.$emit("LaunchTheBooster")
    }
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
