const tools = require('../tools.js');
const cfg = require('../config.js');

module.exports.run = async (ts, ev, client, args) => {
  if (!args[0]) return ts.sendTextMessage(client.getID(), 1, 'error: Missing argument(s)!');

  const [searchUID] = args;
  const [targetDBID] = await ts.clientDBFind(searchUID, true);
  const [target] = await ts.clientDBInfo(targetDBID.cldbid);

  if (!target) return ts.sendTextMessage(client.getID(), 1, 'Cannot find the client with that unique ID!');

  let resp = `Who is the client with UID "${searchUID}"?\n`;
  const targetNick = target.client_nickname;
  let targetLevel = 'User';
  if (cfg.users.root.includes(searchUID)) targetLevel = 'Root';
  else if (cfg.users.mod.includes(searchUID)) targetLevel = 'Elevated';
  const targetLastSeen = tools.toDate(target.client_lastconnected);
  resp += `Nickname: ${targetNick}\nDBID: ${targetDBID.cldbid}\nPermission Level: ${targetLevel}\nLast Seen: ${targetLastSeen}`;
  ts.sendTextMessage(client.getID(), 1, resp);
};

module.exports.info = {
  name: 'whois',
  usage: `${process.env.PREFIX}whois <uniqueid>`,
  desc: 'Returns basic information about the client with the given unique ID.',
  level: 2
};
