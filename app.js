// nodejs v20.6.1
/**
 * nodejs v20.6.1
 * для запуска скрипта если нужные модули отсутствую 
 * нужно инициализировать проект команндой npm init
 * введите команду для загрузки и установки модулей
 * npm i fs path mc moment util
 * 
 */

'use strict'

const readline = require('readline'),
    moment = require("moment"),
    fs = require('fs'),
    path = require('path'),
    ms = require("ms");

var now = new Date();
process.on('unhandledRejection', (error) => { console.error(error); process.exit(-1); });
console.log(`STARTED SCRIPT DATE >>>` + "[" + now.toLocaleString() + "]");

var file = "./access.log", blacklist = [''], white = [''], FILE = "./access.log", line

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: function completer(line) {
        const completions = '(1)logparseerror,(2)moniterr,(3)parseget,(4)parsepost,(5)parsepropfind,(6)monitip,(7)parseval,(8)monitval,(9)top5,(10)top10,(11)top20,(12)cls, (13)q '.split(" ");
        const hits = completions.filter((c) => c.startsWith(line));
        return [hits.length ? hits : completions, line];
    },
    terminal: true,
    prompt: '>>>'
});

function input(prompt) {
    return new Promise((callbackFn, errorFn) => {
        rl.question(prompt, (uinput) => {
            callbackFn(uinput);
        }, () => { errorFn(); });
    });
}

// let main = async () => {
//     let amt = await input("Enter the amount to check: ");
//     console.log(amt);
//     let uname = await input("Enter your name: ");
//     console.log(uname);
//     rl.close();
// };

console.log(
    "\n\n -----------------------------------------------------------------------------------------------------------\n" +
    " |                                                                                                         | \n" +
    " |               ░░░░░░░░░░░░░░░░░░░░▄░░░░░░░░░░░░░                                                        | \n" +
    " |               ░░░░░░░░░░░░░░░░░▄█▀░░░░░░░░░░░░░░     [1]-Просмотр log ошибок                            | \n" +
    " |               ░░░░░░░░░░▄▄▄▄▄████▄▄▄▄▄▄▄▄▄▄▄▄░░░     [2]-Мониторинг ошибок из log                       | \n" +
    " |               ░░░░░░░░░░░████████████████▄▄▄▄░░░     [3]-Вывести запросы GET                            | \n" +
    " |               ░░░░░░░░░▄█▀████████████████▄░░░░░     [4]-Вывести запросы POST                           | \n" +
    ` |               ░░░░░▄▄██████████▀░▀███████▀██▄░░░     [5]-Вывести запросы PROPFIND                       | \n` +
    ` |               ░░░░███▀▀▀▀▀▀▀▀░░░░█████████░░▀▄░░     [6]-Мониторинг по IP                               | \n` +
    ` |               ░░░░▀▀░░▄▄▄▄▄▄▄▄▄▄███████████░░░░░     [7]-Вывести лог с определенными значениями         | \n` +
    ` |               ░░░░░░▄▄▄███████████████▀▀███░░░░░     [8]-Мониторинг с определенными значениями          | \n` +
    ` |               ░░░▄██████████████████▀░░░░██░░░░░     [9]-Вывести топ                                    | \n` +
    ` |               ░▄█████████▀▀▀█▀▀▀▀▀░░░░░░░█░░░░░░     [12]-Очистить терминал                             | \n` +
    ` |               ░████████▀░░░░░░░░░░░▀▄▄▄░░░░░░░░░     [13 или q]- Выход из скрипта                       | \n` +
    ` |               ███████▀█░░░░░░░░░░░░▄▄░▀██▄▄░░░░░                                                        | \n` +
    ` |               ▀██████▄▄▄▄░░░░░░██▄██████████▄▄░░                                                        | \n` +
    ` |               ░█▀████████▄▄▄▄▄███████▀▀▀▀█████▄░                                                        | \n` +
    ` |               ░░░███▀███████████████░░░░░░░▀████                                                        | \n` +
    " |               ░░░██▀░░▀▀▀▀▀███▄░▀▀███▄▄░░░░░░▀██                                                        | \n" +
    " |               ░░░█▀░░░░░░░░░░▀▀█▄░░░░░░░░░░░░░██                                                        | \n" +
    " |               ░░░░░░░░░░░░░░░░░░▀█░░░░░░░░░░░░█░                                                        | \n" +
    " |                                                                                                         | \n" +
    " |                                                                                                         | \n" +
    " ----------------------------------------------------------------------------------------------------------- \n"
);

setTimeout(function () { rl.prompt() }, 2000);
rl.on('line', (line) => {
    var command = line.replace(/\n/g, '\n').split(' ');
    switch (command[0]) {
        case 'logparseerror':
        case '1':
            logcom("Введена команда [ Просмотр log ошибок")
            logparseerror()
            break;
        case 'moniterr':
        case '2':
            //Мониторинг ошибок из log
            logcom("Мониторинг ошибок из log")
            moniterr()
            break;
        case 'parseget':
        case '3':
            logcom("Вывести запросы GET")
            parseget()
            break;
        case 'parsepost':
        case '4':
            logcom("Вывести запросы POST")
            parsepost()
            break;
        case 'parsepropfind':
        case '5':
            logcom("Вывести запросы PROPFIND")
            parsepropfind()
            break;
        case 'monitip':
        case '6':
            logcom("Мониторинг по IP")
            let main2 = async () => {
                let amt = await input("Введите IP Адрес: ");
                logvod(amt)
                monitip(amt)
            };
            main2()
            break;
        case 'parseval':
        case '7':
            logcom("Вывести лог с определенными значениями")
            let main3 = async () => {
                let val1 = await input("Введите значение без пробелов: ");
                logvod(val1)
                parseval(val1)
            };
            main3()
            break;
        case 'monitval':
        case '8':
            logcom("Мониторинг с определенными значениями")
            let main4 = async () => {
                let val2 = await input("Введите определенное значение без пробелов и знаков препинания: ");
                monitval(val2)
            };
            main4()
            break;
        case 'top':
        case '9':
            logcom("top")
            let main1 = async () => {
                let amt = await input("Введите значения топ: ");
                logvod(amt)
                let parval = await input("Введите текст для просмотра : ");
                logvod(parval)
                top(amt, parval)
                //rl.close();
            };
            main1()
            break;
        case 'cls':
        case '12':
            logcom("Очистка консоли")
            clearconsole();
            break;
        case '13':
        case 'q':
            logcom("Выход")
            process.exit(0);
            break;
        default:
            console.log('Команда не найдена!');
            break;
    };
    rl.prompt();

}).on('close', () => {
    console.log('Выход выполнен');
    process.exit(0);
});
function logvod(vla) { console.log(`Введено значение [ ${vla} ]`) }
function logcom(vl) { console.log(`Введена команда [ ${vl} ]`) }
function lineend(vline) { console.log(`Найдено строк [ ${vline} ]`) }

function logparseerror() { }
function moniterr() { }
function parseget() {
    let file = fs.readFileSync(FILE, 'utf8')
    const regexp = /^.*\GET\b.*$/mg;
    const matches = file.match(regexp) || [];
    matches.forEach(line => {
        console.log(line)
    })
    lineend(matches.length)
}
function parsepost() {
    let file = fs.readFileSync(FILE, 'utf8')
    const regexp = /^.*\POST\b.*$/mg;
    const matches = file.match(regexp) || [];
    matches.forEach(line => {console.log(line)})
    lineend(matches.length)
}
function parsepropfind() {
    let file = fs.readFileSync(FILE, 'utf8')
    const regexp = /^.*\PROPFIND\b.*$/mg;
    const matches = file.match(regexp) || [];
    matches.forEach(line => {console.log(line)})
    lineend(matches.length)

    // fs.readFile(FILE, 'utf8', (err, data) => {
    //     if (err) return console.error(err);
    //     let j = data.split('\n').length - 1;
    //     for (var d = 0; d < j; d++) {
    //         let date = data.split('\n')[d];
    //         arr[d] = date;
    //         console.log(arr[d])
    //         const regexp = /^.*\logo\b.*$/mg;
    //         const matches = file.match(regexp);
    //         console.log(`[${d}] ${matches}`);

    //     }
    //     lineend(arr.length)
    // })
}
function monitip() { }
function parseval(value) {}
function monitval() { }
function top() { }

function clearconsole() {
    process.stdout.write('\x1Bc');
    console.log(
    "\n\n -----------------------------------------------------------------------------------------------------------\n" +
    " |                                                                                                         | \n" +
    " |               ░░░░░░░░░░░░░░░░░░░░▄░░░░░░░░░░░░░                                                        | \n" +
    " |               ░░░░░░░░░░░░░░░░░▄█▀░░░░░░░░░░░░░░     [1]-Просмотр log ошибок                            | \n" +
    " |               ░░░░░░░░░░▄▄▄▄▄████▄▄▄▄▄▄▄▄▄▄▄▄░░░     [2]-Мониторинг ошибок из log                       | \n" +
    " |               ░░░░░░░░░░░████████████████▄▄▄▄░░░     [3]-Вывести запросы GET                            | \n" +
    " |               ░░░░░░░░░▄█▀████████████████▄░░░░░     [4]-Вывести запросы POST                           | \n" +
    ` |               ░░░░░▄▄██████████▀░▀███████▀██▄░░░     [5]-Вывести запросы PROPFIND                       | \n` +
    ` |               ░░░░███▀▀▀▀▀▀▀▀░░░░█████████░░▀▄░░     [6]-Мониторинг по IP                               | \n` +
    ` |               ░░░░▀▀░░▄▄▄▄▄▄▄▄▄▄███████████░░░░░     [7]-Вывести лог с определенными значениями         | \n` +
    ` |               ░░░░░░▄▄▄███████████████▀▀███░░░░░     [8]-Мониторинг с определенными значениями          | \n` +
    ` |               ░░░▄██████████████████▀░░░░██░░░░░     [9]-Вывести топ                                    | \n` +
    ` |               ░▄█████████▀▀▀█▀▀▀▀▀░░░░░░░█░░░░░░     [12]-Очистить терминал                             | \n` +
    ` |               ░████████▀░░░░░░░░░░░▀▄▄▄░░░░░░░░░     [13 или q]- Выход из скрипта                       | \n` +
    ` |               ███████▀█░░░░░░░░░░░░▄▄░▀██▄▄░░░░░                                                        | \n` +
    ` |               ▀██████▄▄▄▄░░░░░░██▄██████████▄▄░░                                                        | \n` +
    ` |               ░█▀████████▄▄▄▄▄███████▀▀▀▀█████▄░                                                        | \n` +
    ` |               ░░░███▀███████████████░░░░░░░▀████                                                        | \n` +
    " |               ░░░██▀░░▀▀▀▀▀███▄░▀▀███▄▄░░░░░░▀██                                                        | \n" +
    " |               ░░░█▀░░░░░░░░░░▀▀█▄░░░░░░░░░░░░░██                                                        | \n" +
    " |               ░░░░░░░░░░░░░░░░░░▀█░░░░░░░░░░░░█░                                                        | \n" +
    " |                                                                                                         | \n" +
    " |                                                                                                         | \n" +
    " ----------------------------------------------------------------------------------------------------------- \n"
);
};
