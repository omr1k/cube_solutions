function getItems() {
    var items = localStorage.getItem("menuItems");
    if (!items) {
        var sampleData = {
            title: "Menu",
            items: [
                {
                    groupName: "PIZZA",
                    items: [
                        {
                            title: "Margherita",
                            subtext: "Fresh tomatoes, fresh mozzarella, fresh basil",
                            price: 12.50
                        },
                        {
                            title: "Formaggio",
                            subtext: "Four cheeses (mozzarella, parmesan, pecorino, jarlsberg)",
                            price: 15.50
                        },
                        {
                            title: "Chicken",
                            subtext: "Fresh tomatoes, mozzarella, chicken, onions",
                            price: 17.00
                        },
                        {
                            title: "Meat Town",
                            subtext: "Fresh tomatoes, mozzarella, hot pepporoni, hot sausage, beef, chicken",
                            price: 20.00
                        },
                        {
                            title: "Parma",
                            subtext: "Fresh tomatoes, mozzarella, parma, bacon, fresh arugula",
                            price: 21.50,
                        },
                    ]
                },
                {
                    groupName: "SALADS",
                    items: [
                        {
                            title: "Lasagna *Popular*",
                            subtext: "Special sauce, mozzarella, parmesan, ground beef",
                            price: 13.50
                        },
                        {
                            title: "Ravioli",
                            subtext: "Ravioli filled with cheese",
                            price: 22.50
                        },
                        {
                            title: "Spaghetti Classica",
                            subtext: "Special sauce, mozzarella, parmesan, ground beef",
                            price: 11.50
                        },
                        {
                            title: "Seafood pasta",
                            subtext: "Salmon, shrimp, lobster, garlic",
                            price: 25.50
                        }
                    ]
                },                
                {
                    groupName: "STARTER",
                    items: [
                        {
                            title: "Today's Soup *Seasonal*",
                            subtext: "Ask the waiter",
                            price: 13.50
                        },
                        {
                            title: "Bruschetta",
                            subtext: "Bread with pesto, tomatoes, onion, garlic",
                            price: 22.50
                        },
                        {
                            title: "Garlic bread",
                            subtext: "Grilled ciabatta, garlic butter, onions",
                            price: 11.50
                        },
                        {
                            title: "Tomozzarella",
                            subtext: "Tomatoes and mozzarella",
                            price: 25.50
                        }
                    ]
                }                
            ],
            isUpdated: false
        }; 
        localStorage.setItem("menuItems", JSON.stringify(sampleData));
        items = sampleData;
    } else {
        items = JSON.parse(items); 
    }
    return items || {}; 
}
var allMenu = getItems(); 
var selectedGroupIndex = -1; 
var selectItemIndex = -1; 
function displayItems(menu) {
    var table = $('<table>').addClass('table');
    $('#menuTable').append(table);
    table.append('<tr>').html('<td colspan="2" class="group-name">' + menu.groupName +  '</td>');
    menu.items.forEach(function (item) {
        var title = item.title; 
        var regex = /\*(.*?)\*/;
        var matched = regex.exec(title);
        var additionalHTML = ''; 
        if (matched) {
            title = title.replace('*' + matched[1] + '*', '');
            additionalHTML = '<span class="additional-text">' + matched[1] + '</span>';
        }
        var row = $('<tr>').append('th').html(
            '<td class="menu-name">' + 
            '<span class="menu-item-name">' + title + '</span>' + 
            additionalHTML +
            '</br><span class="subtext">' + item.subtext + '</span>' + 
            '</td>' + 
            '<td class="menu-price">' + 
            '<span class="price">$' + item.price + '</span>' + 
            '</td>'
        );
        table.append(row);
    });
}
function display() {

    $("#resMenuTitle").text(allMenu.title);
    if (Array.isArray(allMenu.items)) {
        allMenu.items.forEach(function (menu) {
            if (menu) {
                displayItems(menu); 
            }
        });
    }
 
}

function prepareData() {
    $("#menuTitle").val(allMenu.title);
    $("#menuGroups").html("");
    $("#menuGroups").append($("<option></option>")
    .attr('selected', true)
    .attr('disabled', true)
    .text('Please Select')); 
    if (Array.isArray(allMenu.items)) {
        allMenu.items.forEach(function (item, i) {
            if (item) {
                $("#menuGroups").append($("<option></option>")
                .attr('value', 'group_' + i)
                .attr('selected', false)
                .text(item.groupName)); 
            }
        })
    }

    $("#menuGroups").append($("<option></option>")
    .attr('value', 'newGroup')
    .text('New Group')); 
    $("#newGroupView").hide();
    $("#menuItemView").hide();
    $("#newItemView").hide();
    $("#itemPrice").val('');
    $("#newItemDescription").val('');
    $("#newItemText").val('');
    $("#newGroupText").val('');
    $("#editItemView").hide(); 
    selectedGroupIndex = -1; 
    selectItemIndex = -1; 
}
function handleSelectNewGroup(e) {
    var selected = $(e).val(); 
    
    $("#menuItemView").hide();
    $("#newItemView").hide();
    if (selected === 'newGroup') {
        $("#newGroupView").show('fast');
        $("#newGroupText").focus();
    } else {
        $("#newGroupView").hide();
        $("#menuItemView").show('fast');
        
        selectedGroupIndex = selected.split('group_')[1]; 
        if (!Array.isArray(allMenu.items[selectedGroupIndex].items)) {
            allMenu.items[selectedGroupIndex].items = []; 
        }
        $("#newGroupName").val(allMenu.items[selectedGroupIndex].groupName);
        $("#menuItems").html("");
        $("#menuItems").append($("<option></option>")
        .attr('selected', true)
        .attr('disabled', true)
        .text('Please Select')); 
        allMenu.items[selectedGroupIndex].items.forEach(function (item, i) {
            $("#menuItems").append($("<option></option>")
            .attr('value', 'item_' + i)
            .text(item.title)); 
        })
        $("#menuItems").append($("<option></option>")
        .attr('value', 'newItem')
        .text('New Item')); 
    }
}
function handleSelectNewItem(e) {
    var selected = $(e).val(); 
    $("#newItemView").hide();
    $("#editItemView").hide(); 
    if (selected === 'newItem') {
        $("#newItemView").show('fast');
        $("#newItemText").focus();
        return true;
    } 
    if (selectedGroupIndex === -1) {
        return false; 
    }
    selectItemIndex = selected.split('item_')[1];
    var selectedObj = allMenu.items[selectedGroupIndex].items[selectItemIndex];  
    $("#editItemView").show('fast'); 
    $("#editItemText").val(selectedObj.title);
    $("#editItemPrice").val(selectedObj.price);
    $("#editItemDescription").val(selectedObj.subtext);
}

function addNewItem() {
    var newItemText = $('#newItemText').val();
    var itemPrice = $('#itemPrice').val();
    var newItemDescription = $('#newItemDescription').val();
    if (!newItemText || selectedGroupIndex === -1 || Number.isNaN(itemPrice)) {
        return false; 
    }
    if (!Array.isArray(allMenu.items[selectedGroupIndex].items)) {
        allMenu.items[selectedGroupIndex].items = []; 
    }
    allMenu.items[selectedGroupIndex].items.push({
        title: newItemText,
        subtext: newItemDescription,
        price: Number.parseFloat(itemPrice)
    });
    prepareData(true);
    return true; 
}

function editItem() {
    var p = $("#editItemPrice").val(); 
    if (selectedGroupIndex === -1 || selectItemIndex === -1 || Number.isNaN(p)) {
        return false; 
    }

    allMenu.items[selectedGroupIndex].items[selectItemIndex] = {
        title: $("#editItemText").val(),
        price: Number.parseFloat(p),
        subtext: $("#editItemDescription").val()
    }
    prepareData(true);
}

function deleteItem() {
    if (selectedGroupIndex === -1 || selectItemIndex === -1) {
        return false; 
    }
    delete allMenu.items[selectedGroupIndex].items[selectItemIndex]; 
    prepareData(true);
}

function addNewGroup() {
    $("#menuItemView").hide();
    var groupName = $("#newGroupText").val();
    if (!groupName) {
        return false; 
    } 
    if (!Array.isArray(allMenu.items)) {
        allMenu.items = [];  
    }
    var alreadyExists = false;
    allMenu.items.forEach(function (i) {
        if (i.groupName === groupName) {
            alreadyExists = true;
        }
    });
    if (alreadyExists) {
        return false;
    } 
    allMenu.items.push({
        groupName,
        items: []
    });
    prepareData(false);
    return true; 
}

function saveChanges() {
    localStorage.setItem("menuItems", JSON.stringify(allMenu));
    $('#menuTable').html("");
    display();
}

function updateTitle() {
    allMenu.title = $("#menuTitle").val();
}

function editGroupName() {
    var newName = $("#newGroupName").val();
    allMenu.items[selectedGroupIndex].groupName = newName; 
    prepareData(false);
}
function deleteGroup() {
    delete allMenu.items[selectedGroupIndex];
    prepareData(false); 
}

$(document).ready( function() {
    display();
});