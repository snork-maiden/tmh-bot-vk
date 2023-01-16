# VK community bot
Community bot for vk.com on Node.js.
#### Features:
* Large interactive FAQ
* User can check if his post is postpone!
* Communication with administration
* Detects old devices

![image_2023-01-16_16-07-29](https://user-images.githubusercontent.com/84030617/212676107-87ca66c8-b380-4d94-884f-e85cf5f9168a.jpg)


#### Stack: 
* Node.js 18
* [node-vk-bot-api](https://github.com/node-vk-bot-api/node-vk-bot-api#readme)
* Docker
* Axios
## Configuration

#### 1. Enable bot access in your community and get your tokens.
* [VK docs for bots](https://dev.vk.com/api/bots/getting-started)
#### 2. Create file TOKEN.js with your tokens

```javascript
const TOKEN = "";
const USER_TOKEN = "";

module.exports.TOKEN = TOKEN;
module.exports.USER_TOKEN = USER_TOKEN;
```
#### 3. Install dependecies
```shell
npm install
```
#### 4. Run your bot
```shell
node script.js
```
#### You are able to use bot in your community.
