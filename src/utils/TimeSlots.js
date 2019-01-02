import NP from "number-precision";
import dates from "./dates";
import moment from "moment";

export function getSlotMatrics({ min: start, max: end, step, timeslots }) {
  const totalMin = dates.diff(start, end, "minutes");
  const minutesFromMidnight = dates.diff(
    moment(start).startOf("day"),
    start,
    "minutes"
  );
  const numGroups = Math.ceil(NP.divide(totalMin, NP.times(step, timeslots)));
  const numSlots = NP.times(numGroups, timeslots);
  const groups = Array.from({ length: numGroups });
  const slots = Array.from({ length: numSlots });

  for (let grp = 0; grp < numGroups; grp += 1) {
    groups[grp] = Array.from({ length: timeslots });
    for (let slot = 0; slot < timeslots; slot += 1) {
      const slotIdx = NP.plus(NP.times(grp, timeslots), slot) + 1;
      const minutesFromStart = slotIdx * step;
      slots[slotIdx] = groups[grp][slot] = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        0,
        NP.plus(minutesFromMidnight, minutesFromStart),
        0
      );
    }
  }

  // Necessary to be able to select up until the last timeslot in a day
  const lastSlotMinFromStart = NP.times(slots.length, step);
  slots.push(
    new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      0,
      NP.plus(minutesFromMidnight, lastSlotMinFromStart),
      0
    )
  );
  return {
    groups
  };
}
