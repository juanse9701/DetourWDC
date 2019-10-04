(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    const opts = { crossDomain: true};
    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "periodo",
            alias: "periodo",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "departamento",
            alias: "departamento",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "municipio",
            alias: "municipio",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "categoria",
            alias: "categoria",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "subcategoria",
            alias: "subcategoria",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "geomarcador",
            alias: "geomarcador",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "valorcalificacion_geomarcador",
            alias: "valorcalificacion_geomarcador",
            dataType: tableau.dataTypeEnum.float
        },
        {
            id: " calificacion_municipio",
            alias: " calificacion_municipio",
            dataType: tableau.dataTypeEnum.float
        },
        {
            id: "CantPersoCalif",
            alias: "CantPersoCalif",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "CantPersoValora",
            alias: "CantPersoValora",
            dataType: tableau.dataTypeEnum.int
        }
    ];

        var tableInfo = {
            id: "SDXM",
            alias: "Tableau v1.1",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };


    const createTable = function (feat, slug) {
        tableData = [];
            // Iterate over the JSON object
            alert(feat[0])
            switch (slug){
                case 'marker':
                    for (var i = 0, len = feat.length; i < len; i++) {
                        tableData.push({
                            "municipio": feat[i].municipio,
                            "categoria": feat[i].categoria,
                            "subcategoria": feat[i].subcategoria,
                            "geomarcador": feat[i].geomarcador,
                            "valorcalificacion_geomarcador": parseFloat((feat[i].valorcalificacion_geomarcador)),
                            "CantPersoCalif": feat[i].CantPersoCalif,
                            "CantPersoValora": feat[i].CantPersoValora,
                            "periodo": feat[i].periodo
                        });
                    }
                
                case 'city':
                    for (var i = 0, len = feat.length; i < len; i++) {
                        tableData.push({
                            "municipio": feat[i].municipio,
                            "calificacion_municipio": feat[i].calificacion_municipio,
                            "CantPersoCalif": feat[i].CantPersoCalif,
                            "CantPersoValora": feat[i].CantPersoValora,
                            "periodo": feat[i].periodo
                        });
                    }

            }

            return tableData;
    }


    // Download the data
    myConnector.getData = function(table, doneCallback) {
        /**
         * el metodo get recibe la url de los datos y un callback que va a tratarlos
         */
        var dateObj = JSON.parse(tableau.connectionData)
        slug = dateObj.slug;
        $.get("http://nube.realityapp.co:1248/api/v1/page/tableau/qualification/?slug=" + slug, function (resp) {
            // var feat = resp.features,
            var feat = resp // dependiendo del api el ().results puede cambiar, inclusive puede no ir, depende que devuelva el API.
            console.log(feat);
            table.appendRows(createTable(feat, slug));
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    // Create event listeners for when the user submits the form
})();


$(document).ready(function() {
    $("#submitButton").click(function() {
        var dateObj = {
            slug: 'marker'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#city").click(function() {
        var dateObj = {
            slug: 'city'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#empleo").click(function() {
        var dateObj = {
            slug: 'empleo'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#ie").click(function() {
        var dateObj = {
            slug: 'interno_emisor'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});