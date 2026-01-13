import { WEEK_DAYS } from "./constants"

export function getInitialDay() {
  const now = new Date()

  const hour = now.getHours()
  let dayIndex = now.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Map JS day → our index (Mon=0)
  if (dayIndex === 0) {
    dayIndex = 1 // Sunday → Monday
  }

  let index = dayIndex - 1 // Monday = 0

  // After 6 PM → next day
  if (hour >= 18) {
    index += 1
  }

  // Clamp to Saturday
  if (index >= WEEK_DAYS.length) {
    index = WEEK_DAYS.length - 1
  }

  return index
}


export function extractTimetableEntries(batch: string, data: string[]) {
  return {
    classType: "Lecture",
    courseCode: "25B11CI211",
    teacherCode: "AKR",
    venue: "CR18",
    batches: [batch],
  }
}
