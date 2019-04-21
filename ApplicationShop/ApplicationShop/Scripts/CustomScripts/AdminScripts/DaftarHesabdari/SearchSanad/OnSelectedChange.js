function OnSelectedChange(senderId, selectedText, selectedValue) {

    if (senderId === "#HesabTree_ulTree") {

        $.get("/Admin/Sanad/PopulateTafziliesDropDown", { idHesabMoien: selectedValue }, function (data, textStatus, jqXHR) {

            //console.log(data.tafzili1SelectListItem);
            //console.log(data.markazeHazineSelectListItem);
            //console.log(data.projectSelectListItem);

            if (data.tafzili1SelectListItem) {
                $("#Tafzili1Select").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.tafzili1SelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#Tafzili1Select").append(htmlString);
            }

            if (data.markazeHazineSelectListItem) {
                $("#MarkazeHazineSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.markazeHazineSelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#MarkazeHazineSelect").append(htmlString);
            }

            if (data.projectSelectListItem) {
                $("#ProjectSelect").empty();

                let htmlString = '<option value="">لطفا یک مقدار انتخاب کنید</option>';

                data.projectSelectListItem.forEach(function (value, index) {

                    htmlString += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });

                $("#ProjectSelect").append(htmlString);
            }

        }, "json");

        return;
    }

}