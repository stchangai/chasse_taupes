<template>
  <div id="menu">
    <h2>Chasse taupe</h2>
    <h3>Level {{level}}</h3>
    <div>
      <button id="play" v-on:click="PlayGame">PLAY</button>
      <button id="stop" v-on:click="StopGame">STOP</button>
      <button id="restart" v-on:click="RestartGame" :disabled="state==false">LEVEL ++</button>
      <button id="nbHole" v-on:click="AddMole">SET TERRAIN</button>
    </div>
    <span>Taupes tapées : {{taupesKilled}}</span>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    level: Number,
    stop:Boolean,
    restart:Boolean,
    nbHoles:Number,
    state:Boolean,
    taupesKilled:Number,
  },
  mounted(){
    
  },
  methods:{
    PlayGame: function(){
      this.$emit("PlayGame")
    },
    StopGame : function() {
      console.log("Enter in StopGame from Menu.vue");
      this.$emit("StopGame");
      // clearTimeout(timer)
    },
    RestartGame: function() {
      console.log("Enter in RestrartGame from Menu.vue");
      this.$emit("RestartGame");
      // myFunction();
    },
    AddMole: function(){
      console.log("Enter in AddMole from Menu.vue");
      this.$emit("AddMole")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu{
    height:70vh;
    width:25vw;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left:4vw;
}
span{
  margin:3vh 0;
}
</style>
