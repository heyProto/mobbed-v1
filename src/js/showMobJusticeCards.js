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