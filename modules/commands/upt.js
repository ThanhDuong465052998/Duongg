module.exports.config = {
	name: "upt",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Adonis", //
	description: "",
	commandCategory: "Hệ thống",
	cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
 
	const time = process.uptime(),
		gio  = Math.floor(time / (60 * 60)),
		phut = Math.floor((time % (60 * 60)) / 60),
		giay = Math.floor(time % 60);

	return api.sendMessage("", event.threadID, () => api.sendMessage(`${gio}:${phut}:${giay}\n  [🎭 Mirai Project 🎭]`, event.threadID, event.messageID));
}
