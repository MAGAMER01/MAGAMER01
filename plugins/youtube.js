//created by @inrl
const yt = require('inrl-bot-md');
const fs = require('fs');

const {
    inrl,
    sleep,
    extractUrlsFromString
} = require('../lib/');
const {
    BASE_URL
} = require('../config');

inrl({
    pattern: 'song',
    type: "downloader"
}, async (m) => {
try {
    const match = m.client.text;
    if(!match) return await m.send("*_give me url or quarry_*");
    const  url = await extractUrlsFromString(match);
    if(!url[0]){
    const result = await yt.search(match);
    if(!result) return await m.send('_not found_');
    let msg ="*_YT SONG DOWNLOADER_*\n\n", n =1;
    await result.map(r=>msg += `*${n++}*. `+'```'+`${r.title}`+'```\n');
    return await m.send(msg);
   } else {
   m.client.text = url[0]
    const media = await yt.stream(url[0],{
        quality: 'medium',
        type: 'audio',
        highWaterMark: 1048576 * 32
    });
    file = await media.stream.pipe(fs.createWriteStream('./type.mp3'));
    await sleep(100);
    return await m.conn.sendMessage(m.from, {audio:fs.readFileSync('./type.mp3'),mimetype: 'audio/mpeg'});
   }
   } catch(e){
   return m.send('_Time Out_ '+e);
   }
});

inrl({
    pattern: 'video',
    type: "downloader"
}, async (m) => {
try {
    const match = m.client.text;
    if(!match) return await m.send("*_give me url or quarry_*");
    const  url = await extractUrlsFromString(match);
    if(!url[0]){
    const result = await yt.search(match);
    if(!result) return await m.send('_not found_');
    let msg ="*_YT VIDEO DOWNLOADER_*\n\n", n =1;
    await result.map(r=>msg += `*${n++}*. `+'```'+`${r.title}`+'```\n');
    return await m.send(msg);
   } else {
    m.client.text = url[0]
    const media = await yt.stream(url[0],{
        quality: 'medium',
        type: 'video',
        highWaterMark: 1048576 * 32
    });
    file = await media.stream.pipe(fs.createWriteStream('./type.mp4'));
    await sleep(100);
    return await m.conn.sendMessage(m.from, {video:fs.readFileSync('./type.mp4'),mimetype: 'video/mp4'});
   }
   } catch(e){
   return m.send('_Time Out_'+e);
   }
});
inrl({
    pattern: 'ytdl',
    type: "downloader",
    on : "text"
}, async (m, conn, match) => {
if(!m.quoted || !m.quoted.fromMe) return;
try {
if(m.client.body.includes("YT VIDEO DOWNLOADER")){
match = m.client.body.replace("YT VIDEO DOWNLOADER","").trim();
await m.send(`*_downloading_*\n*_${match}_*`);
const result = await yt.search(match);
const media = await yt.stream(result[0].url, {
        quality: 'medium',
        type: 'video',
        highWaterMark: 1048576 * 32
    });
    file = await media.stream.pipe(fs.createWriteStream('./type.mp4'));
    await sleep(100);
    return await m.conn.sendMessage(m.from, {video:fs.readFileSync('./type.mp4'),mimetype: 'video/mp4'});
} else if(m.client.body.includes("YT SONG DOWNLOADER")){
match = m.client.body.replace("YT SONG DOWNLOADER","").trim();
await m.send(`*_downloading_*\n${match}`);
const result = await yt.search(match);
const media = await yt.stream(result[0].url, {
        quality: 'medium',
        type: 'audio',
        highWaterMark: 1048576 * 32
    });
    file = await media.stream.pipe(fs.createWriteStream('./type.mp3'));
    await sleep(100);
    return await m.conn.sendMessage(m.from, {audio:fs.readFileSync('./type.mp3'),mimetype: 'audio/mpeg'});
}
} catch(e){
return await m.send('_Error, try again!_')
}});
