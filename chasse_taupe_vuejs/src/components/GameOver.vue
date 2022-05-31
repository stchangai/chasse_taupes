<template>
  <div class="booster">
    <h1>BOOSTER</h1>
  </div>
</template>

<script>
export default {
  name: 'GameOver',
  props: {
    msg: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.booster{
	position:absolute;
	top:0;
	display: flex;
	justify-content: center;
	align-items: flex-start;
}
.booster h1{
	font-size:3rem;
	color:white;
	animation: 3s linear infinite alternate clignote;
}

@keyframes clignote{
	0%{opacity: 100%;}
	50%{opacity: 50%;}
	100%{opacity: 100%;}
}
</style>
