<template>
  <div class="chatroom">
    <div class="container">
      <div class="talk-panel">
        <span>うるさい! うるさい.. うるさい...</span>
        <div ref="talk_place" class="talk-place">
          <div class="talk_entry" v-for="item in talk_list" :class="{'you_color': item.name == 'You'}">
            <span class="talk_item" v-text="item.name" :class="{'you_color': item.name == 'You'}"></span>&nbsp;:&nbsp;
            <span class="talk_item" v-html="item.content" :class="{'you_color': item.name == 'You'}"></span>
          </div>
        </div>
        <div class="speak">
          <input @keydown="sendMessage($event)" ref="you" v-focus="true" type="text" name="you" />
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
            <span class="marisa-cmd">teach</span>&nbsp;进入内容教学模式
          </span>
          <span class="system-cmd cmd-collect">
            <del>
              <span class="marisa-cmd">forget</span>&nbsp;忘记最后所说的内容</del>
          </span>
          <span class="system-cmd cmd-collect">
            <del>
              <span class="marisa-cmd">application</span>&nbsp;管理外部应用接口</del>
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
import MarisaCore from '@/core'
const MARISA = '白絲魔理沙'
const YOU = 'You'

export default {
  data () {
    return {
      talk_list: [],
      cmd_flag: 0
    }
  },
  methods: {
    async sendMessage (event) {
      let _content = await this.$refs.you.value
      if (_content === '') return false
      if (event.keyCode === 13 || event.button === 0) {
        let _youTalk = MarisaCore.speak(YOU, _content)
        this.talk_list.push(_youTalk)
        switch (this.cmd_flag) {
          case 0: this._marisaThinking(_content)
            break
          case 1: this._teachMarisa(_content)
            break
        }
        this.$refs.you.value = ''
      }
    },
    _marisaThinking (_content) {
      switch (_content) {
        case 'teach':
          this.talk_list.push(MarisaCore.speak(MARISA, '要教给魔里沙什么 ..? 现在只能学习语句.. 如"问`答".. 中止教学输入 exit ..'))
          this.cmd_flag = 1
          break
        case 'status':
          this._marisaStatus()
          break
        default: this._marisaReply(_content)
      }
    },
    _marisaReply (_content) {
      // 魔理沙的回复逻辑
      let answer = MarisaCore.reply(_content)
      if (answer !== '') {
        this.talk_list.push(MarisaCore.speak(MARISA, answer))
      } else {
        this.talk_list.push(MarisaCore.speak(MARISA, '唔嗯...不懂你在说什么呢...'))
      }
    },
    _teachMarisa (_content) {
      if (_content === 'exit') {
        this.talk_list.push(MarisaCore.speak(YOU, '白丝魔理沙，退出学习模式'))
        this.cmd_flag = 0
        return
      }
      // 魔理沙的学习逻辑
      let memorey = MarisaCore.teach(_content)
      // 插入记忆
      this.$db.get('memorise').push(memorey).write()
      // 学习模式解除，默认回复，切换到聊天模式
      this.talk_list.push(MarisaCore.speak(MARISA, '行，我知道了'))
      this.cmd_flag = 0
    },
    _marisaStatus () {
      let memorise = this.$db.get('memorise').value().length
      let weight = 0.00011 * parseFloat(memorise)
      this.talk_list.push(MarisaCore.speak(MARISA, `目前魔理沙的脑重量是${weight} 克。如果我现在还不能理解您的意思的话，请教给我更多的知识，我会非常非常用心学习的～`))
    },
    _scrollBottom () {
      this.$nextTick(() => {
        let _scrollHeight = this.$refs.talk_place.scrollHeight
        this.$refs.talk_place.scrollTop = _scrollHeight
      })
    }
  },
  updated () {
    this._scrollBottom()
  },
  created () {
    let _startTalk = MarisaCore.speak(MARISA, '白絲魔理沙 Type 0.005,还在继续升级DA☆ZE！')
    this.talk_list.push(_startTalk)
  }
}
</script>
<style lang="stylus" scoped>
@import './index'
</style>
