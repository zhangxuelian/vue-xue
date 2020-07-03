const exec = require('child_process').exec;
export default {
    getUserMedia: function () {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.enumerateDevices().then(function (devices) {
                var ret = devices.filter(function (item) {
                    return item.kind == 'videoinput' && item.label == 'USB ColorCamera (0bda:0230)';
                });
                var constraints = {};
                constraints.video = ret && ret[0] && ret[0].deviceId ? { optional: [{ sourceId: ret[0].deviceId }] } : true;
                navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                    resolve(stream)
                }).catch(function (err) {
                    reject('getUserMediaError');
                });
            });
        })
    },
    softKeyboard: function () {
        exec('osk.exe');
    }
}