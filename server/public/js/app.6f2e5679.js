(function(e){function t(t){for(var a,o,i=t[0],l=t[1],c=t[2],m=0,d=[];m<i.length;m++)o=i[m],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&d.push(n[o][0]),n[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);u&&u(t);while(d.length)d.shift()();return s.push.apply(s,c||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],a=!0,i=1;i<r.length;i++){var l=r[i];0!==n[l]&&(a=!1)}a&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var a={},n={app:0},s=[];function o(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=a,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(r,a,function(t){return e[t]}.bind(null,a));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"026b":function(e,t,r){e.exports=r.p+"media/sonnerie.2ac30148.mp3"},"3b00":function(e,t,r){"use strict";var a=r("99f9"),n=r.n(a);n.a},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-main",[r("router-view")],1)],1)},s=[],o={name:"App",components:{},data:function(){return{}}},i=o,l=r("2877"),c=r("6544"),u=r.n(c),m=r("7496"),d=r("f6c4"),h=Object(l["a"])(i,n,s,!1,null,null,null),p=h.exports;u()(h,{VApp:m["a"],VMain:d["a"]});var f=r("8c4f"),v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("v-container",[r("v-row",{staticClass:"mb-12",attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"8",align:"center"}},[r("h1",[e._v("les Mimes")]),r("v-row",{staticClass:"my-12",attrs:{justify:"center"}},[r("v-btn",{staticClass:"link white--text",attrs:{small:"",color:"#43A047"}},[r("router-link",{attrs:{to:{name:"CreateGame"}}},[e._v(" Créer une partie ")])],1)],1),r("v-row",{attrs:{justify:"center"}},[r("v-btn",{staticClass:"link",attrs:{color:"indigo darken-2",small:""}},[r("router-link",{attrs:{to:{name:"JoinGame",params:{idGame:0,admin:"player"}}}},[e._v(" Rejoindre une partie ")])],1)],1)],1)],1)],1)],1)},g=[],y={name:"Home",components:{},methods:{}},_=y,b=r("8336"),w=r("62ad"),C=r("a523"),x=r("0fd9"),T=Object(l["a"])(_,v,g,!1,null,null,null),k=T.exports;u()(T,{VBtn:b["a"],VCol:w["a"],VContainer:C["a"],VRow:x["a"]});var G=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"8"}},[r("v-col",{attrs:{align:"center"}},[r("v-chip",{staticClass:"headline mb-4 label py-8",attrs:{color:"default",outlined:""}},[r("p",{staticClass:"mb-0"},[e._v(" Code : "),r("span",{staticClass:"font-weight-bold"},[e._v(" "+e._s(e.$route.params.idGame)+" ")])])])],1),r("h3",[e._v("Team Bleu")]),r("v-sheet",{staticClass:"pa-4",attrs:{elevation:"0"}},[r("v-chip-group",{attrs:{column:"","active-class":"primary--text"}},e._l(e.blueTeam,(function(t){return r("v-chip",{key:t.id,attrs:{color:"blue","text-color":"white"}},[e._v(" "+e._s(t))])})),1)],1),r("h3",[e._v("Team Rouge")]),r("v-sheet",{staticClass:"pa-4",attrs:{elevation:"0"}},[r("v-chip-group",{attrs:{column:"","active-class":"primary--text"}},e._l(e.redTeam,(function(t){return r("v-chip",{key:t.id,attrs:{color:"red","text-color":"white"}},[e._v(" "+e._s(t))])})),1)],1),"admin"===e.$route.params.admin?r("v-row",{attrs:{justify:"center"}},[r("v-btn",{staticClass:"my-10 link white--text",attrs:{color:"indigo darken-2"},on:{click:e.startGame}},[e._v(" Lancer la partie ")])],1):e._e(),r("v-row",{staticClass:"mt-10"},[r("router-link",{attrs:{to:{name:"JoinGame",params:{idGame:0,admin:"player"}}}},[r("v-icon",[e._v("mdi-arrow-left")])],1)],1)],1)],1)],1)},V=[],$={data:function(){return{admin:!1}},computed:{blueTeam:function(){return this.$store.getters.blueTeam},redTeam:function(){return this.$store.getters.redTeam}},created:function(){this.$store.dispatch("fetchPlayers",this.$route.params.idGame)},methods:{startGame:function(){this.$router.push({name:"Game",params:{idGame:this.$route.params.idGame}})}}},R=$,W=r("cc20"),j=r("ef9a"),P=r("132d"),S=r("8dd9"),O=Object(l["a"])(R,G,V,!1,null,"9758f998",null),E=O.exports;u()(O,{VBtn:b["a"],VChip:W["a"],VChipGroup:j["a"],VCol:w["a"],VContainer:C["a"],VIcon:P["a"],VRow:x["a"],VSheet:S["a"]});var M=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",{staticClass:" mt-5 b-12",attrs:{justify:"center"}},[r("v-col",{attrs:{align:"center"}},[r("h1",[e._v("Score")]),r("v-row",{staticClass:"mt-8"},e._l(e.teamArray,(function(t,a){return r("v-col",{key:a},[r("p",{staticClass:"headline"},[e._v(e._s(t.nom))]),r("v-chip",{staticClass:"headline label pa-8",attrs:{color:t.color,outlined:""}},[r("p",{staticClass:"mb-0"},[e._v(e._s(t.score))]),t.winner?r("v-icon",{staticClass:"ml-5",attrs:{"x-large":""}},[e._v(" mdi-trophy ")]):e._e()],1)],1)})),1)],1)],1)],1)},B=[],D={data:function(){return{game:{id:null}}},computed:{teamArray:function(){return this.$store.getters.results}},created:function(){},methods:{}},I=D,F=Object(l["a"])(I,M,B,!1,null,null,null),A=F.exports;u()(F,{VChip:W["a"],VCol:w["a"],VContainer:C["a"],VIcon:P["a"],VRow:x["a"]});var L=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{staticClass:"fluid mt-5"},[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"8",xs:"8",sm:"8",md:"8"}},["admin"===e.$route.params.admin?r("v-row",[r("v-col",{attrs:{align:"center"}},[r("v-chip",{staticClass:"headline mb-4 label py-8",attrs:{color:"default",outlined:""}},[r("p",{staticClass:"mb-0"},[e._v(" Code : "),r("span",{staticClass:"font-weight-bold"},[e._v(" "+e._s(e.idGame)+" ")])])])],1)],1):e._e(),r("v-row",{staticClass:"mb-5",attrs:{justify:"center"}},[r("v-col",[r("div",[r("strong",[e._v("Choisis ton équipe ")])]),r("v-form",{ref:"SignUpForm",model:{value:e.formValidity,callback:function(t){e.formValidity=t},expression:"formValidity"}},[r("v-radio-group",{attrs:{required:"",row:"",rules:e.radioRule},scopedSlots:e._u([{key:"label",fn:function(){},proxy:!0}]),model:{value:e.player.team,callback:function(t){e.$set(e.player,"team",t)},expression:"player.team"}},[r("v-radio",{attrs:{label:"Bleu",color:"blue",value:"1"},scopedSlots:e._u([{key:"label",fn:function(){return[r("v-icon",{staticClass:"mr-3 ml-2",class:e.colorNinja,attrs:{size:"50"}},[e._v(" mdi-ninja ")])]},proxy:!0}])}),r("v-radio",{attrs:{label:"Rouge",color:"red",value:"2"},scopedSlots:e._u([{key:"label",fn:function(){return[r("v-icon",{staticClass:"mr-2",class:e.colorPirate,attrs:{size:"50"}},[e._v(" mdi-pirate ")])]},proxy:!0}])})],1),r("v-text-field",{attrs:{required:"",rules:e.nameRule,placeholder:"coquinou",label:"Rentre ton petit nom"},model:{value:e.player.name,callback:function(t){e.$set(e.player,"name",t)},expression:"player.name"}}),r("v-text-field",{staticClass:"input-code",attrs:{id:"input",label:"Code de la partie",placeholder:"478577",rules:[e.codeValidity||"Code est mauvais"],required:""},on:{keyup:function(t){return e.check()}},model:{value:e.player.gameId,callback:function(t){e.$set(e.player,"gameId",t)},expression:"player.gameId"}}),r("h3",{staticClass:"mt-5"},[e._v("Rentre tes mots")]),r("v-row",[r("v-col",{attrs:{xs:"12",sm:"12",md:"12",align:"center"}},[e._l(e.numberOfWord,(function(t){return r("v-text-field",{key:t,attrs:{label:"mot "+t,placeholder:e.exampleWord[t-1],rules:e.wordRule,required:""},model:{value:e.player.list[t-1],callback:function(r){e.$set(e.player.list,t-1,r)},expression:"player.list[number - 1]"}})})),r("v-btn",{staticClass:"mx-2",attrs:{fab:"",dark:"","x-small":"",elevation:"0",color:"green darken-2"},on:{click:e.addWord}},[r("v-icon",[e._v("mdi-plus")])],1),r("v-btn",{staticClass:"mx-2",attrs:{elevation:"0",fab:"",dark:"","x-small":"",color:"deep-orange"},on:{click:e.removeWord}},[r("v-icon",[e._v("mdi-minus")])],1)],2)],1)],1)],1)],1),r("v-row",{staticClass:"mt-5",attrs:{justify:"center"}},[r("v-btn",{staticClass:"mb-5 link white--text",attrs:{disabled:!e.formValidity,color:"indigo darken-2"},on:{click:e.createPlayer}},[e._v(" Rejoindre la partie "),r("v-icon",{attrs:{right:""}},[e._v("mdi-rocket-launch")])],1)],1),r("v-row",{attrs:{justify:"flex-start"}},[r("router-link",{staticClass:"mt-5 mb-10",attrs:{to:"/"}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-arrow-left")])],1)],1)],1)],1)],1)},N=[],z=r("bc3a"),q=r.n(z),J={data:function(){return{numberOfWord:[1,2,3,4,5],idGame:null,player:{id:0,name:"",list:[],team:null,gameId:null},formValidity:!1,codeValidity:!1,exampleWord:["Pizza","Roller","Argentine","Le Pape","Démerde toi :)"],nameRule:[function(e){return!!e||"Ton nom est nécessaire"}],radioRule:[function(e){return!!e||"Selectionne ton équipe"}],wordRule:[function(e){return!!e||"Rentre ton mot sinon ça marche pas"}]}},computed:{colorNinja:function(){return this.player.team%2==1?"light-blue--text":"null"},colorPirate:function(){return this.player.team%2==0&&null!==this.player.team?"red--text":"null"}},created:function(){this.idGame=this.$route.params.idGame},methods:{check:function(){var e=this;q.a.get("https://data-base-mime.herokuapp.com/games/"+this.player.gameId).then((function(){e.codeValidity=!0})).catch((function(t){404===t.response.status&&(console.log("error"),e.codeValidity=!1)}))},onSubmit:function(){this.createPlayer()},createPlayer:function(){var e=this;this.player.id=Math.floor(1e7*Math.random()),this.$store.dispatch("createPlayer",{player:this.player}).then((function(){e.$router.push({name:"TeamMenu",params:{idGame:e.player.gameId,admin:e.$route.params.admin}})})).catch((function(){console.log("error")}))},addWord:function(){var e=this.numberOfWord.length;this.numberOfWord.push(e+1)},removeWord:function(){this.numberOfWord.pop(),this.player.list.pop()}}},U=J,Y=r("4bd4"),H=r("67b6"),K=r("43a6"),X=r("8654"),Q=Object(l["a"])(U,L,N,!1,null,"3d690f78",null),Z=Q.exports;u()(Q,{VBtn:b["a"],VChip:W["a"],VCol:w["a"],VContainer:C["a"],VForm:Y["a"],VIcon:P["a"],VRadio:H["a"],VRadioGroup:K["a"],VRow:x["a"],VTextField:X["a"]});var ee=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{staticClass:"fluid d-flex mt-5"},[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{xs:"8",sm:"10",md:"10",col:"10",align:"center"}},[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{xs:"10",sm:"10"}},[r("span",[e._v(" "+e._s(e.score[0])+" "),r("v-icon",{staticClass:"mr-3 ml-2",class:e.colorNinja,attrs:{size:"50"}},[e._v(" mdi-ninja ")]),r("v-icon",{staticClass:"mr-2",class:e.colorPirate,attrs:{size:"50"}},[e._v(" mdi-pirate ")]),e._v(" "+e._s(e.score[1])+" ")],1),r("p",{staticClass:"mt-2"},["timesup"==e.gameMode?r("span",[e._v(" Manche "),r("span",[r("span",{staticClass:"font-weight-bold headline"},[e._v(" "+e._s(e.manche[e.mancheCounter])+" ")]),e._v(" - ")])]):e._e(),e._v(" Joueur "),r("span",{staticClass:"font-weight-bold headline"},[e._v(e._s(e.currentPlayer))])]),e.finish?e._e():r("v-chip",{staticClass:"display-1 mb-12 mt-4 label px py-8",attrs:{color:"default",outlined:""}},[e.timer?e._e():r("v-icon",{staticClass:"mr-5",attrs:{size:"60"},on:{click:e.startTimer}},[e._v(" mdi-play-circle-outline ")]),e.timer?r("v-icon",{staticClass:"mr-5",attrs:{size:"50"},on:{click:e.stopTimer}},[e._v(" mdi-pause-circle ")]):e._e(),e.resetButton?r("v-icon",{staticClass:"mr-5",attrs:{size:"50"},on:{click:e.resetTimer}},[e._v(" mdi-replay ")]):e._e(),r("span",{attrs:{id:"minutes"}},[e._v(e._s(e.minutes))]),r("span",{attrs:{id:"middle"}},[e._v(":")]),r("span",{attrs:{id:"seconds"}},[e._v(e._s(e.seconds))])],1)],1)],1),e.gameFinished?r("v-col",[r("p",{staticClass:"display-2"},[e._v("Partie terminée")]),r("v-btn",{staticClass:"white--text mt-5",attrs:{color:"indigo darken-2"},on:{click:e.goDashBoard}},[e._v(" Voir le score ")])],1):e._e(),e.mancheFinished&&!e.gameFinished?r("v-col",[r("p",{staticClass:"display-2"},[e._v("Manche "+e._s(e.mancheCounter+1)+" terminée")]),r("v-btn",{staticClass:"white--text mt-5",attrs:{"x-large":"",color:"indigo darken-2"},on:{click:e.switchManche}},[e._v(" Changer de manche ")])],1):e._e(),e.finish||e.mancheFinished?e._e():r("v-col",{attrs:{align:"center"}},[r("v-row",{staticClass:"mb-6",attrs:{justify:"center"}},[e.showWord?r("p",{staticClass:"display-3 mb-8"},[e._v(" "+e._s(e.currentWord)+" ")]):e._e(),e.showWord?e._e():r("v-btn",{staticClass:"pa-8 white--text mb-12",attrs:{"x-large":"",color:"cyan darken-1"},on:{click:e.showWordFunction}},[e._v(" Montrer le mot ")])],1),e.showWord?r("v-row",{attrs:{justify:"center"}},[r("v-btn",{staticClass:"mr-12 pa-8 white--text",attrs:{color:"green darken-1 ","x-large":""},on:{click:e.nextWord}},[e._v(" Trouvé ")]),r("v-btn",{staticClass:"white--text pa-8",attrs:{color:"#E71D36","x-large":""},on:{click:e.skipWord}},[e._v(" Raté ")])],1):e._e()],1),r("v-col",[e.finish?r("span",[e._v(" Dernier mot trouvé "),r("p",{staticClass:"display-3 mb-8"},[e._v(e._s(e.lastWordFound))])]):e._e(),e.finish?r("v-btn",{staticClass:"mb-5 mr-12 white--text",attrs:{"x-large":"",color:"green darken-1"},on:{click:e.switchTeam}},[e._v(" Changer d'équipe ")]):e._e(),e.finish?r("v-btn",{staticClass:"mb-5 white--text",attrs:{"x-large":"",color:"cyan"},on:{click:e.lastWordFoundAction}},[e._v(" Valider le dernier mot ")]):e._e()],1)],1)],1)],1)},te=[],re=r("5530"),ae=r("2f62"),ne={data:function(){return{soundEffect:new Audio(r("026b")),mancheCounter:0,manche:["Phrase","Mot","Mime"],mancheFinished:!1,timer:null,timeToGuess:null,resetButton:!1,finish:!1,showWord:!1,gameFinished:!1,color:["Bleu","Rouge"],playerIndex:[0,0],lastWordFound:""}},computed:Object(re["a"])(Object(re["a"])({round:function(){return this.$store.state.round},colorNinja:function(){return this.round%2==0?"light-blue--text":"null"},colorPirate:function(){return this.round%2==1?"red--text":"null"},numberPlayerTeam:function(){return this.round%2==0?this.$store.getters.blueTeam.length:this.$store.getters.redTeam.length},currentWord:function(){return this.$store.getters.word},currentColorClass:function(){return this.round%2==0?"blue--text":"red--text"},currentPlayer:function(){return this.round%2==0?this.$store.getters.blueTeam[this.playerIndex[0]]:this.$store.getters.redTeam[this.playerIndex[1]]},score:function(){return this.$store.getters.scoreTeam}},Object(ae["b"])(["players"])),{},{minutes:function(){return this.$store.getters.minutes},seconds:function(){return this.$store.getters.seconds},gameMode:function(){return this.$store.getters.gameMode},listSkipped:function(){return this.$store.state.wordSkipped}}),watch:{},created:function(){this.$store.dispatch("fetchGame",this.$route.params.idGame),this.$store.dispatch("fetchPlayers",this.$route.params.idGame)},methods:{startTimer:function(){var e=this;this.timer=setInterval((function(){return e.countdown()}),1e3),this.resetButton=!0},stopTimer:function(){clearInterval(this.timer),this.timer=null,this.resetButton=!0},resetTimer:function(){this.$store.commit("RESET_TIMER"),clearInterval(this.timer),this.timer=null,this.resetButton=!1},countdown:function(){this.$store.commit("COUNT_DOWN"),this.seconds>0?this.timeToGuess--:(this.stopTimer(),this.resetButton=!1,this.finish=!0,this.showWord=!1)},switchTeam:function(){this.soundEffect.pause(),this.lastWordFound="",this.round%2==0?(this.playerIndex[0]+=1,this.playerIndex[0]==this.numberPlayerTeam&&(this.playerIndex[0]=0)):(this.playerIndex[1]+=1,this.playerIndex[1]==this.numberPlayerTeam&&(this.playerIndex[1]=0)),this.$store.commit("ADD_ROUND"),this.finish=!1,this.resetTimer()},nextWord:function(){this.lastWordFound=this.currentWord,this.$store.commit("NEXT_WORD",{word:this.currentWord}),"timesup"==this.gameMode?(null==this.currentWord&&0!=this.listSkipped.length&&(this.showWord=!1,this.finish=!0,this.stopTimer()),null==this.currentWord&&0==this.listSkipped.length&&(this.mancheFinished=!0,this.finish=!1,this.stopTimer(),2==this.mancheCounter&&(this.gameFinished=!0))):null==this.currentWord&&0==this.listSkipped.length&&(this.resetTimer(),this.mancheFinished=!0,this.gameFinished=!0)},switchManche:function(){this.mancheFinished=!1,this.$store.commit("RESET_LIST"),this.mancheCounter+=1,this.showWord=!1,this.switchTeam()},skipWord:function(){this.resetButton||this.startTimer(),this.$store.commit("SKIP_WORD",{word:this.currentWord}),null==this.currentWord&&(this.showWord=!1,this.finish=!0,this.stopTimer())},showWordFunction:function(){this.showWord=!0},goDashBoard:function(){this.$router.push({name:"DashBoard",params:{idGame:this.$route.params.idGame}})},lastWordFoundAction:function(){this.nextWord(),this.switchTeam()}}},se=ne,oe=(r("3b00"),Object(l["a"])(se,ee,te,!1,null,"8b740a72",null)),ie=oe.exports;u()(oe,{VBtn:b["a"],VChip:W["a"],VCol:w["a"],VContainer:C["a"],VIcon:P["a"],VRow:x["a"]});var le=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-row",{staticClass:" mt-5 b-12",attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"8",xs:"8",sm:"8",md:"8"}},[r("p",{staticClass:"mb-8 display-1"},[e._v(" Configurer la partie")]),r("v-row",[r("v-col",[r("h3",[e._v("Nombre de secondes pour deviner")]),r("v-text-field",{attrs:{type:"number",placeholder:"30 secondes"},model:{value:e.game.timeToGuess,callback:function(t){e.$set(e.game,"timeToGuess",t)},expression:"game.timeToGuess"}})],1)],1),r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{align:"center"}},[r("v-btn",{staticClass:"link white--text",attrs:{small:"",color:"#43A047"},on:{click:e.createGame}},[e._v(" Créer une partie ")]),r("v-radio-group",{attrs:{row:""},model:{value:e.game.mode,callback:function(t){e.$set(e.game,"mode",t)},expression:"game.mode"}},[r("v-radio",{attrs:{label:"Mime",color:"blue",value:"mime"}}),r("v-radio",{attrs:{label:"Time's up",color:"red",value:"timesup"}})],1)],1)],1)],1)],1)],1)},ce=[],ue={data:function(){return{game:{id:null,timeToGuess:null,mode:"",scoreBleu:0,scoreRouge:0}}},created:function(){this.game.id=Math.floor(1e6*Math.random())},methods:{createGame:function(){var e=this;this.$store.dispatch("createGame",this.game).then((function(){e.$router.push({name:"JoinGame",params:{idGame:e.game.id,admin:"admin"}})})).catch((function(){console.log("error")}))}}},me=ue,de=Object(l["a"])(me,le,ce,!1,null,null,null),he=de.exports;u()(de,{VBtn:b["a"],VCol:w["a"],VContainer:C["a"],VRadio:H["a"],VRadioGroup:K["a"],VRow:x["a"],VTextField:X["a"]}),a["a"].use(f["a"]);var pe=[{path:"/",name:"Home",component:k},{path:"/createGame",name:"CreateGame",component:he},{path:"/teamMenu/:idGame/:admin",name:"TeamMenu",component:E,props:!0},{path:"/DashBoard/:idGame/",name:"DashBoard",component:A},{path:"/joinGame/:idGame/:admin",name:"JoinGame",component:Z,props:!0},{path:"/Game/:idGame",name:"Game",component:ie,props:!0}],fe=new f["a"]({mode:"history",base:"/",routes:pe}),ve=fe,ge=(r("4de4"),r("caad"),r("d81d"),r("b0c0"),r("2532"),q.a.create({baseURL:"https://data-base-mime.herokuapp.com/",withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}})),ye={getGame:function(e){return ge.get("/games/"+e)},getPlayers:function(e){return ge.get("/games/"+e+"/players")},postPlayer:function(e){return ge.post("/players",e)},postGame:function(e){return ge.post("/games",e)}};a["a"].use(ae["a"]);var _e=new ae["a"].Store({state:{game:{},players:[],wordDone:[],wordSkipped:[],round:2},mutations:{ADD_ROUND:function(e){e.round+=1,e.wordSkipped=[]},SET_GAME:function(e,t){a["a"].set(e.game,"timeLeft",t.timeToGuess),a["a"].set(e.game,"timeToGuess",t.timeToGuess),a["a"].set(e.game,"mode",t.mode),a["a"].set(e.game,"id",t.id),a["a"].set(e.game,"scoreBleu",t.scoreBleu),a["a"].set(e.game,"scoreRouge",t.scoreRouge)},ADD_PLAYER:function(e,t){e.players.push(t)},SET_PLAYERS:function(e,t){e.players=t},NEXT_WORD:function(e,t){var r=t.word;e.wordDone.push(r),e.round%2==0?a["a"].set(e.game,"scoreBleu",e.game.scoreBleu+1):a["a"].set(e.game,"scoreRouge",e.game.scoreRouge+1)},RESET_LIST:function(e){e.wordDone=[]},SKIP_WORD:function(e,t){var r=t.word;e.wordSkipped.push(r)},COUNT_DOWN:function(e){e.game.timeLeft--},RESET_TIMER:function(e){a["a"].set(e.game,"timeLeft",e.game.timeToGuess)}},actions:{createPlayer:function(e,t){var r=e.commit,a=t.player;ye.postPlayer(a).then((function(){r("ADD_PLAYER",a)})).catch((function(){console.log("eror")}))},createGame:function(e,t){var r=e.commit;ye.postGame(t).then((function(){r("SET_GAME",t)})).catch((function(){console.log("error")}))},fetchPlayers:function(e,t){var r=e.commit;ye.getPlayers(t).then((function(e){r("SET_PLAYERS",e.data)})).catch((function(e){console.log("There was an error:",e.response)}))},fetchGame:function(e,t){var r=e.commit;ye.getGame(t).then((function(e){r("SET_GAME",e.data)})).catch((function(e){console.log("There was an error in fetching game:",e.response)}))}},getters:{listWord:function(e){var t=[];return e.players.map((function(e){e.list.map((function(e){t.push(e)}))})),t},listFilter:function(e,t){return t.listWord.filter((function(t){return!e.wordSkipped.includes(t)})).filter((function(t){return!e.wordDone.includes(t)}))},word:function(e,t){return t.listFilter[t.index]},index:function(e,t){return Math.floor(Math.random()*t.listFilter.length)},blueTeam:function(e){var t=[];return e.players.map((function(e){1==e.team&&t.push(e.name)})),t},redTeam:function(e){var t=[];return e.players.map((function(e){2==e.team&&t.push(e.name)})),t},scoreTeam:function(e){return[e.game.scoreBleu,e.game.scoreRouge]},timeLeft:function(e){return e.game.timeLeft},minutes:function(e,t){var r=Math.floor(t.timeLeft/60);return(r<10?"0":"")+r},seconds:function(e,t){var r=t.timeLeft-60*t.minutes;return(r<10?"0":"")+r},gameMode:function(e){return e.game.mode},results:function(e){var t=[];return t.push({nom:"Ninja",winner:e.game.scoreBleu>e.game.scoreRouge,score:e.game.scoreBleu,color:"blue"}),t.push({nom:"Pirate",winner:e.game.scoreBleu<e.game.scoreRouge,score:e.game.scoreRouge,color:"red"}),t}}}),be=r("f309");a["a"].use(be["a"]);var we=new be["a"]({});r("a347");a["a"].config.productionTip=!1,new a["a"]({router:ve,store:_e,vuetify:we,render:function(e){return e(p)}}).$mount("#app")},"99f9":function(e,t,r){},a347:function(e,t,r){}});
//# sourceMappingURL=app.6f2e5679.js.map