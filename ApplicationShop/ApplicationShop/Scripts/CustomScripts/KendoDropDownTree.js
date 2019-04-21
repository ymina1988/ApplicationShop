function InitSearch(treeViewId, searchInputId, treeviewDropdownBtn, ulTreeViewId, canSearch) {

    //console.log(treeViewId + " " + searchInputId + " " + treeviewDropdownBtn + " " + ulTreeViewId);
    //console.log("can search: " + canSearch);
    $(document).on("keydown.examples", function (e) {
        if (e.altKey && e.keyCode === 87 /* w */) {
            $(treeViewId).data("kendoTreeView").wrapper.focus();
        }
    });
    var tv = $(treeViewId).data('kendoTreeView');

    if (canSearch == true) {
        $(searchInputId).on('keyup', function (e) {
            var selector = treeViewId + ' span';
            if (e.keyCode == 13) {
                var Selected = $(selector).find(".highlight");
                if (Selected.length == 1) {
                    var SelectedParent = Selected.parent().parent().parent();
                    tv.select(SelectedParent);
                    tv.trigger('select', { node: SelectedParent });
                    $(ulTreeViewId).focusout();
                }
                return false;
            }
            if ($(searchInputId).val()) {
                $(ulTreeViewId).show();
            }

            $(treeViewId + ' li.k-item').show();

            //$('span.k-in > span.highlight').each(function () {
            //    $(this).parent().text($(this).parent().text());
            //});

            $("span").removeClass("highlight");


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


                var icons = $(this).find("span.menu-icon ")[0];
                var bottons = $(this).find("span.amiathaRoyeNodeDerakht")[0];


                while ((p = text.toUpperCase().indexOf(term, q)) >= 0) {
                    html += text.substring(q, p) + '<span class="highlight">' + text.substr(p, tlen) + '</span>';
                    q = p + tlen;
                }

                if (q > 0) {
                    if (icons != undefined) {
                        html = icons.outerHTML + html;
                    }
                    html += text.substring(q);
                    if (bottons != undefined) {
                        html += bottons.outerHTML;
                    }
                    $(this).html(html);

                    $(this).parentsUntil('.k-treeview').filter('.k-item').each(function (index, element) {
                        tv.expand($(this));
                        $(this).data('SearchTerm', term);
                    });
                }
            });

            $(treeViewId + ' li.k-item:not(:has(".highlight"))').hide();
        });
    }
    else {
        $(searchInputId).attr('readonly', 'readonly');
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
        //console.log('focus ..');
        $(ulTreeViewId).show();
        //$(this).find('ulTreeView').slideToggle();
        $(searchInputId).keyup();
    });

    $(treeviewDropdownBtn).on('click', function () {
        //$('#treeview').toggle();
        $(ulTreeViewId).toggle();
    });
    $(searchInputId).on('keypress', function (e) {
        
        if (e.keyCode == 13 && canSearch == true) {
            return false;
        }
    });

}



function InitDropDownTree(idTreeView, UrlOfJsonDataSource, IsloadOnDemand, canSearch, useOnSelectedChange) {

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
    var hiddenSelectedItemText = idTreeView + "_SelectedText";
    var idTemplate = idTreeView + "_Template";

    var $tv = $(idTreeView).kendoTreeView({
        dataSource: dataSource,
        template: kendo.template($(idTemplate).html()),
        dataTextField: "Name",
        accesskey: "w",
        select: function onSelectTreeView(e) {
            console.log(e);
            console.log(e.node);
            var item = this.dataItem(e.node);
            var txtSectedItem = "مورد انتخاب شده: " + this.text(e.node) + " با کد  :" + item.id;
            var txtSectedItemFormat = item.id;
            //console.log(item.hasChildren);
            if (item.hasChildren == false) {
                $(hiddenSelectedItemId).val(txtSectedItemFormat);
                $(hiddenSelectedItemText).val(this.text(e.node));
                $(ulTreeViewId).hide();
                $(searchInputId).val(this.text(e.node));
                $(ulTreeViewId).hide();


                if (useOnSelectedChange) {
                    OnSelectedChange(ulTreeViewId, this.text(e.node), item.id);
                }
            }
            else {
                $(hiddenSelectedItemId).val('');
                $(hiddenSelectedItemText).val('');
                $(ulTreeViewId).hide();
            }

        },
        loadOnDemand: IsloadOnDemand
    }).data("kendoTreeView");




    InitSearch(idTreeView, searchInputId, treeviewDropdownBtn, ulTreeViewId, canSearch);

}


//function OnSelectedChange(senderId, selectedText, selectedValue) {
//    console.log(selectedText);
//    console.log(selectedValue);
//}