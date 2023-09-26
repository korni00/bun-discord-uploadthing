import { Client, GatewayIntentBits, Events } from 'discord.js';
import { handleMessage } from './eventHandlers';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, async (c: { user: { tag: string } }) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, handleMessage);

client.login(process.env.DISCORD_TOKEN);
