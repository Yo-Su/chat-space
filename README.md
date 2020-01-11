<img src="https://user-images.githubusercontent.com/57243991/72131405-74d35b00-33bf-11ea-82fd-29efb70896b0.png" width=900px>

<h1 align="center">chat-space</h1>

<p align="center">
<a href="https://www.ruby-lang.org/ja/"><img src="https://user-images.githubusercontent.com/39142850/71774533-1ddf1780-2fb4-11ea-8560-753bed352838.png" width="70px;" /></a>　
<a href="https://rubyonrails.org/"><img src="https://user-images.githubusercontent.com/39142850/71774548-731b2900-2fb4-11ea-99ba-565546c5acb4.png" height="60px;" /></a>　
<a href="http://haml.info/"><img src="https://user-images.githubusercontent.com/39142850/71774618-b32edb80-2fb5-11ea-9050-d5929a49e9a5.png" height="60px;" /></a>　
<a href="https://sass-lang.com/"><img src="https://user-images.githubusercontent.com/39142850/71774644-115bbe80-2fb6-11ea-822c-568eabde5228.png" height="60px" /></a><br>
<a href="https://jquery.com/"><img src="https://user-images.githubusercontent.com/39142850/71774768-d064a980-2fb7-11ea-88ad-4562c59470ae.png" height="65px;" /></a>　
<a href="https://www.mysql.com/jp/"><img src="https://user-images.githubusercontent.com/57243991/71816088-d98f6c80-30c4-11ea-82ee-f6b2892df607.png" height="60px;" /></a>　
<a href="https://aws.amazon.com/"><img src="https://user-images.githubusercontent.com/39142850/71774786-37825e00-2fb8-11ea-8b90-bd652a58f1ad.png" height="60px;" /></a>
</p>

# 🌐 URL
### **<http://54.178.125.37/>**
<br>

# 📝 このアプリについて
チャットアプリケーションです
グループに登録されたユーザー同士でコメントと画像を投稿する事ができます
- **非同期通信**でリアルタイムにコメントが表示されます
- **インクリメンタルサーチ**によりグループにユーザーを追加する際、候補が表示されます
- **自動更新**に対応しているので他の人のコメントが自動で反映されます

<br>

# 📕 機能紹介
## ・非同期通信
<img src="https://user-images.githubusercontent.com/57243991/72130498-0db4a700-33bd-11ea-8c80-313d97a65b30.gif" width=900px>
<br>

## ・インクリメンタルサーチ
<img src="https://user-images.githubusercontent.com/57243991/72130499-0e4d3d80-33bd-11ea-913b-5bfce75d8c13.gif" width=900px>
<br>

## ・自動更新
<img src="https://user-images.githubusercontent.com/57243991/72130500-0e4d3d80-33bd-11ea-9549-c56209bf4f75.gif" width=900px>
<br>


# 📊 chat-spaceデータベース設計

<img src="https://user-images.githubusercontent.com/57243991/72205954-07612080-34cc-11ea-8b58-adc10078a886.png" width=900px>

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|string||
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :group_users
- has_many :messages


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :users, through: :group_users
- has_many :messages


## groups_usersテーブル(中間テーブル)
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false,  foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_at|timestamps||

### Association
- belongs_to :group
- belongs_to :user

