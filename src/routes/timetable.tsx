import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timetable')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      course: search.course as string,
      batch: search.batch as string,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timetable"!</div>
}
