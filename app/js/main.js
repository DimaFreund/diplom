// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1, label: '1', x: -350, y: -540, shape:'database'},
    {id: 2, label: '2', x: -250, y: -540, shape:'database'},
    {id: 3, label: '3', x: -150, y: -540, shape:'database'},
    {id: 4, label: '4', x: 0, y: -540, shape:'database'},
    {id: 5, label: '5', x: 100, y: -540, shape:'database'},
    {id: 6, label: '6', x: 200, y: -540, shape:'database'},
    {id: 1001, label: '1', x: -300, y: -450},
    {id: 1002, label: '2', x: -150, y: -450},
    {id: 1003, label: '3', x: 0, y: -450},
    {id: 1004, label: '4', x: 150, y: -450},
    {id: 1005, label: '5', x: -375, y: -300},
    {id: 1006, label: '6', x: -225, y: -300},
    {id: 1007, label: '7', x: -75, y: -300},
    {id: 1008, label: '8', x: 75, y: -300},
    {id: 1009, label: '9', x: 225, y: -300},
    {id: 1010, label: '10', x: -300, y: -150},
    {id: 1011, label: '11', x: -150, y: -150},
    {id: 1012, label: '12', x: -0, y: -150},
    {id: 1013, label: '13', x: 150, y: -150},
    {id: 1014, label: '14', x: -150, y: 0},
    {id: 1015, label: '15', x: 0, y: 0},
    {id: 1016, label: '16', x: -225, y: 150},
    {id: 1017, label: '17', x: -75, y: 150},
    {id: 1018, label: '18', x: 75, y: 150},
    {id: 1019, label: '19', x: -150, y: 300},
    {id: 1020, label: '20', x: 0, y: 300},
    {id: 1021, label: '21', x: -75, y: 450},
    {id: 1022, label: '22', x: -75, y: 600},
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1001, to: 1005},
    {from: 1001, to: 1006},
    {from: 1002, to: 1006},
    {from: 1003, to: 1006},
    {from: 1003, to: 1007},
    {from: 1003, to: 1008},
    {from: 1004, to: 1007},
    {from: 1004, to: 1008},
    {from: 1004, to: 1009},
    {from: 1005, to: 1010},
    {from: 1006, to: 1010},
    {from: 1006, to: 1011},
    {from: 1007, to: 1010},
    {from: 1007, to: 1011},
    {from: 1007, to: 1012},
    {from: 1008, to: 1012},
    {from: 1008, to: 1013},
    {from: 1009, to: 1013},
    {from: 1010, to: 1014},
    {from: 1010, to: 1016},
    {from: 1011, to: 1014},
    {from: 1011, to: 1015},
    {from: 1012, to: 1014},
    {from: 1012, to: 1015},
    {from: 1013, to: 1015},
    {from: 1013, to: 1018},
    {from: 1014, to: 1016},
    {from: 1014, to: 1017},
    {from: 1014, to: 1019},
    {from: 1015, to: 1017},
    {from: 1015, to: 1018},
    {from: 1015, to: 1020},
    {from: 1016, to: 1019},
    {from: 1017, to: 1019},
    {from: 1017, to: 1020},
    {from: 1017, to: 1021},
    {from: 1018, to: 1020},
    {from: 1019, to: 1021},
    {from: 1020, to: 1021},
    {from: 1021, to: 1022},
    {from: 1, to: 1001},
    {from: 2, to: 1001},
    {from: 3, to: 1002},
    {from: 4, to: 1003},
    {from: 5, to: 1003},
    {from: 5, to: 1004},
    {from: 6, to: 1004},
]);

// create a network
var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    "nodes": {
        "borderWidthSelected": 3,
        "color": {
            "highlight": {},
            "hover": {}
        },
        "font": {
            "size": 22,
            "strokeWidth": null
        },
        "scaling": {
            "min": 34,
            "max": null
        },
        "shape": "circle",
        "shapeProperties": {
            "borderRadius": null
        },
        "size": null
    },
    "edges": {
        "arrows": {
            "to": {
                "enabled": true,
                "scaleFactor": 1.85
            }
        },
        "smooth": {
            "forceDirection": "none"
        }
    },
    "manipulation": {
        addNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('operation').innerHTML = "Add Node";
            document.getElementById('node-id').value = network.body.data.counter
            document.getElementById('node-label').value = network.body.data.counter;
            document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
            document.getElementById('cancelButton').onclick = clearPopUp.bind();
            document.getElementById('network-popUp').style.display = 'block';
            network.body.data.counter++;
        },
    },
    "physics": {
        "enabled": false,
        "minVelocity": 0.75
    }
};
var network = new vis.Network(container, data, options);
network.body.data.counter = 0;

var matrix = [];
var original_matrix = [];
function exportNetwork() {

    var nodes = objectToArray(network.getPositions());

    // for (var i = 0; i <= network.body.data.nodes.length; i++) {
    //     matrix[i] = [];
    //     for (var y = 0; y <= network.body.data.nodes.length; y++) {
    //         matrix[i][y] = 0;
    //     }
    // }

    nodes.forEach(function(item, key, arr) {
       matrix[item.id] = [];
       nodes.forEach(function(item_inner, key_inner, arr_inner) {
           matrix[item.id][item_inner.id] = 0;
       })
    });

    console.log(matrix);

    nodes.forEach(addConnections);
    // console.log(nodes);

    var arrayFromTo = network.body.data.edges._data;



    Object.keys(arrayFromTo).forEach(function (item, key, arr) {
        matrix[arrayFromTo[item].from][arrayFromTo[item].to] = 1;
    })

    original_matrix = matrix.clone();
    drawTable(matrix);
    var potoks = createPotoks(matrix);
    descriptionActors(original_matrix, potoks);

//
//      // pretty print node data
//      var exportValue = JSON.stringify(nodes, undefined, 2);
//
//      exportArea.value = exportValue;
//
//      resizeExportArea();
}

function objectToArray(obj) {
    return Object.keys(obj).map(function (key) {
        obj[key].id = key;
        return obj[key];
    });
}

Object.prototype.clone = function() {
    var newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i == 'clone')
            continue;
        if (this[i] && typeof this[i] == "object") {
            newObj[i] = this[i].clone();
        }
        else
            newObj[i] = this[i]
    } return newObj;
};

function addConnections(elem, index) {
    // need to replace this with a tree of the network, then get child direct children of the element
    elem.connections = network.getConnectedNodes(index);
}

function clearPopUp() {
    document.getElementById('saveButton').onclick = null;
    document.getElementById('cancelButton').onclick = null;
    document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
    clearPopUp();
    callback(null);
}

function saveData(data, callback) {
    data.id = document.getElementById('node-id').value;
    data.label = document.getElementById('node-label').value;
    clearPopUp();
    callback(data);
}

function drawTable(matrix) {
    var table_html = '';
    var thead_html = '<tr><td>-</td>';
    matrix.forEach(function (item, key, array) {
        thead_html += '<td>' + key + '</td>';
        table_html += '<tr><td>' + key + '</td>';
        matrix[key].forEach(function (inner_item, inner_key, inner_array) {
            table_html += '<td>' + inner_item + '</td>';
        })
        table_html += '</tr>';
    })
    thead_html += '</tr>';
    console.log(table_html);
    $('#empty-table').html(table_html);
    $('#empty-thead').html(thead_html);
}

function createNewPotok() {
    var potok = [];
    var flag_end_potok = 1;
    var next_row = 0;

    matrix.forEach(function(row_item, row_key, row_arr) {
        if(next_row === row_key || !next_row) {
            matrix[row_key].some(function (col_item, col_key, col_arr) {
                if (matrix[row_key][col_key] === 1) {
                    matrix.forEach(function (inner_row_item, inner_row_key, inner_row_arr) {
                        matrix[inner_row_key][col_key] = 0;
                    });
                    potok.push(col_key);
                    next_row = col_key;
                    return true;
                }
            });

        }
    });

    return potok;
}

function createPotoks() {
    var potok_arr = [];
    var potok = createNewPotok();
    while (potok.length > 0) {
        potok_arr.push(potok);
        potok = createNewPotok();
    }
    console.log(potok_arr);
    return potok_arr;

}



function descriptionActors(matrix_original, potoks) {

    var actors = [];
    var data = [];

    matrix_original.forEach(function (item, key, arr) {
        if(key > 1000) {
            actors[key] = '<M(';
            for(var i = 0; i < potoks.length; i++) {
                if(potoks[i].includes(key)) {
                    actors[key] += i;
                }
            }
            actors[key] += '),I(' + key + '),F(' + key + '),';
            var count = 0;
            var substr = '';
            matrix_original[key].forEach(function(col_item, col_key, col_arr) {
                if(matrix_original[key][col_key] === 1) {
                    count++;
                    element = col_key;
                    for(var i = 0; i < potoks.length; i++) {
                        if(potoks[i].includes(element)) {
                            substr += ',I(' + element + '),M(' + i + ')';
                        }
                    }
                }
            });
            actors[key] += count + substr + ',T(' + key + ')>';
        } else {
            data[key] = '<Q' + key + ',';

            var count = 0;
            var substr = '';
            matrix_original[key].forEach(function(col_item, col_key, col_arr) {
                if(matrix_original[key][col_key] === 1) {
                    count++;
                    element = col_key;
                    for(var i = 0; i < potoks.length; i++) {
                        if(potoks[i].includes(element)) {
                            substr += ',I(' + element + '),M(' + i + ')';
                        }
                    }
                }
            });

            data[key] += count + substr + ',T(' + key + ')>';
        }
    });

    console.log(actors);
    console.log(data);
    return actors;
}

function addNode(x,y) {
    if(x == null)
        x = 0;
    if(y == null) {
        y = 0;
    }
    try {
        nodes.add({
            id: Math.random(),
            borderWidth:1,
            shape:'database',
            x: x,
            y: y,
        });
    }
    catch (err) {
        alert(err);
    }

}



$(document).on('mousedown', '#data-source', function(){
    flag=true;
    index = 'data';
    $(document).one('mousemove', '#mynetwork', function(){
        if (flag){
            coordinate_X = event.offsetX - network.body.view.translation.x/network.body.view.scale;
            coordinate_Y = event.offsetY - network.body.view.translation.y/network.body.view.scale;
            console.log(network.body.view.translation);
            console.log(coordinate_X + '--' + coordinate_Y);
            console.log(network);
            addNode(coordinate_X,coordinate_Y);
        }

    });
    coordinate_X = 0;
    coordinate_Y = 0;
});



//.body.eventListeners.onMouseMove["[[BoundThis]]"].body.view.translation

