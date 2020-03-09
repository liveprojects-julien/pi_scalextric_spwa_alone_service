angular.module('app').service('aloneService', aloneService);

aloneService.$inject = [
    
];


function aloneService() {

    var self = this;
    self.initialize = initialize;

    function initialize(){
        console.log("Alone service ini");
    }
    
    


}