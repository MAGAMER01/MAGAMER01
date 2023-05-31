const { inrl,extractUrlsFromString } = require('../lib');
const {BASE_URL} = require('../config');
const got = require('got');
   inrl({
                on: "text",
		pattern: '$downloader',
	},
	async (message, client, match) => {
	const urls = extractUrlsFromString(message.client.body);
	if(!urls[0]) return;
	urls.map(async(url)=>{
        if(url.match(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)){
	let {body} =  await got(BASE_URL + 'api/ytv?url=' + url);
	const {result} = JSON.parse(body);
	if(!result.url) return await message.send('*Not Found*');
	if(message.client.body.toLowerCase().includes('mp3')||message.client.body.toLowerCase().includes('song')||message.client.body.toLowerCase().includes('yta')){
	await client.sendMessage(message.from, {audio:{url:result.url},ptt:false,mimetype:"audio/mpeg"}).catch((e)=>message.reply('*_request Filed With StatusCode 403_*'));
	} else {
	await client.sendMessage(message.from, {video:{url:result.url},caption:result.title}).catch((e)=>message.reply('*_request Filed With StatusCode 403_*'));
	}
	}
	if(url.match(/https?:\/\/(?:www\.)?instagram\.com(?:\/[^\/]+)?\/(?:p|reel)\/([^\/?#&]+)/)){
	let {body} =  await got(BASE_URL + 'api/insta?url=' + url);
	const {result} = JSON.parse(body);
	if(!result[0]) return await message.send('*Not Found*');
	result.map(async(u)=> await message.sendFromUrl(u).catch((e)=>message.reply('*_request Filed With statusCode 503_*')))
	}
	if(url.match(/https:\/\/www\.mediafire\.com(?:\/[^\/]+)?\/(?:file)\/([^\/?#&]+)/)){
	let {body} =  await got(BASE_URL + 'api/mediafire?url=' + url);
	const {result} = JSON.parse(body);
	if(!result[0]) return await message.send('*Not Found *');
	const {name,mime,size,link} = result[0]
	await message.reply('```Name : ' + name.replaceAll('+',' ') + '\nSize : ' + size + '```\n\n_Downloading.._')
	if(size>100) return await messsge.send('_fileLength is too high_')
	await client.sendMessage(message.from, {
			document: {
				url: link
			},
			mimetype: mime,
			fileName: name.replaceAll('+',' ')
		}, {
			quoted: message
		})
		.catch((e) => message.reply('_fileLength is too high_'))
	}
	})
});
