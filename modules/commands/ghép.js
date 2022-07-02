module.exports.config = {
	name: "ghép",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "ProCoderCyrus",
	description: "Ghép đôi với những người trong nhóm",
	commandCategory: "Dành cho người dùng",
	cooldowns: 5,
	dependencies: {
        "axios": "",
        "fs-extra": "",
        "moment-timezone": ""
  }
}
module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'pairing.png');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.postimg.cc/X7R3CLmb/267378493-3075346446127866-4722502659615516429-n.png", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let pairing_img = await jimp.read(__root + "/pairing.png");
    let pathImg = __root + `/pairing_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    pairing_img.composite(circleOne.resize(150, 150), 980, 200).composite(circleTwo.resize(150, 150), 140, 200);
    
    let raw = await pairing_img.getBufferAsync("image/png");
    
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);
    
    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}
module.exports.run = async function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
  var moment = require('moment-timezone');
  const { threadID, messageID, senderID } = event;
  if (![0,1,3,5].includes((moment)().tz("Asia/Ho_Chi_Minh").day())) return api.sendMessage("» Chỉ có thể dùng vào thứ 2/4/6/chủ nhật nhé ", threadID);
    const { readFileSync, writeFileSync } = require("fs-extra")
    const fs = require("fs-extra");
    var tl = ['21%','11%','55%','89%','22%','45%','1%','4%','78%','15%','91%','77%','41%','32%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%"];
        var tle = tl[Math.floor(Math.random() * tl.length)];
        let dataa = await api.getUserInfo(event.senderID);
        let namee = await dataa[event.senderID].name
        let loz = await api.getThreadInfo(event.threadID);
        var emoji = loz.participantIDs;
        var id = emoji[Math.floor(Math.random() * emoji.length)];
        let data = await api.getUserInfo(id);
        let name = await data[id].name
        var arraytag = [];
                arraytag.push({id: event.senderID, tag: namee});
                arraytag.push({id: id, tag: name});
        
        var sex = await data[id].gender;
        var gender = sex == 2 ? "Nam🧑" : sex == 1 ? "Nữ👩‍🦰" : "Trần Đức Bo";
var one = senderID, two = id;
    return makeImage({ one, two }).then(path => api.sendMessage({ body: `🍓 Chúc mừng ${namee} đã được ghép đôi với ${name}\n🍓 Tỉ Lệ Hợp Đôi là: ${tle}`, mentions: arraytag, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }