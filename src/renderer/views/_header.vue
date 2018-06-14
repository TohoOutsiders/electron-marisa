<template>
  <div class="header drag">
    <div class="btn_group no_drag">
      <span class="close no_drag" @click="closeWindow"></span>
      <span class="hidden no_drag" @click="minimizeWindow"></span>
    </div>
    <div class="header_title">
      白絲魔理沙 -連線中-
    </div>
  </div>
</template>
<script>
import { remote } from 'electron'
const { BrowserWindow } = remote

export default {
  methods: {
    closeWindow () {
      const window = BrowserWindow.getFocusedWindow()
      window.close()
    },
    minimizeWindow () {
      const window = BrowserWindow.getFocusedWindow()
      window.minimize()
    }
  }
}
</script>
<style lang="stylus" scoped>
.header
  display: flex
  flex-direction: row
  width: 714px
  height: 28px
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)
.btn_group
  position: relative
  display: flex
  flex-direction: row
  align-items: center
  height: 100%
  margin-left: 5px
  span
    position: relative
    display: block
    width: 20px
    height: 20px
    border-radius: 50%
    cursor: pointer
    transition: all .3s
  .close
    background: #EE2C2C
    &:before
      content: ''
      position: absolute
      top: 4px
      left: 9px
      height: 70%
      width: 2px
      background: #fff
      transform: rotate(45deg)
      opacity: 0
    &:after
      content: ''
      position: absolute
      top: 4px
      left: 9px
      height: 70%
      width: 2px
      background: #fff
      transform: rotate(-45deg)
      opacity: 0
    &:hover
      background: #A52A2A
      &:before,&:after
        opacity: 1
  .hidden
    background: #FFD700
    margin-left: 5px
    &:before
      content: ''
      position: absolute
      top: 4px
      left: 9px
      height: 70%
      width: 2px
      background: #fff
      transform: rotate(90deg)
      opacity: 0
    &:hover
      background: #EE9A00
      &:before
        opacity: 1
.header_title
  margin-left: 35%
  height: 100%
  font-size: 12px
  line-height: 28px
</style>
