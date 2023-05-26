const {
        TogCmd,
        inrl,
        commands,
        sleep,
        getTog
} = require('../lib/')
inrl({
        pattern: 'tog ?(.*)',
        fromMe: true,
        desc: 'Enable or Disable Cmd',
        type: 'misc',
}, async (message, client, match) => {
        if (match == 'list') {
                let res = await getTog(),
                        list = "_list of tog cmds!_\n\n"
                if (res == 'no data') return await message.send('_Not Found_');
                let n = 1;
                res.map((b) => {
                        list += `${n++}  ${b.cmd}\n`;
                })
                return await message.reply(list)
        }
        let [cmd, tog] = match.split(' '), isIn = false;
        if (!cmd || (tog != 'off' && tog != 'on')) return await message.send('*Example :* .tog ping off')
        commands.map((c) => {
                if (c.pattern.replace(/[^a-zA-Z0-9,+-]/g, "") == cmd) {
                        isIn = true
                }
        });
        await sleep(342)
        if (!isIn) return await message.reply('_given cmd not exist_');
        if (cmd == 'tog') return await message.send(`Did you really want to kill me?`)
        await TogCmd(cmd, tog)
        return await message.send(`_${cmd} ${tog == 'on' ? 'Enabled' : 'Disabled'}._`)
})
