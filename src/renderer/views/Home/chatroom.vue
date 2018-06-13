<template>
  <div class="chatroom">
    <div class="container">
      <div class="talk-panel">
        <span>うるさい! うるさい.. うるさい...</span>
        <div class="talk-place">
          <div class="talk_entry"
              v-for="item in talk_list"
              :class="{'you_color': item.name == 'You'}"
          >
            <span class="talk_item" v-text="item.name" :class="{'you_color': item.name == 'You'}"></span>&nbsp;:&nbsp;<span class="talk_item" v-text="item.content" :class="{'you_color': item.name == 'You'}"></span>
          </div>
        </div>
        <div class="speak">
          <input @keydown="sendMessage($event)" ref="you" type="text" name="you" />
          <input @click="sendMessage($event)" ref="submit" type="submit" value="发送" />
        </div>
      </div>
      <div class="profile">
        <div class="avatar"></div>
        <div class="cmd">
          <span class="system-cmd">
            系统级指令快速说明——
          </span>
          <span class="system-cmd cmd-collect">
            <span class="marisa-cmd">/teach</span>&nbsp;进入内容教学模式
          </span>
          <span class="system-cmd cmd-collect">
            <span class="marisa-cmd">forget</span>&nbsp;忘记最后所说的内容
          </span>
          <span class="system-cmd cmd-collect">
            <span class="marisa-cmd">application</span>&nbsp;管理外部应用接口
          </span>
          <span class="system-cmd cmd-collect">
            <span class="marisa-cmd">status</span>&nbsp;查看目前知识所掌握情况
          </span>
          另外你也可以通过输入
          <del style="font-weight:bold;">hint</del> 查看其他人自定义的内容提示或小小线索<br><br> 魔理沙无条件的相信你..她把你交给她的所有知识视作珍宝并会很认真的将其牢牢记住..不要让她学坏哦!
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      talk_list: []
    }
  },
  methods: {
    async sendMessage (event) {
      if (event.keyCode === 13 || event.button === 0) {
        let _youTalk = {
          name: 'You',
          content: await this.$refs.you.value
        }
        this.talk_list.push(_youTalk)
        this.$refs.you.value = ''
      }
    }
  },
  created () {
    let _startTalk = {
      name: '白絲魔理沙',
      content: '白絲魔理沙 Type 0.001,还在继续升级da★ze！'
    }
    this.talk_list.push(_startTalk)
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/stylus/variable"

.chatroom
  width: 712px
  height: 512px
  background: $box-color
  border: 1px solid $border-color
.container
  display: flex
  justify-content: space-between
  margin: 0 auto
  margin-top: 6px
  width: 700px
  height: 502px
.talk-panel
  width: 470px
  height: 500px
  background: $container-color
  border: 1px solid $border-color
  span
    display: block
    width: 100%
    height: 40px
    background: $title-color
    border-bottom: 1px solid $border-color
    font-size: 14px
    line-height: 40px
    text-indent: 9px
    color: $order-blue
  .talk-place
    width: clac(100% - 10px)
    height: 420px
    padding-left: 10px
    overflow-y: scroll
    .talk_entry
      width: 100%
      font-size: 14px
      margin-top: 12px
      word-break: break-all
      line-height: 25px
      .talk_item
        display: inline
        background: transparent
        border: none
        line-height: 0
  .speak
    width: 100%
    height: 39px
    input
      background: none
      outline: 0
      border: none
    & input[name='you']
      position: relative
      top: 10px
      left: 5px
      width: 382px
      height: 24px
      padding-left: 5px
      background: rgba(255, 255, 255, .2)
      border: 1px solid $border-color
      transition: all .2s
      &:hover,&:focus
        background: rgba(255, 255, 255, .6)
        border-radius: 5px
    & input[type='submit']
      position: relative
      top: 9px
      left: 15px
      width: 48px
      height: 22px
      background: rgba(255, 255, 255, .2)
      border: 1px solid $border-color
      border-radius: 5px
      font-size: 12px
      transition: all .2s
.profile
  width: 220px
  height: 502px
  .avatar
    width: 218px
    height: 250px
    border: 1px solid $border-color
    background-image: url(./image/marisa.jpg)
    background-size: 333px
    background-repeat: no-repeat
    background-position: 58% 2%
    margin-bottom: 8px
  .cmd
    width: 202px
    height: 232px
    padding: 4px 8px
    background: $container-color
    border: 1px solid $border-color
    color: $order-blue
    font-size: 12px
    .system-cmd
      display: block
      width: 100%
      margin-bottom: 13px
      margin-top: 13px
    .cmd-collect
      text-decoration: line-through
      text-indent: 1em
    .marisa-cmd
      display: inline
      font-weight: bold

.you_color
  color: #836FFF !important
</style>
