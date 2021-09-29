const express = require("express");
const multer  = require("multer");
const fs = require('fs');
const path = require('path');  
const csv = require('csv-parser');
const json2csv = require("json2csv");
const urlencodedParser = express.urlencoded({extended: false});
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');
const rimraf = require('rimraf');

let ind = 0
const app = express();
// let resfound = [];
// const resname = [];
// const resgroup = [];
app.use(express.static(__dirname));
app.use(multer({dest:"uploads"}).single("filedata"));

app.set("view engine", "hbs");

app.post("/", function (req, res, next) {
    let results = [];
    let resfound = [];
    let resname = [];
    let resgroup = [];
    const csvpath = './pubmaticData.csv';
    //==========
    
try {
    if (fs.existsSync(csvpath)) {
    fs.unlinkSync(csvpath);
    //file removed
    console.log('csv was delete!');
    }
  } catch(err) {
    console.error(err)
  }
    // console.log(__dirname);
    let filedata = req.file;
//     console.log(filedata);
    if(!filedata) res.send("Ошибка при загрузке файла");
    else {
        
        let filepath = `${__dirname}${"1\\2".match(/\\/)}${filedata.path}`;
        // res.send("Файл загружен");
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data);
                // console.log(results[ind]);
            })
            .on('end', () => {
                
                for (let i = 0; i < results.length; i++) {
                    let data_f = results[i]['Поисковые_запросы'];
                    let data_n = results[i]['Название_позиции'];
                    let data_g = results[i]['Название_группы'];

                    resfound.push(data_f);
                    resname.push(data_n);
                    resgroup.push(data_g);
                }
                // let item_name = results[ind]['Название_позиции'];
                // console.log(`item_name: ${item_name}`);
                let req_name = resname;
                // console.log(`item_name: ${item_name}`);

                // let req_group = results[ind]['Название_группы'];
                let req_group = resgroup;

                // let req_found = results[ind]['Поисковые_запросы'];
                let req_found = resfound;
                res.render("upload1.hbs", {
                    req_name: req_name,
                    req_group: req_group,
                    req_found: req_found,
                    resfound: resfound,
                    resname: resname,
                    resgroup: resgroup
                    
                });
                // fs.readFile("/views/upload.hbs", "utf8", function(error, data){
                //     let item_name = results[ind]['Название_позиции'];
                //     let req_found = results[ind]['Поисковые_запросы']; 
                //     let req_group = results[ind]['Название_группы'];
                //     data = data.replace("{item_name}", item_name).replace("{item_name}", item_name).replace("{item_name}", item_name);
                //     res.end(data);
                // });
                // 
                // app.post("/upload1.hbs", urlencodedParser, function (request, response) {
                //     if(!request.body) return response.sendStatus(400);
                //     // console.log('request.body==========');
                //     // console.log(request.body);
                //     // console.log(request);
                //     // console.log('request.body==========');
                //     // console.log(`Поисковые_запросы: ${results[ind]['Поисковые_запросы']}`);
                //     results[ind]['Поисковые_запросы'] = request.body.req_found;
                //     console.log('request.bjdy.req_found');
                //     console.log(request.body.req_found);
                //     // console.log(`Поисковые_запросы: ${results[ind]['Поисковые_запросы']}`);
                //     for (let i = 0; i < resfound.length; i++) {
                //         results[i]['Поисковые_запросы'] = request.body.req_found[i];
                //         results[i]['Название_позиции'] = request.body.req_name[i];
                //         results[i]['Название_группы'] = request.body.req_group[i];
                //     }
                //     // response.send(`${request.body.req_found} - ${request.body.req_group}`);
                //     let apiDataPull = Promise.resolve(results).then(data => {
                //         return json2csv.parseAsync(data, {fields: Object.keys(results[0])})
                //     }).then(csv => {
                //         fs.writeFile('pubmaticData.csv', csv, function (err) {
                //             if (err) throw err;
                //             console.log('File Saved!');
                //             ind++;
                //             // if (ind>2) res.end("hello");
                //             console.log(ind);
                //         });
                //     });
                // });
                // app.get('/upload1.hbs', function (req, res) {
                //     const file = './pubmaticData.csv';
                //     res.download(file); // Устанавливаем диспозицию и отправляем ее.
                // });
            });
        }
        app.post("/upload1.hbs", urlencodedParser, function (request, response) {
            if(!request.body) return response.sendStatus(400);
            // console.log('request.body==========');
            // console.log(request.body);
            // console.log(request);
            // console.log('request.body==========');
            // console.log(`Поисковые_запросы: ${results[ind]['Поисковые_запросы']}`);
            // results[ind]['Поисковые_запросы'] = request.body.req_found;/////////
            /////////////////////
            // console.log('request.bjdy.req_found');
            console.log(request.body.req_found);
            // console.log(`Поисковые_запросы: ${results[ind]['Поисковые_запросы']}`);
            for (let i = 0; i < results.length; i++) {
                console.log("request.body.req_found");
                console.log(request.body.req_found[i]);
                results[i]['Поисковые_запросы'] = request.body.req_found[i];
                results[i]['Название_позиции'] = request.body.req_name[i];
                results[i]['Название_группы'] = request.body.req_group[i];
            }
            // response.send(`${request.body.req_found} - ${request.body.req_group}`);
            let apiDataPull = Promise.resolve(results).then(data => {
                return json2csv.parseAsync(data, {fields: Object.keys(results[0])})
            }).then(csv => {
                fs.writeFile('pubmaticData.csv', csv, function (err) {
                    if (err) throw err;
                    console.log('File Saved!');
                    ind++;
                    // if (ind>2) res.end("hello");
                    console.log(ind);
                });

            });
            // app.get('/upload1.hbs', function (req, res) {
            //     const file = './pubmaticData.csv';
            //     res.download(file); // Устанавливаем диспозицию и отправляем ее.
            // });
        });
});
app.get('/upload1.hbs', function (req, res) {
    const file = './pubmaticData.csv';
    res.download(file); // Устанавливаем диспозицию и отправляем ее.
});

app.listen(3000, function(){
    console.log("Server started at 3000");
});
