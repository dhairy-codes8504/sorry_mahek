$(function(){
  let current=1;
  const letter = `Mahek,<br><br>
  I'm sorry.<br><br>
  Not because I got selected for Winnipeg. I'm genuinely grateful and excited about that opportunity. I'm sorry because when you were hurt about our plan getting cancelled, instead of understanding you, I became angry.<br><br>
  And the worst thing I did was make you feel like your disappointment meant you weren't happy for me. That wasn't fair to you.<br><br>
  You were hurt because you wanted to meet me. And honestly, knowing that should have made me feel loved — not angry.<br><br>
  I can't take those words back, but I can take responsibility for them. I'm sorry for hurting you when I should have understood you. ❤️`;

  function showLayer(n){
    $('.layer').removeClass('active');
    $('#layer-'+n).addClass('active');
    current=n;
    if(n===6){
      $('#letter-text').html('');
      typeLetter(letter);
    }
  }
  function typeLetter(text){
    let i=0, out='';
    // reveal HTML-aware in small chunks for a gentle letter effect
    const parts=text.split(/(<br>)/g);
    let p=0;
    function add(){
      if(p<parts.length){
        out+=parts[p++];
        $('#letter-text').html(out);
        setTimeout(add, parts[p-1]==='<br>'?160:45);
      }
    }
    add();
  }
  $(document).on('click','.next',function(){showLayer(Number($(this).data('next')));});
  $('#yesBtn').on('click',function(){
    $('#final-response').html('Thank you, my love. ❤️<br><small>I hope we can smile again soon.</small>');
    burst();
  });
  $('#timeBtn').on('click',function(){
    $('#final-response').html('That’s okay. Take your time. ❤️<br><small>I just wanted you to know that I’m genuinely sorry.</small>');
  });

  function burst(){
    for(let i=0;i<35;i++){
      const h=$('<span class="floating-heart">♥</span>');
      h.css({left:(45+Math.random()*10)+'vw',top:(55+Math.random()*10)+'vh',fontSize:(12+Math.random()*24)+'px',animationDuration:(2+Math.random()*2)+'s'});
      $('body').append(h); setTimeout(()=>h.remove(),4500);
    }
  }
  function ambient(){
    const h=$('<span class="floating-heart">♥</span>');
    h.css({left:Math.random()*100+'vw',top:(80+Math.random()*20)+'vh',fontSize:(8+Math.random()*15)+'px',animationDuration:(6+Math.random()*6)+'s'});
    $('body').append(h); setTimeout(()=>h.remove(),13000);
    if(Math.random()>.35){
      const p=$('<span class="petal">🌹</span>');
      p.css({left:Math.random()*100+'vw',top:'-30px',fontSize:(12+Math.random()*13)+'px',animationDuration:(7+Math.random()*6)+'s'});
      $('body').append(p); setTimeout(()=>p.remove(),14000);
    }
  }
  setInterval(ambient,650);

  // AJAX: load the optional JSON content, while keeping the page usable offline.
  $.getJSON('data/apology.json').done(function(data){
    if(data && data.signature) $('.signature').text('— '+data.signature+' ❤️');
  });

  setTimeout(function(){$('#loader').fadeOut(700,function(){$('#app').removeClass('d-none');});},1100);
});