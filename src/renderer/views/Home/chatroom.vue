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
        let _youTalk = {
          name: YOU,
          content: _content
        }
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
          this.talk_list.push({
            name: MARISA,
            content: '要教给魔里沙什么 ..? 现在只能学习语句.. 如"问`答".. 中止教学输入 exit ..'
          })
          this.cmd_flag = 1
          break
        case 'status':
          this._marisaStatus()
          break
        default: this._marisaReply(_content)
      }
    },
    _marisaReply (_content) {
      let memorise = this.$db.get('memorise').value()
      let _pplContent = this.$dictionary.doSegment(_content, {simple: true})
      let answer = ''
      let keywords = []

      // 处理获取的_content到数据库去遍历查询
      // 大于80%就回复对应回答
      for (let i = 0; i < memorise.length; i++) {
        let ratio = 0
        keywords = memorise[i].keyword
        for (let j = 0; j < keywords.length; j++) {
          _pplContent.forEach(ppl => {
            if (keywords[j] === ppl) {
              ratio++
            }
          })
          if ((ratio / keywords.length) >= 0.5) {
            answer = memorise[i].answer
            break
          }
        }
      }

      if (answer !== '') {
        this.talk_list.push({
          name: MARISA,
          content: answer
        })
      } else {
        this.talk_list.push({
          name: MARISA,
          content: '唔嗯...不懂你在说什么呢...'
        })
      }
    },
    _teachMarisa (_content) {
      if (_content === 'exit') {
        this.talk_list.push({
          name: YOU,
          content: '白丝魔理沙，退出学习模式'
        })
        this.cmd_flag = 0
        return
      }
      // 将you`marisa格式转换为[you,marisa]数组
      let str = _content.split('`')
      // 将you的句子分词分一个数组
      let toPpl = this.$dictionary.doSegment(str[0], {simple: true})
      // 获取数据库所有的记忆
      let memorise = this.$db.get('memorise').value()
      // 遍历数据库查询匹配的回答
      let keywords = []
      let memorey = {}

      for (let i = 0; i < memorise.length; i++) {
        let ratio = 0
        keywords = memorise[i].keyword
        for (let j = 0; j < keywords.length; j++) {
          toPpl.forEach(ppl => {
            if (keywords[j] === ppl) {
              ratio++
            }
          })
          if ((ratio / keywords.length) >= 0.5) {
            keywords.concat(toPpl)
            // 去除重复的关键词或字
            keywords = Array.from(new Set(keywords.filter((x, i, self) => self.indexOf(x) === i)))
            memorey = {
              keyword: keywords,
              answer: str[1]
            }
            break
          } else {
            memorey = {
              keyword: toPpl,
              answer: str[1]
            }
            break
          }
        }
      }
      // 插入记忆
      this.$db.get('memorise').push(memorey).write()
      // 学习模式解除，默认回复，切换到聊天模式
      this.talk_list.push({
        name: MARISA,
        content: '行，我知道了'
      })
      this.cmd_flag = 0
    },
    _marisaStatus () {
      let memorise = this.$db.get('memorise').value().length
      let weight = 0.00011 * parseFloat(memorise)
      this.talk_list.push({
        name: MARISA,
        content: `目前魔理沙的脑重量是${weight} 克。如果我现在还不能理解您的意思的话，请教给我更多的知识，我会非常非常用心学习的～`
      })
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
    let _startTalk = {
      name: MARISA,
      content: '白絲魔理沙 Type 0.003,还在继续升级DA☆ZE！'
    }
    this.talk_list.push(_startTalk)
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.chatroom {
  width: 712px;
  height: 512px;
  background: $box-color;
  border: 1px solid $border-color;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 6px;
  width: 700px;
  height: 502px;
}

.talk-panel {
  width: 470px;
  height: 500px;
  background: $container-color;
  border: 1px solid $border-color;

  span {
    display: block;
    width: 100%;
    height: 40px;
    background: $title-color;
    border-bottom: 1px solid $border-color;
    font-size: 14px;
    line-height: 40px;
    text-indent: 9px;
    color: $order-blue;
  }

  .talk-place {
    width: clac(100% - 10px);
    height: 420px;
    padding-left: 10px;
    overflow-y: scroll;

    .talk_entry {
      width: 100%;
      font-size: 14px;
      margin-top: 12px;
      word-break: break-all;
      line-height: 25px;

      .talk_item {
        display: inline;
        background: transparent;
        border: none;
        line-height: 0;
      }
    }
  }

  .speak {
    width: 100%;
    height: 39px;

    input {
      background: none;
      outline: 0;
      border: none;
    }

    & input[name='you'] {
      position: relative;
      top: 10px;
      left: 5px;
      width: 382px;
      height: 24px;
      padding-left: 5px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid $border-color;
      transition: all 0.2s;

      &:hover, &:focus {
        background: rgba(255, 255, 255, 0.6);
        border-radius: 5px;
      }
    }

    & input[type='submit'] {
      position: relative;
      top: 9px;
      left: 15px;
      width: 48px;
      height: 22px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid $border-color;
      border-radius: 5px;
      font-size: 12px;
      transition: all 0.2s;
    }
  }
}

.profile {
  width: 220px;
  height: 502px;

  .avatar {
    width: 218px;
    height: 250px;
    border: 1px solid $border-color;
    background-image: url('./image/marisa.jpg');
    background-size: 333px;
    background-repeat: no-repeat;
    background-position: 58% 2%;
    margin-bottom: 8px;
  }

  .cmd {
    width: 202px;
    height: 232px;
    padding: 4px 8px;
    background: $container-color;
    border: 1px solid $border-color;
    color: $order-blue;
    font-size: 12px;

    .system-cmd {
      display: block;
      width: 100%;
      margin-bottom: 13px;
      margin-top: 13px;
    }

    .cmd-collect {
      text-indent: 1em;
    }

    .marisa-cmd {
      display: inline;
      font-weight: bold;
    }
  }
}

.you_color {
  color: #836FFF !important;
}
</style>
