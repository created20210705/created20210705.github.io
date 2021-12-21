var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(37.63003404375192, 127.07633653685478),
        level: 4 // 확대 레벨 (1~14 클수록 축소됨)
    };
var map = new kakao.maps.Map(mapContainer, mapOption);

var restaurant = [
  {
    name: '롯데리아 공릉점',
    img: 'https://mblogthumb-phinf.pstatic.net/20160427_143/ppanppane_1461740401939t0xPQ_PNG/%B7%D4%B5%A5%B8%AE%BE%C6_%B7%CE%B0%ED_%285%29.png?type=w2',
    addr: '이태원로14길 21',
    tele: '02-977-2430',
    latlng: new kakao.maps.LatLng(37.62637458840914, 127.07434558876018),
    kind: 'food',
    tag1: '락토'
  },
  {
    name: '마이브라더스',
    img: '',
    addr: '노원구 공릉동 737번지',
    tele: '070-4227-7576',
    latlng: new kakao.maps.LatLng(37.62682978192174, 127.08173420429078),
    kind: 'food',
    tag1: '오보',
    tag2: '락토오보'
  }
];

var markArr = []; //마커를 담는 배열
var overlayArr = [];  //오버레이 담는 배열

// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
//var bounds = new kakao.maps.LatLngBounds();
for (var i = 0; i < restaurant.length; i++) {
  var data = restaurant[i];
  displayMarker(data);
  //bounds.extend(restaurant[i].latlng);
}

//functionㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

function displayMarker(data) {
  var marker = new kakao.maps.Marker({
    map: map,
    position : data.latlng
  });
  markArr.push(marker); //배열에 마커 추가

  var overlay = new kakao.maps.CustomOverlay({
    map: null,
    position: marker.getPosition()
  });

  //content 생성ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  var content = document.createElement('div');
  content.className = "wrap";

  var info = document.createElement('div');
  info.className = "info";
  content.appendChild(info);

  var title = document.createElement('div');
  title.innerHTML = data.name;
  title.className = "title";
  info.appendChild(title);

  var closeBtn = document.createElement('button');
  closeBtn.className = "close";
  closeBtn.onclick = function() {
    overlay.setMap(null);
  };
  title.appendChild(closeBtn);

  var body = document.createElement('div');
  body.className = "body";
  info.appendChild(body);

  var imgDiv = document.createElement('div');
  imgDiv.className = "img";
  body.appendChild(imgDiv);

  var img = document.createElement('img');
  img.src = data.img;
  img.width = "73";
  img.height = "70";
  imgDiv.appendChild(img);

  var desc = document.createElement('div');
  desc.className = "desc";
  body.appendChild(desc);

  var ellipsis = document.createElement('div');
  ellipsis.innerHTML = data.addr;
  ellipsis.className = "ellipsis";
  desc.appendChild(ellipsis);

  var tele = document.createElement('div');
  tele.innerHTML = '연락처: ' + data.tele;
  tele.className = "tele";
  desc.appendChild(tele);

  var tag1 = document.createElement('div');
  tag1.innerHTML = data.tag1;
  tag1.className = "tag";
  desc.appendChild(tag1);

  if (data.hasOwnProperty('tag2')) {
    var tag2 = document.createElement('div');
    tag2.innerHTML = data.tag2;
    tag2.className = "tag";
    desc.appendChild(tag2);
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  overlay.setContent(content);

  kakao.maps.event.addListener(marker, 'click', function() {
    overlay.setMap(map);
  });
  overlayArr.push(overlay); //배열에 오버레이 추가
}

function panTo(a){
  if(a=="Nowon"){
    var moveLatLon = new kakao.maps.LatLng(37.63003404375192, 127.07633653685478);
    map.panTo(moveLatLon);
  }
  if(a=="Gangnam"){
    var moveLatLon = new kakao.maps.LatLng(37.498065867898255, 127.02760560978642);
    map.panTo(moveLatLon);
  }
  if(a=="Seocho"){
    var moveLatLon = new kakao.maps.LatLng(37.49185700518922, 127.0076987269816);
    map.panTo(moveLatLon);
  }
  if(a=="Mapo"){
    var moveLatLon = new kakao.maps.LatLng(37.55728195019073, 126.92431954788557);
    map.panTo(moveLatLon);
  }
  if(a=="Yongsan"){
    var moveLatLon = new kakao.maps.LatLng(37.52911931485525, 126.96781430527618);
    map.panTo(moveLatLon);
  }
}

function findTag(keyWord){
  for (var i = 0; i < restaurant.length; i++) {
    if (restaurant[i].tag1 == keyWord || restaurant[i].tag2 == keyWord) {
      markArr[i].setMap(map);
      overlayArr[i].setMap(null);
    } else {
      markArr[i].setMap(null);
      overlayArr[i].setMap(null);
    }
  }
}

function deleteAll(){
  for (var i = 0; i < restaurant.length; i++) {
    markArr[i].setMap(null);
    overlayArr[i].setMap(null);
  }
}

function showAll(){
  for (var i = 0; i < restaurant.length; i++) {
    markArr[i].setMap(map);
    overlayArr[i].setMap(null);
  }
}

// function setBounds() {
//     map.setBounds(bounds);
// }
