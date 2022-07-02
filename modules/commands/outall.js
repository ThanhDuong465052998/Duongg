module.exports.config = {
  name: "outall",
  version: "1.0.0", 
  hasPermssion: 2,
  credits: "Mirai",
  description: "out all box",
  commandCategory: "Hệ thống admin-bot",
  usages: "outall [Text]",
  cooldowns: 5,
};
module.exports.run = async ({ api, event, args }) => {
  const fs = global.nodemodule["fs-extra"];
  const permission = ["100047993302072"];
	if (!permission.includes(event.senderID)) return api.sendMessage("cút", event.threadID, event.messageID);

  return api.getThreadList(100, null, ["INBOX"], (err, list) => {
    if (err) throw err;
    list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ?
      api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
    api.sendMessage('Đã nhận lệnh out all nhóm ', event.threadID);
  });
}