import React from "react";
import Navigation from "./Navigation";
import contact from "../css/contact.css";

const Contact = () => {
  document.title = "Contact";

  return (
    <>
      <div className="about">
        <p>
          Founded in 2009 by Ryan Babineau and Larry Morgan, RL Liquidators has
          quickly grown to be the largest liquidation company in the western
          United States. When RL Liquidators started in 2009, Ryan and Larry
          each had over twenty years of experience in the retail and logistics
          industries. As they met with companies that needed liquidation
          services and those that offered them, they quickly realized that the
          liquidation side of the industry was not adequately adapting to the
          rapidly changing retail landscape. It became clear that the
          liquidation services available were quickly becoming obsolete as the
          needs of the industry changed. Retailers, manufacturers and those in
          distribution were beginning to require services that many liquidation
          companies did not provide. Responding to those needs, Ryan and Larry
          have spent the last decade creating and developing the tools,
          processes, facilities, equipment, software and teams to meet them;
          both now and far into the future. The bullet points below outlines
          only some of the advantages RL Liquidators brings to the Reverse
          Logistics Liquidation landscape.
        </p>
        <p>
          RL Liquidators created multiple proprietary B2C sales channels
          designed to move any category of retail product, at any volume, while
          producing the highest recovery rates in the industry. We do not rely
          on any third party websites or liquidation outlets. All sales channels
          are owned and operated by RL Liquidators to ensure we maintain
          complete control over where inventory is sold.
        </p>
        <p>
          The WholeSale Group is the newest of the sales channels and will offer
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum id
          hic repellat doloribus facilis saepe vero? Vel commodi natus nisi
          animi ratione dicta aliquid aspernatur!
        </p>
      </div>
      <div className="emails">
        <p>Sales: email@email.com</p>
        <p>Support: email@email.com</p>
        <p>Upline: email@email.com</p>
      </div>
    </>
  );
};

export default Contact;

// TP-43
