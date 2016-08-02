var jq = $(document);
var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
    el: $('#diagram'),
    width: 1000,
    height: 600,
    gridSize: 1,
    model: graph,
    perpendicularLinks: true,
    restrictTranslate: true
});

var member = function (x, y, rank, name, background, textColor) {

    textColor = textColor || "#000";

    var cell = new joint.shapes.org.Member({
        position: { x: x, y: y },
        attrs: {
            '.card': { fill: background, stroke: 'none' },
            '.rank': { text: rank, fill: textColor, 'word-spacing': '-5px', 'letter-spacing': 0 },
            '.name': { text: name, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 },
            'giud': 'Kevin Rocks!!'
        }
    });
    cell.resize(150, 70);
    graph.addCell(cell);
    return cell;
};

function link(source, target, breakpoints) {

    var cell = new joint.shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints,
        attrs: {
            '.connection': {
                'fill': 'none',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                'stroke': '#ccc'
            }
        }

    });
    
    graph.addCell(cell);
    return cell;
};

var bart = member(300, 70, '1', 'Bart','#30d0c6');
var homer = member(90, 200, '1 Homer', 'Factura 1',  '#7c68fd', '#f1f1f1');
var marge = member(300, 200, '2 marge', 'Factura 2', '#7c68fd', '#f1f1f1');
var lisa = member(500, 200, '3 lisa', 'Factura 3', '#7c68fd', '#f1f1f1');
var maggie = member(400, 350, '1', 'Maggie Simpson',  '#feb563');
var lenny = member(190, 350, '1', 'Lenny Leonard',  '#feb563');
var carl = member(190, 500, '2', 'Carl Carlson',  '#feb563');

link(bart, marge, [{ x: 385, y: 180 }]);
link(bart, homer, [{ x: 385, y: 180 }, { x: 175, y: 180 }]);
link(bart, lisa, [{ x: 385, y: 180 }, { x: 585, y: 180 }]);
link(homer, lenny, [{ x: 175, y: 380 }]);
link(homer, carl, [{ x: 175, y: 530 }]);
link(marge, maggie, [{ x: 385, y: 380 }]);

paper.on('cell:pointerclick ', function (cellView, evt, x, y) {

    var cell = cellView.model;
    var graph = cellView.paper.model;
    var position = cell.position();

    var kevin = member(position.x + 150, position.y + 150, '9', 'Kevin', '#d35400');
    link(cell, kevin, [{ x: position.x, y: position.y + 10 }], [{x:position.x + 150, y:position.y + 150}]);

    //var rojas = member(200, 20, '19', 'Rojas', '#d35400');
    //link(cell, rojas, [{ x: 500, y: 380 }]);

});

/*
factura compras tiene:
pagos (pagos)
devoluciones
notas de credito y debido
*/

/*
factura venta tiene:
salida
*/