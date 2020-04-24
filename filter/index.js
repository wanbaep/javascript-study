var dataSet = [
    { name:"박완배", age:"29", number:"010-5665-1527", blood:"A" },
    { name:"이진벅", age:"27", number:"010-1234-1234", blood:"AB" },
    { name:"정라쿤", age:"28", number:"010-1541-154", blood:"A" },
    { name:"좀투비", age:"27", number:"010-8888-4454", blood:"A" },
    { name:"레전드", age:"27", number:"010-4343-5577", blood:"B" },
    { name:"난나무", age:"28", number:"010-0099-9900", blood:"O" }
]


function dataLoad() {
    console.log("dataLoad");
    var tableBody = document.getElementById("table-body");
    for(var i=0; i < dataSet.length; ++i) {
        var data = dataSet[i];
        var tableRow = document.createElement("div");
        var name = document.createElement("div");
        var age = document.createElement("div");
        var number = document.createElement("div");
        var blood = document.createElement("div");
        tableRow.className = "table-row";
        name.className = "body-column name";
        age.className = "body-column age";
        number.className = "body-column number";
        blood.className = "body-column blood";
        name.innerText = data.name;
        age.innerText = data.age;
        number.innerText = data.number;
        blood.innerText = data.blood;

        tableRow.appendChild(name);
        tableRow.appendChild(age);
        tableRow.appendChild(number);
        tableRow.appendChild(blood);

        tableBody.appendChild(tableRow);
    }

}

function searchBind(searchName) {
    //이름으로만 찾기
    console.log("Search Name", searchName);

    var nameList = document.getElementsByClassName("name");
    for(var i=0; i<nameList.length; ++i) {
        var nameValue = nameList[i].innerText;
        var tableRow = nameList[i].parentElement;

        if(searchName != nameValue) {
            tableRow.style.display="none";
        } else {
            tableRow.style.display="flex";
        }
    }
}

/* 
data = {
    type:"name", or "age" or "number" or "blood"
    value:"searchName" or "searchAge" or searchNumber or searchBlood
}
 */
function showRow(data) {
    var type = data.type;
    var value = data.value;

    var columnList = document.getElementsByClassName(type);
    for(var i = 0; i < columnList.length; ++i) {
        var typeValue = columnList[i].innerText;
        var tableRow = columnList[i].parentElement;

        if(value != typeValue) {
            tableRow.style.display="none";
        } else {
            tableRow.style.display="flex";
        }
    }
}

function showAllList() {
    var tableRow = document.getElementsByClassName("table-row");
    for(var i = 0; i < tableRow.length; ++i) {
        tableRow[i].style.display="flex";
    }
}

function initAgeFilterList() {
    var ageData = document.getElementsByClassName("age");
    var selectAge = {};
    for(var i = 0; i < ageData.length; ++i) {
        var age = ageData[i].innerText;
        selectAge[age] = age;
    }

    var ageSelect = document.getElementById("age-select");
    for(age in selectAge) {
        var option = document.createElement("option");
        option.innerText = age;
        ageSelect.appendChild(option);
    }

}

function initNumberFilterList() {
    var numberData = document.getElementsByClassName("number");
    var selectNumber = {};
    
    for(var i = 0; i < numberData.length; ++i) {
        // console.dir(numberData[i].innerText);
        var number = numberData[i].innerText;
        // console.log(age);
        selectNumber[number] = number;
    }

    var numberSelect = document.getElementById("number-select");
    for(number in selectNumber) {
        var option = document.createElement("option");
        option.innerText = number;
        numberSelect.appendChild(option);
    }
}

function initFilter() {
    initAgeFilterList();
    initNumberFilterList();
}

function callFilter(data) {
    console.log("callFilter");
    var age = data.age;
    var number = data.number;
    var blood = data.blood;
    console.log(data);
    console.log(age, number, blood);

    for(var key in data) {
        showRow({
            type:key,
            value:data[key]
        })
        // console.log("key",key);
        // console.log("value",data[key]);
    }

}

window.onload = function init() {
    dataLoad();
    // var searchBtn = document.getElementById("search-btn");
    // searchBtn.onclick = function onClickEventBind(event) {
    //     var searchInput = document.getElementById("search");
    //     if(searchInput.value == "") {
    //         showAllList();
    //     } else {
    //         searchBind(searchInput.value);
    //     }
    // }
    var searchInput = document.getElementById("search");
    searchInput.onkeyup = function keyUpEventBind(event) {
        console.dir(event);
        console.log(this.value);
        if(this.value == "") {
            showAllList();
        } else {
            showRow({
                type:"name",
                value:this.value
            });
            // searchBind(this.value);
        }
    }

    initFilter();
    
    var filterOk = document.getElementById("filter-ok");
    filterOk.onclick = function filterAdapt(event) {
        console.log("filter adapt");
        var ageSelect = document.getElementById("age-select");
        var ageValue = ageSelect.options[ageSelect.selectedIndex].text;

        var numSelect = document.getElementById("number-select");
        var numValue = numSelect.options[numSelect.selectedIndex].text;

        var bloodValue;
        var radioSet = document.getElementsByName("blood-filter");
        console.dir(radioSet);
        
        for(var i = 0; i < radioSet.length; ++i) {
            if(radioSet[i].checked == true) {
                console.log(radioSet[i].value);
                bloodValue = radioSet[i].value;
            }
        }

        var argument = {
            age:ageValue,
            number:numValue,
            blood:bloodValue
        }
        // console.log(ageValue, numValue, radioValue);

        callFilter(argument);

    }
}