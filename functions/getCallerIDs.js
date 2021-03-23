
exports.handler = function(context, event, callback) {
  let response = new Twilio.Response();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "content-type, accept",
    "Content-Type": "application/json"
  }
  response.setHeaders(headers);
  
  const mapping=[ 
    { queueSid: "WQxx",
      name:'Queue1',
      callerId: '+31xx'
    },
    { queueSid: "WQxx",
      name:'Queue2',
      callerId: '+31xx'
    },
  ];
  
  const notSelected="WQxx";

  response.setBody({
    mapping:mapping,
    notSelected:notSelected
  });
  callback(null, response);
  
};