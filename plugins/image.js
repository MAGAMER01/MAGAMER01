const {
    inrl,
    remove,
    unscreen,
    getVar
} = require('../lib/');
const { BASE_URL } = require('../config');
const got = require('got');
const fs = require('fs');

inrl({
    pattern: "rmbg",
    desc: 'To remove bg of any image',
    sucReact: "😉",
    category: ["system", "all", "create", "photo", "fun"],
    type: "converter",
    usage: "give png image without background for your img request"
}, async (message, client) => {
    let data = await getVar();
    let {
        CAPTION
    } = data.data[0]
    if (!message.quoted) return message.reply('reply to a img msg!')
    if (!message.quoted.imageMessage) return message.reply('reply to a img msg!')
    let img = await message.quoted.download();
    let rmbgimg = await remove(img)
    // let rmbg = await fs.writeFile('./media/rmbg/isexit.jpg', rmbgimg)
    await client.sendMessage(message.from, {
        image: rmbgimg,
        caption: CAPTION
    }, {
        quoted: message
    })
});
inrl({
    pattern: "img",
    usage: 'send google image result for give text',
    sucReact: "🖼",
    category: ["search", "all"],
    type: "search"
}, async (message, client, match) => {
    let data = await getVar();
    let {
        CAPTION
    } = data.data[0]
    if (!match) {
        return await client.sendMessage(message.from, {
            text: 'Enter Text'
        }, {
            quoted: message
        });
    }
    const {body} = await got(BASE_URL+'api/gis?text='+match);
    const {result} = body;
    if(!result[0]) return await message.send('_not FOUND_');
    return await message.sendReply(result[0],{caption:'result for'+match},'image');
});
