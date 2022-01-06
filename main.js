window.onload = function () {


  var notice = new Howl({
    src: ['notice.mp3'],
    volume: 0.08,
    rate: 1.2,
  });
  var send = new Howl({
    src:['send.mp3']
  });


  var app = new Vue({
    el: '#app',
    data: {
      comments: 897,
      dbshow: false,
      reportshow: false,
      commentShow: false,
      message: 'Hello world!',
      editShow:true,
      introshow: true,
      
      dbList: [],
      editList: [],
      checkedComment:[],
      commentTimers:[],
      posts:[],
      allClicked:0,
      clickedCommentCount:0,
      userClicked:true,
      commentType: ['positive', 'negative', 'aggressive', 'neutral'],
      dbType: ['life', 'hobby', 'news', 'industry'],
      // ToDo 词库会被重复选择
      lifeContent: ['\uef7d','Today', 'Yesterday', 'Tomorrow', 'This Week', 'Dinner', 'Visit', 'Museum', 'Movie', 'Great', 'Exciting', 'Wonderful', ``],
      hobbyContent: ['Enjoyable', 'Fantastic', 'Relaxing', 'Entertaining', 'Hobby', 'Cooking', 'Dancing', 'Music', 'Singing'],
      newsContent: ['Meeting', 'Speaking', 'News', 'Disappointing', 'Excellent', 'Inspiring', 'Awful', 'Heartbreaking'],
      industryContent: ['\uec7f','Soccer Games', 'Actor', 'Singer', 'Unbelievable', 'Attractive', 'Genius'],

    },
    
    methods: {
      createPhone() {
        let phone = {}

      },
      selectedContent(x) {
        return x.type === 'hobby'
      },
      createWord() {
        let word = {}
        word.type = this.dbType[Math.floor(Math.random() * this.dbType.length)]
        let contentArr
        switch (word.type) {
          case 'life':
            word.bg = 'bg-light'
            contentArr = this.lifeContent
            break;
          case 'hobby':
            word.bg = 'bg-light'
            contentArr = this.hobbyContent
            break;
          case 'news':
            word.bg = 'bg-light'
            contentArr = this.newsContent
            break;
          case 'industry':
            word.bg = 'bg-light'
            contentArr = this.industryContent
            break;
        }
        word.content = contentArr[Math.floor(Math.random() * contentArr.length)]
        if(this.dbList.filter(x=>x.content===word.content).length===0){

          this.dbList.push(word)
//remove array ele
// this.dblist[x].splice(0,1)
        }
      },
      checkComment(e) {
        this.userClicked = true
        this.allClicked++
        this.clickedCommentCount++
        let arr = Array.from(e.target.classList);
        console.log(arr);
        activeCommentType = arr[arr.length - 1]
        console.log(activeCommentType);
        this.commentShow = true
        if(this.commentType.includes(activeCommentType))this.checkedComment.push(activeCommentType)
        if(this.clickedCommentCount>5){
          this.clickedCommentCount = 0
          this.makeComment()
        }
        
      },
      makeComment(){
        let timer = setInterval(() => {
          let grid = document.querySelector(`#grid${Math.floor(Math.random() * this.comments)}`)
          let commentType 
          if(this.checkedComment.length > 5){
             commentType = this.checkedComment[Math.floor(Math.random() * this.checkedComment.length)]
          }else{
            commentType = this.commentType[Math.floor(Math.random() * this.commentType.length)]
          }
          grid.classList.add(commentType)
      
          notice.play();

          // disappear
          setInterval(() => {
            grid.classList.remove(commentType);
          }, 4000)
        }, 1000)
        
        this.commentTimers.push(timer)
        console.log('timer added');
        console.log(this.commentTimers);
      },
      removeTimer(){
        console.log('clear a timer');
        if(this.commentTimers.length>2){
        let timer = this.commentTimers.pop()
        clearInterval(timer)
        console.log(this.commentTimers.length);}
      },
      send(){
        send.play();
        this.posts.push(this.editList)
        console.log(this.posts);
        this.editList = []

        this.editShow = false

        document.querySelectorAll('.post').forEach((post,i,l)=>{
          console.log('youmeiyou');
          console.log(l);
          post.style.filter = `blur(${l.length-i}px)`
        })
      },
      hideReport(e){
        console.log('click');
        let report = document.querySelector(".reportWindow");
        if(report){
          console.log(e.target);
          if(!report.contains(e.target)){
            this.reportshow = false;
          }
        }
      }
    },
    mounted() {
      for (let i = 0; i < 20; i++) {
        this.createWord()
      }

      this.makeComment()

      

      setInterval(()=>{
        if(!this.userClicked){
          console.log('NOT CLICKING');
          this.removeTimer()
        }else{
          // console.log();
          this.userClicked = false
        }
      },1000*10)

    
    }
  })





}
console.log(window.screen.width, window.screen.height);

let activeCommentType
function setup() {


  setTimeout(() => {
    let phone = document.querySelector('#phone')
    let cnv = createCanvas(phone.offsetWidth, 512)
    cnv.parent('#phoneCanvasBox')
  })
  colorMode(HSB,360,100,100)
  c = 0



  //TODO 等元素加载好以后才把画布注入
}

// function popIntro() {
//   var popWindow = document.getElementsByClassName('introWindow');
//   var popLayer = document.getElementsByClassName('introLayer');

//   popLayer.style.width = document.body.scrollWidth+"px";
//   popLayer.style.height = document.body.scrollHeight+"px";

//   popLayer.style.display = "block";
//   popWindow.style.display = "block";
// }

// function closeIntro() {
//   var popWindow = document.getElementsByClassName('introWindow');
//   var popLayer = document.getElementsByClassName('introLayer');

//   popLayer.style.display = "none";
//   popWindow.style.display = "none";
// }


function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function draw() {
  // background('red')
  clear()
  noStroke()
  switch (activeCommentType) {
    case 'aggressive':
      fill('#E82B47')

      triangle(0,0,phone.offsetWidth, 0,width / 2,min(mouseY,0))
      // resetMatrix();
      triangle(0,height,phone.offsetWidth, height,width / 2,min(mouseY,height) )

      // triangle(0, 0, phone.offsetWidth, 0, width / 2, min(mouseY,height))
      // translate(width/2, height/2)
      // rotate(frameCount / 100);
      // triangle(0, height, phone.offsetWidth, height, width / 2, max(0,mouseY))
      // translate(width/2, height/2)
      // rotate(frameCount / 100);
      break;
 
    case 'negative':
      fill('#17175E')
      push();
      translate(width/2, height/2);
      rotate(frameCount / 100);
      star(0, 0, 30+Math.floor(map(mouseX,0,window.innerHeight,0,200)), 
      60+Math.floor(map(mouseY,0,window.innerHeight,0,200)), 5+Math.floor(map(mouseY,0,window.innerHeight,0,10)));
      pop();
      break;

    case 'positive':
      fill(169,92, map(mouseY, 0, window.innerHeight,40,100))
      ellipseMode(CENTER);
      translate(width / 2, height);
      translate(p5.Vector.fromAngle(-millis()/1000, 170));
      ellipse(30,0,500,500);
      // large
      
      resetMatrix();
      blendMode(SCREEN);
      fill(map(mouseX, 0, window.innerWidth,160,175),89,62)
      ellipseMode(CENTER);
      translate(width / 3, height / 3);
      translate(p5.Vector.fromAngle(millis()/500, 100));
      ellipse(0,50,300,300);
      // medium

      resetMatrix();
      fill('#089A86')
      blendMode(OVERLAY)
      ellipseMode(CENTER);
      translate(width , height / 2);
      translate(p5.Vector.fromAngle(millis()/400, 200));
      ellipse(0,0,150,150);
      // small
      break;

    case 'neutral':
      resetMatrix();
      fill('#F7943D')
      ellipseMode(CENTER)
      translate(p5.Vector.fromAngle(millis()/700, 70));
      ellipse(width / 2 , height / 2 , Math.floor(map(abs(mouseX), 0, window.innerWidth, 400, 1000)))      
      erase()
      ellipse(width / 2 , height / 2 , Math.floor(map(abs(mouseY), 0, window.innerHeight, 100, 400)))
      noErase()
      break;
  }

}







