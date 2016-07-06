

(function () {

    var goJS = go.GraphObject.make;

    var diagram = goJS(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center  // Center diagram contents
        , "undoManager.isEnabled": true        // enable Ctrl-Z to undo and Ctrl-Y to redo
    });

    var Model = goJS(go.Model);

    Model.nodeDataArray = [
        { key: "Group1", isGroup: true },
        { key: "Alpha", group: "Group1" },
        { key: "Beta", group: "Group1" },
        { key: "Gamma" }
    ];

    Model.linkDataArray = [
      { from: "Alpha", to: "Beta" },
      { from: "Group1", to: "Gamma" }
    ];

    diagram.model = Model;

})();