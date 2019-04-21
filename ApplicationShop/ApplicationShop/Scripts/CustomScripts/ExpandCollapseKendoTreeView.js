

function expandAllNodes() {
   var length = $('[class^="treeClass"]').length;
   for (var i = 1; i <= length; i++) {
       var treeClassName = ".treeClass";
       if (i > 1) treeClassName = treeClassName + i;

       $(treeClassName).data("kendoTreeView").expand(".k-item");
    }
}

function collapseAllNodes(e) {
    var length = $('[class^="treeClass"]').length;
    for (var i = 1; i <= length; i++) {
        var treeClassName = ".treeClass";
        if (i > 1) treeClassName = treeClassName + i;

        $(treeClassName).data("kendoTreeView").collapse(".k-item");
    }
}