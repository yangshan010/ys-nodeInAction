<template>
  <div class="hello">
    <button @click="test()">click</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {}
  },
  methods: {
    test() {
      fetch('http://localhost:3000/api/singup',
      {
        method:'POST',
        body:'name=yangshan123&password=123shan&gender=m',
        headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
    }),
        })
      .then(function(res) {
        return res.json()
      }).then(function(data) {
        console.log(data)
      })
      .catch(function(e) {

      })
    }
  }
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
</style>
