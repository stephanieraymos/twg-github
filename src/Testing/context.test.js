import React from "react";
import { render } from "@testing-library/react";
import { AppContext, useGlobalContext } from "../context";

const { isSideBarOpen } = useGlobalContext;

describe("context", () => {
  it("truckName is empty by default", () => {
    const { getByText } = render(
      <context>
        <useGlobalContext>
          {(value) => (
            <>
              <span>Is sidebar Open: {value.isSideBarOpen.toString()}</span>
            </>
          )}
        </useGlobalContext>
      </context>
    );

    expect(getByText("Is sidebar Open")).toBeTruthy();
  });

//   describe(".openSideBar", () => {
//     it("Opens the sidebar", () => {
//       const { getByText } = render(
//         <context>
//           <AppContext>
//             {(value) => (
//               <>
//                 <span>Is sidebar Open: {value.isSideBarOpen.toString()}</span>
//               </>
//             )}
//           </AppContext>
//         </context>
//       );
//     });
//   });
});
