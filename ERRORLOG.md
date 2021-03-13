KEY:
 🔴ERRORS
 🟡THE ISSUE
 🔵ATTEMPTED SOLUTIONS
 🟠PARTIAL SOLUTIONS
 🟢SOLUTIONS
 ⚪SUGGESTED SOLUTIONS


# FILE UPLOAD ERRORS

## 🟡 Manifest not posting with truck. After posting; manifest is still empty. 


🔵 Tried setting truckManifest(e.target.value[0]) and got this error: 

🔴 ERROR A: Uncaught DOMException: Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string. at HTMLInputElement.set [as value]

🔵 If I delete the [0] there is no error but the manifest will not post.

🔵 I changed the initial state value from an empty string to an empty array.

🔵 I changed e.target.value to e.target.files and got the same error as above.

🔵 I deleted the value of input for the manifest which changes the form to uncontrolled.

           ``` <input
              type="file"
              multiple
              name="truckManifest[]"
              className="truckload-inputs"
              onChange={(e) => setTruckManifest(e.target.files[0])}
            /> ```


🔵This allowed me to add the file, but on clicking the submit button I got this error:

🔴 ERROR B: Uncaught Error: Objects are not valid as a React child (found: [object File]). If you meant to render a collection of children, use an array instead.

🔵 The file is showing up in the console in the truckManifest value but only on the addTrucks page, not on the InventoryAllTrucks page (database):

* ADD TRUCKS CONSOLE (COMPONENTS: addInventory + inventory)
```
{id: "", truckName: "TRUCK TEST", truckPrice: "456", truckContents: "sdf", truckManifest: File}
	 id: ""
	 truckContents: "sdf"
	 truckManifest: File
		1. lastModified: 1613494443273
		2. lastModifiedDate: Tue Feb 16 2021 08:54:03 GMT-0800 (Pacific Standard Time) {}
		3. name: "return-center-documentation.docx"
		4. size: 14996
		5. type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		6. webkitRelativePath: ""
		7. __proto__: File
	 truckName: "TRUCK TEST"
	 truckPrice: "456"
	 __proto__: Object
```

* TRUCKS LIST FROM DATABASE PAGE CONSOLE (COMPONENT: inventoryAllTrucks)
```
	 id: "76e65726-e33f-4769-ba71-b97e276b89fd"
	 truckContents: "sdf"
	 truckManifest: ""
	 truckName: "TRUCK TEST"
	 truckPrice: "456"
	 __proto__: Object
```

🔵 Changed postTrucks fetch to include uploadManifest: 

```
//Fetching the trucks db from the API link above //^----POST (ADD INVENTORY)----
  const postTrucks = async () => {
    const uploadManifest = new FormData();
    uploadManifest.append("truckName", truckName);
    uploadManifest.append("truckPrice", truckPrice);
    uploadManifest.append("truckContents", truckContents);
    uploadManifest.append("truckManifest", truckManifest, truckManifest.name);
    if ((truckName != "", truckPrice != "")) {
      try {
        const response = await fetch(
          "http://143.110.225.28/api/v1/inventory/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: uploadManifest,
          }
        );
        return response.json();
      } catch (error) {
        console.log(error);
      }
    }
  };
```

🔴 ERROR C: Unhandled Rejection (TypeError): Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'.

🔵 Changed postTrucks fetch back to working version:

```
  //Fetching the trucks db from the API link above //^----POST (ADD INVENTORY)----
  const postTrucks = async () => {
    if ((truckName != "", truckPrice != "")) {
      try {
        const response = await fetch(
          "http://143.110.225.28/api/v1/inventory/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              truckName: truckName,
              truckPrice: truckPrice,
              truckContents: truckContents,
              truckManifest: truckManifest,
            }),
          }
        );
        return response.json();
      } catch (error) {
        console.log(error);
      }
    }
  };
```

🔴 ERROR B: react-dom.development.js:13231 Uncaught Error: Objects are not valid as a React child (found: [object File]). If you meant to render a collection of children, use an array instead.

🔵 Still have this error after submitting form. Truck does post to database. But Manifest is still empty string in console. 

```
	 id: "47332511-8e2b-45e8-9bc3-6b3b9cc57cc7"
	 truckContents: "dfg"
	 truckManifest: ""
	 truckName: "TESTING"
	 truckPrice: "456"
	 __proto__: Object
```
🔵 Tried removing the array index from the onChange and also tried wrapping in an array; each time I still got the same error (🔴error B)

* Changed from: `onChange={(e) => setTruckManifest(e.target.files[0])}`
* Changed to: `onChange={(e) => setTruckManifest(e.target.files)}`
* Changed to: `onChange={(e) => setTruckManifest([e.target.files[0]])}`

🔵 Tried uploading two files to see if that might trigger the array since there would be multiple files. Same error (🔴error B)

🟠 Changed files to value in onChange

* Changed to: `onChange={(e) => setTruckManifest([e.target.value[0]])}`

ERROR B is no longer an issue.

### Console on addInventory page reads:

`{id: "", truckName: "CHECKING WITH VALUE", truckPrice: "456", truckContents: "sdf", truckManifest: Array(1)}
id: ""
truckContents: "sdf"
truckManifest: ["C"]
truckName: "CHECKING WITH VALUE"
truckPrice: "456"
__proto__: Object `

THIS CONSOLE RESULT IS WHEN THE CODE FROM MANIFEST INPUT IS:

```
<input
              type="file"
              multiple
              name="truckManifest[]"
              className="truckload-inputs"
              onChange={(e) => setTruckManifest([e.target.value[0]])}
            />
```

# FETCH ISSUES

## 🟡 Post request no longer working 

🔴context.js:189 POST http://143.110.225.28/api/v1/inventory/ 500 (Internal Server Error)
postTrucks @ context.js:189

🔴Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 1

🟠Errors go away and posting is successful if contents + manifest (both of which are arrays) are commented out. The contents have not been edited on the front end. Edits were made on the back end to make contents + manifest an array instead of a string.

⚪Need to figure out a way to send over the data as an array without errors

🔵ATTEMPTED
```
            <input
              className="truckload-inputs"
              type="text"
              value={[truckContents]}
              onChange={(e) => setTruckContents(e.target.value)}
              placeholder="What's in the truck?"
            />
            <input
              type="file"
              multiple
              value={[truckManifest]}
              name="truckManifest[]"
              className="truckload-inputs"
              onChange={(e) => setTruckManifest(e.target.value)}
            />
```

🔴context.js:189 POST http://143.110.225.28/api/v1/inventory/ 500 (Internal Server Error)
postTrucks @ context.js:189

🔴VM1184:2 Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 1

🔵ATTEMPTED 
```
            <input
              className="truckload-inputs"
              type="text"
              value={[truckContents[0]]}
              onChange={(e) => setTruckContents(e.target.value)}
              placeholder="What's in the truck?"
            />
            <input
              type="file"
              multiple
              value={[truckManifest[0]]}
              name="truckManifest[]"
              className="truckload-inputs"
              onChange={(e) => setTruckManifest(e.target.value)}
            />
```
🔴 ERROR A: Uncaught DOMException: Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string. at HTMLInputElement.set [as value]

 🟠ERROR B was solved while still keeping e.target.files by changing newTrucks to an array instead of an object like so:
```      
const newTruck = [
        id,
        truckName,
        truckPrice,
        truckContents,
        truckManifest,
      ];
```
Was:
```   
   const newTruck = {
        id,
        truckName,
        truckPrice,
        truckContents,
        truckManifest,
      };
```

But now the post is still not showing on database, or in the list below the add truckLoad inputs. But the truckLoad is displaying all the data properly in the console on the page with the inputs.

Current errors:
🔴context.js:189 POST http://143.110.225.28/api/v1/inventory/ 500 (Internal Server Error)
postTrucks @ context.js:189
🔴VM1487:2 Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 1

 🟡truckLoad is printing in the console with the values as index position instead of truckName, truckPrice ect:
```
TruckLoad: 
[Array(5)]
0: Array(5)
0: ""
1: "asdf"
2: "asdf"
3: "asdf"
4: Array(1)
0: File {name: "id_rsa.pub", lastModified: 1613427861430, lastModifiedDate: Mon Feb 15 2021 14:24:21 GMT-0800 (Pacific Standard Time), webkitRelativePath: "", size: 579, …}
length: 1
```

🟠Wrapped contents of newTruck in an object; now I get this in the console:

```
TruckLoad: 
	1. [Array(1)]
		1. 0: Array(1)
			1. 0:
				1. id: ""
				2. truckContents: "asdf"
				3. truckManifest: [File]
				4. truckName: "asdf"
				5. truckPrice: "asdf"
```

CHANGE:
```
      let newTruck = [{
        id,
        truckName,
        truckPrice,
        truckContents,
        truckManifest,
      }];
```


🟠Put each value in object or array and got this:
```
TruckLoad: 
	1. [Array(5)]
		1. 0: Array(5)
			1. 0: {id: ""}
			2. 1: {truckName: "asdf"}
			3. 2: {truckPrice: "asdf"}
			4. 3: ["asdf"]
			5. 4: [Array(1)]
```

CHANGE:
```
      let newTruck = [
        {id},
        {truckName},
        {truckPrice},
        [truckContents],
        [truckManifest],
      ];
```

🟠Post is working again, but file still is not posting to db, and contents are not printing to the Inventory list on the add inventory page
[Changes - bitbucket commit](https://bitbucket.org/rldev2/twg/commits/add072b0fa893003bb37fc984074c1aa4f91ad28)


| CIRCLES | SQUARES | HEARTS | MORE |
| --- | ---| --- | ---|
|🔴🟠🟡🟢🔵🟣🟤⚫⚪🔘🛑 | 🟥🟧🟨🟩🟦🟪🟫⬛⬜🔲🔳 | ❤️🧡💛💚💜💙🤎🖤🤍♥️💔♡ | 🔺🔻🔷🔶🔹🔸 |  


