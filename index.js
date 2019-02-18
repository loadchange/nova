const childProcess = require('child_process');
const readline = require('readline');
const fs = require("fs");

let replace = {};

const readSyncByRl = tips => new Promise((resolve, reject) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout});
    rl.question(tips, (answer) => {
        rl.close();
        if (!answer.trim()) {
            reject(new Error('Do not enter null values!'));
        } else {
            resolve(answer.trim());
        }
    });
});


const generationCommand = () =>
    `
    git filter-branch -f --commit-filter '
        ${Object.keys(replace).map((oldEmail, idx) => (
        `${idx ? 'el' : ''}if [ "$GIT_AUTHOR_EMAIL" = "${oldEmail}" ];
        then
            GIT_AUTHOR_NAME="${replace[oldEmail].name}";
            GIT_AUTHOR_EMAIL="${replace[oldEmail].email}";
            git commit-tree "$@";
        `)).join('')}
        else
            git commit-tree "$@";
        fi' HEAD
    `;

const exec = () => childProcess.exec(generationCommand(), (error, stdout, stderr) => console.log(error ? stderr : stdout));

function main() {
    const filePath = process.argv.slice(2);
    if (filePath && filePath.length) {
        try {
            const data = fs.readFileSync(filePath[0], 'utf-8');
            replace = JSON.parse(data)
            exec();
        } catch (e) {
            console.log(e)
            return
        }
    } else {
        const val = {}
        const receive = {
            oldEmail: '请输入旧邮箱',
            name: '请输入新名字',
            email: '请输入新邮箱'
        }
        Object.keys(receive).map(key => () => readSyncByRl(`${receive[key]}：`)
            .then(output => val[key] = output))
            .reduce((a, b) => (typeof(a) === 'function' ? a() : a).then(b))
            .then(() => {
                const {oldEmail, name, email} = val;
                replace[oldEmail] = {name, email};
            })
            .then(exec)
    }

}

module.exports = main;
