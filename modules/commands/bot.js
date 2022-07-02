const chalk = require('chalk');
module.exports.config = {
  name: "bot",
  version: "0.0.1",
  hasPermssion: 1,
  credits: "KaZuTo",
  description: "xem thông tin về bot",
  commandCategory: "Dành cho người dùng",
  usages: "",
  cooldowns: 0
};

const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");
function handleByte(byte) {
	const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	let i = 0, usage = parseInt(byte, 10) || 0;

	while(usage >= 1024 && ++i){
		usage = usage/1024;
	}
  
	return(usage.toFixed(usage < 10 && i > 0 ? 1 : 0) + ' ' + units[i]);
}

function handleOS(ping) {
	var os = require("os");
	var cpus = os.cpus();
	var speed, chips;
	for (var i of cpus) chips = i.model, speed = i.speed;
	if (cpus == undefined) return;
	else return msg = 
	`📌 Ping: ${Date.now() - ping}ms.\n\n`;

}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
 
module.exports.run = async function({ api, args, event, Users,handleReply,permssion }) {
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request')
 const { threadID, messageID, mentions } = event;
   return api.sendMessage({body: `======[ ADMIN ]======\n» 1. Xem thông tin về bot\n» 2. Đăng xuất tài khoản\n» 3. reload config\n====[ QUẢN TRỊ VIÊN ]====\n» 4. xem thông tin box\n» 5. bật tắt chế độ chỉ quản trị viên mới dùng được bot\n» 6. Bật tắt chế độ cấm người dùng vào box\n» 7. Bật tắt chế độ chống cướp box\n» 8. bật tắt chế độ cấm người dùng rời box\n====[ Người Dùng ]====\n» 9. xem danh sách quản trị viên box\n» 10. xem dach sách admin và người hỗ trợ bot\n-----------\n👉 Phản hồi tin nhắn này theo số mà bạn chọn\n\n`
        }, threadID, (error, info) => {
            global.client.handleReply.push({
               name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "choosee",
            })
        }, event.messageID)
}
module.exports.handleReply = async function({
  args, event, Users,Threads, api, handleReply, permssion
}) {
  const { threadID, messageID, senderID } = event;
  switch (handleReply.type) {
    case "choosee": {
      switch (event.body) {
        case "1": {
     const moment = require("moment-timezone");
    const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
    const namebot = config.BOTNAME
    const PREFIX = config.PREFIX
    const admin = config.ADMINBOT
    const ndh = config.NDH
    const { commands } = global.client;
    const threadSetting = (await Threads.getData(String(event.threadID))).data || 
    {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX 
    : global.config.PREFIX;
	  var ping = Date.now();
  
    var threadInfo = await api.getThreadInfo(event.threadID);
    var time = process.uptime(),
        hours = Math.floor(time / (60 * 60)),
        minutes = Math.floor((time % (60 * 60)) / 60),
        seconds = Math.floor(time % 60);
	 var severInfo = handleOS(ping);
	 var msg =`⏰ Bây giờ là: ${gio} giờ ${phut} phút ${giay} giây\n🤖 Tên bot: ${namebot}\n⏱ Đã Hoạt Động:${hours < 10 ? (hours > 0 ? " 0" + hours + " giờ" : 
   "") : (hours > 0 ? " " + hours + " giờ" : "")} ${minutes < 10 ? (minutes > 0 ? " 0"  + minutes + " phút" : "") : (minutes > 0 ? " " + minutes + " phút" : 
 "")}${seconds < 10 ? (seconds > 0 ? " 0" + seconds + " giây." : "") : (seconds > 0 ? " " + 
 seconds + " giây." : "")}\n--------------\n` +
	`👨‍👨‍👧‍👦 Tổng Nhóm: ${global.data.allThreadID.length} nhóm.\n👥 Tổng Người Dùng: ${global.data.allUserID.length} người.\n
👤 Admin bot: ${admin.length}.\n👤 Người hỗ trợ bot: ${ndh.length}.\n` + 
`📝 Tổng Số Lệnh: ${commands.size }\n--------------\n`+`🌟 Prefix hệ thống : ${PREFIX}\n🥀 Prefix box: ${prefix}\n${severInfo ? severInfo : `📌 Ping: 
${Date.now() - ping}ms.\n\n`}`
    return api.sendMessage(msg, event.threadID)
}break;
        case "4": {
          const moment = require("moment-timezone");
    const request = require("request")
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
    let totalChat = JSON.parse(fs.readFileSync(totalPath));
    let threadInfo = await api.getThreadInfo(event.threadID);
    let timeByMS = Date.now();

    var memLength = threadInfo.participantIDs.length;
    let threadMem = threadInfo.participantIDs.length;
    var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
    for (let z in threadInfo.userInfo) {
      var gioitinhone = threadInfo.userInfo[z].gender;
      var nName = threadInfo.userInfo[z].name;
      if (gioitinhone == "MALE") {
        gendernam.push(z + gioitinhone)
      } else if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else {
        nope.push(nName)
      }
    };
    var nam = gendernam.length;
    var nu = gendernu.length;
    let qtv = threadInfo.adminIDs.length;
    let sl = threadInfo.messageCount;
    let u = threadInfo.nicknames;
    let icon = threadInfo.emoji;

    let threadName = threadInfo.threadName;
    let id = threadInfo.threadID;
    let sex = threadInfo.approvalMode;
    var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';


    if (!totalChat[event.threadID]) {
      totalChat[event.threadID] = {
        time: timeByMS,
        count: sl,
        ytd: 0
      }
      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
    }

    let mdtt = "Chưa có thống kê";
    let preCount = totalChat[event.threadID].count || 0;
    let ytd = totalChat[event.threadID].ytd || 0;
    let hnay = (ytd != 0) ? (sl - preCount) : "Chưa có thống kê";
    let hqua = (ytd != 0) ? ytd : "Chưa có thống kê";
    if (timeByMS - totalChat[event.threadID].time > _24hours) {
      if (timeByMS - totalChat[event.threadID].time > (_24hours * 2)) {
        totalChat[event.threadID].count = sl;
        totalChat[event.threadID].time = timeByMS - _24hours;
        totalChat[event.threadID].ytd = sl - preCount;
        fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
      }
      getHour = Math.ceil((timeByMS - totalChat[event.threadID].time - _24hours) / 3600000);
      if (ytd == 0) mdtt = 100;
      else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
      mdtt += "%";
    }
    api.unsendMessage(handleReply.messageID);
    var callback = () =>
      api.sendMessage({
        body: `» Tên box: ${threadName}\n» ID Box: ${id}\n» Phê duyệt: ${pd}\n» Emoji: ${icon}\n» Thông tin:\n» Tổng ${threadMem} thành viên\n» 👨‍🦰Nam: ${nam} thành viên \n» 👩‍🦰Nữ: ${nu} thành viên\n» 🕵️‍♂️Với ${qtv} quản trị viên\n» 💬 Tổng: ${sl} tin nhắn\n» 📈 Mức độ tương tác: ${mdtt}\n🌟 Tổng số tin nhắn hôm qua: ${hqua}\n🌟 Tổng số tin nhắn hôm nay: ${hnay}\n   === 「${timeNow}」 ===`,
        attachment: fs.createReadStream(__dirname + '/cache/box.png')
      },
        threadID,
        () => fs.unlinkSync(__dirname + '/cache/box.png')
      );
    return request(encodeURI(`${threadInfo.imageSrc}`))
      .pipe(fs.createWriteStream(__dirname + '/cache/box.png'))
      .on('close', () => callback());
  }break;
        case "2": {
   const listAdmin = global.config.ADMINBOT[0];
    if (senderID != listAdmin) return api.sendMessage("done -_-", threadID, messageID);
api.sendMessage("Đang đăng xuất khỏi Facebook...",event.threadID,event.messageID)
api.logout()
        }break;
          //// reload config///
        case "3": {
          const listAdmin = global.config.ADMINBOT[0];
    if (senderID != listAdmin) return api.sendMessage("done -_-", threadID, messageID);
          delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("Đã reload thành công config.json", event.threadID, event.messageID);    
}break;
          ///// end
          
          
          //admin box only
        case "5": {
        const { writeFileSync } = global.nodemodule["fs-extra"];
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;  
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("» Tắt thành công chế độ quản trị viên tất cả mọi người đều có thể sử dụng bot 🔓", threadID, messageID);
        } else {
            api.sendMessage("» Bật thành công chế độ quản trị viên tất cả mọi người đều có thể sử dụng bot 🔒", threadID, messageID);
            adminbox[threadID] = true;
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
    }break;
        ////end
        case "6": {
            const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('» Bot cần quyền quản trị viên nhóm', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`» Đã ${(data.newMember == true) ? "bật" : "tắt"} thành công cấm người dùng vào box`, event.threadID, event.messageID);
}break;
        case "7": {
            const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('❯ Cần quyền quản trị viên nhóm cho bot', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["guard"] == "guard" || data["guard"] == false) data["guard"] = true;
    else data["guard"] = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`Đã ${(data["guard"] == true) ? "bật" : "tắt"} thành công chế độ chống cướp box`, event.threadID, event.messageID);
}break;
        case "8": {
           var info = await api.getThreadInfo(event.threadID);
 let data = (await Threads.getData(event.threadID)).data || {};
 if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
 else data["antiout"] = false;
 await Threads.setData(event.threadID, { data });
 global.data.threadData.set(parseInt(event.threadID), data);
 return api.sendMessage(`» Đã ${(data["antiout"] == true) ? "bật" : "tắt"} thành công cấm người dùng rời box`, event.threadID);

}break;
        case "9": {
    var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `Danh sách ${qtv} quản trị viên gồm:\n ${listad}`,event.threadID,event.messageID)

}break;
        case "10": {
           const { ADMINBOT } = global.config;
          const { NDH } = global.config;
           listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`»  ${name}\nLink: fb.me/${idAdmin}`);
                }
            }
              listNDH = NDH || config.NDH ||  [];
            var msg1 = [];
            for (const idNDH of listNDH) {
                if (parseInt(idNDH)) {
                  const name1 = (await Users.getData(idNDH)).name
                    msg1.push(`» ${name1}\nLink: fb.me/${idNDH}`);
                }
            }
           return api.sendMessage(`======〘『ADMIN』〙======\n${msg.join("\n")}\n\n===「Người Hỗ Trợ Bot」=== \n${msg1.join("\n")},`, event.threadID, event.messageID);
        }
          
          
          
        
         }
      }
    }
  }

    

module.exports.handleEvent = async ({ api, event }) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
  let totalChat = JSON.parse(fs.readFileSync(totalPath));
  if (!totalChat[event.threadID]) return;
  if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
    let sl = (await api.getThreadInfo(event.threadID)).messageCount;
    totalChat[event.threadID] = {
      time: Date.now() - _24hours,
      count: sl,
      ytd: sl - totalChat[event.threadID].count
    }
    fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
  }
}
