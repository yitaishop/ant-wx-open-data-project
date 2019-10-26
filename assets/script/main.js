// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       column:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (typeof wx === 'undefined') {
            return;
        }
        wx.onMessage( data => {
            if (data.message) {
                console.log(data.message);
            }
        });
        this.initFriendInfo();
    },

    initFriendInfo () {
        wx.getFriendCloudStorage({
            success: (res) => {
                for (let i = 0; i < res.data.length; ++i) {
                    this.createUserBlock(res.data[i]);
                }
            },
            fail: (res) => {
                console.error(res);
            }
        });
    },

    createUserBlock (user) {
        let node = cc.instantiate(this.column);
        node.parent = this.node;

        // set nickName
        let userName = node.getChildByName('columnlot').getChildByName("nick").getComponent(cc.Label);
        userName.string = user.nickName;

        // set avatar
        cc.loader.load({url: user.avatarUrl, type: 'png'}, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('columnlot').getChildByName('icomask').getChildByName("ico").getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });
    }

    // update (dt) {},
});
