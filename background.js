var wiki_base = "https://wiki.sch.bme.hu/bin/view/Infoalap/";
var db = {

  "anal2" : {
    "nickname" : "anal2",
    "wiki_url" : wiki_base + "Anal2",
  },
  
  "fizika2" : {
    "nickname" : "fizika2",
    "wiki_url" : wiki_base + "Fizika2",
  },
  
  "algel" : {
    "nickname" : "algel",
    "wiki_url" : wiki_base + "AlgEl",
  },
  
  "opre" : {
    "nickname" : "opre",
    "wiki_url" : wiki_base + "OpRe",
  },
  
  "halok" : {
    "nickname" : "halok",
    "wiki_url" : wiki_base + "SzgHalok",
  },

  "bsz2" : {
    "nickname" : "bsz2",
    "wiki_url" : wiki_base + "BsZ2",
  },

  "sznikak" : {
    "nickname" : "sznikak",
    "wiki_url" : wiki_base + "SzoftverTechnikak",
  },
  
}

function beginsWith(needle, haystack){
  return haystack.substr(0, needle.length) == needle;
}

function findMatches(text){
  var results = [];
  for(var course_name in db){
    var course = db[course_name];
    if(beginsWith(text, course.nickname))      
      results.push(course);
  }
  return results;
}

function navigate(url) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, {url: url});
  });
}

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    chrome.omnibox.setDefaultSuggestion({description: "-"});
    var suggestions = [];
    var matches = findMatches(text)
    if(matches.length>0){
      var course = matches[0];
      chrome.omnibox.setDefaultSuggestion({description: course.nickname});
    }
    for(var i in matches){
      var course = matches[i];
      suggestions.push({content: course.nickname, description: course.nickname});
    }
    suggest(suggestions);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    
    navigate(findMatches(text)[0].wiki_url);
  });
