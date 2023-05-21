const os = require("os");
const speed = require("performance-now");
const {
    getVar,
    inrl,
    commands,
    tiny,
    inrlQuita,
    insult,
    getBuffer,
    randomStyle,
    styletext,
    send_alive,
    send_menu
} = require('../lib')
const Config = require("../config");
inrl({
    pattern: 'list',
    desc: 'To viwe list of categories',
    sucReact: "💯",
    category: ["system", "all"],
    type: 'info'
}, async (message) => {
    let b=1,c="";commands.map((e=>{e.pattern&&e.desc?c+=`${b++} *${e.pattern.replace(/[^a-zA-Z0-9,-]/g,"")}*\n_${e.desc}_\n\n`:c+=`${b++} *${e.pattern.replace(/[^a-zA-Z0-9,-]/g,"")}*\n`}));
    return await message.send(c);
});
inrl({
    pattern: 'ping ?(.*)',
    desc: 'To check ping',
    sucReact: "💯",
    category: ["system", "all"],
    type: 'info'
}, async (message, client) => {
    const start = new Date().getTime()
    await message.reply('Ping!')
    const end = new Date().getTime()
    return await message.reply('Pong! ' + (end - start) + ' ms');
});
inrl({
    pattern: 'del',
    desc: "to delete unwanted grp msg sended by bot",
    sucReact: "⚒️",
    category: ["all"],
    type: 'whatsapp',
    fromMe :true,
    onlyGroup :true
}, async (message, client) => {
    try {
        if (!message.quoted) return;
        let {
            chat,
            fromMe,
            id
        } = message.quoted
        return client.sendMessage(message.from, {
            delete: {
                remoteJid: message.chat,
                fromMe: message.quoted.fromMe,
                id: message.quoted.id,
                participant: message.quoted.sender
            }
        })
    } catch (e) {
        message.reply(JSON.stringify(e))
    }
});
inrl({
    pattern: 'dlt',
    desc: 'To dlt unwanted msg by admin from group content',
    sucReact: "🤌",
    category: ["system", "all"],
    type: 'whatsapp',
    onlyGroup :true
}, async (message, client, match) => {
    if (match) return;
    try {
        const groupMetadata = message.isGroup ? await client.groupMetadata(message.from).catch(e => {}) : ''
        const participants = message.isGroup ? await groupMetadata.participants : ''
        let admins = message.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        if (!message.quoted) return;
        if (!admins.includes(message.sender)) return message.reply('only for admins');
        return await client.sendMessage(message.from, {
            delete: {
                remoteJid: message.key.remoteJid,
                fromMe: message.quoted.fromMe,
                id: message.quoted.id,
                participant: message.quoted.sender
            }
        })
    } catch (e) {
        message.reply(e)
    }
})
inrl({
    pattern: "alive",
    desc: "to check the bot status",
    sucReact: "🥰",
    category: ["system", "all"],
    type: 'info'
}, async (message, client, match) => {
    return await send_alive(message, client, match)
});
inrl({
    pattern: "menu",
    desc: "it send available cmds list",
    sucReact: "📰",
    category: ["all", "system"],
    type: 'whatsapp'
}, async (message, client) => {
    return await send_menu(message, client);
});
inrl({
    pattern: `cmds`,
    sucReact: "🆗",
    category: ["all", "system"],
    type: 'info'
}, async (message, client) => {
    return await client.sendMessage(message.from, {
        text: commands.length.toString()
    }, {
        quoted: message
    });
});
inrl({
    pattern: 'fancy',
    desc: 'To convert text to random style as you want',
    sucReact: "🙀",
    category: ["system", "all"],
    type: 'converter',
    media: 'text',
    usage: 'to convert texts to stylish example : fancy 10 inrl'
}, async (message, client, match) => {
    try {
        if (!match || !message.quoted) {
            let NewText = `
1 Fᴀɴᴄʏ
2 ʎɔuɐℲ
4 fancy
8 F̶a̶n̶c̶y̶
9 F̴a̴n̴c̴y̴
10 F̷a̷n̷c̷y̷
11 F̲a̲n̲c̲y̲
12 F̳a̳n̳c̳y̳
13 defult
14 F͎a͎n͎c͎y͎
15 F͓̽a͓̽n͓̽c͓̽y͓̽
16 fancy
17 Fａncｙ
18 ҒΔΠCΨ
19 千卂几匚ㄚ
20 ꎇꍏꈤꏳꌩ
21 ቻልክርሃ
22 𝐅𝐚𝐧𝐜𝐲
23 𝑭𝒂𝒏𝒄𝒚
24 𝐹𝑎𝑛𝑐𝑦
25 ᠻꪖꪀᥴꪗ
26 𝙵𝚊𝚗𝚌𝚢
27 fคຖ¢ฯ
28 ʄąŋƈყ
29 ｷﾑ刀ᄃﾘ
30 千卂几匚ㄚ
31 🄵🄰🄽🄲🅈
32 ᎦᏗᏁፈᎩ
33 ᖴᗩᑎᑕY
34 ʄǟռƈʏ
35 𝙵𝚊𝚗𝚌𝚢
36 𝙁𝙖𝙣𝙘𝙮
37 𝗙𝗮𝗻𝗰𝘆
38 𝐅𝐚𝐧𝐜𝐲
39 𝘍𝘢𝘯𝘤𝘺
40 Fαɳƈყ
41 ₣₳₦₵Ɏ
42 £åñ¢¥
43 ƒαη¢у
44 FΛПᄃY
45 Ƒąղçվ
46 Fₐₙcy
47 ᶠᵃⁿᶜʸ
48 Ŧคภςץ
49 𝔽𝕒𝕟𝕔𝕪
50 𝕱𝖆𝖓𝖈𝖞
51 🅵🅰🅽🅲🆈
52 𝓕𝓪𝓷𝓬𝔂
53 𝔉𝔞𝔫𝔠𝔶
54 Ｆａｎｃｙ
55 𝑭𝒂𝒏𝒄𝒚
56 𝐹𝛥𝛮𝐶𝑌
57 𝙁𝞓𝞜𝘾𝙔
58 𝐅𝚫𝚴𝐂𝐘
59 ᖴᗩᑎᑕᎩ`
            return await client.sendMessage(message.from, {
                text: NewText
            });
        }
        if (isNaN(match)) return await message.reply('need number by given chart\n' + NewText);
        if (match < 1 || match > 59) return await message.reply('give a number between 1 & 59');
        let ThenText = await styletext(message.quoted.text, match)
        return await client.sendMessage(message.from, {
            text: ThenText
        });
    } catch (e) {
        return message.reply('not acceptable')
    }
});
