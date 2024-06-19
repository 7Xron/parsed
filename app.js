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

var file = "./access.log",
    blacklist = [''],
    white = ['']

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

let main = async () => {
    let amt = await input("Enter the amount to check: ");
    console.log(amt);
    let uname = await input("Enter your name: ");
    console.log(uname);
    rl.close();
};

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
            console.log('Введена команда [ Просмотр log ошибок ]\n');
            logparseerror()
            break;
        case 'moniterr':
        case '2':
            console.log('Введена команда [ Мониторинг ошибок из log ]');
            moniterr()
            break;
        case 'parseget':
        case '3':
            console.log('Введена команда [ Вывести запросы GET ]');
            parseget()
            break;
        case 'parsepost':
        case '4':
            console.log('Введена команда [ Вывести запросы POST ]');
            parsepost()
            break;
        case 'parsepropfind':
        case '5':
            console.log('Введена команда [ Вывести запросы PROPFIND ]');
            parsepropfind()
            break;
        case 'monitip':
        case '6':
            console.log('Введена команда [ Мониторинг по IP ]');
            let main2 = async () => {
                let amt = await input("Введите IP Адрес: ");
                console.log(amt);
                monitip(amt)
            };
            main2()
            break;
        case 'parseval':
        case '7':
            console.log('Введена команда [ Вывести лог с определенными значениями ]');
            let main3 = async () => {
                let val1 = await input("Введите значение без пробелов: ");
                parseval(val1)
            };
            main3()
            break;
        case 'monitval':
        case '8':
            console.log('Введена команда [ Мониторинг с определенными значениями ]');
            let main4 = async () => {
                let val2 = await input("Введите определенное значение без пробелов и знаков препинания: ");
                monitval(val2)
            };
            main4()
            break;
        case 'top':
        case '9':
            console.log('Введена команда [ top ]');
            let main1 = async () => {
                let amt = await input("Введите значения топ: ");
                console.log(amt);
                let parval = await input("Что будем выводить? : ");
                console.log(parval);
                top(amt, parval)
                //rl.close();
            };
            main1()
            break;
        case 'cls':
        case '12':
            clearconsole();
            break;
        case '13':
        case 'q':
            console.log('Выход выполнен');
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

function logparseerror() { }
function moniterr() { }
function parseget() { }
function parsepost() { }
function parsepropfind() { }
function monitip() { }
function parseval() { }
function monitval() { }
function top() { }

function clearconsole() {
    process.stdout.write('\x1Bc');
    console.log(
        "\n\n --------------------------------------------------------------------------------------------------------\n" +
        " |                                                                                                         | \n" +
        " |               ░░░░░░░░░░░░░░░░░░░░▄░░░░░░░░░░░░░                                                        | \n" +
        " |               ░░░░░░░░░░░░░░░░░▄█▀░░░░░░░░░░░░░░                                                        | \n" +
        " |               ░░░░░░░░░░▄▄▄▄▄████▄▄▄▄▄▄▄▄▄▄▄▄░░░                                                        | \n" +
        " |               ░░░░░░░░░░░████████████████▄▄▄▄░░░                                                        | \n" +
        " |               ░░░░░░░░░▄█▀████████████████▄░░░░░                                                        | \n" +
        ` |               ░░░░░▄▄██████████▀░▀███████▀██▄░░░                                                        | \n` +
        ` |               ░░░░███▀▀▀▀▀▀▀▀░░░░█████████░░▀▄░░     [1]-Просмотр log ошибок                            | \n` +
        ` |               ░░░░▀▀░░▄▄▄▄▄▄▄▄▄▄███████████░░░░░     [2]-Мониторинг ошибок в log                        | \n` +
        ` |               ░░░░░░▄▄▄███████████████▀▀███░░░░░     [3]-Вывести запросы GET                            | \n` +
        ` |               ░░░▄██████████████████▀░░░░██░░░░░     [4]-Вывести запросы POST                           | \n` +
        ` |               ░▄█████████▀▀▀█▀▀▀▀▀░░░░░░░█░░░░░░     [5]-Вывести запросы PROPFIND                       | \n` +
        ` |               ░████████▀░░░░░░░░░░░▀▄▄▄░░░░░░░░░     [6]-Мониторинг по IP                               | \n` +
        ` |               ███████▀█░░░░░░░░░░░░▄▄░▀██▄▄░░░░░     [7]-Вывести лог с отпределенными значениями        | \n` +
        ` |               ▀██████▄▄▄▄░░░░░░██▄██████████▄▄░░     [8]-Мониторинг с отпределенными значениями         | \n` +
        ` |               ░█▀████████▄▄▄▄▄███████▀▀▀▀█████▄░     [9]-Очистить терминал                              | \n` +
        ` |               ░░░███▀███████████████░░░░░░░▀████     [10 или q]- Выход из скрипта                       | \n` +
        " |               ░░░██▀░░▀▀▀▀▀███▄░▀▀███▄▄░░░░░░▀██                                                        | \n" +
        " |               ░░░█▀░░░░░░░░░░▀▀█▄░░░░░░░░░░░░░██                                                        | \n" +
        " |               ░░░░░░░░░░░░░░░░░░▀█░░░░░░░░░░░░█░                                                        | \n" +
        " |                                                                                                         | \n" +
        " |                                                                                                         | \n" +
        " ------------------------------------------------------------------------------------------------------------ \n"
    );
};