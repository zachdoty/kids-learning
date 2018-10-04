

Template.registerHelper('length', _arr => {
    return _arr.length;
});

Template.registerHelper('isChecked', (a, b) => {
    return (a == b) ? 'checked' : '';
});

Template.registerHelper('equal', (a, b) => {
    return (a == b);
});
