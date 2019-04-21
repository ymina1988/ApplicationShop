function CrunchifyTableView(objArray, theme) {

    needHeader = true;
        
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    
    var str = '<table class="' + theme + '">';

    // Only create table head if needHeader is set to True..
    if (needHeader) {
        str += '<thead><tr>';
        for (var index in array[0]) {
            str += '<th scope="col">' + index + '</th>';
        }
        str += '</tr></thead>';
    }

    // table body
    str += '<tbody>';
    for (var i = 0; i < array.length; i++) {
        str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
        for (var index in array[i]) {
            str += '<td>' + array[i][index] + '</td>';
        }
        str += '</tr>';
    }
    str += '</tbody>'
    str += '</table>';
    return str;
}