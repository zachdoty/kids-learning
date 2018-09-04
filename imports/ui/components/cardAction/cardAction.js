import './cardAction.html';


Template.App_cardAction.onCreated(function() {
})

Template.App_cardAction.helpers({
    cardId() {
        return Template.instance().data.cardId;
    }
})

Template.App_cardAction.events({
    "click #btn-delete"(event, template) {
        Meteor.call('cards.delete', template.data.cardId, (_err, _res) => {
            if(!_err) {
                showAlertSuccess('Card deleted.');
            } else {
                showAlertError('Please try again.');
            }
        })
    }  
})