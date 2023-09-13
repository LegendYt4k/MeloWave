require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || '', // your discord bot token
  prefix: process.env.PREFIX || '.', // bot prefix
  ownerID: process.env.OWNERID?.split(',') || ['990100068759666758','445624020675592212'], //your discord id
  SpotifyID: process.env.SPOTIFYID || '', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || '', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://', // MongoDb URL
  embedColor: process.env.COlOR || '#3366ff', // embed colour
  logs: process.env.LOGS || '1137383877833408522',
      plogs: process.env.PLOGS || '1140087638464925726',
     dlogs: process.env.DLOGS || '1140091655744131072',// Discord channel id 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/6avGkZPz78',
    invite: process.env.INVITE || 'https://discord.com/api/oauth2/authorize?client_id=1134446602409484338&permissions=277041182784&scope=bot',
    vote: process.env.VOTE || 'https://top.gg/bot/1134446602409484338?s=00537fd30670a',
    bg: process.env.BG || 'https://media.discordapp.net/attachments/1112357988947197974/1138446708179734660/standard_1.gif'
  },
  nodes: [
    {
      url: process.env.NODE_URL || 'lavalink-replit.lavalink-hosts.repl.co:443',
      name: process.env.NODE_NAME || 'LavaLink-LykHost',
      auth: process.env.NODE_AUTH || 'lavalykhost',
      secure: parseBoolean(process.env.NODE_SECURE || 'true'),
    },
  ],
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
