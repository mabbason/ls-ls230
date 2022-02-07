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

function isValidObject(val) {
  if (val === null || typeof val !== 'object') return false;  
  if (val.constructor.name !== 'Object') return false;  
  if (Object.keys(val).length === 0) return false;
  return true;
};

function convertJSONtoURLQuery(json) {
  let jsObj = isJSONStr(json) ? JSON.parse(json): json;
  if (!isValidObject(jsObj)) return null;
  let query = '';
  
  for (let prop in jsObj) {
    let value = encodeURIComponent(jsObj[prop]);
    query += `${prop}=${value}&`; 
  }
  
  return query.slice(0, query.length - 1);  
};

console.log(convertJSONtoURLQuery(jsonText));
// returns --> 'title=Do%20Androids%20Dream%20of%20Electric%20Sheep%3F&year=1968'

console.log(convertJSONtoURLQuery('string: "test"'));  // null
console.log(convertJSONtoURLQuery({}));                // null
console.log(convertJSONtoURLQuery(`{}`));              // null
console.log(convertJSONtoURLQuery(`{"test":"should work"}`));  // test=should%20work
console.log(convertJSONtoURLQuery(['string', 'test'])); // null