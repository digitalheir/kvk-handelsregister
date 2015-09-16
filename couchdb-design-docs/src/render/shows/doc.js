function (doc, req) {
    if (doc) {
        if (doc['dossiernummer']) {
            var html = "<html>" +
                "<head>" +
                "<title>" + doc.handelsnaam + "</title>" +
                "</head>" +
                "<body>" +
                "<table>" +
                "<thead>" +
                "<tr>" +
                "<th>Field</th>" +
                "<th>Value</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>";
            var url = "http://www.kvk.nl" + doc.href;
            html += "<tr><td>URL</td><td><a href=\"" + url + "\">" + url + "</a></td></tr>";
            for (var field in doc) {
                if (field == "meerinfo") {
                    for (var infoN = 0; infoN < doc['meerinfo'].length; infoN++) {
                        var info = doc['meerinfo'][infoN];
                        html += "<tr><td>" + info['titel'] + "</td><td>" + JSON.stringify(info['tekst']) + "</td></tr>";
                    }
                } else {//if (doc[field].constructor === String) { 
                    html += "<tr><td>" + field + "</td><td>" + JSON.stringify(doc[field]) + "</td></tr>";
                }
            }
            html += "</tbody></table></body></html>";
            return html;
        } else {
            return "lol";
        }
    }else{
        return "Doc not found...";
    }
}