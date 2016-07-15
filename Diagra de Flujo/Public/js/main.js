(function () {

    var goJS = go.GraphObject.make;

    var diagram = goJS(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center  // Center diagram contents
        , "undoManager.isEnabled": true        // enable Ctrl-Z to undo and Ctrl-Y to redo
        , layout: goJS(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 })
    });

    diagram.nodeTemplate =
      goJS(go.Node, "Horizontal",
        { background: "#44CCFF" },
        goJS(go.Picture,
          { margin: 10, width: 50, height: 50, background: "red" },
          new go.Binding("source")),
        goJS(go.TextBlock, "Default Text",
          { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
          new go.Binding("text", "name"))
  );

    diagram.linkTemplate = goJS(go.Link, { routing: go.Link.Orthogonal, corner: 5 }, goJS(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

    var model = goJS(go.TreeModel);
    model.nodeDataArray =
    [ // the "key" and "parent" property names are required,
      // but you can add whatever data properties you need for your app
      { key: "1", name: "Master" },
      { key: "2", parent: "1", name: "Son 1" },
      { key: "3", parent: "1", name: "Son 2" },
      { key: "4", parent: "3", name: "Son 2 1" },
      { key: "5", parent: "3", name: "Son 2 2" },
      { key: "6", parent: "2", name: "Son 1" }
    ];

    diagram.model = model;

})();