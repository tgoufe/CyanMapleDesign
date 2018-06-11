module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            0,
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            0,
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "strict": [
            0
        ],
        "curly": [
            2,
            "all"
        ],
        "eqeqeq": 2,
        "no-undef":0
    }
};