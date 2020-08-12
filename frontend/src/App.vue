<template>
  <div id="app" :class="{'hideMenu': !MenuVisible}">
    <Header :showUserDropdown="!!user"/>
    <Content class="content"/>
    <Loading v-if="validatingToken" />
    <Menu v-if="MenuVisible"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/templates/Header'
import Footer from './components/templates/Footer'
import Content from './components/templates/Content'
import Menu from './components/templates/Menu'
import Loading from './components/templates/Loading'

import {mapState} from 'vuex'
import axios from 'axios'
import {baseApi, userKey} from '@/global.js'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Content,
    Menu,
    Loading
  },
  computed: mapState(['MenuVisible', 'user']),
  data() {
    return {
      validatingToken: true
    }
  },
  methods: {
    async validateToken() {
      this.validatingToken = true
      this.$store.commit('setUser', null)

      const userString = localStorage.getItem(userKey)
      const userData = JSON.parse(userString)

      if (!userData) {
        this.validatingToken = false
        this.$router.push({
          name: 'auth'
        })
        return
      }

      const res = await axios.post(`${baseApi}/validatetoken`, userData)

      if (res.data) {
        this.$store.commit('setUser', userData)

      } else {
        localStorage.removeItem(userKey)
        this.$router.push({
          name: 'auth'
        })
      }

      this.validatingToken = false
      
    }
  },
  created() {
    this.validateToken()
  }
}
</script>

<style>
* {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
#app {
  height: 100vh;
  
  display: grid;
  grid-template-rows: 80px 1fr 40px;
  grid-template-columns: 250px 1fr;
  grid-template-areas: "header header"
                        "menu content"
                        "footer footer";
}

#app.hideMenu {
  grid-template-areas: "header header"
                        "content content"
                        "footer footer";
}

.content {
  padding: 30px;
}

</style>
