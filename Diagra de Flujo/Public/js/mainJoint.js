﻿var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
    el: $('#diagram'),
    width: 800,
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
        }
    });

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
}

var bart = member(300, 70, 'CEO', 'Bart Simpson','#30d0c6');
var homer = member(90, 200, 'VP Marketing', 'Homer Simpson',  '#7c68fd', '#f1f1f1');
var marge = member(300, 200, 'VP Sales', 'Marge Simpson',  '#7c68fd', '#f1f1f1');
var lisa = member(500, 200, 'VP Production', 'Lisa Simpson',  '#7c68fd', '#f1f1f1');
var maggie = member(400, 350, 'Manager', 'Maggie Simpson',  '#feb563');
var lenny = member(190, 350, 'Manager', 'Lenny Leonard',  '#feb563');
var carl = member(190, 500, 'Manager', 'Carl Carlson',  '#feb563');



link(bart, marge, [{ x: 385, y: 180 }]);
link(bart, homer, [{ x: 385, y: 180 }, { x: 175, y: 180 }]);
link(bart, lisa, [{ x: 385, y: 180 }, { x: 585, y: 180 }]);
link(homer, lenny, [{ x: 175, y: 380 }]);
link(homer, carl, [{ x: 175, y: 530 }]);
link(marge, maggie, [{ x: 385, y: 380 }]);


paper.on('cell:pointerclick ', function (cellView, evt, x, y) {
    console.log(graph.getCell(cellView.id));
});