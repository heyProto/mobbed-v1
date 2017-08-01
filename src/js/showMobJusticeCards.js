function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  xhr.send();
};

console.log(document.getElementsByClassName('latest-incidents')[0].style, "----")

if (document.getElementsByClassName('latest-incidents')[0].style.display === '') {
  getJSON('https://dwln9tzsi7g07.cloudfront.net/toMobJustice/index.json', function (err, data){
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      let filteredData = data.slice(0,7)
      filteredData.map((d,i) => {
        let createDiv = document.createElement('div');
        createDiv.id = 'ProtoCard-'+i
        document.getElementById('display-cards').appendChild(createDiv)
        new ProtoEmbed.initFrame(document.getElementById("ProtoCard-"+i), "https://dwln9tzsi7g07.cloudfront.net/1cc352b8dae0/index.html?view_cast_id="+filteredData[i].view_cast_id+"&schema_id="+filteredData[i].schema_id, 'mobile')
      })
    }
  })
}


// <div id="ProtoCard-368"><blockquote><h3>When the nation is charged up, for vengeance</h3><p>Cow vigilantes and self-proclaimed ghazis don’t need state legitimacy to carry out the violent actions that they engage in. The problem starts when the state itself remains silent against such heinous crimes</p></blockquote></div><script type="text/javascript">new ProtoEmbed.initFrame(document.getElementById("ProtoCard-368"), "https://dwln9tzsi7g07.cloudfront.net/62e2f4c97971/index.html?view_cast_id=d3a679b363b8428a397bfbb2&schema_id=0dd3de0c92b4" , 'laptop')</script>

// <div id="ProtoCard-369"><blockquote><h3>Crime and context</h3><p>Lynchings draw upon the master narrative of cow protection promoted by the current political elites</p></blockquote>
// </div><script type="text/javascript">new ProtoEmbed.initFrame(document.getElementById("ProtoCard-369"), "https://dwln9tzsi7g07.cloudfront.net/62e2f4c97971/index.html?view_cast_id=37d641bfb7e688d3c36acf13&schema_id=0dd3de0c92b4" , "laptop")</script>

//               <div id="ProtoCard-370">
//               <blockquote><h3>We, the Cows</h3><p>All cows are created equal, but cows born in Karnal or Kanpur or Alwar are more equal than cows born in Kochi or Kohima or Imphal. Every week mobs are lynching, torturing and humiliating innocent Muslims and Dalits in the name and under the pretext of cow protection.</p></blockquote>
//             </div><script type="text/javascript">new ProtoEmbed.initFrame(document.getElementById("ProtoCard-370"), "https://dwln9tzsi7g07.cloudfront.net/62e2f4c97971/index.html?view_cast_id=df727995608f6557b1026f71&schema_id=0dd3de0c92b4" , "laptop")</script>
//               <div id="ProtoCard-371">
//               <blockquote><h3>The PM’s Trail: Is this my country, the country of Bapu?</h3><p>Prime Minister Narendra Modi’s angry remarks at Sabarmati about those killing innocents in the name of the cow doesn’t seem to be shared by the CMs of states where the killings are taking place.</p></blockquote>
//             </div><script type="text/javascript">new ProtoEmbed.initFrame(document.getElementById("ProtoCard-371"), "https://dwln9tzsi7g07.cloudfront.net/62e2f4c97971/index.html?view_cast_id=fa7fab2d00dc3177d9674adb&schema_id=0dd3de0c92b4" , "laptop")</script>
//               <div id="ProtoCard-372">
//               <blockquote><h3>Is India becoming a Hindu Pakistan?</h3><p>Mohammed Ayub’s killing in Kashmir has kindled a sense of shame in the community; but the ghastly silence over 15-year-old Junaid Khan’s murder is a national outrage.</p></blockquote>
//             </div><script type="text/javascript">new ProtoEmbed.initFrame(document.getElementById("ProtoCard-372"), "https://dwln9tzsi7g07.cloudfront.net/62e2f4c97971/index.html?view_cast_id=864d55f4bfc575d4b33d9be4&schema_id=0dd3de0c92b4" , "laptop")</script>

//               <div id="ProtoCard-373">
//               <blockquote><h3>Junaid’s murder</h3><p>The quietude of the BJP-ruled governments in the states and of the Narendra Modi-led Centre — in stark contrast to their regular drum-beating on definitions and tests of nationalism/Indian-ness — and the heavy-footedness of the law enforcement machinery in the aftermath, implicates them in every such attack.</p></blockquote>
//             </div><script type="text/javascript">new ProtoEmbed.initFrame(document.getElementById("ProtoCard-373"), "https://dwln9tzsi7g07.cloudfront.net/62e2f4c97971/index.html?view_cast_id=178a302b74b98681b8a8b136&schema_id=0dd3de0c92b4" , "laptop")</script>
//               <div id="ProtoCard-374">
//               <blockquote><h3>May the silent be damned</h3><p>A big riot would concentrate the mind, make a damning headline. A protracted riot in slow motion, individual victims across different states, simply makes this appear another daily routine. This makes opposing it harder; it makes holding onto the outrage nearly impossible.</p></blockquote>
//             </div><script type="text/javascript">new ProtoEmbed.initFrame(document.getElementById("ProtoCard-374"), "https://dwln9tzsi7g07.cloudfront.net/62e2f4c97971/index.html?view_cast_id=d3294210cb55a488b912c38e&schema_id=0dd3de0c92b4" , "laptop")</script>

//               <div id="ProtoCard-375">
//               <blockquote><h3>In the Republic of lynching</h3><p>In this sense the lynch squad is not pathological but part of the normalcy of a paranoid society, of a politics of suspicion which has no purpose. Rumor becomes a way of processing anxiety. It is almost as if violence has a social function when law breaks down.</p></blockquote>
//             </div><script type="text/javascript">new ProtoEmbed.initFrame(document.getElementById("ProtoCard-375"), "https://dwln9tzsi7g07.cloudfront.net/62e2f4c97971/index.html?view_cast_id=6d1680eb3214f495b3861f21&schema_id=0dd3de0c92b4" , "laptop")</script>