import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

window.addEventListener('load', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick(e){
      console.log(e);
      // カレンダークリック時のリクエスト
      const dayData = e;
      const formData = new FormData(dayData);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/', true);
      xhr.responseType = 'json';
      xhr.send(formData)
      
      
    }
  });

  calendar.render();
});
