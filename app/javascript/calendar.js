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
    headerToolbar: {
      left: '',
      center: 'title',
      right: 'prev,today,next'
    },
    // 日本語化
    locale: 'ja',
    buttonText: {
      prev: '<',
      next: '>',
      today: '今日',
    },
    //スクロールをなし
    contentHeight: 'auto',
    //日付の”日”を取る
    dayCellContent: function (e) {
      e.dayNumberText = e.dayNumberText.replace('日', '');
    },
    //6週間表示を調整
    fixedWeekCount: false,
    // イベントの情報にeventsデータを指定する
    events: events,
    dateClick(e) {
      // カレンダーをクリックして取得した日付データを付けてcardアクションへリクエストを送る
      $.ajax({
        url: 'incomes/card/',
        type: 'get',
        async: true,
        data: { date: e.dateStr, }
      })
        // 通信がうまくいった場合の処理
        .done(function (response) {
          // カードリストの日付を表示
          $('#date').html(e.dateStr)
          // カードの要素を全て削除
          $('#list').html('')
          // レスポンスのデータを追加していく。ActiveHashの名前を取得できなかったのでifで条件分岐により実装してみた
          $.each(response, function (index, val) {
            if (val['income_item_id'] === 2) {
              $('#list').append(`
          <li class="list-group-item">給料: ${val['amount']}円</li>
          `)
            }
            if (val['income_item_id'] === 3) {
              $('#list').append(`
            <li class="list-group-item">臨時収入: ${val['amount']}円</li>
            `)
            }
            if (val['income_item_id'] === 4) {
              $('#list').append(`
            <li class="list-group-item">その他: ${val['amount']}円</li>
            `)
            }
          })
        })
        // 通信に失敗したらアラート
        .fail(function () {
          alert('error');
        });
    },
  })

  calendar.render();
});
