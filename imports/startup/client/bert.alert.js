
global.showAlert = (_type, _title, _message) => {
    Bert.alert({
        title: _title,
        message: _message,
        type: _type,
        style: 'growl-top-right'
      });
}

global.showAlertError = (_message) => {
    showAlert('danger', 'Error', _message);
}

global.showAlertInfo = (_message) => {
    showAlert('info', 'Message', _message);
}

global.showAlertSuccess = (_message) => {
    showAlert('success', 'Success', _message);
}