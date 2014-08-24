// See http://www.cookiecentral.com/faq/#3.5
chrome.tabs.getSelected(null, function(tab) {
  domain = getDomain(tab.url)  
  //console.log("domain=["+domain+"]")
  chrome.cookies.getAll({}, function(cookies) {
    document.write("<pre>\n");    
    document.write("# HTTP Cookie File for domains related to <b>" + escapeForPre(domain) + "</b>.\n");
    document.write("# This content may be pasted into a cookies.txt file and used by wget\n");
    document.write("# Example:  wget -x <b>--load-cookies cookies.txt</b> " + escapeForPre(tab.url) + "\n"); 
    document.write("#\n");
    document.write("# domain \t hostOnly \t path \t secure \t expirationDate \t name \t value\n");
    document.write("#\n");
    for (var i in cookies) {
      cookie = cookies[i]; 
      if (cookie.domain.indexOf(domain) != -1) {     
      document.write(escapeForPre(cookie.domain));
      document.write("\t");
      document.write(escapeForPre((!cookie.hostOnly).toString().toUpperCase()));
      document.write("\t");     
      document.write(escapeForPre(cookie.path)); 
      document.write("\t");     
      document.write(escapeForPre(cookie.secure.toString().toUpperCase()));
      document.write("\t");     
      document.write(escapeForPre(cookie.expirationDate ? cookie.expirationDate : "0"));
      document.write("\t");     
      document.write(escapeForPre(cookie.name));
      document.write("\t");     
      document.write(escapeForPre(cookie.value));
      document.write("\n");                      
      }
    }
    document.write("</pre>");
  });      
})

function escapeForPre(text)
{
  return String(text).replace(/&/g, "&amp;")
                     .replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
                     .replace(/'/g, "&#039;");
}

function getDomain(url)
{
  //console.log("url=["+url+"]")
  server = url.match(/:\/\/(.[^/:#?]+)/)[1];
  //console.log("server=["+server+"]")
  parts = server.split(".");
  //console.log("parts=["+parts+"]")

  isip = !isNaN(parseInt(server.replace(".",""),10));
  //console.log("parts=["+isip+"]")

  if (parts.length <= 1 || isip)
  {
    domain = server;
  }
  else
  {
    //search second level domain suffixes
    var domains = new Array();
    domains[0] = parts[parts.length-1];
    //assert(parts.length > 1)
    for(i=1;i<parts.length;i++)
    {
      domains[i] = parts[parts.length-i-1] + "." + domains[i-1];
      //console.log("domains=["+domains[i]+"]");
      //domainlist defines in domain_list.js 
      if (!domainlist.hasOwnProperty(domains[i]))
      {
        domain = domains[i];
        //console.log("found "+domain);
        break;
      }
    }

    if (typeof(domain) == "undefined") 
    { 
      domain = server;
    }
  }
  
  return domain;
}