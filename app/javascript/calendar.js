import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

document.addEventListener('turbolinks:load', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick(e){
      console.log(e)
      // ここにformData記載する？
      // イベントで取得したデータをGETリクエストで送って返ってきたデータを表示させる
    }
  });

  calendar.render();
});
