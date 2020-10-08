import React, { useState } from 'react';

export default function ToggleComponent(props) {
  const [on, setOn] = useState(false);

  const toggle = () => {
    setOn(!on);
  };
  return (
    <div>
      {props.children({
        on,
        toggle,
      })}
    </div>
  );
}
