import persons from '../static/persons.js';
var canvas,context,bgCanvas,bgContext;
var denseness = 10;//文字像素读取间距
var img;//img对象，canvas读取图片像素
var existence = Array.from(persons);//将persons.js中的人员数组拷贝过来
var camera, scene, renderer;//THREE特效
var controls;//鼠标控制特效翻转对象
var objects = [];//人员信息对象
//目标模板，汉字，数字，图片
var targets = { wordsA: [], wordsB: [], sphere: [], disperse: [], logo: [], five: [], four: [], three: [], two: [], one: [], disappear: [] };
var count=0;//计时器调用次数
var perCount = 0;//已经展示过的人数
// var personsNum = 281;//需要展示的总人数
var personsNum = existence.length;//需要展示的总人数
//VIP人员
var VipPerson = ["Grace","Mark","欧阳晨"]
//计时器
var intervalEvent,numberEvent;

var actionFun = function() {
    clearInterval(numberEvent);//清除计时器
    document.getElementById('container').style.display = "none";//特效模块消失

}

//通过计时器自动展示特效
var numberFun = function() {
    if(count==2){
        setTimeout(transform( targets.five, 1000 ),1000);
    }else if(count==3){
        setTimeout(transform( targets.four, 1000 ),1000);
    }else if(count==4){
        setTimeout(transform( targets.three, 1000),1000);
    }else if(count==5){
        setTimeout(transform( targets.two, 1000),1000);
    }else if(count==6){
        setTimeout(transform( targets.one, 1000),1000);
    }else if(count==7){
        setTimeout(transform( targets.disappear, 1000 ),1000);
    }
    count++;
}
//数据初始化
var init = function() {

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    //做适配，根据屏幕宽度对z轴进行调整

    camera.position.z = window.innerWidth > 1600 ? window.innerWidth * 3 : window.innerWidth * 4;
    scene = new THREE.Scene();

    //第一次keyword输入，通过读取内容像素添加对应的标签元素，初始化objects数组
    var keyword = "乘风破浪";
    var wordsA = words(keyword);
    // wordsA
    for ( var i = 0; i < wordsA.length; i += 5 ) {

        var element = document.createElement( 'div' );
        element.className = 'element';
        element.style.backgroundColor = 'rgba(252,231,204,' + ( Math.random() * 0.5 + 0.25 ) + ')';
        //显示人员姓名
        var name = document.createElement( 'div' );
        name.className = 'name';
        name.textContent = wordsA[ i ];
        element.appendChild( name );
        //显示人员图片
        var image = document.createElement( 'img' );
        image.className = 'backImg';
        image.src = wordsA[ i + 1 ];
        element.appendChild( image );
        //显示人员相框，是否加V
        var frame = document.createElement( 'div' );
        frame.className = 'backImg ' + wordsA[ i + 2 ];
        element.appendChild( frame );
        //初始化objects对象，开始位置随机设定
        var object = new THREE.CSS3DObject( element );
        object.position.x = Math.random() * 8000 - 4000;
        object.position.y = Math.random() * 2000 - 1000;
        object.position.z = Math.random() * 4000 - 2000;
        scene.add( object );

        objects.push( object );
        //设定第一个targets对象，wordsA
        var object = new THREE.Object3D();
        object.position.x = ( wordsA[ i + 3 ] * 115 ) - 4500;
        object.position.y = - ( wordsA[ i + 4 ] * 115 ) + 2400;

        targets.wordsA.push( object );

    }

    // wordsB
    //第二次keyword输入，通过读取内容对objects数组的数据进行调整设定第二个targets对象，wordsB
    keyword = "坚秉初心";
    var wordsB = words(keyword);
    var vector = new THREE.Vector3();

    for ( var i = 0; i < objects.length; i ++ ) {

        var object = new THREE.Object3D();

        object.position.x = ( wordsB[ i * 5 + 3 ] * 115 ) - 4500;
        object.position.y = - ( wordsB[ i * 5 + 4 ] * 115 ) + 2400;
        // //objects超出要展示对象的部分进行y轴变化，从而在界面上落下
        // if (i >= wordsB.length / 5) {
        //     object.position.x =  0;
        //     object.position.y =  - 4000;
        // }
        //objects超出要展示对象的部分放在初始的一些位置
        if (i >= wordsB.length / 5) {
          object.position.x = ( wordsB[ 0 * 5 + 3 ] * 115 ) - 4500;
          object.position.y = - ( wordsB[ 0 * 5 + 4 ] * 115 ) + 2400;
        }

        targets.wordsB.push( object );

    }

    // disperse
    //对objects数组的数据进行打乱调整
    var vector = new THREE.Vector3();
    for ( var i = 0, l = objects.length; i < l; i ++ ) {

        var object = new THREE.Object3D();

        object.position.x = Math.random() * 8000 - 4000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;

        object.lookAt( vector );

        targets.disperse.push( object );

    }

    //logo
    //声明图片对象，在canvas绘画后，通过读取画布内容对objects数组的数据进行调整，图片经过处理，像素单薄
    img = new Image();
          // img.src = "static/img/logo.png";
    img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAbCAYAAADS6blZAAABhElEQVRoge2Yv0vDQBTHvzFGsDiLiQ4OBamQQVwchOLQ/6BL/wwF/wJHB/8CZ/+ILi2Im3RQcbCLIBFcRHDwxxCHEk3Sd8nda3ql8j6QIXcvybtP7u6ROHEcxxCMWZh1AvOKiGMi4piIOCYijomIYyLimCzqBEWdcKwtuLipPJl5QkucLsNmCwBQ73cz53mSfpNrvqNnAEDj4fY3Ln2ffB75Puq+qhid9kJxUSfE3QBYro0OfwOAU3QFTZmUaUMNfNhsFcovo3SP+/oE3l7H2wcH23g5PTN6mEmS9X43c3iBDy/wM/3J4BMoGapZNOnL1F6qu5d/e9rJ+iYAoP10jtXjQ9aDq4CSZwurVdXGALlLzxQr4qY5K9KibEkDKq6qKmwOyBba4q73Q3ZV/Y+ULtWdPWArBPqP7+jdu+hdfWDNddHwlmzkNzGq6klVWypWVZULZ1z66+AIo2rarq2Y5j5zVNWX2kKoWCrOkV/nPOQjn4mIYyLimIg4JiKOiYhjIuKY/ABXjI4YHgBciQAAAABJRU5ErkJggg=="
    img.onload=function(){
        var logo = logoFun(img);
        var vector = new THREE.Vector3();

        for ( var i = 0; i < objects.length; i ++ ) {

            var object = new THREE.Object3D();

            object.position.x = ( logo[ i * 5 + 3 ] * 115 ) - 4600;
            object.position.y = - ( logo[ i * 5 + 4 ] * 115 ) + 1000;
            object.position.z = - 1000;
            // //objects超出要展示对象的部分进行y轴变化，从而在界面上落下
            // if (i >= logo.length / 5) {
            //     object.position.x =  0;
            //     object.position.y =  - 4000;
            // }
            //objects超出要展示对象的部分放在初始的一些位置
            if (i >= logo.length / 5) {
              object.position.x = ( logo[ 0 * 5 + 3 ] * 115 ) - 4600;
              object.position.y = - ( logo[ 0 * 5 + 4 ] * 115 ) + 1000;
            }

            targets.logo.push( object );

        }
    }

    // sphere

    var vector = new THREE.Vector3();

    for ( var i = 0, l = objects.length; i < l; i ++ ) {

        var phi = Math.acos( -1 + ( 2 * i ) / l );
        var theta = Math.sqrt( l * Math.PI ) * phi;

        var object = new THREE.Object3D();

        object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
        object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
        object.position.z = 800 * Math.cos( phi );

        vector.copy( object.position ).multiplyScalar( 2 );

        object.lookAt( vector );

        targets.sphere.push( object );

    }

    // //更改keyword，调用words(keyword)函数，为targets添加倒计时对象
    // // 5
    // keyword = "5";
    // var five = words(keyword);
    //
    // var vector = new THREE.Vector3();
    //
    // for ( var i = 0; i < objects.length; i ++ ) {
    //
    //     var object = new THREE.Object3D();
    //
    //     object.position.x = ( five[ i * 5 + 3 ] * 130 ) - 1600;
    //     object.position.y = - ( five[ i * 5 + 4 ] * 130 ) + 2800;
    //
    //     if (i >= five.length / 5) {
    //         object.position.x =  0;
    //         object.position.y =  - 4000;
    //     }
    //
    //     targets.five.push( object );
    //
    // }
    //
    // // 4
    // keyword = "4";
    // var four = words(keyword);
    // var vector = new THREE.Vector3();
    //
    // for ( var i = 0; i < objects.length; i ++ ) {
    //
    //     var object = new THREE.Object3D();
    //
    //     object.position.x = ( four[ i * 5 + 3 ] * 130 ) - 1600;
    //     object.position.y = - ( four[ i * 5 + 4 ] * 130 ) + 2800;
    //
    //     if (i >= four.length / 5) {
    //         object.position.x =  0;
    //         object.position.y =  - 4000;
    //     }
    //
    //     targets.four.push( object );
    //
    // }
    //
    // // 3
    // keyword = "3";
    // var three = words(keyword);
    // var vector = new THREE.Vector3();
    //
    // for ( var i = 0; i < objects.length; i ++ ) {
    //
    //     var object = new THREE.Object3D();
    //
    //     object.position.x = ( three[ i * 5 + 3 ] * 130 ) - 1600;
    //     object.position.y = - ( three[ i * 5 + 4 ] * 130 ) + 2800;
    //
    //     if (i >= three.length / 5) {
    //         object.position.x =  0;
    //         object.position.y =  - 4000;
    //     }
    //
    //     targets.three.push( object );
    //
    // }
    //
    // // 2
    // keyword = "2";
    // var two = words(keyword);
    // var vector = new THREE.Vector3();
    //
    // for ( var i = 0; i < objects.length; i ++ ) {
    //
    //     var object = new THREE.Object3D();
    //
    //     object.position.x = ( two[ i * 5 + 3 ] * 130 ) - 1600;
    //     object.position.y = - ( two[ i * 5 + 4 ] * 130 ) + 2800;
    //
    //     if (i >= two.length / 5) {
    //         object.position.x =  0;
    //         object.position.y =  - 4000;
    //     }
    //
    //     targets.two.push( object );
    //
    // }
    //
    // // 1
    // keyword = "1";
    // var one = words(keyword);
    // var vector = new THREE.Vector3();
    //
    // for ( var i = 0; i < objects.length; i ++ ) {
    //
    //     var object = new THREE.Object3D();
    //
    //     object.position.x = ( one[ i * 5 + 3 ] * 130 ) - 1600;
    //     object.position.y = - ( one[ i * 5 + 4 ] * 130 ) + 2800;
    //
    //     if (i >= one.length / 5) {
    //         object.position.x =  0;
    //         object.position.y =  - 4000;
    //     }
    //
    //     targets.one.push( object );
    //
    // }

    //消失对象，通过对y轴调整，形成对象落下效果
    // disappear

    for ( var i = 0; i < objects.length; i ++ ) {

        var object = new THREE.Object3D();

        object.position.x = Math.random() * 8000 - 4000;
        object.position.y = 4000;
        object.position.z = Math.random() * 4000 - 2000;

        targets.disappear.push( object );

    }

    //声明THREE 3D特效对象

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
    document.getElementById( 'container' ).appendChild( renderer.domElement );

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener( 'change', render );

    //init初始化中进行第一个特效

    transform( targets.sphere, 3000 );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

//transform特效，参数为targets对象，转换时长
var transform = function( targets, duration ) {
    TWEEN.removeAll();

    for ( var i = 0; i < objects.length; i ++ ) {

        var object = objects[ i ];
        var target = targets[ i ];

        new TWEEN.Tween( object.position )
            .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

        new TWEEN.Tween( object.rotation )
            .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

    }

    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();

}

var onWindowResize = function() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

var animate = function() {

    requestAnimationFrame( animate );

    TWEEN.update();

    controls.update();

}

var render = function() {

    renderer.render( scene, camera );

}

//封装汉字数字像素分析函数，通过keyword返回不同的parts对象，parts对象五项为一组，分别代表人员姓名，图片路径，是否VIP，图片X坐标，Y坐标
var words = function(keyword){
    var parts = [];
    var perImg; //声明一个perImg对象，用来存储每一个person属性
    function Banner(){
        this.initialize = function(canvas_id){
            // 初始化canvas对象
            canvas = document.getElementById(canvas_id);
            context = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            bgCanvas = document.createElement('canvas');
            bgContext = bgCanvas.getContext('2d');

            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
            start();//将keyword画到canvas画布上
        }
        var start = function(){
            bgContext.clearRect(0,0,bgContext.width,bgContext.height);
            bgContext.fillStyle = "#000000";
            bgContext.font = '160px impact';
            bgContext.fillText(keyword, 85, 275);
            getCoords();//读取画布像素
        }
        var getCoords = function(){
            var imageData, pixel, height, width;

            imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);
            // 快速迭代所有像素-密度差距denseness
            for(height = 0; height < bgCanvas.height; height += denseness){
                for(width = 0; width < bgCanvas.width; width += denseness){
                    pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
                    //像素是绘制黑色的，就处理该像素点。
                    if(pixel == 255) {
                        //perCount为全局变量，代表已经展示的人数，如果已经都展示一遍了，重置为0，开始展示第二遍
                        if (perCount == personsNum) {perCount = 0};
                        perCount++;
                        //perImg存储setImgSrc函数返回的人员对象，并push到parts里
                        perImg = setImgSrc(existence,perCount);
                        parts.push(perImg['name']);
                        parts.push(perImg['avatar']);
                        if (VipPerson.indexOf(perImg['name'])!= -1) {
                            //如果该人员在VIP名单中，添加相框类
                            parts.push('Photoframe');
                        }
                        else{
                            parts.push('');
                        }parts.push(width/10);
                        parts.push(height/10);
                    }
                }
            }
        }
    }
    //构造函数
    var banner = new Banner();
    banner.initialize("canvas");
    return parts;
}
//封装图片的像素分析结果，返回不同的parts对象
var logoFun = function(img){
    var parts = [];
    var perImg;
    var Banner = function(){
        this.initialize = function(canvas_id){
            canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            context = canvas.getContext("2d");
            //分析img
            createRevertPic(img);
        }
        var createRevertPic = function(img){
            context.drawImage(img,0,0);
            var imageData, pixel, height, width;
            var imageData = context.getImageData(0, 0, img.width, img.height);
            // 快速迭代所有像素,与文字不同，图片像素为三原色判定
            for(var height = 0; height < imageData.height; height ++){
                for(var width = 0; width < imageData.width; width ++){
                    //imagedata读取的像素数据存储在data属性里，是从上到下，从左到右的，每个像素需要占用4位数据，分别是r,g,b,alpha透明通道
                    var x = height*4*imageData.width + 4*width,
                        r = imageData.data[x],
                        g = imageData.data[x+1],
                        b = imageData.data[x+2];
                    if (r!=255||g!=255||b!=255) {

                        if (perCount == personsNum) {perCount = 0};
                        perCount++;

                        perImg = setImgSrc(existence,perCount);
                        parts.push(perImg['name']);
                        parts.push(perImg['avatar']);
                        if (VipPerson.indexOf(perImg['name'])!= -1) {
                            parts.push('Photoframe');
                        }
                        else{
                            parts.push('');
                        }parts.push(width);
                        parts.push(height);
                    }
                }
            }
        }
    }
    var banner = new Banner();
    banner.initialize("canvas");
    return parts;
}
//随机返回不同的人员信息
var setImgSrc = function(existPersons,perCount) {
    var length = existPersons.length;
    //声明一个人员对象
    var personMes={};
    var random = Math.floor(Math.random()*(length-perCount));
    //随机抽取未被抽取的人员（数组的前length-perCount项）
    personMes = existPersons[random]//将抽取出的对象赋给personMes
    existPersons.splice(random,1);//在人员名单中剔除刚被抽取的的人
    existPersons.push(personMes);//在人员名单末尾加上刚才被抽取过的人
    return personMes;
}

 module.exports={
  init:function(){
    init();//初始化，初始化中有第一个targets--> wordsA
    animate();//进行动画展示
    setTimeout(function () {
     controls.start();
    },2000);
    count++;
  },
  start:function(){
    controls.stop();
    transform( targets.wordsB, 1000 );
    setTimeout(function () {
      transform( targets.wordsA, 1000)
    },2000);
    setTimeout(function () {
      transform( targets.logo, 1000)
    },4000);
    setTimeout(function () {
      //特效消失和后续操作
      transform(targets.disappear, 1000);
      setTimeout(actionFun, 2000);
    },6000);
    count++;
  },
  stop:function(){

  }
 }

//    function () {
//     if (count == 0) {
//         init();//初始化，初始化中有第一个targets--> wordsA
//         animate();//进行动画展示
//         count++;
//     }
//     //第二次输入回车，进行第二个项特效
//     else if (count == 1) {
//         transform( targets.wordsB, 2000 );
//         setTimeout(function () {
//             transform( targets.logo, 2000)
//         },4000);
//         count++;
//     }
//     //第三次输入回车，进行第三个项特效
//     else if (count ==2) {
//         //特效消失和后续操作
//         transform( targets.disappear, 1000 );
//         setTimeout(actionFun,2000);
//     }
// }
