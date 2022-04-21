<template>
  <div :class="'mole '+ numHole" :style="{top:position[0] + '%', left:position[1] + '%'}">
      <div>{{position[1]}}</div>
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
.mole{
  position:absolute;
  top:50%;
  left:50%;
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
</style>
