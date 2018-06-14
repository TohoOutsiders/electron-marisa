import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron'

// 根据process.type判断在那个模式使用
const APP = process.type === 'renderer' ? remote.app : app

// 获取electron应用的用户目录
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
  }
}

// 初始化lowdb读取的json文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

const db = Datastore(adapter)

//
if (!db.has('memorise').value()) {
  db.set('memorise', []).write()
}

export default db
