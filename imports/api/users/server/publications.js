

Meteor.publish("users.info", function () {
    if(Roles.userIsInRole(Meteor.userId(), ['admin']))
        return Meteor.users.find({}, {fields: {'services': 0}});
    else
        return []; 
});