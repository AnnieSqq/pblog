<template>
  <div>
    <div v-for="(item,index) in getGuildData" :key="index">
      <span @click="handleGuildClick(item.site)" class="guild_node" :style="{paddingLeft:item.level*indent+'px'}">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      indent: 10
    }
  },
  updated () {
  },
  methods: {
    handleGuildClick (site) {
      // 滚动到对应位置
      window.scrollTo(0, site)
    }
  },
  computed: {
    ...mapGetters(['getGuildData'])
  }
}
</script>

<style scoped>
.guild_node{
  line-height: 36px;
  cursor: pointer;
}
.guild_node:hover{
  text-decoration: underline;
}
</style>
