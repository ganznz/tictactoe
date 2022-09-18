// iterate an event over a node list
export const iterateEventOverNodeList = (list, event, fn) => {
  for (item in list) {
    addEventListener(event, fn);
  }
}