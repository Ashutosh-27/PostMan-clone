// console.log('JS file reporting Sir')

//Utility Functions
//1.utility functn to get DOM element from string
function getElemntFromString(string) {
    let div = document.createElement('div')
    div.classList.add = ('crtdDiv')
    div.innerHTML = string;
    return div.firstElementChild;
}



//Hide The parameters BOx initially
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none'
let jsonBox = document.getElementById('requestJsonBox')
jsonBox.style.display = 'none'


//If user Clicks on params Box hide Json Box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'
})

//If user Clicks on Json Box hide params Box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none'
    document.getElementById('requestJsonBox').style.display = 'block'
})



// If User Clicks on PLus Btn Add more Parameters
let addedcount = 0;
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params')
    let addExtraStr = ` <div class="form-row">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedcount + 2}</label>
    <div  style="display: inline-block;"class="col-md-4">
        <input type="text" class="form-control parameterKey" id="parameterKey${addedcount + 2}" placeholder="Enter Parameter ${addedcount + 2} Key">
    </div>
    <div style="display: inline-block;"class="col-md-4">
        <input type="text" class="form-control parameterValue" id="parameterValue${addedcount + 2}" placeholder="Enter Parameter ${addedcount + 2} Value">
    </div>
    <button class="btn btn-dark btn-sm deleteParam">-</button>
    </div>`

    //convert Element to String to DOM node
    let paramElement = getElemntFromString(addExtraStr)
    params.appendChild(paramElement)

    //Add EventListner to remove the parameter on clicking '-' button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })

    }
    addedcount++
})



let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Ask User To Be Patient For Response in a Kind Manner
    document.getElementById('wait').innerHTML = 'PLease Wait For Response....Fetching<img src="ZZ5H.gif" style="max-width:20px;max-height:"20px">'
    console.log('done')


    //Fetch all the values user has Enter
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value



    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedcount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;

                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value
    }

    console.log('Url is : ', url)
    console.log('requestType is : ', requestType)
    console.log('contentType is : ', contentType)
    console.log(data)



    //If the request type id post,invoke fetch api to a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        }).then(response => response.text())
            .then((text) => {
                let appx = JSON.parse(text)
                console.log(appx)
                document.getElementById('wait').style.display = 'none'
                // document.getElementById('responseJsonText').value = text
                document.getElementById('responsePrism').innerText  = text
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            // Headers represents a set of request/response HTTP headers. It allows for case-insensitive lookup of header by name, as well as merging multiple values of a single header.
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text())//we are taking response in text if we take response in json we gotta first stringify it else we get [object,object] type something
            .then((text) => {
                document.getElementById('wait').style.display = 'none'
                // document.getElementById('responseJsonText').value = text
                document.getElementById('responsePrism').innerText = text
            });
    }
})
