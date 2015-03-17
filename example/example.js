Books = new Mongo.Collection('books');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    myOptions: function () {
      return [
              {label : 'red', value : 1},
              {label : 'green', value : 2},
              {label : 'blue', value : 3}
              ];
    }
  });

  Template.hello.events({
    'onEipTrigger' : function(e, t, d){
      console.log('----');
      console.log('TRIGGER');
      console.log(e);
      console.log(t);
      console.log(d);
      console.log('----');

    },
    'onEipSave' : function(e, t, d){
      console.log('----');
      console.log('SAVE');
      console.log(e);
      console.log(t);
      console.log(d);
      console.log('----');

    },
    'onEipBlur' : function(e, t, d){
      console.log('----');
      console.log('BLUR');
      console.log(e);
      console.log(t);
      console.log(d);
      console.log('----');
    },
   'onEipChange' : function(e, t, d){
      console.log('----');
      console.log('CHANGE');
      console.log(e);
      console.log(t);
      console.log(d);
      console.log('----');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
