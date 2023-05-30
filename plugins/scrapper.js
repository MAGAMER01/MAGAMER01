const {
    getVar,
    inrl,
    isUrl,
    googleIt,
    wikiMedia,
    ringTone,
    getYtV,
    getYtA,
    weather,
    movie,
    getFilm,
    Insta,
    mediafireDl,
    twitter,
    FaceBook,
    wather
} = require('../lib');
const Config = require('../config');
const util = require('util');
inrl({
    pattern: 'google',
    desc: 'do get goole serch result',
    sucReact: "🙃",
    category: ["system", "all"],
    type: "search"
}, async (message, client) => {
    try {
        if (!message.client.text) return message.send("need a text to serch");
        let teks = await googleIt(message.client.text);
        return await client.sendMessage(message.from, {
            text: "\n" + teks
        }, {
            quoted: message
        })
    } catch (e) {
        message.send("error" + e)
    }
});
inrl({
    pattern: 'wikimedia',
    desc: 'do get data from wikimedia',
    sucReact: "🙃",
    category: ["system", "all"],
    type: "search"
}, async (message, client) => {
    try {
        if (!message.client.text) return message.send("need a text to serch");
        let result = await wikiMedia(message.client.text);
        let buttonMessage = {
            image: {
                url: result.image
            },
            caption: `Title : ${result.title}\n Source : ${result.source}\n Media Url : ${result.image}`,
        }
        return await client.sendMessage(message.from, buttonMessage, {
            quoted: message
        })
    } catch (e) {
        message.send(e)
    }
});
inrl({
    pattern: 'ringtone',
    desc: 'do get random ringtons ',
    sucReact: "🙃",
    category: ["system", "all"],
    type: "search"
}, async (message, client) => {
    try {
        if (!message.client.text) return message.send("need a text to serch");
        let result = await ringTone(message.client.text);
        return await client.sendMessage(message.from, {
            audio: {
                url: result.audio
            },
            fileName: result.title + '.mp3',
            mimetype: 'audio/mpeg'
        }, {
            quoted: message
        })
    } catch (e) {
        message.send(e)
    }
});

inrl({
    pattern: 'weather',
    desc: 'To get detiles of you place',
    sucReact: "🔥",
    category: ["system", "all"],
    type: "search"
}, async (message, client, match) => {
    try {
        return await wather(message, client);
    } catch (e) {
        return message.send(e);
    }
});
