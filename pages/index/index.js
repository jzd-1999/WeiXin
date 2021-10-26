// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    corrent_answer: ['C', 'D', 'B', 'A', 'A', 'ABC', 'ABC', 'AB', 'ABC', 'ACD'],
    score: {
      num: 0,
      color: "",
      display:"none"
    },
    options: ['A', 'B', 'C', 'D'],
    radio: [{
        topic: "2*4=(  )",
        answer: [1, 4, 8, 12]
      },
      {
        topic: "11*10=(  )",
        answer: [10, 50, 100, 110]
      },
      {
        topic: "2+8=(  )",
        answer: [9, 10, 28, 11]
      },
      {
        topic: "36÷6=(  )",
        answer: [6, 8, 9, 10]
      },
      {
        topic: "8+8×10=(  )",
        answer: [88, 22, 10, 99]

      }
    ],
    check: [{
      topic: "以下哪些为中国的四大发明：",
      answer: ["火药", "指南针", "造纸术", "蒸汽机"]
    }, {
      topic: "袁兆华的高中同学都来自什么地方的：",
      answer: ["大连市", "昆明市", "济南市", "合肥市"]

    }, {
      topic: "荣昌区的特产：",
      answer: ["荣昌猪", "荣昌卤鹅", "万州烤鱼", "合川桃片"]
    }, {
      topic: "下列为直辖市的是：",
      answer: ["北京", "重庆", "深圳", "上海"]
    }, {
      topic: "下列哪些国家为祖国的邻国：",
      answer: ["俄罗斯", "美国", "越南", "印度"]
    }]
  },
  radioanswer: [],
  formSubmit(res) {
    let obj = res.detail.value;
    for (let key in obj) {
      if (obj[key] instanceof Array) {
        this.radioanswer.push(obj[key].join(''));
      } else {
        this.radioanswer.push(obj[key]);
      }
    };
    for (let i = 0; i < this.data.corrent_answer.length; i++) {
      if (this.data.corrent_answer[i] === this.radioanswer[i]) {
        this.data.score.num += 10;
      }
    }

    this.data.score.color = this.data.score.num >= 60 ? "mediumspringgreen" : "red";
    this.data.score.display = "block";
    this.setData({
      score: this.data.score
    })

  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})