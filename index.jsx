import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

import ZmitiLoadingApp from './loading/index.jsx';
export class App extends Component {
	constructor(props) {
		super(props);


		this.state = {
			scrollTop:0,
			currentHref:'',
			showMembers:false,
			showGroupName:false,
			currentAudio:'',
			currentVideo:'',
			myHeadImg:'',
			progress:'0%',
			loadingImg:[],
			showLoading:false,
			talkObj:{
				date:'3月4日',
				member:[
				],
				talk:[
					
				]
			}
		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}
	render() {
		
		var mainStyle={};
		if(this.state.talkObj.background){
			mainStyle.background = 'url('+this.state.talkObj.background+') no-repeat center / cover'
		}

		return (
			<div className='zmiti-main-ui' style={mainStyle}>
				{this.state.showLoading && <ZmitiLoadingApp {...this.state}></ZmitiLoadingApp>}
				{this.state.talkObj.bgSound && <audio preload='auto' ref='audio' src={this.state.talkObj.bgSound} autoPlay loop></audio>}
				<audio src='./assets/music/talk.mp3' ref='talkAudio' preload='auto'></audio>
				<section className='zmiti-scroll-C' ref='zmiti-scroll-C' style={{height:this.viewH - 85}}>
					<div ref='scroller' className={'zmiti-scroller'} style={{paddingBottom:20,WebkitTransform:'translate3d(0,'+this.state.scrollTop+'px,0)'}}>
						{<section style={{display:'none'}} className='zmiti-date'><span>{this.state.talkObj.date}</span></section>}
						{this.state.showMembers && <section className='zmiti-member'>
													<div>
														{this.state.talkObj.member[0].name+'邀请你和'+this.state.talkObj.member[1].name+' 、'}
														{this.state.talkObj.member.filter((item,i)=>{
															return i > 1;
														}).map((item,i)=>{
															return <span key={i}>{i>= this.state.talkObj.member.length - 3 ? item.name: item.name+' 、'}</span>
														})}
														<span>等加入群聊</span>
													</div>
												</section>}
						{this.state.talkObj.title && this.state.showGroupName && <section className='zmiti-modify-groupname'>{this.state.talkObj.member[0].name}修改群名称为{this.state.talkObj.title}</section>}
						<section className='zmiti-talk-C'>
							<ul className='zmiti-talk-list'>
								{this.state.talkObj.talk.map((item,i)=>{
									if(item.isMe){
										return <li key={i} className={'zmiti-user'}>
													<div className={'zmiti-talk-content ' + (item.text?'':'zmiti-talk-img')}>
														<aside>
															<div></div>
														</aside>
														<aside>
															<div onTouchTap={this.displayFrame.bind(this,item.href)}>
																{item.text && item.text}
																{item.img && <img  src={item.img}/>}
																{item.audioSrc && <section onTouchTap={this.playAudio.bind(this,i)} className='wxchat-audia'>
																	<audio preload='auto' ref={'audio-'+i} src={item.audioSrc}></audio>
																	<img src='./assets/images/audio-ico.png' />
																</section>}

																{item.videoSrc && <section onTouchTap={this.playVideo.bind(this,i)} className='wxchat-video'>
																	<img src='./assets/images/video-ico1.jpg' />
																	<video src={item.videoSrc} ref={'video-'+i}></video>
																</section>}

																{item.linkObj && (item.linkObj.img || item.linkObj.title||item.linkObj.href ||item.linkObj.desc) && <div onTouchTap={this.displayFrame.bind(this,item.linkObj.href)} className='zmiti-linkobj-C zmiti-linkobj-isMe'>
																<section>{item.linkObj.title}</section>
																<section>{item.linkObj.desc}</section>
																<section style={{background:'url('+(item.linkObj.img || './assets/images/zmiti.jpg')+') no-repeat center / cover'}}></section>
															</div>}



															</div>
														</aside>

													</div>
													<div className='zmiti-talk-head' style={{background:'url('+(item.head||'./assets/images/zmiti.jpg')+') no-repeat center / cover'}}>
													</div>
												</li>
									}
									return <li key={i} className={item.isMe?'zmiti-user':''}>
										<div className='zmiti-talk-head'  style={{background:'url('+item.head+') no-repeat center / cover'}}></div>
										<div className={'zmiti-talk-content ' + (item.text?'':'zmiti-talk-img')}>
											<aside>{item.name}</aside>
											<aside>
												<div onTouchTap={this.displayFrame.bind(this,item.href)}>
													{item.text && item.text}
													{item.img && <img  src={item.img}/>}
													{item.audioSrc && <section onTouchTap={this.playAudio.bind(this,i)} className='wxchat-audia'>
														<img src='./assets/images/audio-ico.png' />
														<audio preload='auto' ref={'audio-'+i} src={item.audioSrc}></audio>
														</section>}
													{item.videoSrc && <section onTouchTap={this.playVideo.bind(this,i)} className='wxchat-video'>
																	<img src='./assets/images/video-ico.jpg' />
																	<video src={item.videoSrc} ref={'video-'+i}></video>
																</section>}
													{item.linkObj && (item.linkObj.img || item.linkObj.title||item.linkObj.href ||item.linkObj.desc) && <div className='zmiti-linkobj-C' onTouchTap={this.displayFrame.bind(this,item.linkObj.href)}>
																<section>{item.linkObj.title}</section>
																<section>{item.linkObj.desc}</section>
																<section style={{background:'url('+(item.linkObj.img || './assets/images/zmiti.jpg')+') no-repeat center / cover'}}></section>
															</div>}
												</div>
											</aside>
										</div>
									</li>
								})}
							</ul>
						</section>
					</div>
				</section>
				<div className='zmiti-talk-input'>
					<img src='./assets/images/talk-input.jpg'/>
				</div>
				{this.state.currentHref && <div className='zmiti-frame'>
					<iframe frameBorder={0} src={this.state.currentHref}></iframe>
					<div className='zmiti-back' onTouchTap={this.backToApp.bind(this)}>
						返回
					</div>
				</div>}

			</div>
		);
	}

	playVideo(i){
		
		this.refs['video-'+i].play();

		this.refs['video-'+i].classList.add('active');

		this.refs['video-'+i].addEventListener('pause',()=>{
			this.refs['video-'+i].classList.remove('active');			
		})


	}

	getPos(nickname,headimgurl){
	    	var s = this;
	    	 $.ajax({
	        	url:`http://restapi.amap.com/v3/geocode/regeo?key=10df4af5d9266f83b404c007534f0001&location=${wx.posData.longitude},${wx.posData.latitude}&poitype=&radius=100&extensions=base&batch=false&roadlevel=1`+'',
				type:'get',
				error(){

				},
				success(data){
					if(data.status === '1' && data.infocode === '10000'){
						
						var addressComponent = data.regeocode.addressComponent;
						var opt = {
					   		type:'map',
					   		address:(addressComponent.city[0]||addressComponent.province)+addressComponent.district,
					   		pos:[wx.posData.longitude,wx.posData.latitude],
					   		nickname:nickname,
					   		headimgurl:headimgurl
					   	}

					   	s.setState({
					   		nickname,
					   		headimgurl,
					   		showUI:true,
					   		latitude:wx.posData.latitude,
					   		longitude:wx.posData.longitude,
					   		usercity:(addressComponent.city[0]||addressComponent.province)+addressComponent.district
					   	});
					   	$.ajax({
							url:'http://api.zmiti.com/v2/weixin/save_userview/',
							type:'post',
							data:{
								worksid:s.worksid,
								wxopenid:s.openid,
								wxname:nickname,
								usercity:opt.address,
								longitude:wx.posData.longitude,
								latitude:wx.posData.latitude
							}
						}).done((data)=>{
							if(data.getret === 0 ){
								
							}else{
								alert('save_userview getret : '+ data.getret +' msg : '+ data.getmsg)
							}
						},()=>{
							//alert('save_userview error');
						})

					   	$.ajax({
					   		url:'http://api.zmiti.com/v2/weixin/add_wxuser/',
					   		type:'post',
					   		data:{
					   			wxopenid:s.openid,
					   			worksid:s.worksid,
					   			nickname:nickname,
					   			headimgurl:headimgurl,
					   			longitude:wx.posData.longitude,
					   			latitude:wx.posData.latitude,
					   			accuracy:wx.posData.accuracy,
					   			wxappid:s.wxappid,
					   			integral:localStorage.getItem('nickname')?0:10
					   		},
					   		error(){
					   			alert('add_wxuser: 服务器返回错误');
					   		},
					   		success(data){
					   			if(data.getret === 0){
					   				
					   				$.ajax({
										url:'http://api.zmiti.com/v2/weixin/get_wxuserdetaile',
										data:{
											wxopenid:s.openid
										},
										success(data){
											if(data.getret === 0){
												
												s.score = data.wxuserinfo.totalintegral;
												s.setState({
													score:s.score
												});
											}else{
												alert('get_wxuserdetaile : getret  : '+ data.getret + ' msg : ' + data.getmsg);	
											}
										}
									})

					   			}else{
					   				alert('getret  : '+ data.getret + ' msg : ' + data.getmsg+ ' .....');
					   			}
					   		}
					   	});

					   	//获取用户积分
						//
				   		$.ajax({
							url:'http://api.zmiti.com/v2/msg/send_msg/',
							data:{
								type:s.worksid,
								content:JSON.stringify(opt),
								to:opt.to||''
							},
							success(data){
								s.state.showUI = true;
								s.forceUpdate();
								//console.log(data);
							}
						})
					}
					else{
						alert('地址信息获取失败')
					}
				}						        	
	        })
    }


	playAudio(i){

		if(this.refs['audio-'+i].paused){
			this.refs['audio-'+i].play();
		}
		else{
			this.refs['audio-'+i].pause();	
		}
		return false;

	}

	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid){
		   var durl = location.href.split('#')[0]; //window.location;
		        var code_durl = encodeURIComponent(durl);


		        var s = this;

			$.ajax({
				type:'get',
				url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl="+code_durl+"&worksid="+worksid,
				dataType:'jsonp',
				jsonp: "callback",
			    jsonpCallback: "jsonFlickrFeed",
			    error(){
			    },
			    success(data){
			    	wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId:appId, // 必填，公众号的唯一标识
							    timestamp:'1488558145' , // 必填，生成签名的时间戳
							    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
							    signature: data.signature,// 必填，签名，见附录1
							    jsApiList: [ 'checkJsApi',
											  'onMenuShareTimeline',
											  'onMenuShareAppMessage',
											  'onMenuShareQQ',
											  'onMenuShareWeibo',
											  'hideMenuItems',
											  'showMenuItems',
											  'hideAllNonBaseMenuItem',
											  'showAllNonBaseMenuItem'
									] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});

			    	wx.ready(()=>{

			    		wx.getLocation({
						    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						    fail(){
						    },
						    success: function (res) {
						        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						        var speed = res.speed; // 速度，以米/每秒计
						        var accuracy = res.accuracy; // 位置精度

						        wx.posData = {
						        	longitude,
						        	latitude,
						        	accuracy
						        };

						        if((s.nickname || s.headimgurl) && s.openid){
						        	s.getPos(s.nickname,s.headimgurl);
						        }
						       
						    }
						});

			    			 		//朋友圈
	                    wx.onMenuShareTimeline({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
	                    //朋友
	                    wx.onMenuShareAppMessage({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        type: "link",
	                        dataUrl: "",
	                        desc: desc,
	                        success: function () {
	                        },
	                        cancel: function () { 
	                        }
	                    });
	                    //qq
	                    wx.onMenuShareQQ({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
			    	});
			    }
			});
		
	}

	backToApp(){
		this.setState({
			currentHref:''
		});
		this.renderTalk(this.iNow);
	}
	changeURLPar(destiny, par, par_value) { 
		var pattern = par+'=([^&]*)'; 
		var replaceText = par+'='+par_value; 
		if (destiny.match(pattern)) { 
			var tmp = '/\\'+par+'=[^&]*/'; 
			tmp = destiny.replace(eval(tmp), replaceText); 
			return (tmp); 
		} 
		else { 
			if (destiny.match('[\?]')) { 
				return destiny+'&'+ replaceText; 
			} 
			else { 
				return destiny+'?'+replaceText; 
			} 
		} 
		return destiny+'\n'+par+'\n'+par_value; 
	} 
	displayFrame(href){
		if(href){
			href = this.changeURLPar(href,'openid',this.openid);
			href = this.changeURLPar(href,'worksid',this.worksid);
			href = this.changeURLPar(href,'wxappid',this.wxappid);
			this.setState({
				currentHref:href
			});	
			this.clearRender();
		}
		
	}

	

	componentDidMount() {
		
		this.talk = [
			
		]
		$.getJSON('./assets/js/data.json',(data)=>{

			var s = this;
			this.talk = data.talk;
			this.state.talkObj.member = data.memberList;
			this.state.talkObj.groupName = data.groupName;
			this.state.talkObj.background = data.background;
			this.state.talkObj.bgSound = data.bgSound;
			this.state.talkObj.title = data.title;
			this.worksid = data.worksid;

			s.wxappid = data.wxappid;

			this.state.myHeadImg = data.myHeadImg;

			this.wxConfig(data.shareTitle,data.shareDesc,data.shareImg,data.wxappid,data.worksid);
			
			this.forceUpdate(()=>{
				
			});

			 
			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/getwxuserinfo/',
				data:{
					code:s.getQueryString('code'),
					wxappid:data.wxappid,
					wxappsecret:data.wxappsecret
				},
				error(e){
 

				},
				success(dt){
					 
					if(dt.getret === 0){
						s.setState({
							showLoading:true
						});
						s.loading(data.loadingImg,(scale)=>{
							s.setState({
								progress:(scale*100|0)+'%'
							})
						},()=>{
							s.setState({
								showLoading:false
							});

							$.ajax({
								url:'http://api.zmiti.com/v2/works/update_pvnum/',
								data:{
									worksid:s.worksid
								},
								success(data){
									if(data.getret === 0){
										console.log(data);
									}
								}
							});


							
							s.defaultName = dt.userinfo.nickname || data.username || '智媒体';



							localStorage.setItem('nickname',dt.userinfo.nickname );
							localStorage.setItem('headimgurl',dt.userinfo.headimgurl);
							s.openid = dt.userinfo.openid;
							s.nickname = dt.userinfo.nickname;
							s.headimgurl = dt.userinfo.headimgurl;
							s.talk.forEach((item,i)=>{
								item.text && (item.text = item.text.replace(/{username}/ig,s.defaultName));
							});

							if (wx.posData && wx.posData.longitude) {

								s.getPos(dt.userinfo.nickname, dt.userinfo.headimgurl);
							}

							s.talk.forEach((item,i)=>{
								
								if(item.isMe){
									item.head =  dt.userinfo.headimgurl
								}
							});
							s.state.myHeadImg = dt.userinfo.headimgurl
							s.forceUpdate();

							s.renderTalk();
						});
						
					}
					else{

						
						s.setState({
							showLoading:true
						});

						if(s.isWeiXin() ){
							$.ajax({
								url:'http://api.zmiti.com/v2/weixin/getoauthurl/',
								type:'post',
								data:{
									redirect_uri:window.location.href.replace(/code/ig,'zmiti'),
									scope:'snsapi_userinfo',
									worksid:s.worksid,
									state:new Date().getTime()+''
								},
								error(){
								},
								success(dt){
									if(dt.getret === 0){
										window.location.href =  dt.url;
									}
								}
							})
						}
						else{

							s.loading(data.loadingImg,(scale)=>{
								s.setState({
									progress:(scale*100|0)+'%'
								})
							},()=>{
								s.setState({
									showLoading:false
								});

								$.ajax({
									url:'http://api.zmiti.com/v2/works/update_pvnum/',
									data:{
										worksid:s.worksid
									},
									success(data){
										if(data.getret === 0){
											console.log(data);
										}
									}
								});


								s.defaultName =  data.username || '智媒体';
								s.talk.forEach((item,i)=>{
									item.text && (item.text = item.text.replace(/{username}/ig,s.defaultName));
								});
								
								s.forceUpdate();

								s.renderTalk();	

							
						});


						 
						}

					}


				}
			});


			this.defaultName = data.username;
		
			document.title = data.title;

			s.defaultName = localStorage.getItem('nickname') || data.username || '智媒体';
		

			s.headimgurl = localStorage.getItem('headimgurl');
		

			s.talk.forEach((item,i)=>{
				if(item.isMe && s.headimgurl){
					item.head =  s.headimgurl
				}
			});
			s.headimgurl && (s.state.myHeadImg = s.headimgurl);
			this.iNow = 0 ;
			s.forceUpdate();
			

			
		});



		$(document).one('touchstart',()=>{
			this.refs['talkAudio'].pause();
			this.refs['talkAudio'].muted = true;
			this.refs['talkAudio'].play();
			setTimeout(()=>{
				this.refs['talkAudio'].muted = false;
			},500);
			if(this.refs['audio'] && this.refs['audio'].paused){
				this.refs['audio'].play();
			};
		})
		
	}

	loading(arr, fn, fnEnd){
        var len = arr.length;
        var count = 0;
        var i = 0;
        
        function loadimg() {
            if (i === len) {
                return;
            }
            var img = new Image();
            img.onload = img.onerror = function(){
                count++;
                if (i < len - 1) {
                    i++;
                    loadimg();
                    fn && fn(i / (len - 1), img.src);
                } else {
                    fnEnd && fnEnd(img.src);
                }
            };
            img.src = arr[i];
        }
       loadimg();
    }

	isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

	componentWillMount() {
		var s = this;

	}

	clearRender(){
		clearInterval(this.talkTimer);
	}

	renderTalk(){

		if(!this.state.showMembers)	{
			setTimeout(()=>{
				this.state.showMembers = true;
				this.forceUpdate();	
			},1000)
		}

		var talkAudio = this.refs['talkAudio'];
		this.talkTimer = setInterval(()=>{
			
		
			this.state.showGroupName = true;
			this.forceUpdate();
			setTimeout(()=>{
				
				if(this.talk[this.iNow]){
					this.state.talkObj.talk.push(this.talk[this.iNow]);
					talkAudio.play();
	 				this.iNow++;			
					this.forceUpdate();	
					setTimeout(()=>{
						this.state.scrollTop = this.refs['scroller'].offsetHeight - (this.viewH - 85)<=0?0:-(this.refs['scroller'].offsetHeight - (this.viewH - 85));
						this.forceUpdate();	
					},100)
					//this.scroll.refresh();
				}
				else{
					clearInterval(this.talkTimer);
					this.scroll = new IScroll(this.refs['zmiti-scroll-C'],{preventDefault:false});
					this.scroll.scrollTo(0,this.state.scrollTop,0);
				}
			},1800);
					

			
		},2000);
	}
}

	ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
	

