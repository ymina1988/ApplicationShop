function InitSearch(treeViewId, searchInputId, treeviewDropdownBtn, ulTreeViewId, canSearch) {

    console.log(treeViewId + " " + searchInputId + " " + treeviewDropdownBtn + " " + ulTreeViewId);
    console.log("can search: " + canSearch);

    var tv = $(treeViewId).data('kendoTreeView');

    if (canSearch == true) {
        $(searchInputId).on('keyup', function () {
            $(treeViewId + ' li.k-item').show();

            $('span.k-in > span.highlight').each(function () {
                $(this).parent().text($(this).parent().text());
            });

            // ignore if no search term
            if ($.trim($(this).val()) === '') {
                tv.select() //gets currently selected <li> element
                    .find("span.k-state-selected")
                        .removeClass("k-state-selected"); //removes the highlight class

                //$('#lblselected').html("در حال انتخاب : --");
                return;
            }

            var term = this.value.toUpperCase();
            var tlen = term.length;

            $(treeViewId + ' span.k-in').each(function (index) {
                var text = $(this).text();
                var html = '';
                var q = 0;
                var p;

                while ((p = text.toUpperCase().indexOf(term, q)) >= 0) {
                    html += text.substring(q, p) + '<span class="highlight">' + text.substr(p, tlen) + '</span>';
                    q = p + tlen;
                }

                if (q > 0) {
                    html += text.substring(q);
                    $(this).html(html);

                    $(this).parentsUntil('.k-treeview').filter('.k-item').each(function (index, element) {
                        tv.expand($(this));
                        $(this).data('SearchTerm', term);
                    });
                }
            });

            $(treeViewId + ' li.k-item:not(:has(".highlight"))').hide();
        });
        $(searchInputId).css('cursor', 'pointer'); // crosshair ew-resize  pointer 
    }
    else {
        $(searchInputId).attr('readonly', 'readonly');
        $(searchInputId).css('cursor', 'crosshair'); // crosshair ew-resize  pointer 
    }




    $(searchInputId).on('blur', function () {
        if ($(searchInputId).val() == '') {
            //$('#treeview').hide();
            $(ulTreeViewId).slideDown();
        } else {
            //$('#treeview').show();
            $(ulTreeViewId).show();
        }
    });

    $(searchInputId).on('focus', function () {
        //$('#treeview').show();
        console.log('focus ..');
        $(ulTreeViewId).show();
        //$(this).find('ulTreeView').slideToggle();
        $(searchInputId).keyup();
    });

    $(treeviewDropdownBtn).on('click', function () {
        //$('#treeview').toggle();
        $(ulTreeViewId).toggle();
    });

}







function InitDropDownTree(idTreeView, UrlOfJsonDataSource, IsloadOnDemand, canSearch) {

    idTreeView = "#" + idTreeView;

    $(idTreeView).show();
    var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: UrlOfJsonDataSource,
                data: {},
                type: "GET"
            }
        },
        schema: {
            model: {
                id: "id",
                hasChildren: "hasChildren"
            }
        }
    });


    var treeviewDropdownBtn = idTreeView + "_treeviewDropdownBtn";
    var searchInputId = idTreeView + "_treeViewSearchInput";
    var ulTreeViewId = idTreeView + "_ulTree";
    var hiddenSelectedItemId = idTreeView + "_SelectedItem";

    var $tv = $(idTreeView).kendoTreeView({
        dataSource: dataSource,
        dataTextField: "Name",
        select: function onSelectTreeView(e) {

            var item = this.dataItem(e.node);
            var txtSectedItem = "مورد انتخاب شده: " + this.text(e.node) + " با کد  :" + item.id;
            var txtSectedItemFormat = item.id;
            console.log(item.hasChildren);
            if (item.hasChildren == false) {
                $(hiddenSelectedItemId).val(txtSectedItemFormat);
                $(ulTreeViewId).hide();
                $(searchInputId).val(this.text(e.node));
                $(ulTreeViewId).hide();
            }
            else {
                $(hiddenSelectedItemId).val('');
                $(ulTreeViewId).hide();
            }

        },
        loadOnDemand: IsloadOnDemand
    }).data("kendoTreeView");




    InitSearch(idTreeView, searchInputId, treeviewDropdownBtn, ulTreeViewId, canSearch);

}