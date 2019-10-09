(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    const opts = { crossDomain: true};
    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var dateObj = JSON.parse(tableau.connectionData)
        slug = dateObj.slug;
        var cols= []
        switch (slug) {
            case 'marker_qualification':
                cols = [{
                        id: "periodo",
                        alias: "periodo",
                        dataType: tableau.dataTypeEnum.date
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
                        id: "calificacion_geomarcador",
                        alias: "calificacion_geomarcador",
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
                break;
            
            case 'city_qualification':
                cols = [
                        {
                            id: "periodo",
                            alias: "periodo",
                            dataType: tableau.dataTypeEnum.date
                        },{
                            id: "municipio",
                            alias: "municipio",
                            dataType: tableau.dataTypeEnum.string
                        },
                        {
                            id: "calificacion_municipio",
                            alias: "calificacion_municipio",
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
                break;
            

            case 'subscription':
                cols = [
                    {
                        id: "departamento",
                        alias: "departamento",
                        dataType: tableau.dataTypeEnum.string
                    },
                    {
                        id: "municipio",
                        alias: "municipio",
                        dataType: tableau.dataTypeEnum.string
                    },
                    {
                        id: "categoria",
                        alias: "categoria",
                        dataType: tableau.dataTypeEnum.string
                    },
                    {
                        id: "usuarios",
                        alias: "usuarios",
                        dataType: tableau.dataTypeEnum.int
                    }
                ];    
                break;

            case 'subscription_country':
                cols = [
                    {
                        id: "pais",
                        alias: "pais",
                        dataType: tableau.dataTypeEnum.string
                    },
                    {
                        id: "categoria",
                        alias: "categoria",
                        dataType: tableau.dataTypeEnum.string
                    },
                    {
                        id: "usuarios",
                        alias: "usuarios",
                        dataType: tableau.dataTypeEnum.int
                    }
                ];    
                break;    
            
            case 'download':
                cols= [
                    {
                        id: "municipio",
                        alias: "municipio",
                        dataType: tableau.dataTypeEnum.string  
                    },
                    {
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
                        id: "contenido",
                        alias: "contenido",
                        dataType: tableau.dataTypeEnum.string
                    },
                    {
                        id: "descargas",
                        alias: "descargas",
                        dataType: tableau.dataTypeEnum.int
                    },
                    {
                        id: "periodo",
                        alias: "periodo",
                        dataType: tableau.dataTypeEnum.date 
                    }
                ];
                break;    
        }
        
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
            alert(feat.length)
            switch (slug){
                case 'marker_qualification':
                    len = feat.length
                    for (var i = 0; i < len; i++) {
                        tableData.push({
                            "municipio": feat[i].municipio,
                            "categoria": feat[i].categoria,
                            "subcategoria": feat[i].subcategoria,
                            "geomarcador": feat[i].geomarcador,
                            "calificacion_geomarcador": parseFloat((feat[i].calificacion_geomarcador)),
                            "CantPersoCalif": feat[i].CantPersoCalif,
                            "CantPersoValora": feat[i].CantPersoValora,
                            "periodo": feat[i].periodo
                        });
                    }
                    break;
                
                case 'city_qualification':
                    for (var i = 0, len = feat.length; i < len; i++) {
                        tableData.push({
                            "municipio": feat[i].municipio,
                            "calificacion_municipio": feat[i].calificacion_municipio,
                            "CantPersoCalif": feat[i].CantPersoCalif,
                            "CantPersoValora": feat[i].CantPersoValora,
                            "periodo": feat[i].periodo
                        });
                    }
                    break;
                
                case 'subscription':
                    for (var i = 0, len = feat.length; i < len; i++) {
                        tableData.push({
                            "departamento": feat[i].Departamento,
                            "municipio": feat[i].ciudad,
                            "categoria": feat[i].categoria,
                            "usuarios": feat[i].usuarios,
                        });
                    }
                    break;
                    
                case 'subscription_country':
                    for (var i = 0, len = feat.length; i < len; i++) {
                        tableData.push({
                            "pais": feat[i].pais,
                            "categoria": feat[i].categoria,
                            "usuarios": feat[i].usuarios,
                        });
                    }
                    break;
                    
                case 'download':
                    for (var i = 0, len = feat.length; i < len; i++) {
                        tableData.push({
                            "municipio": feat[i].municipio,
                            "categoria": feat[i].categoria,
                            "subcategoria": feat[i].subcategoria,
                            "geomarcador": feat[i].geomarcador,
                            "contenido": feat[i].contenido,
                            "descargas": feat[i].descargas,
                            "periodo": feat[i].periodo
                        });
                    }
                    break;   

            }

            return tableData;
    }


    // Download the data
    myConnector.getData = function(table, doneCallback) {
        /**
         * el metodo get recibe la url de los datos y un callback que va a tratarlos
         */
        $.get("http://nube.realityapp.co:1248/api/v1/page/tableau/?slug=" + slug, function (resp) {
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
            slug: 'marker_qualification'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#city").click(function() {
        var dateObj = {
            slug: 'city_qualification'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#USC").click(function() {
        var dateObj = {
            slug: 'subscription'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#usp").click(function() {
        var dateObj = {
            slug: 'subscription_country'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});

$(document).ready(function() {
    $("#rd").click(function() {
        var dateObj = {
            slug: 'download'
        };
        tableau.connectionData = JSON.stringify(dateObj);
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    });
});