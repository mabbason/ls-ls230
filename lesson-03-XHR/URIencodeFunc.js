"use strict";

let jsonText = `{"title": "Do Androids Dream of Electric Sheep?","year": 1968}`;

let jsObj = {"title": "Do Androids Dream of Electric Sheep?","year": 1968};

function isJSONStr(val) {
  try {
    JSON.parse(val);
  } catch {
    return false;
  }
  return true;
};

function convertJSONtoURLQuery(path, json) {
  let jsObj = isJSONStr(json) ? JSON.parse(json): json;
  let query = '';
  
  for (let prop in jsObj) {
    query += `${prop}=${jsObj[prop]}`; 
  }
  
  console.log(query);
  
};



console.log(convertJSONtoURLQuery('test', jsonText));
