var https = require('https');
var util = require('util');

const sendMessage = (message, context) => {
  var options = {
    method: 'POST',
    hostname: 'hooks.slack.com',
    port: 443,
    path: '/services/T082A3J1J/BFTG83S7R/joebFhEZznX7KdDgosgUAy9y',
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('message sent', chunk);
      context.done(null);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    context.fail(e.message);
  });

  req.write(util.format('%j', message));
  req.end();
};

const buildMessages = recordObj => {
  if (recordObj.length < 1) {
    return [];
  }
  return recordObj.map(record => {
    const { channel, username, text, iconEmoji } = JSON.parse(record.Sns.Message);
    return {
      channel,
      username,
      text,
      icon_emoji: iconEmoji,
    };
  });
};

/**
 * Assumes that SNS is sending a slack message, and
 * based off of parameters supplied in the first Records object, builds a slack message
 * @param {object} event params about the slack channel
 * @param {string} event.Records[0].Sns.Message - channel to send message to
 */
const slackFunc = function(event, context) {
  const recordSet = buildMessages(event.Records);
  if (recordSet.length < 1) {
    return 'nothing sent';
  }
  recordSet.forEach(record => sendMessage(record, context));
};

exports.handler = slackFunc;
