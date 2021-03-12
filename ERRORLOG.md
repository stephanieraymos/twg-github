KEY:
 🔴ERRORS
 🟡THE ISSUE
 🔵ATTEMPTED SOLUTIONS
 🟢SOLUTIONS


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
🔵 Tried removing the array index from the onChange and still got the same error (🔴error B)

* Changed from: `onChange={(e) => setTruckManifest(e.target.files[0])}`
* Changed to: `onChange={(e) => setTruckManifest(e.target.files)}`

🔵 Tried uploading two files to see if that might trigger the array since there would be multiple files. Same error (🔴error B)