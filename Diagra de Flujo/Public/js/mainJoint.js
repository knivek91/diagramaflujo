var jq = $(document);
var     perspectiveWrapper = jq.find('#perspective'),
        container = jq.find('.container'),
        contentWrapper = jq.find('.wrapper');

var docElem = window.document.documentElement,
    // support transitions
    support = Modernizr.csstransitions,
    // transition end event name
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
    docscroll = 0,
    // click event (if mobile use touchstart)
    clickevent = mobilecheck() ? 'touchstart' : 'click';


container.on(clickevent, function (ev) {

    //classie.add(container, 'transform');
    container.addClass('transform');
    //classie.has(perspectiveWrapper, 'animate') --> validated in the if
    if (perspectiveWrapper.addClass('animate')) {

        var onEndTransFn = function (ev) {

            if (support && (ev.target.className !== 'container' || ev.propertyName.indexOf('transform') == -1)) return;

            this.removeEventListener(transEndEventName, onEndTransFn);

            //classie.remove(perspectiveWrapper, 'modalview');
            perspectiveWrapper.removeClass('modalview');

            //classie.remove(container, 'transform');
            perspectiveWrapper.removeClass('transform');

            // mac chrome issue:
            document.body.scrollTop = document.documentElement.scrollTop = docscroll;

            // change top of contentWrapper
            //contentWrapper.style.top = '0px';
            contentWrapper.css('top', '0');
        };

        /* QUEDE AQUI, VER COMO AGREGAR EL EVENTO PARA LOS DIVERSOS TIPOS DE TRANSICIONES QUE CREA USANDO NODERNIRZ */
        if (support) {
            perspectiveWrapper.addEventListener(transEndEventName, onEndTransFn);
        }
        else {
            onEndTransFn.call();
        }
        //classie.remove(perspectiveWrapper, 'animate');
        perspectiveWrapper.removeClass('animate');
    }
});

perspectiveWrapper.on(clickevent, function (ev) { return false; });



function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
}

// from http://stackoverflow.com/a/11381730/989439
function mobilecheck() {
    var check = false;
    (function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function init() {
    
    var showMenu = jq.find(''),
        perspectiveWrapper = document.getElementById('perspective'),
        container = perspectiveWrapper.querySelector('.container'),
        contentWrapper = container.querySelector('.wrapper');

    showMenu.addEventListener(clickevent, function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        docscroll = scrollY();
        // change top of contentWrapper
        contentWrapper.style.top = docscroll * -1 + 'px';
        // mac chrome issue:
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // add modalview class
        classie.add(perspectiveWrapper, 'modalview');
        // animate..
        setTimeout(function () { classie.add(perspectiveWrapper, 'animate'); }, 25);
    });

}


var graph = new joint.dia.Graph();

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
            'giud': 'Kevin Rocks!!'
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

var bart = member(300, 70, '1', 'Entrada','#30d0c6');
var homer = member(90, 200, '1 Marketing', 'Factura 1',  '#7c68fd', '#f1f1f1');
var marge = member(300, 200, '2 Sales', 'Factura 2', '#7c68fd', '#f1f1f1');
var lisa = member(500, 200, '3 Production', 'Factura 3', '#7c68fd', '#f1f1f1');
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
    //console.log(cellView.model.attributes.attrs);

    docscroll = scrollY();
    // change top of contentWrapper
    contentWrapper.css('top', docscroll * -1 + 'px')
    // mac chrome issue:
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // add modalview class
    // classie.add(perspectiveWrapper, 'modalview');
    perspectiveWrapper.addClass('modalview');
    // animate..
    setTimeout(function () {
        // classie.add(perspectiveWrapper, 'animate');
        perspectiveWrapper.addClass('animate');
    }, 25);

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