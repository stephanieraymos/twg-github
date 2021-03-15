KEY:
🔴ERRORS
🟡THE ISSUE
🔵ATTEMPTED SOLUTIONS
🟠PARTIAL SOLUTIONS
🟢SOLUTIONS
⚪SUGGESTED SOLUTIONS

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

🟠FILE IS POSTING TO DATABASE! But contents are still not printing to the Inventory list on the add inventory page
[Changes - bitbucket commit](https://bitbucket.org/rldev2/twg/commits/62d5446827153d6b1f2cf924dad6c63c6027667f)

🟣Need to find solution for fetching file
