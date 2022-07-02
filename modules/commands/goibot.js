module.exports.config = {
  name: "goibot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ManhG",
  description: "Gọi Bot No reply",
  commandCategory: "Noprefix",
  usages: "",
  cooldowns: 2,
  denpendencies: {}
};

module.exports.handleEvent = async({ event, api, Users, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["goibot"] !== "undefined" && thread["goibot"] == false) return;

  if (senderID == global.data.botID) return;
   function out(data){
  	api.sendMessage(data, threadID, messageID)
  }
  let name = await Users.getNameUser(event.senderID);
  let dataThread = await Threads.getData(event.threadID);
  let threadInfo = dataThread.threadInfo;
  var idbox = event.threadID;

  var tl = [
      `Xin chào ${name}` + "\nTôi là bot Mirai "
  ];
  var rand = tl[Math.floor(Math.random() * tl.length)];
  // Gọi bot
  var arr = ["bot", "bot ơi","bot oi", "yêu bot", "bot đâu"];
  arr.forEach(value => {
      let str = value[0].toUpperCase() + value.slice(1);
  if (body === value.toUpperCase() | body === value | str === body) {
          let nameT = threadInfo.threadName;
          modules = "------ Gọi bot ------\n";
          console.log(modules, value + "|", nameT, idbox);
          return out(rand)
      }
  });
}

module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt", "successText": "goibot thành công",},
  "en": {"on": "on","off": "off","successText": "goibot success!",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["goibot"] == "undefined" || data["goibot"] == true) data["goibot"] = false;
  else data["goibot"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["goibot"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}