import { useInventoryContext } from "../../../inventory";

export const useAgingReport = () => {
  const { inventory } = useInventoryContext();

  let today = new Date();
  var priorDate = new Date().setDate(today.getDate() - 30); //Today 30 days ago

  const createdList = inventory.map((item) => new Date(item.created)); //Creating an array of each instance of created and putting it into an array, parsed to a Date.
//   console.log(createdList);

  createdList.forEach((val) => { //Grabbing each individual date from createdList and checking to see if it's been created for 30 days or more.
    if (val < priorDate) {
      console.log("This was created more than 30 days ago");
    }
  });
  // inventory.map((item) => {
  //   const { created } = item;

  //   console.log("created", created)

  //   const createdDate = new Date(created);
  //   console.log(typeof createdDate)
  //   console.log("created date", createdDate);
  //   console.log("today", today);
  //   if (+createdDate < priorDate) {
  //     console.log("This was created more than 30 days ago");
  //   }
  //   console.log("prior date", priorDate)
  //   console.log("today parsed to number", +today)
  // });
};
