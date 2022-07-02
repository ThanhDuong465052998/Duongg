module.exports.config = {
	name: "tid",	version: "1.0.0", 
	hasPermssion: 0,
	credits: "Quốc Anh",
	description: "Lấy id box", 
	commandCategory: "Lấy id nhóm của bạn",
	usages: "tid",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage(event.threadID, event.threadID);
};