/* Imports */

import { useContext, useEffect, useState } from "react";
import { ActionButtonData, HeaderContext, HeaderContextProps } from "../../contexts/HeaderContext";
import DropdownButton from "./DropdownButton";

/* Component Definition */

export default function Header () {

  const [previousPageName, setPreviousPageName] = useState<string | undefined>(undefined);
  const { actionButtonGroupData } = useContext<HeaderContextProps>(HeaderContext);

  /* Use Effect */

  // When the location changes, transform the path name to the page name,
  // and update the previousPagePath
  useEffect(() => {
    const previousPageName = lookUpPageNameFromPathName(window.location.pathname);
    console.log(previousPageName);
    setPreviousPageName(previousPageName);
  }, [window.location.pathname]);

  /* Render Component */

  return (<>
    <div className="header">
      {previousPageName &&
        <button className="button plain back">{previousPageName}</button>
      }
      <div className="action-button-group">
        {actionButtonGroupData.map((item: (ActionButtonData | ActionButtonData[]), index: number) => {
          // If the item is an array of action button objects
          if (Array.isArray(item)) {
            return <DropdownButton actionButtonDataArray={item} />;
          }
          // If the item is a action button object
          return <button key={index} className="button action" onClick={item.action}>{item.title}</button>
        })}
      </div>
    </div>
  </>);
}

/* Helper Function */

function lookUpPageNameFromPathName (pathname: string) {
  const pathArray = pathname.split('/');
  console.log(pathArray);
  if (pathArray.length < 1) return undefined;
  if (pathArray.length === 1) return pathname.slice(0, 1).toUpperCase() + pathname.slice(1);
  else return pathArray[1];
}