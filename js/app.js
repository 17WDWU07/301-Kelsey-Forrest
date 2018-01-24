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
            data.addColumn('string', 'ID');


            for (var i = 0; i < dataFromJSON.length; i++) {
                data.addRow([
                    dataFromJSON[i].age,
                    dataFromJSON[i].gender,
                    dataFromJSON[i].eyeColor,
                    dataFromJSON[i].height,
                    dataFromJSON[i].ownsCar,
                    dataFromJSON[i].workingHoursPerWeek,
                    dataFromJSON[i].preferredSocialMedia,
                    dataFromJSON[i].id
                    ]);
            };

        var dashboard = new google.visualization.Dashboard(
            document.getElementById('dashboard'));

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
        });

        // var pieChart = new google.visualization.ChartWrapper({
        //     chartType: 'PieChart',
        //     containerId: 'donutChart',
        //     options:{
        //         title: 'Age',
        //         pieHole: 0.4,
        //         width: '100%',
        //         height: '100%'
                
        //     },
        //     view:{
        //         columns: [1,5]
        //     }
        // });
        
        var bubbleChart = new google.visualization.ChartWrapper({
            chartType: 'BubbleChart',
            containerId: 'bubbleChart',
            options:{
                title:'Title',
                hAxis: {
                    title: 'Age'
                },
                vAxis:{
                    title: 'Height(m)'
                }
            },
            view:{
                columns: [7, 0, 3, 6 ,5]
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
        dashboard.bind([genderPicker], [scatterChart, bubbleChart]);
        dashboard.draw(data);
        countSocialMedia(dataFromJSON);

        },
        error: function(response) {
            console.log("Error Code: " + response.status + "\n" + response.statusText);
        }
    });
}


function countSocialMedia(data){

    var dataSocialMedia = new google.visualization.DataTable();
    dataSocialMedia.addColumn('string', 'Social Media');
    dataSocialMedia.addColumn('number', 'Amount');
    var instagram = 0;
    var facebook = 0;
    var twitter = 0;
    var line = 0;

    for (var i = 0; i < data.length; i++) {
        switch (data[i].preferredSocialMedia){
            case ("Facebook"):
            facebook++;
            break;
            case ("Instagram"):
            instagram++;
            break;
            case ("Twitter"):
            twitter++;
            break;
            case("Line"):
            line++;
            break;
            default: console.log('No such social media');
            break;
        }
    }

    dataSocialMedia.addRow(["Facebook", facebook]);
    dataSocialMedia.addRow(["Instagram", instagram]);
    dataSocialMedia.addRow(["Twitter", twitter]);
    dataSocialMedia.addRow(["Line", line]);

    var options = {
        title: "Preferred Social Media",
        pieHole: 0.4
    }
    var donut = new google.visualization.PieChart(document.getElementById('donutChart'));
    donut.draw(dataSocialMedia, options);
}
