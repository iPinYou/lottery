<template>
	<div class="continer">
    <div id="container">
    </div>
    <canvas id='canvas' style="display: none"></canvas>
    <video id="backgroundVideo" muted autoplay="autoplay" loop style="width: 100%;">
        <source src="./static/video/backVA.mp4"/>
    </video>
    <!--<audio id="backgroundAudio" autoplay loop src="./static/video/song.mp3"></audio>-->
    <audio id="backgroundAudioRun" loop src="./static/video/song2.mp3"></audio>
    <template v-if="currentGradeName===''">
      <div class="winner-list" v-bind:style="{marginTop: maxHeight*0.35 + 'px'}" v-if="showWinnerList">
        <!--<h2>{{currentGradeName}}中奖名单</h2>-->
        <table>
          <tr v-for="winner in awardWinners">
            <td class="grade-name">
              {{winner.gradeName}}
            </td>
            <td class="winner-name">
              <span v-for="person,index in winner.winners"><template v-if="index>0">，</template>{{person.name}}</span>
            </td>
          </tr>
        </table>
      </div>
    </template>
    <template>
      <div class="winner-list-5" v-bind:style="{width:maxWidth*0.6+'px',marginTop: maxHeight*0.3 + 'px'}" v-if="showWinnerList">
        <!--<h2>{{currentGradeName}}中奖名单</h2>-->
        <template  v-for="winner in awardWinners">
          <div>
            <div class="winner-div" v-for="person,index in winner.winners "  v-if="index<5">
              <!--<img v-bind:src=person.avatar />-->
              <div class="winner-name">{{person.name}}</div>
            </div>
          </div>
          <div style="margin-top:10px;">
            <div class="winner-div" v-for="person,index in winner.winners "  v-if="index>=5 && index<10">
              <!--<img v-bind:src=person.avatar />-->
              <div class="winner-name">{{person.name}}</div>
            </div>
          </div>
          <div style="margin-top:10px;">
            <div class="winner-div" v-for="person,index in winner.winners "  v-if="index>=10 && index<15">
              <!--<img v-bind:src=person.avatar />-->
              <div class="winner-name">{{person.name}}</div>
            </div>
          </div>
        </template>
      </div>
      <div class="winner-div-continer continer-5" v-bind:style="{width:maxWidth*0.8+'px',marginTop: maxHeight*0.4 + 'px'}" v-if="!showWinnerList&&begin">
        <div class="winner-div" v-for="winner,i in currentWinners " v-show="!ready">
          <!--<img v-bind:src=winner.avatar />-->
          <div class="winner-name">{{winner.name}}</div>
        </div>
      </div>
      <div class="message" v-if="!showWinnerList&&begin">{{message}}</div>
    </template>
    <!--<template v-else-if="currentGradeName==='四等奖'">-->
      <!--<div class="winner-list-4" v-bind:style="{width:maxWidth*0.8+'px',marginTop: maxHeight*0.3 + 'px'}" v-if="showWinnerList">-->
        <!--&lt;!&ndash;<h2>{{currentGradeName}}中奖名单</h2>&ndash;&gt;-->
        <!--<template  v-for="winner in awardWinners">-->
          <!--<div>-->
            <!--<div class="winner-div" v-for="person,index in winner.winners " v-if="index<5">-->
              <!--<img v-bind:src=person.avatar />-->
              <!--<div class="winner-name">{{person.name}}</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div style="margin-top:20px;">-->
            <!--<div class="winner-div" v-for="person,index in winner.winners " v-if="index>=5">-->
              <!--<img v-bind:src=person.avatar />-->
              <!--<div class="winner-name">{{person.name}}</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</template>-->
      <!--</div>-->
      <!--<div class="winner-div-continer  continer-4" v-bind:style="{width:maxWidth*0.8+'px',marginTop: maxHeight*0.3 + 'px'}" v-if="!showWinnerList&&begin">-->
        <!--<div class="winner-div" v-for="winner,i in currentWinners " v-show="!ready">-->
          <!--<img v-bind:src=winner.avatar />-->
          <!--<div class="winner-name">{{winner.name}}</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="message" v-if="!showWinnerList&&begin">{{message}}</div>-->
    <!--</template>-->
    <!--<template v-else-if="currentGradeName==='三等奖'">-->
      <!--<div class="winner-list-3" v-bind:style="{width:maxWidth*0.9+'px',marginTop: maxHeight*0.4 + 'px'}" v-if="showWinnerList">-->
        <!--&lt;!&ndash;<h2>{{currentGradeName}}中奖名单</h2>&ndash;&gt;-->
        <!--<template  v-for="winner in awardWinners">-->
          <!--<div class="winner-div" v-for="person,index in winner.winners ">-->
            <!--<img v-bind:src=person.avatar />-->
            <!--<div class="winner-name">{{person.name}}</div>-->
          <!--</div>-->
        <!--</template>-->
      <!--</div>-->
      <!--<div class="winner-div-continer  continer-3" v-bind:style="{width:maxWidth*0.6+'px',marginTop: maxHeight*0.3+ 'px'}" v-if="!showWinnerList&&begin">-->
        <!--<div class="winner-div" v-for="winner,i in currentWinners " v-show="!ready">-->
          <!--<img v-bind:src=winner.avatar />-->
          <!--<div class="winner-name">{{winner.name}}</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="message" v-if="!showWinnerList&&begin">{{message}}</div>-->
    <!--</template>-->
    <!--<template v-else-if="currentGradeName==='二等奖'">-->
      <!--<div class="winner-list-2" v-bind:style="{width:maxWidth*0.8+'px',marginTop: maxHeight*0.35 + 'px'}" v-if="showWinnerList">-->
        <!--&lt;!&ndash;<h2>{{currentGradeName}}中奖名单</h2>&ndash;&gt;-->
        <!--<template  v-for="winner in awardWinners">-->
          <!--<div class="winner-div" v-for="person,index in winner.winners ">-->
            <!--<img v-bind:src=person.avatar />-->
            <!--<div class="winner-name">{{person.name}}</div>-->
          <!--</div>-->
        <!--</template>-->
      <!--</div>-->
      <!--<div class="winner-div-continer  continer-2" v-bind:style="{width:maxWidth*0.5+'px',marginTop: maxHeight*0.3 + 'px'}" v-if="!showWinnerList&&begin">-->
        <!--<div class="winner-div" v-for="winner,i in currentWinners " v-show="!ready">-->
          <!--<img v-bind:src=winner.avatar />-->
          <!--<div class="winner-name">{{winner.name}}</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="message" v-if="!showWinnerList&&begin">{{message}}</div>-->
    <!--</template>-->
    <!--<template v-else-if="currentGradeName==='一等奖'">-->
      <!--<div class="winner-list-1" v-bind:style="{width:maxWidth*0.5+'px',marginTop: maxHeight*0.35 + 'px'}" v-if="showWinnerList">-->
        <!--&lt;!&ndash;<h2>{{currentGradeName}}中奖名单</h2>&ndash;&gt;-->
        <!--<template  v-for="winner in awardWinners">-->
          <!--<div class="winner-div" v-for="person,index in winner.winners ">-->
            <!--<img v-bind:src=person.avatar />-->
            <!--<div class="winner-name">{{person.name}}</div>-->
          <!--</div>-->
        <!--</template>-->
      <!--</div>-->
      <!--<div class="winner-div-continer  continer-1" v-bind:style="{width:maxWidth*0.5+'px',marginTop: maxHeight*0.3 + 'px'}" v-if="!showWinnerList&&begin">-->
        <!--<div class="winner-div" v-for="winner,i in currentWinners " v-show="!ready">-->
          <!--<img v-bind:src=winner.avatar />-->
          <!--<div class="winner-name">{{winner.name}}</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="message" v-if="!showWinnerList&&begin">{{message}}</div>-->
    <!--</template>-->


	</div>
</template>

<script>
  import '../src/comment/three.min';
  import '../src/comment/tween.min';
  import '../src/comment/TrackballControls';
  import '../src/comment/CSS3DRenderer';
  import begin from '../src/comment/lottery';
  import Persons from '../src/static/persons.js';
  export default {
    data() {
      return {
        fullPersons:Array.from(Persons),//全部的名单
        currentWinners:[],//当前批次的中奖者
        persons:[],//当前抽奖名单
        awardCounter: 0, // 抽奖计数器
        currentAward:null,
        awards:[],//奖品
        prevAward:null,// 上一轮进行的奖项
        turnInterval:null,//抽奖定时器
        message:'',//当前的抽奖说明
        ready:false,//准备抽奖中
        starting:false,//幸运轮盘开始,
        groups:[],//人员分组情况信息
        averageAwardNum:0,//平均算法的奖品数
        currentGradeName:'',//当前奖品等级
        showWinnerList:false,//显示获奖者名单
        bgStatus:'',//背景图片的状态，ready->run->win
        maxHeight: 1024,
        maxWidth: 2048,
        begin:false,
      }
    },
    computed:{
      //显示每个奖项的中奖者
      awardWinners() {
        let gradeNames=[this.currentGradeName];
        if(this.currentGradeName===''){
          gradeNames=['All Hands Meeting']
        }
        let winnerList=new Array();
        gradeNames.forEach(gradeName=>{
          let winners=new Array();
          this.awards.forEach(award=>{
            if(award.gradeName===gradeName){
              winners=winners.concat(award.winners);
            }
          })
          winnerList.push({
            gradeName,
            winners
          })
        })
        return winnerList;
      },
    },
    methods: {
      // 初始化操作
      init(){
        this.setBackground();
        // 初始化奖品
        this.initAwards();
        this.persons = this.fullPersons.filter(person => person.state);
        this.initGroupWinNum();
      },
      //设置背景
      setBackground(){
        let body = document.body;
        let w = document.documentElement.clientWidth ||document.body.clientWidth;
        let h = document.documentElement.clientHeight || document.body.clientHeight;
        if(w>2048)w=2048;
        if(h>1024)h=1024;
        this.maxHeight=h;
        this.maxWidth=w;
        body.style.backgroundSize = w + 'px ' + h + 'px';
//        let backgroundImage= `url(static/bgimgs/bg.jpg)`;
        if(''===this.bgStatus){
//          backgroundImage =`url(static/bgimgs/bg.jpg)`
        }else if('win'===this.bgStatus){
//          backgroundImage=`url(static/bgimgs/bg_win.jpg)`
        }else{
          let gradeNames=['All Hands Meeting'];
          let idx=0;
          if(this.currentAward!=null){
            gradeNames.some((gradeName,i)=>{if(gradeName===this.currentAward.gradeName){idx=i;return true} else{return false;}});
//            backgroundImage=`url(static/bgimgs/bg${idx+1}_${this.bgStatus}.jpg)`;
          }
        }
//        body.style.backgroundImage = backgroundImage;
      },
      // 初始化奖品
      initAwards(){
        this.addAward('All Hands Meeting', 10, 2, '神秘奖品',80,'average');
//        this.addAward('四等奖', 10, 5, 'Bose音箱',80,'average');
//        this.addAward('三等奖', 6, 3, '智能扫地机器人',80);
//        this.addAward('二等奖', 4, 2, '东南亚双人游',80);
//        this.addAward('一等奖', 2, 1, '塞班双人游',80);
      },
      //增加奖品
      addAward(gradeName,totalWinsNum,batchWinsNum,description,delay,algorithm){
        if(algorithm==='average'){
          this.averageAwardNum +=totalWinsNum;
        }
        // 批次数=课获奖的总人数/每个批次可获奖的人数，由于数字都是整数，这里不考虑小数的问题
        let batchNum = totalWinsNum / batchWinsNum;
        const cn_nums= [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十" ];
        for (let i = 0; i < batchNum; i++) {
          const award = new Object();
          award.gradeName = gradeName; // 等级名称
          award.totalWinsNum = totalWinsNum; // 可获奖的总人数
          award.batchWinsNum = batchWinsNum; // 每批次可获奖的人数
          award.batchNum = batchNum; // 总的批次数
          award.batchName = (i==batchNum-1)?`最后一批`: `第${cn_nums[i]}批`;
          award.description = description; // 奖品描述
          award.delay = delay; // 大转盘转到频率
          award.algorithm = algorithm ||'normal';//average或normal二种方式
          award.winners = [];//当前批次的获奖者
          this.awards.push(award);
        }
      },
      //初始化分组竞得数
      initGroupWinNum(){
        let groups = [];
        this.persons.forEach(person=>{
          let id = person.group;
          let hasGroup=false;
          groups.forEach(group=>{
            if(group.id===id){
              group.num++;
              hasGroup=true;
            }
          })
          if(!hasGroup){
            let group=new Object();
            group.id=id;
            group.num=0;//组里的总人数
            group.winNum=0;//竞得成功人数
            groups.push(group);
          }
        })
        groups.forEach(group=>{
          group.min=Math.floor(group.num*this.averageAwardNum/this.persons.length);
          group.rate = group.num*this.averageAwardNum/this.persons.length-group.min;
        })
        this.groups=groups;
//        console.log(this.groups)
      },
      // 得到随机中奖者
      randomNum(curPersons){
        return Math.floor(Math.random() * (curPersons.length));
      },
      // 抽奖幸运轮盘的方法
      turnFun(){
        let award=this.currentAward;
        if(award.algorithm ==='average'){//使用平均分布各组的方式
          // 所有未中奖的候选人
          let availablePersons = Array.from(this.persons);
          let curGroups= this.groups.map(g=>{let obj = {...g};return obj});//需要深度copy
          let curBatchWinners = new Array();

          for (let i = 0; i < award.batchWinsNum; i++) {
            let minWinFlag=true;//每个组中是否已经达到最小竞得者了
            if(curGroups.some(g=>{return g.winNum<g.min})){
              minWinFlag=false;
            }
            // 所有未中奖的候选人
            let curPersons = Array.from(availablePersons);
            if(minWinFlag){//每个组中已经达到最小竞得者
              //先按概率得到中奖的组，
              let totalRate=0;
              curGroups.forEach(group=>{
                totalRate +=group.rate;
              });
              let winRandom = Math.random() * totalRate;
              let winGroup;
              totalRate=0;
              for(let i=0;i<curGroups.length;i++){
                if(winRandom>totalRate && winRandom<=totalRate +curGroups[i].rate){
                  winGroup=curGroups[i];
                  break;
                }
                totalRate=totalRate +curGroups[i].rate;
              }
              //找到竞得组的人
              curPersons=curPersons.filter(p=>{
                return p.group===winGroup.id;
              })
            }else{//还存在组中没有达到最小竞得者
              curPersons=curPersons.filter(p=>{
                return !curGroups.some(g=>{return (g.winNum==g.min && g.id==p.group)});
              })
            }
            // 随机数
            let random = this.randomNum(curPersons);
            // 随机数对应的候选人
            let person = curPersons[random];
            curBatchWinners.push(person);
            curGroups.forEach(g=>{
              if(g.id===person.group){
                g.winNum++;
              }
            })
            availablePersons=availablePersons.filter(p=>{return p.name!=person.name});
          }
          this.currentWinners = curBatchWinners;
        }else{
          // 所有未中奖的候选人
          let curPersons = Array.from(this.persons);
          let curBatchWinners = new Array();
          for (let i = 0; i < award.batchWinsNum; i++) {
            // 随机数
            let random = this.randomNum(curPersons);
            // 随机数对应的候选人
            let person = curPersons[random];
            curBatchWinners.push(person);
            curPersons.splice(random, 1);
          }
          this.currentWinners = curBatchWinners;
        }
      },
      //抽奖开始
      start(){
        if(this.starting)return false;
        this.starting=true;
        if(this.awardCounter===this.awards.length){
          this.showWinnerList=true;
//          this.currentGradeName='';
//          this.message='';
          this.bgStatus='win';
          this.setBackground();
          this.starting=false;
          return false;
        }
        // 当前正在进行的奖项对象
        let award = this.currentAward = this.awards[this.awardCounter];
//        if(this.prevAward == null || (award.gradeName!==this.prevAward.gradeName)){
//          if(this.awardCounter>0 && !this.showWinnerList){
//            this.bgStatus='win';
//            this.showWinnerList=true;//显示上一次的中奖名单
//            this.setBackground();
//          }else{
//            this.showWinnerList=false;
//            this.bgStatus='ready';
//            this.ready=true;
//            this.setBackground();
//            this.message=`接下来是${award.gradeName}${award.batchName}，奖品是${award.description},如果现在要抽取该奖项，请再次按键。`;
//            this.prevAward = award;
//          }
//          this.starting=false;
//          return false;
//        }
        this.currentGradeName=award.gradeName;
        this.ready=false;
        this.bgStatus='run';
        this.setBackground();
        this.showWinnerList=false;
        this.message=`${award.gradeName}${award.batchName}`;
        let ths=this;
        ths.turnFun();
        this.turnInterval = setInterval(function() {
          ths.turnFun();
        }, award.delay);
      },
      //抽奖停止，显示获奖者
      stop(){
        if(!this.starting)return false;
        clearInterval(this.turnInterval);
        this.turnInterval=null;
        this.starting=false;
        // 当前正在进行的奖项对象
        let award = this.awards[this.awardCounter];
        award.winners=Array.from(this.currentWinners);
        this.currentGradeName=award.gradeName;
        // 从候选人中删除本轮中奖的人，也即中奖的人不再参与后面的奖项
        for (let i = 0; i < this.currentWinners.length; i++) {
          if(award.algorithm ==='average') {//使用平均分布各组的方式
            this.groups.forEach(g=>{
              if(g.id===this.currentWinners[i].group){
                g.winNum++;
              }
            })
          }
          for (let j = 0; j < this.persons.length; j++) {
            if (this.currentWinners[i] == this.persons[j]) {
              this.persons.splice(j, 1);
              break;
            }
          }
        }
        //存储当前的抽奖结果
        this.saveStorage();
        // 计数器加1，进入下一奖项
        this.awardCounter++;
      },
      //恢复出厂设置
      reset(){
        if (confirm('确定恢复出厂设置么？')) {
          this.resetFun();
          alert('已成功恢复出厂设置');
        }
      },
      resetFun(){
        clearInterval(this.turnInterval);
        this.currentWinners = [];//当前批次的中奖者
        this.persons = [];//当前抽奖名单
        this.awardCounter = 0; // 抽奖计数器
        this.awards = [];//奖品
        this.prevAward = null;// 上一轮进行的奖项
        this.turnInterval = null;//抽奖定时器
        this.message = '';//当前的抽奖说明
        this.ready=false;//准备抽奖中
        this.starting = false;//幸运轮盘开始
        this.groups = [];//人员分组情况信息
        this.averageAwardNum = 0;//平均算法的奖品数
        this.currentGradeName='';//当前奖品等级
        this.showWinnerList=false;//显示获奖者名单
        this.bgStatus='';//背景图片的状态，ready->run->win
        this.init();
      },
      saveStorage(){
        let allWinnerNames='';
        this.awards.forEach(award=>{
          allWinnerNames += award.gradeName+':';
          const winners = award.winners.map(winner=>winner.name);
          let winnerNames = winners.join(',');
          allWinnerNames += winnerNames+';';
        })
        localStorage.setItem('allWinnerNames', allWinnerNames.substr(0,allWinnerNames.length-1));
      },
      restore() {//从storage中恢复
        if (confirm('确定要恢复到上次的状态吗？')) {
          this.restoreFun();
        }
      },
      clear(){//清除storage数据
        if (confirm('清除后无法恢复！确定要清除数据吗？')) {
          localStorage.removeItem('allWinnerNames');
        }
      },
      restoreFun(){//从storage中恢复
        let allWinnerNames=localStorage.getItem('allWinnerNames');
        if(!allWinnerNames){alert('没有可恢复的数据！');return};
        //恢复时先重置
        this.resetFun();
        let awardWinnerNames=allWinnerNames.split(';');
        this.bgStatus='ready';
        this.ready=true;
        awardWinnerNames.forEach((awardWinnerName,i)=>{
          let strs = awardWinnerName.split(':');
          let winnerNames = strs.length === 2 ?strs[1]!==''?strs[1].split(','):[] : [];

          let winners = winnerNames.map(name => {
            let find = null;
            this.persons = this.persons.filter(person => {
              if(name === person.name){
                find = person;
                return false;
              }else{
                return true;
              }
            });
            if(find!= null)return find;
          });
          if(winnerNames.length>0) {
            this.awardCounter++;
            let award=this.currentAward=this.awards[i];
            this.currentGradeName=award.gradeName;
            this.message=`${award.gradeName}${award.batchName}`;
            this.prevAward=award;
            this.bgStatus='run';
            this.ready=false;
            this.currentWinners = winners;
            this.awards[i].winners = winners;
            for (let i = 0; i < winners.length; i++) {
              if (award.algorithm === 'average') {//使用平均分布各组的方式
                this.groups.forEach(g => {
                  if (g.id === winners[i].group) {
                    g.winNum++;
                  }
                })
              }
            }
          }
        });

        this.setBackground();
      },
      test(){
        console.log('开始测试，请稍等....')
        let winners=[];
        for(let i=0;i<300;i++){
          let ths=this;
          ths.resetFun();
          for(let j=0;j<23;j++){
            ths.start();
            ths.stop();
          }
          ths.awards.forEach(award=>{
            award.winners.forEach(winner=>{
              if(winners.some(w=>{return (w.name===winner.name)})){
                for(let k=0;k<winners.length;k++){
                  if(winners[k].name===winner.name){
                    winners[k].count++;
                    break;
                  }
                }
              }else{
                winners.push({
                  name:winner.name,
                  group:winner.group,
                  count:1
                });
              }
            })
          })
        }
        console.table(winners.sort(function(a,b){return a.count-b.count}));
      },
    },
    mounted() {
//      begin.init();
      //初始化操作
      this.begin = true;
      this.init();
//      this.test();
    },
    updated(){
    },
    created(){
      let ths = this;
      window.onbeforeunload = function(event) {
        event.returnValue = "请不要关闭/刷新/离开此页面，一定要选前面那个按钮！";
      };
      window.onresize=function(){
        if(ths.begin){
          ths.setBackground();
        }
      };
      let showFirstGrade=true;
      let begining=false;//开场动画是否开始
      let bgmSonging = 0;
      document.onkeydown = function(){
        let key=window.event.keyCode;
        if (key == 32) {
          if(bgmSonging % 2 === 0){
            // document.getElementById("backgroundAudio").pause();
            document.getElementById("backgroundAudioRun").play();
            bgmSonging < 9 ? ++bgmSonging:bgmSonging;
          }else{
            // document.getElementById("backgroundAudio").play();
            document.getElementById("backgroundAudioRun").pause();
            bgmSonging < 9 ? ++bgmSonging:bgmSonging;
          }
          //没有初始化不能操作
          if(!ths.begin)return;
          // 按下的是空格
          if (ths.awardCounter === ths.awards.length) {
            // 已经完成抽奖了，先显示一等奖获奖人，再次按键时显示所有获奖人
            if(!showFirstGrade){
              ths.bgStatus='win';
              ths.setBackground();
              ths.currentGradeName='一等奖';
              showFirstGrade=true;
            }else{
              ths.bgStatus='win';
              ths.setBackground();
              ths.currentGradeName='';
            }
            ths.message='';
            ths.showWinnerList=true;
            return;
          }
          // 开始或停止抽奖
          if (ths.starting) {
            ths.stop();
          } else {
            ths.start();
          }
        }
        else if(key == 13){
          document.getElementById("backgroundAudio").play();
//            if(begining)return;
//            begining=true;
//            //按下是回车进行抽奖前的人员展示
//            begin.start();
//            setTimeout(function(){
//              ths.begin=true;
//              //初始化操作
//              ths.init();
//            },7000)
        }else {
          //没有初始化不能操作
          if(!ths.begin)return;
          // 抽奖过程中，不允许使用其它快捷操作
          if (ths.starting) {
            return;
          }
          if (key == 67) {
            // 按下的字母是c，表示clear的意思，从localStorage中清除数据
            ths.clear();
          }else if (key == 68) {
            // 按下的字母是d，表示data的意思，从localStorage中恢复数据
            ths.restore();
          } else if (key == 82) {
            // 按下的是字母r，表示reset的意思，恢复出厂设置
            ths.reset();
          } else if (key == 83) {
            // 按下的是字母s，表示show的意思，显示中奖名单
            ths.currentGradeName='';
            ths.showWinnerList=true
          } else if (key == 49) {
            // 按下的是数字1，显示一等奖获奖人
            ths.currentGradeName='一等奖';
            ths.showWinnerList=true
          } else if (key == 50) {
            // 按下的是数字2，显示二等奖获奖人
            ths.currentGradeName='二等奖';
            ths.showWinnerList=true
          } else if (key == 51) {
            // 按下的是数字3，显示三等奖获奖人
            ths.currentGradeName='三等奖';
            ths.showWinnerList=true
          } else if (key == 52) {
            // 按下的是数字4，显示四等奖获奖人
            ths.currentGradeName='四等奖';
            ths.showWinnerList=true
          } else if (key == 53) {
            // 按下的是数字5，显示All Hands Meeting获奖人
            ths.currentGradeName='All Hands Meeting';
            ths.showWinnerList=true
          }

        }
      }
    }
  }
</script>

<style>
  body {
    margin:0;
  }

  video {
    position: fixed;
    right:0;
    bottom:0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -99;
    /*-webkit-filter: grayscale(10%);*/
  }

  #info {
    position: absolute;
    width: 100%;
    color: #ffffff;
    padding: 5px;
    font-family: Monospace;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    z-index: 1;
  }

  #menu {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    display:none;
  }

  .element {
    width: 120px;
    height: 140px;
    box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
    border: 1px solid rgba(127,255,255,0.25);
    text-align: center;
    cursor: default;
    overflow: hidden;
  }

  .element:hover {
    box-shadow: 0px 0px 12px rgba(0,255,255,0.75);
    border: 1px solid rgba(127,255,255,0.75);
  }

  .element .number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(127,255,255,0.75);
  }

  .element .name {
    position: absolute;
    top: 5px;
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: rgba(255,255,255,0.75);
    text-shadow: 0 0 10px rgba(0,255,255,0.95);
  }

  .element .details {
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    font-size: 12px;
    color: rgba(127,255,255,0.75);
  }

  .element .backImg {
    position: absolute;
    width: 90%;
    height: 90%;
    left: 5%;
    top:5%;
    background-size: cover;
  }

  .Photoframe, .Photoframe::before, .Photoframe::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .Photoframe {
    color: #ffc107;
  }
  .Photoframe::before, .Photoframe::after {
    content: 'ⓥ';
    z-index: 99;
    margin: -5%;
    font-size:30px;
    box-shadow: inset 0 0 0 2px;
    animation: clipMe 8s linear infinite;
  }
  .Photoframe::before {
    animation-delay: -4s;
  }
  .Photoframe:hover::after, .Photoframe:hover::before {
    background-color: rgba(255, 0, 0, 0.3);
  }

  @keyframes clipMe {
    0%, 100% {
      clip: rect(0px, 220.0px, 2px, 0px);
    }
    25% {
      clip: rect(0px, 2px, 220.0px, 0px);
    }
    50% {
      clip: rect(218.0px, 220.0px, 220.0px, 0px);
    }
    75% {
      clip: rect(0px, 220.0px, 220.0px, 218.0px);
    }
  }

  body {
    font-size: 16px;
    text-align: center;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
    background-color:#000000;
    /*background-image: url('static/bgimgs/bg.jpg');*/
    background-repeat: no-repeat;
    /*background-size: contain;*/
  }
  .continer{
  }
  .winner-list-5{
    display:none;
    margin:0 auto;
    h2{
      color:yellow;
    }
    .winner-div {
      width:20%;
      display:inline-block;
      img {
        width: 100px;
        height: 120px;
      }
      .winner-name {
        text-align: center;
        font-size: 24px;
        color: yellow;
        padding-top: 4px;
      }
    }
  }
  .winner-list-4{
    margin:0 auto;
    h2{
      color:yellow;
    }
    .winner-div {
      width:20%;
      display:inline-block;
      img {
        width:125px;
        height:150px;
      }
      .winner-name {
        text-align: center;
        font-size: 24px;
        color: yellow;
        padding-top: 5px;
      }
    }
  }
  .winner-list-3{
    height:300px;
    margin:0 auto;
    width:100%;
    h2{
      color:yellow;
    }
    .winner-div {
      width:16.6%;
      display:inline-block;
      img {
        width:200px;
        height:240px;
      }
      .winner-name {
        text-align: center;
        font-size: 24px;
        color: yellow;
        padding-top: 10px;
      }
    }
  }
  .winner-list-2{
    height:300px;
    margin:0 auto;
    width:100%;
    h2{
      color:yellow;
    }
    .winner-div {
      width:25%;
      display:inline-block;
      img {
        width:200px;
        height:240px;
      }
      .winner-name {
        text-align: center;
        font-size: 28px;
        color: yellow;
        padding-top: 10px;
      }
    }
  }
  .winner-list-1{
    height:300px;
    margin:0 auto;
    width:100%;
    h2{
      color:yellow;
    }
    .winner-div {
      width:50%;
      display:inline-block;
      margin:auto;
      img {
        width:200px;
        height:240px;
      }
      .winner-name {
        text-align: center;
        font-size: 28px;
        color: yellow;
        padding-top: 10px;
      }
    }
  }
  .winner-list{
    height:40px;
    padding:100px 0px;
    background-color:#000000;
    opacity: 0.8;
    width:100%;
    table{
      margin:auto;
    }
    h2{
      color:yellow;
    }
    .grade-name{
      font-size: 24px;
      color: yellow;
    }
    .winner-name{
      font-size: 20px;
      text-align: left;
      padding-left:10px;
    }
    span{
      color:#ffffff;
    }
  }
  .winner-div-continer{
    height:300px;
    /*display:flex;*/
    /*align-items:center;*/
    margin:0 auto;
    width:100%;
    .winner-div{
      display:inline-block;
      img{
        width:200px;
        height:240px;
      }
      .winner-name{
        font-size: 100px;
        color: yellow;
        padding-top: 10px;
      }
    }
  }
  .continer-5 .winner-div{
    width:45%;
  }
  .continer-4 .winner-div{
    width:20%;
  }
  .continer-3 .winner-div{
    width:33.3%;
  }
  .continer-2 .winner-div{
    width:50%;
  }
  .continer-1 .winner-div{
    width:100%;
  }
  .message{
    width: 100%;
    text-align: center;
    position: absolute;
    top: 5%;
    color: #fff;
    font-size: 24px;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .no-mode-translate-fade-enter-active, .no-mode-translate-fade-leave-active {
    transition: all 0.1s;
  }
  .no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
    opacity: 0;
  }
  .no-mode-translate-fade-enter {
    transform: translateX(51px);
  }
  .no-mode-translate-fade-leave-active {
    transform: translateX(-51px);
  }

  .personRotate{
    animation: myrotate 2800ms infinite linear;
  }
  @keyframes myrotate{
    form {transform:rotateY(0deg);}
    to    {transform:rotateY(180deg);}
  }
  @-webkit-keyframes myrotate{/* Safari and Chrome */
    form {transform:rotateY(0deg);}
    to    {transform:rotateY(180deg);}
  }
</style>
