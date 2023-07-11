//created by @inrl
const { downloadYT } = require('inrl-bot-md');
const axios = require('axios');

const {
    inrl,
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
    const {data} = await axios(BASE_URL+`api/yts?text=${match}`);
    const {result} = data
    if(!result) return await m.send('_not found_');
    let msg ="*YT SONG DOWNLOADER*\n\n", n =1;
    await result.map(r=>msg += `${n++}. `+'```'+`${r.title}`+'```\n');
    return await m.send(msg);
   } else {
   m.client.text = url[0]
    return await downloadYT(m, m.conn,'mp3');
   }
   } catch(e){
   return m.send('_Time Out_'+e);
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
    const {data} = await axios(BASE_URL+`api/yts?text=${match}`);
    const {result} = data
    if(!result) return await m.send('_not found_');
    let msg ="*YT VIDEO DOWNLOADER*\n\n", n =1;
    await result.map(r=>msg += `${n++}. `+'```'+`${r.title}`+'```\n');
    return await m.send(msg);
   } else {
    m.client.text = url[0]
    return await downloadYT(m, m.conn,'mp4');
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
match = m.client.body.replace("YT VIDEO DOWNLOADER").trim();
await m.send(`_downloading_\n*_${match}_*`);
const {data} = await axios(BASE_URL+`api/yts?text=${match}`);
const {result} = data;
m.client.text= result[0].url;
return await downloadYT(m, m.conn,'mp4');
} else if(m.client.body.includes("YT SONG DOWNLOADER")){
match = m.client.body.replace("YT SONG DOWNLOADER").trim();
await m.send(`_downloading_\n${match}`);
const {data} = await axios(BASE_URL+`api/yts?text=${match}`);
const {result} = data;
m.client.text= result[0].url;
return await downloadYT(m, m.conn,'mp3');
}
} catch(e){
return await m.send('_Error, try again!_')
}});
