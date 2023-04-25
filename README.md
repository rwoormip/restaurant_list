# 我的餐廳清單
![image](./public/image/snapshot.png)

## 功能
- 使用者可以瀏覽所有餐廳
- 使用者可以查看餐廳的詳細資訊
- 使用者可以連結餐廳地址到 Google 地圖
- 使用者可以搜尋餐廳
- 使用者可以新增餐廳
- 使用者可以修改餐廳的資訊
- 使用者可以刪除餐廳
- 使用者可以註冊帳號、登入及登出
- 使用者可以使用 Facebook Login

## 安裝與執行步驟
1. 請先確認本地端有安裝 Node.js 及 npm

2. 將專案 git clone 至本地端

`git clone https://github.com/rwoormip/restaurant_list`

3. 開啟終端機移動至專案資料夾

`cd <專案資料夾位置>`

4. 安裝npm套件

`npm install`

5. 安裝nodemon (如果已有可跳過)

`npm install –g nodemon`

6. 安裝完成後，設定環境變數，連線 MongoDB

`MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table>?retryWrites=true&w=majority`

7. 製作種子資料 (預設會建立 2 位使用者、 6 間餐廳到資料庫中)
`npm run seed`

8. 製作 .env檔案，可以參考 .env.example
`FACEBOOK_ID=
FACEBOOK_SECRET=
FACEBOOK_CALLBACK=
SESSION_SECRET=
MONGODB_URI=
PORT=`

9. 啟動伺服器 (使用 nodemon 執行專案)

`npm run dev`

10. 若出現此訊息表示執行順利，在瀏覽器輸入以下網址開始使用

`App is running on http://localhost:3000
mongodb connected!`

11. 如果要暫停使用，請在終端機輸入以下指令

`ctrl + c`

## 開發工具
- Node.js : “^14.16.0”
- MongoDB
- Nodemon
- Express : “^4.18.2"
- Express-handlebars : “^7.0.7”
- Express-session : “^1.17.3”
- Body-parser : “^1.20.2”
- Bcryptjs : “^2.4.3”
- Connect-flash : “^0.1.1”
- Mongoose : “^5.13.15”
- Dotenv : “^16.0.3”
- method-override : “^3.0.0”
- Passport : “^0.6.0”
- Passport-facebook : “^3.0.0”
- Passport-local : “^1.0.0”
- Bootstrap
- Font-awesome