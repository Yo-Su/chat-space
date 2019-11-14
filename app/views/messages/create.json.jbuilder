json.content @message.content
json.image @message.image
json.image_url @message.image.url
json.user_name @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")

# json.(@message, :content, :image)
# json.created_at @message.created_at
# json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id