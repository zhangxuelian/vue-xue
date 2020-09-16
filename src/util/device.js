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
        this.findExe('osk.exe', function (ret) {
            if (ret.type !== "getProcess") {
                exec('osk.exe');
            }
        });
    },
    findExe: function (name, cb) {
        let cmd = process.platform === 'win32' ? 'tasklist' : 'ps aux'
        exec(cmd, function (err, stdout, stderr) {
            var ret = {};
            if (err) {
                ret = {
                    type: "error",
                    data: err
                };
            }
            stdout.split('\n').filter((line) => {
                let processMessage = line.trim().split(/\s+/);
                //processMessage[0]进程名称 ， processMessage[1]进程id
                let processName = processMessage[0];
                if (processName === name) {
                    ret = {
                        type: "getProcess",
                        data: processMessage[1]
                    };
                }
            });
            if (!ret.type) {
                ret = {
                    type: "noProcess",
                    data: null
                }
            }
            cb(ret);
        })
    }
}