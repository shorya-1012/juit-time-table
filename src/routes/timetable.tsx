import { CompactTimetable } from '@/components/compact-timetable'
import { FUllTimetable } from '@/components/full-timetable'
import { useIsMobile } from '@/hooks/use-mobile'
import type { CourseKey } from '@/utils/constants'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/timetable')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      course: search.course as CourseKey,
      batch: search.batch as string,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {

  const params = Route.useSearch()
  const isMobile = useIsMobile()

  if (isMobile == undefined) {
    return ;
  }

  if ( isMobile ) return <CompactTimetable {...params} />
  return <FUllTimetable />
}
