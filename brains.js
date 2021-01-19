//===Monica Section===//
//color constants:
//font: #fff4de; bg: #101c25;

//initial mood palette: 
//SURPRISED: #ed8632, #ed4558, #a15f99

//happiness mood palette: 
//#f27906 #faa106 #2995c0

//disgust mood palette: 
//#ffe016 #b2d223 #70ab1d

//anger mood palette: 
//#fb9841 #ed4a1d #d53e27

//neutral mood palette: 
//#bde47a #55ba9a #3ca1aa

//sadness mood palette: 
//#296f9d #144c80 #2b2f72

//surprise mood palette: 
//#ffaa16, #f06516, #e43108

$(window).on("load", function() {

//load client for youtube api call 
  gapi.load("client:auth2", function() {
      gapi.auth2.init({client_id: "INSERT GOOGLE API CLIENT KEY"});
      loadClient();
    })
  
  let initialBg = "linear-gradient(to bottom right, (#ed8632, #ed4558 , #a15f99))"
  
  let appendColorTest = function(){
    $("body").initialBg
  }
  appendColorTest()
  
  // some test logic for touching parts of document to apply color themeing to, "to bottom right" only seems to work when set as variable...hmm.
  // considering relocating gradient from body or otherwise ensuring submission page style is untouched, don't want the gradient there.
  
  let currentMood;
  let imageSubmit;
  let imageBase64;
  let api_key = "INSERT FACE++ API KEY";
  let api_secret= "INSERT FACE++ SECRET API KEY";
  let mood;
  let genre;
 
  
  
  function getMood (){
//face analyzer API call   
  var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect"
 
  $.ajax({
      url: queryURL,
      type: 'POST',
      data: {
          api_key: api_key,
          api_secret: api_secret,
          return_attributes: "emotion",
          image_base64: imageBase64,
      },
   
  
  
  })
  
  .done(function(response) {
  
    if (parseInt(response.face_num) === 0){
      document.querySelector("#moodDisplay").innerHTML = "";
      document.querySelector('#btn').innerHTML = "";
      document.querySelector('#player').innerHTML = "";
      $("#faceValidation").append("")
      $("#faceValidation").append("The crystal ball is unable to obtain your mood from this image, please try another.")
      console.log("face++ image read fail")
    }else{
  
      console.log(queryURL);
      console.log(response); 
      currentMood = response.faces[0].attributes.emotion;
     let happiness = currentMood.happiness
     let disgust = currentMood.disgust
     let fear =  currentMood.fear
     let anger = currentMood.anger 
     let neutral = currentMood.neutral 
     let sadness = currentMood.sadness
     let surprise = currentMood.surprise 
  
      //if you are happiness
      if (happiness >= disgust && happiness >= fear && happiness >= anger && happiness >= neutral && happiness >= sadness && happiness >= surprise){
        //do this
         $("#moodDisplay").empty();
         mood = 4;
         localStorage.setItem("mood", "happiness")
         execute();
         $(".moodorb").attr("src", "./icons/CrystalBall_Happy.png")
  
         $(".formbtns").css("color","#2995c0")
         $(".formbtns").hover(function(){
             $(this).css("color", "#2995c0")
             $(this).css("color", "#faa106")
           })
          
         let readMood=$("<span> You are <span id='happyMood'> happy</span>! </span>")
         $("#moodDisplay").append(readMood)
  
     //if you are disgust
     } else if (disgust >= happiness && disgust >= fear && disgust >= anger && disgust >= neutral && disgust >= sadness && disgust >= surprise) {
         //do this
         $("#moodDisplay").empty();
         mood = 2;
         localStorage.setItem("mood", "disgusted")
         execute();
         $(".moodorb").attr("src", "./icons/CrystalBall_Disgust.png")
         
         $(".formbtns").css("color","#70ab1d")
         $(".formbtns").hover(function(){
             $(this).css("color", "#70ab1d")
             $(this).css("color", "#b2d223")
           })
         
         let readMood=$("<span> You are <span id='disgustedMood'> disgusted</span>! </span>")
         $("#moodDisplay").append(readMood)
  
     //if you are fear
     } else if(fear >= happiness && fear >= disgust && fear >= anger && fear >= neutral && fear >= sadness && fear >= surprise) {
         //do this 
         $("#moodDisplay").empty();
         mood = 3;
         localStorage.setItem("mood", "fear")
         execute();
         $(".moodorb").attr("src", "./icons/CrystalBall_Fear.png")
  
         $(".formbtns").css("color","#f27906")
         $(".formbtns").hover(function(){
             $(this).css("color", "#f27906")
             $(this).css("color", "#ffcd16")
           })
  
         let readMood=$("<span> You are <span id='fearMood'> afraid</span>! </span>")
         $("#moodDisplay").append(readMood)
     }
     //if you are angry 
       else if(anger >= happiness && anger >= disgust && anger >= fear && anger >= neutral && anger >= sadness && anger >= surprise) {
         //do this 
         $("#moodDisplay").empty();
         mood = 1;
         localStorage.setItem("mood", "anger")
         execute();
         $(".moodorb").attr("src", "./icons/CrystalBall_Anger.png")
  
         $(".formbtns").css("color","#d53e27")
         $(".formbtns").hover(function(){
             $(this).css("color", "#d53e27")
             $(this).css("color", "#ed4a1d")
         })
  
         let readMood=$("<span> You are <span id='angryMood'> angry</span>! </span>")
         $("#moodDisplay").append(readMood)
         
     }
     //if you are neutral
     else if(neutral >= happiness && neutral >= disgust && neutral >= fear && neutral >= anger && neutral >= sadness && neutral >= surprise) {
         //do this 
         $("#moodDisplay").empty();
         mood = 7;
         localStorage.setItem("mood", "neutral")
         execute();
         $(".moodorb").attr("src", "./icons/CrystalBall_Neutral.png")
  
         $(".formbtns").css("color","#31a580")
         $(".formbtns").hover(function(){
             $(this).css("color", "#31a580")
             $(this).css("color", "#bde47a")
           })
  
         let readMood=$("<span> You are <span id='neutralMood'> neutral</span>! </span>")
         $("#moodDisplay").append(readMood)
     }
     //if you are sadness 
     else if(sadness >= happiness && sadness >= disgust && sadness >= fear && sadness >= anger && sadness >= neutral && sadness >= surprise) {
         //do this 
         $("#moodDisplay").empty();
         mood = 5;
         localStorage.setItem("mood", "sad")
         execute();
         $(".moodorb").attr("src", "./icons/CrystalBall_Sad.png")
  
         $(".formbtns").css("color","#296f9d")
         $(".formbtns").hover(function(){
             $(this).css("color", "#296f9d")
             $(this).css("color", "#2b2f72")
         })
  
         let readMood=$("<span> You are <span id='sadMood'> sad</span>! </span>")
         $("#moodDisplay").append(readMood)
  
     } 
     //if you are surprise
     else if(surprise >= happiness && surprise >= disgust && surprise >= fear && surprise >= anger && surprise >= neutral && surprise >= sadness) {
         //do this 
         $("#moodDisplay").empty();
         mood = 6;
         localStorage.setItem("mood", "surprised")
         execute();
         $(".moodorb").attr("src", "./icons/CrystalBall_Surprise.png")
  
         $(".formbtns").css("color","#ed4558")
         $(".formbtns").hover(function(){
             $(this).css("color", "#ed4558")
             $(this).css("color", "#ed8632")
         })
  
         let readMood=$("<span> You are <span id='surprisedMood'> surprised</span>! </span>")
         $("#moodDisplay").append(readMood)
      } 
    }
  })
  .fail(function(){
    document.querySelector("#moodDisplay").innerHTML = "";
    document.querySelector('#btn').innerHTML = "";
    document.querySelector('#player').innerHTML = "";
    $("#faceValidation").append("")
    $("#faceValidation").append("The crystal ball is unable to obtain your mood from this image, please try a smaller file size.")
    console.log("face++ image too big")
  })
  
  }
  
  
//grab data from form 
  $(function()
    {
      $('#testImg').change( function(event)
      {
        console.log( $(this).val() );
        imageSubmit = event.target.files
        console.log (imageSubmit[0].size);
        if(parseInt(imageSubmit[0].size)> 1400000) {
          let reader = new FileReader();
          reader.readAsDataURL(imageSubmit[0]);
          reader.onload = function () {
            imageBase64 = reader.result;
            };
            reader.onloadend= function(){
              console.log(imageBase64)
              console.log("before")
              resize();
              document.querySelector('#btn').innerHTML = "";
              document.querySelector('#player').innerHTML = "";
              document.querySelector('#moodDisplay').innerHTML = "";
              $("#faceValidation").text("Upload successful! Click submit!");
            }
        }else{
          let reader = new FileReader();
          reader.readAsDataURL(imageSubmit[0]);
          reader.onload = function () {
            imageBase64 = reader.result;
            };
            reader.onloadend= function(){
              console.log(imageBase64)
              console.log("before")
              document.querySelector('#btn').innerHTML = "";
              document.querySelector('#player').innerHTML = "";
              document.querySelector('#moodDisplay').innerHTML = "";
              $("#faceValidation").text("Upload successful! Click submit!");
            }
        }

      });
    });
    
//image compression function 
    function resize() {
      let image = new Image()
      image.src = imageBase64
      image.onload= function(){
        canvas = document.createElement("canvas")
        canvas.width = image.width/1.7
        canvas.height = image.height/1.7
        const context = canvas.getContext("2d")
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        imageBase64 = canvas.toDataURL("image/jpeg", 0.8)
        console.log(imageBase64)
        console.log("after")
    }}


    //submit button functionality 
    $("#submitBtn").click(function(event){
        event.preventDefault();
        $("#faceValidation").text("")
        console.log("click!");
        getMood();
    })
  
    //rock button functionality
    $("#magicRock").click(function(event){
      $(".toForm").toggleClass( "goToForm" )
      $(".magicCrystal").toggleClass( "magicCrystalYeet" )
      //event.preventDefault();
      //authenticate().then(loadClient);
      setTimeout (function(){
      nextPage(); 
      },2115) //after 2s, will change to next page  
  })
  
  

//go to user page from home page
  function nextPage(){
      $(".landingPage").attr("style", "display:none");
      $(".submissionPage").attr("style", "display:block")
  
  }

//emotion shuffler for youtube API Call     
    function getEmotion(){

      console.log(mood);
      if( mood === 1 ){
        genre = moodArr.angry[Math.floor(Math.random() * moodArr.angry.length)]
        console.log(genre);
    
          
      }else if( mood === 2 ){
        genre = moodArr.disgust[Math.floor(Math.random() * moodArr.disgust.length)]
        console.log(genre);
    
          
      }else if( mood === 3 ){
        genre = moodArr.fear[Math.floor(Math.random() * moodArr.fear.length)]
        console.log(genre);
    
          
      }else if( mood === 4 ){
        genre = moodArr.happy[Math.floor(Math.random() * moodArr.happy.length)]
        console.log(genre);   
    
          
      }
      else if( mood === 5 ){
        genre = moodArr.sad[Math.floor(Math.random() * moodArr.sad.length)]
        console.log(genre);
    
         
      }else if( mood === 6 ){
        genre = moodArr.surprise[Math.floor(Math.random() * moodArr.surprise.length)]
        console.log(genre);
    
          
      }else if( mood === 7 ){
        genre = moodArr.neutral[Math.floor(Math.random() * moodArr.neutral.length)]
        console.log(genre);
     
      }
    }
    
    const youtubeURL = 'https://www.youtube.com/embed/';
    
//authenitace function 
      function authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
            .then(function() { console.log("Sign-in successful"); },
                  function(err) { console.error("Error signing in", err); });
      }
//load client function
      function loadClient() {
        gapi.client.setApiKey("INSERT GOOGLE API KEY");
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(function() { console.log("GAPI client loaded for API"); },
                  function(err) { console.error("Error loading GAPI client for API", err); });
        
      }
      
      function execute() {
        getEmotion();
       return gapi.client.youtube.search.list({
          "part": [
            "snippet"
          ],
          
          "topicId": "/m/04rlf",
          "maxResults": 50,
          "q": genre,
          "regionCode": "US",
          "type": ["video"],
          "relevanceLanguage": "en",
          "safeSearch": "strict"
          
        })
         
         .then(function(response) {

         console.log('response', response)
         document.querySelector('#btn').innerHTML = "";
         document.querySelector('#player').innerHTML = "";
         let newBtn = document.createElement('button');
                    newBtn.textContent = 'Moretoob';
                    newBtn.id = 'go';
                    newBtn.className= 'row';
         document.querySelector('#btn').append(newBtn);
          
         
          //shuffle the response list
          console.log(response.result.items)
          let shuffledList = response.result.items
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)
          console.log(shuffledList)
           
          for(let i = 0; i < 6; i++)
          {
                    let newVideo = $("<iframe>")
                    newVideo.attr('allowFullScreen', '');
                    newVideo.attr ("src", "" + youtubeURL + shuffledList[i].id.videoId + "")
                    newVideo.className = 'row player';
                    $("#player").append(newVideo);
          }
                  },
                  function(err) { console.error("Execute error", err); });
      }

//functionality for moretoob button 
    document.addEventListener('click', function(e) 
    {
        if(e.target.matches('#go'))
        {
            execute();
            
        }
    })
   
//dynamic styling on page refresh    
    if(localStorage.getItem("mood")) {
      $(".greeting1").text("welcome back to moodtoob!")
      $(".greeting2").text("Last time you visited, you were feeling " + localStorage.getItem("mood") + "")
    }
   
   if(localStorage.getItem("mood")==="happiness") {
      $(".landingPage").attr("id","happy")
      $(".formbtns").css("color","#2995c0")
      $(".formbtns").hover(function(){
          $(this).css("color", "#2995c0")
          $(this).css("color", "#faa106")
        })
        $(".moodorb").attr("src", "./icons/CrystalBall_Happy.png")
      }
      else if (localStorage.getItem("mood")==="disgusted"){ 
      $(".landingPage").attr("id","disgusted")
      $(".formbtns").css("color","#70ab1d")
      $(".formbtns").hover(function(){
          $(this).css("color", "#70ab1d")
          $(this).css("color", "#b2d223")
        })
        $(".moodorb").attr("src", "./icons/CrystalBall_Disgust.png")
        // button.append(img)
      }
      else if (localStorage.getItem("mood")==="fear"){ 
      $(".landingPage").attr("id","fear")
      $(".formbtns").css("color","#f27906")
      $(".formbtns").hover(function(){
          $(this).css("color", "#f27906")
          $(this).css("color", "#ffcd16")
        })
        $(".moodorb").attr("src", "./icons/CrystalBall_Fear.png")
      }
      else if (localStorage.getItem("mood")==="anger"){ 
        $(".landingPage").attr("id","anger")
        $(".formbtns").css("color","#d53e27")
        $(".formbtns").hover(function(){
            $(this).css("color", "#d53e27")
            $(this).css("color", "#ed4a1d")
        })
        $(".moodorb").attr("src", "./icons/CrystalBall_Anger.png")
      }
      else if (localStorage.getItem("mood")==="neutral"){ 
        $(".landingPage").attr("id","neutral")
        $(".formbtns").css("color","#31a580")
        $(".formbtns").hover(function(){
            $(this).css("color", "#31a580")
            $(this).css("color", "#bde47a")
          })
        $(".moodorb").attr("src", "./icons/CrystalBall_Neutral.png")
      }
      else if (localStorage.getItem("mood")==="sad"){ 
        $(".landingPage").attr("id","sad")
        $(".formbtns").css("color","#296f9d")
        $(".formbtns").hover(function(){
            $(this).css("color", "#296f9d")
            $(this).css("color", "#2b2f72")
        })
        $(".moodorb").attr("src", "./icons/CrystalBall_Sad.png")
      }
      else if (localStorage.getItem("mood")==="surprised"){ 
        $(".landingPage").attr("id","surprise")
        $(".formbtns").css("color","#ed4558")
        $(".formbtns").hover(function(){
            $(this).css("color", "#ed4558")
            $(this).css("color", "#ed8632")
        })
        $(".moodorb").attr("src", "./icons/CrystalBall_Surprise.png")
      }
   
  })  