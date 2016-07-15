(function () {

    function consoleClick(e, obj) {

        var adorn = obj.part;
        var diagram = adorn.diagram;
        diagram.startTransaction("Add Node");
        var oldnode = adorn.adornedPart;
        var olddata = oldnode.data;
        // var newdata = { text: "idea", brush: olddata.brush, dir: olddata.dir, parent: olddata.key };
        console.log(olddata, 'data');

    }

    var goJS = go.GraphObject.make;

    var getAdorment = goJS(go.Adornment, "Spot",
             goJS(go.Panel, "Auto",
              // this Adornment has a rectangular blue Shape around the selected node
              goJS(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 2 }),
              goJS(go.Placeholder, { margin: new go.Margin(0, 0, 0, 0) })
            ),
            // and this Adornment has a Button to the right of the selected node
            goJS("Button",
              {
                  alignment: go.Spot.Right,
                  alignmentFocus: go.Spot.Left,
                  click: consoleClick  // define click behavior for this Button in the Adornment
              },
              goJS(go.TextBlock, ">",  // the Button content
                { font: "bold 8pt sans-serif" })
            )
          );

    var diagram = goJS(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center  // Center diagram contents
        , "undoManager.isEnabled": true        // enable Ctrl-Z to undo and Ctrl-Y to redo
        , layout: goJS(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 })
    });

    diagram.nodeTemplate =
        goJS(go.Node, "Horizontal" ,
            { background: "#44CCFF", mouseEnter: function (e, node) { node.addAdornment("ContextMenuOver", getAdorment); } },
            goJS(go.TextBlock, "Default Text",
              { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
              new go.Binding("text", "name"))
        );

    //diagram.nodeTemplate.selectionAdornmentTemplate =
    //  goJS(go.Adornment, "Spot",
    //     goJS(go.Panel, "Auto",
    //      // this Adornment has a rectangular blue Shape around the selected node
    //      goJS(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 2 }),
    //      goJS(go.Placeholder, { margin: new go.Margin(0, 0, 0, 0) })
    //    ),
    //    // and this Adornment has a Button to the right of the selected node
    //    goJS("Button",
    //      {
    //          alignment: go.Spot.Right,
    //          alignmentFocus: go.Spot.Left,
    //          click: consoleClick  // define click behavior for this Button in the Adornment
    //      },
    //      goJS(go.TextBlock, ">",  // the Button content
    //        { font: "bold 8pt sans-serif" })
    //    )
    //  );

     diagram.linkTemplate = goJS(go.Link, { routing: go.Link.Orthogonal, corner: 5 }, goJS(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

    var model = goJS(go.TreeModel);
    model.nodeDataArray =
    [ // the "key" and "parent" property names are required,
      // but you can add whatever data properties you need for your app
      { key: "1", name: "Master" },
      { key: "2", parent: "1", name: "Son 1"   , dataID:0},
      { key: "3", parent: "1", name: "Son 2"   , dataID:1},
      { key: "4", parent: "3", name: "Son 2 1" , dataID:2},
      { key: "5", parent: "3", name: "Son 2 2" , dataID:3},
      { key: "6", parent: "2", name: "Son 1"   , dataID:4}
    ];

    diagram.model = model;

})();