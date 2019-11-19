<template>
  <div id="layout" >
    <router-view @hideTabbar="hideTabbar" @showTabbar="showTabbar"  />
    <tabbar v-show="show"></tabbar>
  </div>
</template>

<script>
import tabbar from '../views/tabbar'
export default {
  components: {
    tabbar
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    hideTabbar (e) {
      this.show = false
    },
    showTabbar () {
      this.show = true
    }
  },
  mounted () {

  },
  provide () {
    return {
      hideTabbar: this.hideTabbar,
      showTabbar: this.showTabbar
    }
  }
}
</script>
