google.charts.load('current', {packages: ['corechart', 'controls']});
google.charts.setOnLoadCallback(getData);

function getData() {
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "./js/classData.json",
        success: function(data) {
            console.log(data);
            var tableData = new google.visualization.DataTable();
            tableData.addColumn('number', 'Age');
            tableData.addColumn('string', 'Gender');
            tableData.addColumn('string','Eye Colour');
            tableData.addColumn('number', 'Height');
            tableData.addColumn('boolean', 'Car Ownership');
            tableData.addColumn('number', 'Hours Of Work');
            tableData.addColumn('string', 'Socail Media');

            for (var i = 0; i < data.length; i++) {
                tableData.addRow([
                    data[i].age,
                    data[i].gender,
                    data[i].eyeColor,
                    data[i].height,
                    data[i].ownsCar,
                    data[i].workingHoursPerWeek,
                    data[i].preferredSocialMedia
                    ]);
            };

        var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));

        var scatterChart = new google.visualization.ChartWrapper({
            chartType: 'ScatterChart',
            containerId: 'scatterChart',
            options:{
                title: 'Age Vs. Height',
                legend: 'none'
            },
            view:{
                columns: [0, 3]
            }
        })
        },
        error: function(response) {
            console.log("Error Code: " + response.status + "\n" + response.statusText);
        }
    });
}

