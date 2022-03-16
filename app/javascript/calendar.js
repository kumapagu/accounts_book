import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

window.addEventListener('load', function () {
  var calendarEl = document.getElementById('calendar');
  // incomeのデータをeventsに入れる
  const events = [];
  gon.incomes.forEach((income) => {
    events.push({
      title: income.total_amount,
      start: income.date,
      end: income.date,
      backgroundColor: '#d1ffff',
      borderColor: '#d1ffff',
      textColor: 'blue'
    });
  });

  // expenseのデータをeventsに入れる

  var calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    // イベントの情報にeventsデータを指定する
    events: events,
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
    },
  })

  calendar.render();
});
