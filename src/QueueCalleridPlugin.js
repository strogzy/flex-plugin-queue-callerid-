import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

const PLUGIN_NAME = 'QueueCalleridPlugin';

export default class QueueCalleridPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }
  
  /**
  * This code is run when your plugin is being started
  * Use this to modify any UI components or attach to the actions framework
  *
  * @param flex { typeof import('@twilio/flex-ui') }
  * @param manager { import('@twilio/flex-ui').Manager }
  */
  init(flex, manager) {
    
    flex.Actions.replaceAction("StartOutboundCall", (payload, original) => {

      const queueSid = payload.queueSid;
      console.log(payload);
      
      let newPayload = payload;

      fetch(process.env.FUNCTIONS_URL+'/get_callerid')
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        const mapping = data.mapping;
        const notSelected = data.notSelected;
        if (payload.queueSid == notSelected){
          // you can also add your own custom component to select a queue
        }
        for (let i=0; i<mapping.length; i++){
          if (mapping[i].queueSid == queueSid && mapping[i].callerId){
            newPayload.callerId = mapping[i].callerId;
            break;
          }
        }
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        console.log("callig using", newPayload);
        original(newPayload);
      })
    });
  }
  
}
