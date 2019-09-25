class Templating{
    arrayToTable(array, headers){
        let tableElement = '';
        
        if(headers){
            tableElement += '<tr>';
            headers.forEach(element => {
                tableElement += '<th>';
                tableElement += element;
                tableElement += '</th>';
            });
            tableElement += '</tr>';
        }
        
        array.forEach(element => {
            tableElement += '<tr>';
            for(let key in element){
                tableElement += `<td>${element[key]}</td>`;
            }
            tableElement += '</tr>';
        });

        return tableElement;
    }
}

module.exports = Templating;