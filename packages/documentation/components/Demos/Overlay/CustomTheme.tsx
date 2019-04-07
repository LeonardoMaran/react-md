import React, { FunctionComponent, Fragment } from "react";
import { Button } from "@react-md/button";
import { Overlay } from "@react-md/overlay";
import { List, ListItem } from "@react-md/list";
import { useToggle } from "@react-md/utils";

import "./custom-theme.scss";

const CustomTheme: FunctionComponent = () => {
  const { toggled, toggle, disable } = useToggle();
  return (
    <Fragment>
      <Button
        id="custom-theme-button"
        themeType="outline"
        theme="clear"
        onClick={toggle}
      >
        Show Overlay
      </Button>
      <Overlay
        id="custom-theme-overlay"
        onRequestClose={disable}
        visible={toggled}
        className="custom-theme-overlay"
      >
        <List className="custom-theme-overlay__list">
          {Array.from(new Array(10)).map((_, i) => (
            <ListItem id={`item-${i}`} key={i}>
              {`Item ${i + 1}`}
            </ListItem>
          ))}
        </List>
      </Overlay>
    </Fragment>
  );
};

export default CustomTheme;
