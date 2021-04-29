import { useInventoryContext } from "../../../inventory";

export const useAgingReport = () => {
  const { inventory } = useInventoryContext();

  let today = new Date();
  var priorDate = new Date().setDate(today.getDate()-30)

    inventory.map((item) => {
      const { created } = item;
      const createdDate = new Date(created);
      console.log("created date", createdDate);
      console.log("today", today);
      if (+createdDate < priorDate) {
        console.log("This was created more than 30 days ago");
      }
      console.log(priorDate)
      console.log(+today)
    });
};
