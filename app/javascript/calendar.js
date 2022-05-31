import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

window.addEventListener('load', function () {
  var calendarEl = document.getElementById('calendar');
  // 選択した日付部分色付けようの変数を宣言
  let dateVal
  // incomeのデータをeventsに入れる
  const events = [];
  gon.incomes.forEach((income) => {
    events.push({
      title: income.total_amount,
      start: income.date,
      end: income.date,
      backgroundColor: '#bbe2f1',
      borderColor: '#bbe2f1',
      textColor: 'blue'
    });
  });

  // expenseのデータをeventsに入れる
  gon.expenses.forEach((expense) => {
    events.push({
      title: expense.total_amount,
      start: expense.date,
      end: expense.date,
      backgroundColor: '#fdede4',
      borderColor: '#fdede4',
      textColor: 'red'
    });
  });

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
          // 収入エリアのカードの要素を全て削除
          $('#income-list').html('')
          $('#expense-list').html('')
          // レスポンスのデータを追加していく。ActiveHashの名前を取得できなかったのでifで条件分岐により実装してみた
          $.each(response, function (index, val) {
            if ('income_item_id' in val) { // income_item_idのキーがあればincome-listへappend
              if (val['income_item_id'] === 2) {
                $('#income-list').append(`
                <li class="list-group-item">給料: ${val['amount']}円<a href="/incomes/${val['id']}/edit" type="button" data-bs-toggle="modal" data-bs-target="#editModal">編集</a></li>
                `)
              }
              if (val['income_item_id'] === 3) {
                $('#income-list').append(`
                <li class="list-group-item">臨時収入: ${val['amount']}円<a type="button" class="rounded-circle" data-bs-toggle="modal" data-bs-target="#editModal">編集</a>/li>
                `)
              }
              if (val['income_item_id'] === 4) {
                $('#income-list').append(`
              <li class="list-group-item">その他: ${val['amount']}円<a type="button" class="rounded-circle" data-bs-toggle="modal" data-bs-target="#editModal">編集</a></li>
              `)
              }
            }
            if ('expenditure_item_id' in val) { // expenditure_item_idのキーがあればexpense-listへappend
              if (val['expenditure_item_id'] === 2) {
                $('#expense-list').append(`
                <li class="list-group-item">食費: ${val['amount']}円</li>
                `)
              }
              if (val['expenditure_item_id'] === 3) {
                $('#expense-list').append(`
              <li class="list-group-item">日用品: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 4) {
                $('#expense-list').append(`
              <li class="list-group-item">交通費: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 5) {
                $('#expense-list').append(`
              <li class="list-group-item">趣味娯楽: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 6) {
                $('#expense-list').append(`
              <li class="list-group-item">衣服: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 7) {
                $('#expense-list').append(`
              <li class="list-group-item">美容: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 8) {
                $('#expense-list').append(`
              <li class="list-group-item">交際費: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 9) {
                $('#expense-list').append(`
              <li class="list-group-item">教養: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 10) {
                $('#expense-list').append(`
              <li class="list-group-item">通信: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 11) {
                $('#expense-list').append(`
              <li class="list-group-item">住宅: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 12) {
                $('#expense-list').append(`
              <li class="list-group-item">水光熱費: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 13) {
                $('#expense-list').append(`
              <li class="list-group-item">医療: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 14) {
                $('#expense-list').append(`
              <li class="list-group-item">保険: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 15) {
                $('#expense-list').append(`
              <li class="list-group-item">投資: ${val['amount']}円</li>
              `)
              }
              if (val['expenditure_item_id'] === 16) {
                $('#expense-list').append(`
              <li class="list-group-item">その他: ${val['amount']}円</li>
              `)
              }
            }
          })
          // 前回選択した日付の情報でCSSのbackground-colorを初期化
          $(`td[data-date = ${dateVal}]`).css("background-color", "")
          // 選択した日付にCSSを設定
          $(`td[data-date = ${e.dateStr}]`).css("background-color", "#fdf5e6")
          dateVal = e.dateStr
        })
        // 通信に失敗したらアラート
        .fail(function () {
          alert('error');
        })
    },
  })
  calendar.render();
});
