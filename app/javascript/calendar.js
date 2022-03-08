import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { create } from 'enhanced-resolve';

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
      xhr.send(formData);
      
      // 受信したデータの処理
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const card = xhr.response;
            const html = createHTML(card); // ビューができたタイミングでHTMLを作成する関数を追加する
            // 作成したHTMLを追加する処理を記述

          } else {
            alert('error');
          }
        }
      };
    }
  });

  calendar.render();
});
