<script>
import axios from 'axios'

export default{
  name : 'Home',
  data() {
    return {
      msg : ''
    }
  },
  methods: {
    get() {
      axios({
            url:'http://localhost:8888/get',
            method: 'GET'
        }).then((res) => {
            this.msg = res.data
        })
    }
  },
  mounted() {
    this.get()
  }
}
</script>

<template>
  <div class="about">
    <h1>{{msg}}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
