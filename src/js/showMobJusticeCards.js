setTimeout(function(){
  $('.animate-number').each(function () {
    $(this).prop('Counter',0).animate({
      Counter: $(this).text()
    },{
      duration: 2000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  }); 
},1000)

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

if (document.getElementsByClassName('latest-incidents')[0].style.display === '') {
  getJSON('https://cdn.protograph.pykih.com/toReportViolence/index.json', function (err, data){
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      let start_date_split = (new Date (data[data.length - 1].date)).toDateString().split(" "),
        end_date_split = (new Date (data[0].date)).toDateString().split(" "),
        start_date = start_date_split[2] + " " + start_date_split[1] + " '" + start_date_split[3].slice(-2),
        end_date = end_date_split[2] + " " + end_date_split[1] + " '" + end_date_split[3].slice(-2);
        
      document.getElementById('animate-number').innerHTML = data.length;
      document.getElementById('start-date').innerHTML = start_date;
      document.getElementById('end-date').innerHTML = end_date;
      let filteredData = data.slice(0,7),
        mob_cards = '';
      filteredData.map((d,i) => {
        let img = filteredData[i].image ? filteredData[i].image : filteredData[i].screen_shot_url
        mob_cards += '<div id="ProtoCard-'+ i +'" class="mob-justice-incidents">' +
          '<img class="card-image" src="'+img+ '" width="100%"/>'+
          '<div class="protograph-gradient">'+
            '<div class="data-card-content">'+
              '<div class="data-card-title">' + filteredData[i].title + '</div>'+
              '<div class="data-card-date">' + filteredData[i].date +'</div>' +
              '</div>'+
            '</div>'+
          '</div>'
        document.getElementById('display-cards').innerHTML = mob_cards
      })
      let dimension = getScreenSize(), mode;
      if (dimension.width <= 400){
        mode = 'mobile';
      } else {
        mode = 'laptop';
      } 
      for (let i=0; i<7; i++) {
        let createDiv = document.createElement('div');
          createDiv.id = 'ProtoCard-'+i
        document.getElementById('ProtoCard-'+i).addEventListener('click', function (d) {
          $('.ui.modal').modal({
            onHidden: function(e) {
              let element = document.querySelector("#proto-embed-card iframe");
              element.parentNode.removeChild(element);
            },
            onVisible: function () {
              $("#proto-modal").addClass('scrolling')
            }
          }).modal('attach events', '.close').modal('show')
          if (mode === 'laptop') {
            let pro = new ProtoEmbed.initFrame(document.getElementById("proto-embed-card"), filteredData[i].iframe_url, 'laptop')
          } else {
            let pro = new ProtoEmbed.initFrame(document.getElementById("proto-embed-card"), filteredData[i].iframe_url, 'mobile', true)
          } 
        })
      }
    }
  })
}
// Articles section
getJSON('https://s3.ap-south-1.amazonaws.com/dev.cdn.protograph/toReportViolence/articles.json', function (err, data){
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      data.map((d,i) => {
        let createDiv = document.createElement('div');
        createDiv.id = 'ProtoCard-article'+i
        createDiv.className= 'ProtoCard-article'
        document.getElementById('display-stories').appendChild(createDiv)
        new ProtoEmbed.initFrame(document.getElementById("ProtoCard-article"+i), data[i].iframe_url, 'laptop')
      })
    }
})

//twitter chatter

// let interval = setInterval(function(){   
  getJSON('https://cdn.protograph.pykih.com/toReportViolence/twitter.json', function (err, data){
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      // let tweets='<div class="ui feed"><br>';
      let tweets = '';
      data.map((d,i) => {       
        tweets += '<div style="margin-bottom:20px;padding:5px;"><a href="'+d.canonical+'" target="_blank" class="protograph-url">' +
          '<div>'+
            '<img class="tolink-profile-image" src="'+d.author_image+'">'+
          '</div>'+         
          '<div>'+
            '<div>'+d.author+'</div>'+
            '<div class="tolink-light-text">@'+d.twitter_handle+'</div>'+
            '<div>'+d.description+'</div>'+
          '</div>'+
        '</a></div>' 
      document.getElementById('display-tweets').innerHTML = tweets;   
      })
    }
  })
// }, 1000)

function getScreenSize() {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;

  return {
    width: width,
    height: height
  };
}

// tweets += 
//           '<div class="event">'+
//             '<div class="label">'+
//               '<img src="'+d.author_image+'">'+
//             '</div>'+
//             '<div class="content">'+
//               '<div class="date">@'+d.twitter_handle+'</div>'+
//               '<div class="summary">'+d.author+ '</div>'+
//               '<div class="extra text">'+ d.description+'</div>'+             
//             '</div>'+
//           '</div>'