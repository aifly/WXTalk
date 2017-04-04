import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';
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
			talkObj:{
				date:'3月4日',
				member:[
					{name:'国务院总理李克强',img:'./assets/images/zmiti.jpg',id:1},
					{name:'傅莹(十二届全国人大五次会议发言人)',img:'./assets/images/zmiti.jpg',id:2},
					{name:'王国庆(全国政协十二届五次会议发言人)',img:'./assets/images/zmiti.jpg',id:3},
					{name:'陈吉宁（环境保护部部长）',img:'./assets/images/zmiti.jpg',id:4},
					{name:'王军(国家税务局局长)',img:'./assets/images/zmiti.jpg',id:5},
					{name:'陈政高（住房和城乡建设部部长）',img:'./assets/images/zmiti.jpg',id:6}
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
				{this.state.talkObj.bgSound && <audio ref='audio' src={this.state.talkObj.bgSound} autoPlay loop></audio>}
				<audio src='./assets/music/talk.mp3' ref='talkAudio'></audio>
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
						{this.state.talkObj.groupName && this.state.showGroupName && <section className='zmiti-modify-groupname'>{this.state.talkObj.member[0].name}修改群名称为{this.state.talkObj.groupName}</section>}
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
																	<img src='./assets/images/video-ico.jpg' />
																	<video src={item.videoSrc} ref={'video-'+i}></video>
																</section>}

															</div>
														</aside>

													</div>
													<div className='zmiti-talk-head' style={{background:'url('+item.head+') no-repeat center / cover'}}>
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

	playAudio(i){

		if(this.refs['audio-'+i].paused){
			this.refs['audio-'+i].play();
		}
		else{
			this.refs['audio-'+i].pause();	
		}
		return false;

	}

	wxConfig(title,desc,img){
		   var durl = location.href.split('#')[0]; //window.location;
		        var code_durl = encodeURIComponent(durl);
			$.ajax({
				url:'http://api.zmiti.com/weixin/jssdk.php',
				dataType:'jsonp',
				jsonp: "callback",
				data:{
					type:'signature',
					durl:durl
				},
		    jsonpCallback: "jsonFlickrFeed",
		    success(data){
		    	wx.config({
						    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						    appId: 'wxfacf4a639d9e3bcc', // 必填，公众号的唯一标识
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
                        success: function () { },
                        cancel: function () { }
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

	displayFrame(href){
		if(href){
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
			this.talk = data.talk;
			this.state.talkObj.member = data.memberList;
			this.state.talkObj.groupName = data.groupName;
			this.state.talkObj.background = data.background;
			this.state.talkObj.bgSound = data.bgSound;
			this.worksid = data.worksid;
			this.forceUpdate();
			this.defaultName = data.username;
			var s = this;
			document.title = data.title;

			
			this.iNow = 0 ;
			
			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/getwxuserinfo/',
				data:{
					code:s.getQueryString('code'),
					wxappid:data.wxappid,
					wxappsecret:data.wxappsecret
				},
				error(e){

					if(s.isWeiXin()){
						$.ajax({
							url:'http://api.zmiti.com/v2/weixin/getoauthurl/',
							data:{
								redirect_uri:window.location.href,
								scope:'snsapi_userinfo',
								worksid:s.worksid,
								state:new Date().getTime()+''
							},
							error(){
								alert('error1111111--'+s.worksid)
							},
							success(dt){
								if(dt.getret === 0){
									//window.location.href =  dt.url;
								}
							}
						})
					}
					else{
						s.defaultName =  data.username || '智媒体';
						s.talk.forEach((item,i)=>{
							item.text && (item.text = item.text.replace(/{username}/ig,s.defaultName));
						});
						s.forceUpdate();

						s.renderTalk();
					}

				},
				success(dt){
					if(dt.getret === 0){
						s.defaultName = dt.userinfo.nickname || data.username || '智媒体';
						s.talk.forEach((item,i)=>{
							item.text && (item.text = item.text.replace(/{username}/ig,s.defaultName));
						});
						s.talk.forEach((item,i)=>{
							
							if(item.isMe){
								item.head =  dt.userinfo.headimgurl
							}
						});
						s.forceUpdate();

						s.renderTalk();
					}
					else{

						

						if(s.isWeiXin()){
							$.ajax({
								url:'http://api.zmiti.com/v2/weixin/getoauthurl/',
								data:{
									redirect_uri:window.location.href,
									scope:'snsapi_userinfo',
									worksid:s.worksid,
									state:new Date().getTime()+''
								},
								error(){
									alert('error')
								},
								success(dt){
									if(dt.getret === 0){
										//window.location.href =  dt.url;
									}
								}
							})
						}
						else{
							s.defaultName =  data.username || '智媒体';
							s.talk.forEach((item,i)=>{
								item.text && (item.text = item.text.replace(/{username}/ig,s.defaultName));
							});
							s.forceUpdate();

							s.renderTalk();	
						}

					}


				}
			});

			
		});



		$(document).one('touchstart',()=>{
			this.refs['talkAudio'].pause();
			this.refs['talkAudio'].play();
			if(this.refs['audio'] && this.refs['audio'].paused){
				this.refs['audio'].play();
			};
		})
		
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
	

