google.charts.load('current', {packages: ['corechart', 'controls']});
google.charts.setOnLoadCallback(getData);

function getData() {
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "./js/classData.json",
        success: function(dataFromJSON) {
            console.log(dataFromJSON);
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Age');
            data.addColumn('string', 'Gender');
            data.addColumn('string','Eye Colour');
            data.addColumn('number', 'Height');
            data.addColumn('boolean', 'Car Ownership');
            data.addColumn('number', 'Hours Of Work');
            data.addColumn('string', 'Social Media');

            for (var i = 0; i < dataFromJSON.length; i++) {
                data.addRow([
                    dataFromJSON[i].age,
                    dataFromJSON[i].gender,
                    dataFromJSON[i].eyeColor,
                    dataFromJSON[i].height,
                    dataFromJSON[i].ownsCar,
                    dataFromJSON[i].workingHoursPerWeek,
                    dataFromJSON[i].preferredSocialMedia
                    ]);
            };

        var dashboard = new google.visualization.Dashboard(
            document.getElementById('dashboard'));

        var scatterChart = new google.visualization.ChartWrapper({
            chartType: 'ScatterChart',
            containerId: 'scatterChart',
            options:{
                title: 'Age Vs. Height',
                legend: 'none',
                width: '100%',
                height: '100%'
            },
            view:{
                columns: [0, 3]
            }
        });

      var genderPicker = new google.visualization.ControlWrapper({

                controlType: 'CategoryFilter',
                containerId: 'genderSelect',
                options:{
                        filterColumnLabel: 'Gender',
                        ui:{
                            allowMultiple: false,
                            allowTyping: false,
                            labelStacking:'vertical'
                        }
                
                }
            });
        dashboard.bind([genderPicker], [scatterChart]);
        dashboard.draw(data);

        },
        error: function(response) {
            console.log("Error Code: " + response.status + "\n" + response.statusText);
        }
    });
}

