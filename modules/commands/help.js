//hello
module.exports.config = {
	name: "help",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "Mirai Team - mod by ProCoderCyRus",
	description: "Hướng dẫn cho người mới",
	commandCategory: "Dành cho người dùng",
	usages: "[Tên module]",
	cooldowns: 5,
  dependencies: {
    "axios": "",
    "request": "",
    "fs-extra": ""
  },
	envConfig: {
		autoUnsend: true,
		delayUnsend: 120
	}
};

 module.exports.run = function({ api, event, args, getText }) {
  const axios = require('axios');
  const request = global.nodemodule['request'];
  const fs = require("fs");
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  
   
  if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg +=`『🎭』${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)}\n${commandGroup.cmds.join(', ')}\n\n`);
    return axios.get('https://girl.demngayyeu.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
    
          api.sendMessage({body:`🎭 Danh sách lệnh hiện có 🎭\n\n` + msg + `» Số lệnh hiện có: ${commands.size}\n» Sử dụng "${global.config.PREFIX}help" từng lệnh ở trên để biết cách sử dụng.\n\n`, 
            attachment: fs.createReadStream(__dirname + `/cache/helpall.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/helpall.${ext}`), event.messageID,
        async function(error, info) { 
            if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
  });
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/helpall.${ext}`)).on("close", callback);
     })
};

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = "🎭 Danh sách lệnh hiện có 🎭\n\n";

    for (var [name, value] of (commands)) {
    name += `\n» Mô tả: ${value.config.description}\n» Thời gian chờ: ${value.config.cooldowns}s\n» Quyền hạn: ${((value.config.hasPermssion == 0) ? `Người dùng` : (value.config.hasPermssion == 1) ? `Quản trị viên nhóm` : (value.config.hasPermssion == 2) ? `Người hỗ trợ bot` : `Người điều hành bot`)}\n`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += `${++i}. ${item}\n`;
    var bruh = `${global.config.PREFIX}${this.config.name}`;
    var hi = `» Trang (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\n» Có ${arrayInfo.length} lệnh đang chạy\n» HDSD: ${bruh} <page/all>\n\n\n﹏﹏🎭 𝙏𝙃𝙤𝙖𝙣𝙜 🎭﹏`;
    return axios.get('https://girl.demngayyeu.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
    api.sendMessage({body: msg + hi, attachment: fs.createReadStream(__dirname + `/cache/help.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/help.${ext}`), event.messageID,
        async function(error, info) { 
            if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
  });
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/help.${ext}`)).on("close", callback);
     })
}

return axios.get('https://girl.demngayyeu.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body:`
» Name: ${command.config.name} 
» Phiên bản: ${command.config.version}
» Dành cho: ${((command.config.hasPermssion == 0) ? `Người dùng` : (command.config.hasPermssion == 1) ? `Quản trị viên nhóm` : (command.config.hasPermssion == 2) ? `Người hỗ trợ bot` : `Người điều hành bot`)}
» Author: ${command.config.credits}
» Miêu tả: ${command.config.description}
» Thời gian chờ: ${command.config.cooldowns}s
» HDSD: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "Không có hướng dẫn"}`,
        attachment: fs.createReadStream(__dirname + `/cache/helpin4.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/helpin4.${ext}`), event.messageID);
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/helpin4.${ext}`)).on("close", callback);
     })
};