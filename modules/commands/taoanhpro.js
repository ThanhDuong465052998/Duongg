module.exports.config = {
	name: "taoanhpro", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "Rip05 làm lại từ FB cover của Dũng", // Công nhận module sở hữu là ai
	description: "blah blah blha", // Thông tin chi tiết về lệnh
	commandCategory: "general", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "",
	cooldowns: 5
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
	const { threadID, messageID, senderID, body } = event;
	if (handleReply.content.id != senderID) return;
	const input = body.trim();
	const sendC = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
		global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
		api.unsendMessage(handleReply.messageID);
		global.client.handleReply.push({
			step: step,
			name: this.config.name,
			messageID: info.messageID,
			content: content
		})
	}, messageID);
	const send = async (msg) => api.sendMessage(msg, threadID, messageID);

	let content = handleReply.content;
	switch (handleReply.step) {
		case 1:
			content.id = input;
			sendC("Reply tin nhắn này để chọn id nhân vật!.", 2, content);
			break;
		case 2:
			content.tenchinh = input;
			sendC("Reply tin nhắn này để nhập tên của bạn!", 3, content);
			break;
		case 3:
			content.fb = input;
			sendC("Reply tin nhắn này để nhập tên Facebook của bạn!", 4, content);
			break;
		case 4:
			content.subnane = input;
			sendC("Reply tin nhắn này để nhập tên phụ của bạn!", 5, content);
			break;
		case 5:
			content.color = input;
			const axios = require("axios");
			const fs = require("fs");
			send("Thông tin đã được ghi nhận, vui lòng đợi trong giây lát!");
			global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
			api.unsendMessage(handleReply.messageID);
			let c = content;
			let res = await axios.get(encodeURI(`https://dino-1.araxy.repl.co/taoanhdep?id=${c.id}&tenchinh=${c.tenchinh}&fb=${c.fb}&tenphu=${c.subname}`), { responseType: "arraybuffer" })
				.catch(e => { return send("Lỗi không xác định, liên hệ admin để fix") });
			if (res.status != 200) return send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
			let path = __dirname + `/cache/taoanhpro__${senderID}.png`;
			fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
			send({
				body: 'Ảnh của bạn đây',
				attachment: fs.createReadStream(path)
			}).then(fs.unlinkSync(path));
			break;
		default:
			break;
	}
}

module.exports.run = ({ api, event, args }) => {
	const { threadID, messageID, senderID } = event;
	return api.sendMessage("Reply tin nhắn này tên của bạn", event.threadID, (err,info) => {
		global.client.handleReply.push({
			step: 1,
			name: this.config.name,
			messageID: info.messageID,
			content: {
				id: senderID,
				tenchinh: "",				
subname: "",
				fb: ""
			}
		})
	}, event.messageID);
}