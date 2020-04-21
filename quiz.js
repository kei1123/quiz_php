$(function() {
  'use strict';

  $('.answer').on('click', function() {
    var $selected = $(this);
    if($selected.hasClass('correct') || $selected.hasClass('wrong')){
      return;
    }
    $selected.addClass('selected');
    var answer = $selected.text();

    $.post('/_answer.php', {
      answer: answer,
      token: $('#token').val()
    }).done(function(res) {
      $('.answer').each(function(){//マッチした各要素に対して、指定した関数を実行します。
        if ($(this).text() === res.correct_answer) {
          $(this).addClass("correct");
        }else {
          $(this).addClass('wrong');
        }
      });
      if (answer === res.correct_answer) {
        // correct!
        $selected.text(answer + '... CORRECT!');
      } else {
        // wrong!
        $selected.text(answer + '... WRONG!');
      }
      $('#btn').removeClass('disabled');
    });
  });

  $('#btn').on('click', function(){
    if(!$(this).hasClass('disabled')){
      location.reload();
    };
  })
});