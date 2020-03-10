angular.module('app').service('aloneService', aloneService);

aloneService.$inject = [
    'brokerDetails',
    'messageService'
    
];


function aloneService(brokerDetails, messageService) {
    var self = this;
    // var channel0Occupied = false;
    // var channel1Occupied = false;
    var serviceName = 'alone_service';
    var channelTopic0 = `${brokerDetails.UUID}/channel/0`;
    var channelTopic1 = `${brokerDetails.UUID}/channel/1`;
    // var hashUUID;
    var currentChannel = -1;
    self.initialize = initialize;
    // self.returnFreeChannels = returnFreeChannels;
    self.setChannel = setChannel;
    
    
    

    function initialize(hash){
        console.log("Alone service ini");
        // hashUUID = hash;
        messageService.publish(channelTopic0, JSON.stringify(hash));
        messageService.publish(channelTopic1, JSON.stringify(hash));

        console.log(channelTopic0);
        console.log(brokerDetails.UUID+"/channel/"+currentChannel);
        
        messageService.subscribe(channelTopic0, serviceName, function(message){
            
            if(message.topic == channelTopic0){
                console.log("hash: " + hash);
                console.log("message: " + message.payloadString.replace(/"/g,""));
                console.log("current channel" + currentChannel);
                if(!(hash===message.payloadString.replace(/"/g,""))){
                    messageService.publish(channelTopic0, JSON.stringify(hash));
                    console.log(currentChannel);
                }
            }
        });
        
        
        // messageService.subscribe(channelTopic1, serviceName, function(message){
        //     console.log(JSON.stringify(message,null,2));
        //     if(message.topic == channelTopic1 && _channel == 1){
        //         console.log("different uuid detected");
        //         console.log(JSON.stringify(message,null,2));
        //         if(JSON.stringify(hashUUID) != JSON.stringify(message)){
        //             channel1Occupied = true;
        //             console.log("channel 1 occupied: " + channel1Occupied);
        //         }
        //     }
        // });
        
    }

    // function returnFreeChannels(){
        
    //     if(channel0Occupied == false && channel1Occupied == false){
    //         return [0, 1];

    //     }else if(channel0Occupied == false && channel1Occupied == true){
    //         return [0];

    //     }else if(channel0Occupied == true && channel1Occupied == false){
    //         return [1];
    //     }

    // }


    function setChannel(channel){
         currentChannel  = channel;
    }
   
}