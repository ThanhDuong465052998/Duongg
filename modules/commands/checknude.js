module.exports.config = {
	name: "checknude",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "D-Jukie",
	description: "Phát hiện ảnh nude được gửi vào nhóm",
	commandCategory: "Tiện ích",
	usages: "",
	cooldowns: 5
};
module.exports.run = async ({ api, event, Threads, args }) => {
  const axios = require("axios");
  var linkanh =  event.messageReply.attachments[0].url || args.join(" ");
	if(!linkanh) return message.reply('Vui lòng reply hoặc nhập link 1 hình ảnh!!!', event.threadID, event.messageID)
const res = await axios.get(`https://www.phamvandienofficial.xyz/nude?key=wltOzZ4tD7&link=${encodeURIComponent(linkanh)}`);    
var img = res.data.NSFW_Prob;
    return message.reply(`tỷ lệ nude của ảnh là: ${img}`, event.threadID, event.messageID);
	
}