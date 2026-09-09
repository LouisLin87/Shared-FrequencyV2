var RadioCore = (function () {
  'use strict';
  var version = 'radio-1';
  var groups = ['生活頻率', '味覺訊號', '出走計畫', '相處模式'];
  var questions = [
    ['a1',0,'突然多出一個完全自由的下午，你會？','pick',['窩著充電','隨興出門']],
    ['a2',0,'鬧鐘響了，真實的你是…','pick',['一響就起床','再睡五分鐘','滑手機醒腦','直接設十個']],
    ['a3',0,'你的房間，是整齊派還是隨性派？','scale',['整齊到發光','亂中有秩序']],
    ['a4',0,'生活突然按下暫停，你最想做什麼？','pick',['補眠','追一部劇','散步放空','找人聊天']],
    ['a5',0,'比起早起的寧靜，你有多愛深夜？','scale',['早鳥本人','深夜才開機']],
    ['a6',0,'手機剩下 10% 電，你的反應？','pick',['立刻找充電','先用再說']],
    ['b1',1,'只能留下其中一樣，你選？','pick',['甜點','鹹食']],
    ['b2',1,'吃飯最難的那一刻：今天吃什麼？','pick',['熟悉的老店','沒吃過的新店','誰決定都可以','先看有無優惠']],
    ['b3',1,'你的吃辣能力在哪個位置？','scale',['一點都不行','越辣越開心']],
    ['b4',1,'週末早餐的理想畫面是？','pick',['蛋餅豆漿','麵包咖啡','早午餐拼盤','直接睡到午餐']],
    ['b5',1,'點餐時，你有多想試試新品？','scale',['老樣子最安心','新品全部來']],
    ['b6',1,'最後一口好吃的，你通常…','pick',['留到最後享受','一開始就吃掉']],
    ['c1',2,'旅行前一天，你的行李箱…','pick',['早就整理好了','現在才要開始']],
    ['c2',2,'如果明天就能出發，你想去哪裡？','pick',['海邊聽浪','山裡呼吸','城市亂逛','小鎮慢慢走']],
    ['c3',2,'旅行行程要安排得多詳細？','scale',['走到哪算哪','每小時都排好']],
    ['c4',2,'朋友臨時揪一場小冒險，你會？','pick',['立刻答應','先問有誰','先看預算','讓我想一晚']],
    ['c5',2,'面對刺激的遊樂設施，你的心跳？','scale',['我顧包包','再搭一次！']],
    ['c6',2,'出去玩，你更在意…','pick',['跟誰一起','去了哪裡']],
    ['d1',3,'心情不好的時候，你希望朋友…','pick',['陪我聊一聊','給我一點空間']],
    ['d2',3,'你的愛，最常出現在哪裡？','pick',['記得小細節','陪伴的時間','直接說出口','默默幫忙做事']],
    ['d3',3,'在一群新朋友裡，你的開機速度？','scale',['先安靜觀察','馬上聊成一片']],
    ['d4',3,'朋友遲到二十分鐘，你先做什麼？','pick',['買杯飲料等','傳訊息關心','開始碎念','自己先逛逛']],
    ['d5',3,'你回訊息的節奏比較像…','scale',['想到才回','看到就秒回']],
    ['d6',3,'收到驚喜時，你更喜歡…','pick',['熱鬧的大場面','只有彼此的小心意']]
  ].map(function(q){return {id:q[0],group:q[1],text:q[2],type:q[3],options:q[4]};});
  function get(id){return questions.filter(function(q){return q.id===id;})[0];}
  function select(count,rng){
    rng=rng||Math.random; count=count===12?12:8;
    var result=[];
    groups.forEach(function(_,group){
      var pool=questions.filter(function(q){return q.group===group;}).slice();
      for(var i=pool.length-1;i>0;i--){var j=Math.floor(rng()*(i+1)),t=pool[i];pool[i]=pool[j];pool[j]=t;}
      result=result.concat(pool.slice(0,count/4).map(function(q){return q.id;}));
    });return result;
  }
  function valid(ids,answers){return Array.isArray(ids)&&[8,12].indexOf(ids.length)>=0&&new Set(ids).size===ids.length&&Array.isArray(answers)&&answers.length===ids.length&&ids.every(function(id,i){var q=get(id);return q&&Number.isInteger(answers[i])&&answers[i]>=0&&answers[i]<(q.type==='scale'?5:q.options.length);});}
  function score(ids,host,guest){if(!valid(ids,host)||!valid(ids,guest))throw Error('答案格式不正確');var points=ids.map(function(id,i){return get(id).type==='scale'?100-25*Math.abs(host[i]-guest[i]):host[i]===guest[i]?100:0;});return {score:Math.round(points.reduce(function(a,b){return a+b;},0)/ids.length),points:points};}
  function label(q,a){return q.type==='scale'?['偏向「'+q.options[0]+'」','比較偏左','剛好中間','比較偏右','偏向「'+q.options[1]+'」'][a]:q.options[a];}
  function nickname(value){var s=String(value||'').trim().normalize('NFC');if(!s||Array.from(s).length>16||/[\u0000-\u001f\u007f<>\r\n]/.test(s)||/^[=+\-@]/.test(s))throw Error('暱稱請用 1–16 個字，不要以 =、+、-、@ 開頭。');return s;}
  return {version:version,groups:groups,questions:questions,get:get,select:select,valid:valid,score:score,label:label,nickname:nickname};
})();
