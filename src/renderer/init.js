import { remote } from 'electron'

// 同步主进程设置
global._config = remote.getGlobal('_config')
