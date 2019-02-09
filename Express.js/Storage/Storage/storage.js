let fs = require("fs");
let messages = require("./error-messages.js");

let memory = {}

function stringCheck(key) {
    if (typeof key !== 'string') {
        throw new Error(messages.notAString)
    }
}

function missingKeyCheck(key) {
    if (!memory.hasOwnProperty(key)) {
        throw new Error(messages.noKey)
    }
}

function existingKeyCheck(key) {
    if (memory.hasOwnProperty(key)) {
        throw new Error(messages.keyExists)
    }
}

module.exports = {
    put: (key, value, callback) => {
        stringCheck(key)
        existingKeyCheck(key)

        memory[key] = value
        callback(true)
    },

    get: (key,cb) => {
        stringCheck(key)
        missingKeyCheck()

        cb(memory[key])
    },

    getAll: (cb) => {
        if (Object.keys(memory).length === 0) {
            return messages.emptyStorage
        }
        cb(memory);
    },

    update: (key, value, cb) => {
        stringCheck(key)
        missingKeyCheck(key)

        memory[key] = value

        cb(true)
    },

    remove: (key, cb) => {
        stringCheck(key)
        missingKeyCheck(key)

        delete memory[key]

        cb(true)
    },

    clear: (cb) => {
        memory = {}
        cb(true)
    },

    save: (cb) => {
        fs.writeFileSync('./storage.json', JSON.stringify(memory, null, 2), 'utf-8')
        cb(true)
    },

    load: (cb) => {
        if (fs.existsSync('./storage.json')) {
            memory = JSON.parse(fs.readFileSync('./storage.json', 'utf-8'));
        }
        cb(true)
    }
}