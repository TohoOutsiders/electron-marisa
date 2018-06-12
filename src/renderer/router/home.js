let d = {}

let chatroom = {
  path: '/home/chatroom',
  component: resolve => require(['../views/Home/chatroom'], resolve)
}

d.index = [{
  path: '/home',
  redirect: '/home/chatroom',
  component: resolve => require(['../views/Home/index'], resolve),
  children: [
    chatroom
  ]
}]

export default d
