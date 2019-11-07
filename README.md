
# chat-spaceデータベース設計
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
- has_many :commentss


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :users, through: :group_users
- has_many :comments


## groups_usersテーブル(中間テーブル)
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false,  foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## commentsテーブル
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

