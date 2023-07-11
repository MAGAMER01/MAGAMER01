const {inrl} = require('../lib');
inrl({
    pattern: '$tag',
    desc: 'To tag all group member',
    type: "owner",
    onlyGroup :true
}, async (message, client, match) => {
    if(!match && !message.quoted) return;
    const groupMetadata = await client.groupMetadata(message.from).catch(e => {})
    const participants = await groupMetadata.participants
    let admins = await participants.filter(v => v.admin !== null).map(v => v.id)
    if(match=="all"){
    let msg = "╭─❮ ʜᴇy ᴀʟʟ 😛🪄 ❯ ─⊷❍\n",
        ext;
    let count = 1;
    ext = `│${message.quoted?message.quoted.text||'hi all😚':match||'hi all🤎'}\n`
    msg += (typeof ext !== 'string' ? 'hy all😚' : ext)
    for (let mem of participants) {
        msg += `│${count++}  @${mem.id.split('@')[0]}\n`
    }
    msg += "╰───────────⊷❍";
    return await client.sendMessage(message.key.remoteJid, {
        text: msg,
        mentions: participants.map(a => a.id)
    }, {
        quoted: message
    });
    } else if (match=="admin"){
    let msg = "╭─❮ ʜᴇy ᴀᴅᴍɪɴꜱ🪄 ❯ ─⊷❍\n",
        ext;
    ext = `│${message.quoted?message.quoted.text||'hi all😚':match||'hi all🤎'}\n`
    msg += (typeof ext !== 'string' ? 'hy all😚' : ext)
    let count = 1;
    for (let mem of admins) {
        msg += `│${count++}  @${mem.split('@')[0]}\n`
    }
    msg += "╰───────────⊷❍";
    return await client.sendMessage(message.key.remoteJid, {
        text: msg,
        mentions: participants.map(a => a.id)
    }, {
        quoted: message
    });
    } else if(match || message.quoted){
       if (message.quoted) {
        match =  message.quoted.text;
    }
    if (!match) return await message.reply('need text');
    client.sendMessage(message.key.remoteJid, {
        text: match,
        mentions: participants.map((a) => a.id),
    }, {
        quoted: message
    });
   }
});
