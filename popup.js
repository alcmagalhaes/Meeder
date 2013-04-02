var xmlhttp;
var list_ul;

function init()
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = state_changed;
	list_ul = document.getElementById("title_list");
}	

//"http://rss.it.sohu.com/rss/ityaowen.xml"
function fetch_from(url)
{
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function state_changed()
{
	if(xmlhttp.readyState==4&&xmlhttp.status==200)
		pares_xml(xmlhttp.responseXML);
}

function pares_xml(doc)
{
	var items = doc.getElementsByTagName("item");
	for (var i = items.length - 1; i >= 0; i--) {
		var newli = doc.createElement("li");
		newli.appendChild(doc.createTextNode(
			items[i].getElementsByTagName("title")[0].textContent));
		newli.setAttribute("url",
			items[i].getElementsByTagName("link")[0].textContent);
		newli.onclick = on_title_click;
		list_ul.appendChild(newli);
	}

}

function on_title_click(e)
{
	var cli = e.target;
	var item_url = cli.getAttribute("url");
	chrome.tabs.create({url: item_url});
}

function fetch_all()
{
	init();
	fetch_from("http://coolshell.cn/feed");
}

document.addEventListener("DOMContentLoaded",fetch_all);
