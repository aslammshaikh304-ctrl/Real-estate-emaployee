"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo } from "react";

interface Props {
  visits: any[];
  followups: any[];
}

export default function CalendarClient({
  visits,
  followups,
}: Props) {

  const events = useMemo(() => {

    const siteVisitEvents =
      visits.map((visit) => ({
        id: `visit-${visit.id}`,
        title: `🏠 ${visit.property_name}`,
        date: visit.visit_date,
        color: "#22C55E",
        url: `/site-visits/${visit.id}`,
      }));

    const followupEvents =
      followups.map((followup) => ({
        id: `followup-${followup.id}`,
        title: `📞 ${followup.followup_message}`,
        date: followup.followup_date,
        color: "#F59E0B",
        url: `/followups`,
      }));

    return [
      ...siteVisitEvents,
      ...followupEvents,
    ];

  }, [visits, followups]);

  return (

    <div className="bg-white rounded-xl shadow border p-4">

      <FullCalendar

        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
        ]}

        initialView="dayGridMonth"

        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}

        height="80vh"

        events={events}

        eventClick={(info) => {

          info.jsEvent.preventDefault();

          window.location.href =
            info.event.url!;

        }}

      />

    </div>

  );

}