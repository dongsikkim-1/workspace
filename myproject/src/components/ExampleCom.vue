<template>
<v-app>
  <div class="hello">
    <h1>{{ msg }}</h1><h1>{{title}}</h1>
    <h2>Example Compinent 01</h2>
  </div>
  <v-row>
      <v-col>Test
      </v-col>
  </v-row>
</v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  props : {
      title : ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>
