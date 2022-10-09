import React from "react";
const FilePicker = React.forwardRef((props, ref) => {
  return <input {...props} ref={ref} className="hidden" type={"file"} />;
});
export default FilePicker;
