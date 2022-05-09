# chasse_taupe_vuejs

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

 <!-- GetRandomPosition: function(){
      let moleSize=290, moleCount = this.nbHoles;
      let gRows = Math.floor(936/moleSize);
      let gCols = Math.floor(678/moleSize)

      //let vals =[];
      let vals = this.range(1,moleCount)
      let xpos = this.range(0,gRows)
      let ypos = this.range(0,gCols)
      // console.log(vals)
      // console.log(xpos)
      this.shuffle(vals)
      this.shuffle(xpos)
      this.shuffle(ypos)
      // let ypos = this.shuffle([...Array(gCols).keys()])
      console.log(vals)
      console.log(xpos)
      console.log(ypos)
      let temp = []
      for(let i = 0; i < vals.length;i=i+1){
         temp[0] = [ypos[i%ypos.length]*25,xpos[i%xpos.length]*25];
         //console.log(JSON.stringify([50,75])==JSON.stringify([50,75]));

        let found = this.positionRandom.findIndex(element => JSON.stringify(element) == JSON.stringify(temp[0]));
        console.log(found)
        let count = 0;
        while(found > -1){
          count++
          console.log("entries " + temp[0] + " already in positionRandom ")
          temp[0] = [ypos[(i+count)%ypos.length]*25,xpos[i%xpos.length]*25];
          found = this.positionRandom.findIndex(element => JSON.stringify(element) == JSON.stringify(temp[0]));
          console.log("found in the while : " + found)
        }
        this.positionRandom[i] = temp[0]
      }
    
      console.log(this.positionRandom[0][0])
      // console.log([this.position[0].top, this.position[0].left])
      // return {"top":this.position[0].top, "left":this.position[0].left}
    },   -->