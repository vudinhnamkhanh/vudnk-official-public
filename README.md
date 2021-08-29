# 🤖 Cart Bot (Discord Bot)
> Cart Bot là một con bot được lập trình bằng discord.js version 13 & sử dụng Command Handler từ [discordjs.guide](https://discordjs.guide)

## Yêu cầu

1. Cách lấy bot token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. Node.js v16.0.0 hoặc mới hơn

## 🚀 Bắt đầu

Nếu đưa lên Heroku, hãy đảm bảo rằng bạn đã cấu hình cho con bot của mình bằng cách dưới đây: 

```
git clone https://github.com/vudinhnamkhanh/vudnk-official.git
cd vudnk-official
npm install
```

Sau khi cái đặt xong hãy gõ dòng lệnh `node index.js` để khởi động bot nhé !

## ⚙️ Cấu hình

Copy hoặc Đổi tên `example.env` thành `.env` và điền các thông tin vào:

⚠️ **Lưu ý: Đừng bao giờ chia sẻ TOKEN của bot** ⚠️

```env
  TOKEN=TOKEN_CUA_BAN
```
Copy hoặc Đổi tên `config.json.example` thành `config.json` và điền các thông tin vào:
```json
{
    "prefix": ">",
    "admin": ["ID_CUA_BAN"],
    "embed_colors": {
        "error": "RED",
        "warning": "ORANGE",
        "success": "GREEN",
        "blacklist": "BLACK"
    }
}
```

Ngôn ngữ hiện đang sử dụng:
- Vietnamese (vi)
- Check [Contributing](#-contributing) if you wish to help add more languages !

## 📝 Commands

> Note: The default prefix is ';;'

* Blacklist ( Danh sách đen )

`;;blacklst add, remove, list <ten>`

* Bot Info ( Thông tin về bot )

`;;botinfo`

* Số liệu thống kê của bệnh vi-rút corona (COVID-19)

`;;covid`

* Help ( Danh sách câu lệnh ) ( Chức năng / cách dùng của từng lệnh)

`;;help [tên lệnh]`

* Member Count ( Xem số thành viên trong server Discord )

`;;membercount`

* Ping ( Kiểm tra độ trễ của bot )
`;;ping`

* Prefix ( Chỉnh prefix theo ý của bạn )
`;;prefix <prefix_cua_ban>`

* Reload ( Khỏi động lại bot)
`;;reload`

* Server Info ( Thông tin của server )
`;;serverinfo`

* Test ( Kiểm tra xem bot )
`;;test`

* User Info ( Xem thông tin của mình / người khác )
`;;userinfo [tên]`

* Blacklist (;;bl, ;;b)
* Bot info (;;bi)
* Covid stats (;;covid)
* Help (;;cmd, ;;cmds, ;;commands, ;;lenh)
* Member Count (;;members, ;;users, ;;userscount, ;;mcount, ;;totalmembers, ;;totalusers, ;;mc)
* Show Bot and API ping (;;ping)
* Prefix (;;prefix)
* Reload (;;rl)
* Server Info (;;svi, svinfo, si)
* Test (;;test)
* User Info (;;ui, ;;profile, ;;pf, ;;user, ;;whois)
* Command Handler từ [discordjs.guide](https://discordjs.guide/)

![reactions](https://i.imgur.com/1l44qBc.png)

## 🤝 Contributing

1. [Fork the repository](https://github.com/vudinhnamkhanh/vudnk-official/fork)
2. Clone your fork: `git clone https://github.com/your-username/vudnk-official.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request

## 📝 Donate

* Discord: cart#1132

