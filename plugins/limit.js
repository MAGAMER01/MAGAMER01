//https://g.v.com/db/user/verify?key=98272_ueuy_1637
const {
    inrl,
    GenrateOtp,
    isVerified,
    IsMailed,
    isValidMailid,
    sendMail,
    clearUserFromMail,
    verifyUser,
    giveLimit,
    resetLimit,
    getLimitV2,
    removeUserLimit
} = require("../lib");
inrl({
    pattern: 'permit',
    desc: 'To give permission for some (`$`) cmds',
    type: "action",
    onlyPm: true,
    fromMe: 'public'
}, async (m, client, match, cmd) => {
    const user = m.sender.split('@')[0];
    if (!match) return await m.send("*incorrect format*\n```ex:-``` *permit email-ID*");
    if (match == "remove") {
        const va = await clearUserFromMail(user);
        return await m.send(`${va?"user removed from mail-db": "this user not found in mail-db"}`);
    }
    const ver = await IsMailed(user);
    if (ver) return await m.send("_already mailed_\n```permit remove to remove your data```");
    let valid = await isValidMailid(match);
    if (!valid) return await m.send("_invalid mail_");
    const key = GenrateOtp();
    const res = await sendMail(match, key, user);
    return await m.reply("```successfull```\nuse *otp* key _to verify_");
});
inrl({
    pattern: 'otp',
    desc: 'To give permission for some (`$`) cmds',
    type: "action",
    onlyPm: true,
    fromMe: 'public'
}, async (m, client, match, cmd) => {
    const user = m.sender.split('@')[0];
    const ver = await IsMailed(user);
    if (!ver) return await m.send("_not mailed yet!_");
    if (!match) return await m.send("_give me your code_");
    if (match.length != 6) return await m.send("_invalid key_\n key length nust be 6");
    const vr = await verifyUser(match, user);
    return await m.send(`${vr?"user verified": "filed"}`)
});
inrl({
    pattern: 'limit',
    desc: 'To give permission for some (`$`) cmds',
    type: "action",
    onlyPm: true,
    fromMe: true
}, async (m, client, match, cmd) => {
    if (!m.quoted) return await m.reply('```<reply> to an user```');
    const user = m.quoted.sender.split('@')[0];
    const valid = await isVerified(user);
    if (!valid) return await m.reply('```user must be verified befor giving limit```');
    if (!match) return m.reply('filed\nex:- *limit* ```reset``` _to reset_\n*limit* ```kick``` _to remove user_\n*limit* ```get``` _to get limit_\n*limit* 5 _to give limit_');
    if (match == "reset") {
        await resetLimit(user);
        return await m.send('```requested to DB```')
    } else if (match == "kick") {
        const res = await removeUserLimit(user);
        return await m.send(`_${res?"user removed": "filed"}_`)
    } else if (match == "get") {
        const res = await getLimitV2(user);
        return await m.send(res);
    }
    let limit = match.replace(/[^0-9]/gi, '');
    if (!limit) return await m.send('field\n*limit 10');
    if (limit > 20) return await m.reply('maximum limit upto 20\n after thet limit trybto restet');
    await giveLimit(user, limit);
    return m.send("successfull");
});
