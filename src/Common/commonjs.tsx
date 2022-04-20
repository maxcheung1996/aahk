export function _uuid() {
  var d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getStatusText(Status: string) {
  switch (Status) {
    case "IN_PROGRESS":
      return "In Progress";
      break;
    case "PROCESSING":
      return "Processing";
      break;
    case "REJECT":
      return "Reject";
      break;
    case "WF_IN_PROGRESS":
      return "Workflow In Progress";
      break;
    default:
      return "";
      break;
  }
}

export function getStatusColor(Status: string) {
  switch (Status) {
    case "IN_PROGRESS":
      return "primary";
      break;
    case "PROCESSING":
      return "success";
      break;
    case "REJECT":
      return "danger";
      break;
    case "WF_IN_PROGRESS":
      return "warning";
      break;
    default:
      return "";
      break;
  }
}
