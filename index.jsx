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
		
		return (
			<div className='zmiti-main-ui'>
				<section className='zmiti-scroll-C' ref='zmiti-scroll-C' style={{height:this.viewH - 85}}>
					<div ref='scroller' className={'zmiti-scroller'} style={{paddingBottom:20,WebkitTransform:'translate3d(0,'+this.state.scrollTop+'px,0)'}}>
						<section className='zmiti-date'><span>{this.state.talkObj.date}</span></section>
						<section className='zmiti-member'>
							<div>
								{this.state.talkObj.member[0].name+'邀请你和'+this.state.talkObj.member[1].name+' 、'}
								{this.state.talkObj.member.filter((item,i)=>{
									return i > 1;
								}).map((item,i)=>{
									return <span key={i}>{i>= this.state.talkObj.member.length - 3 ? item.name: item.name+' 、'}</span>
								})}
								<span>等加入群聊</span>
							</div>
						</section>
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
																{item.text || <img  src={item.img}/>}
															</div>
														</aside>

													</div>
													<div className='zmiti-talk-head'><img src={item.head}/></div>
												</li>
									}
									return <li key={i} className={item.isMe?'zmiti-user':''}>
										<div className='zmiti-talk-head'><img src={item.head}/></div>
										<div className={'zmiti-talk-content ' + (item.text?'':'zmiti-talk-img')}>
											<aside>{item.name}</aside>
											<aside>
												<div onTouchTap={this.displayFrame.bind(this,item.href)}>
													{item.text || <img  src={item.img}/>}
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

	wxConfig(){
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
                        title: '多少人为基层代表点赞', // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/dianzan/assets/images/300.jpg", // 分享图标
                        desc: "2017年两会，让我们来关注基层代表，为他们点赞吧",
                        success: function () { },
                        cancel: function () { }
                    });
                    //朋友
                    wx.onMenuShareAppMessage({
                        title: "多少人为基层代表点赞", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/dianzan/assets/images/300.jpg", // 分享图标
                        type: "link",
                        dataUrl: "",
                        desc: "2017年两会，让我们来关注基层代表，为他们点赞吧",
                        success: function () { },
                        cancel: function () { }
                    });
                    //qq
                    wx.onMenuShareQQ({
                        title: "多少人为基层代表点赞", // 分享标题
                        link: durl, // 分享链接
                        imgUrl: "http://webapi.zmiti.com/public/dianzan/assets/images/300.jpg", // 分享图标
                        desc: "2017年两会，让我们来关注基层代表，为他们点赞吧",
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



		this.defaultName = '智媒体';
		this.talk = [
			{
						isMe:false,
						id:1,
						head:'./assets/images/zmiti.jpg',
						name:'国务院总理李克强',
						text:'大家好！全国政协十二届五次会议已经于3月3日下午开幕了。大家好！全国政协十二届五次会议已经于3月3日下午开幕了。大家好！全国政协十二届五次会议已经于3月3日下午开幕了。',
					},
					{
						isMe:false,
						id:1,
						head:'./assets/images/zmiti.jpg',
						name:'王国庆(全国政协十二届五次会议发言人)',
						text:'@{username},来说说你的看法。',
						href:'http://h5.zmiti.com/public/xwords/'
					},
					{
						isMe:false,
						id:1,
						head:'./assets/images/zmiti.jpg',
						name:'王国庆(全国政协十二届五次会议发言人)',
						text:'',
						img:'./assets/images/1.jpg',
						href:'http://h5.zmiti.com/public/xwords/'
					},
					{
						isMe:true,
						id:3,
						head:'./assets/images/zmiti.jpg',
						name:'王国庆(全国政协十二届五次会议发言人)',
						text:'',
						img:'./assets/images/timg.gif',
						href:'http://h5.zmiti.com/public/xwords/'
					},
					{
						id:4,
						isMe:true,
						head:'./assets/images/zmiti.jpg',
						name:'王国庆',
						text:'大家好大家好大家好大家好大家好大家好',
					}
		]
		this.talk.forEach((item,i)=>{
			item.text && (item.text = item.text.replace(/{username}/ig,this.defaultName));
		});
		this.iNow = 0 ;
		//this.scroll = new IScroll(this.refs['zmiti-scroll-C'],{preventDefault:false});
		this.renderTalk();
	}

	clearRender(){
		clearInterval(this.talkTimer);
	}

	renderTalk(){
		this.talkTimer = setInterval(()=>{
			if(this.talk[this.iNow]){
				this.state.talkObj.talk.push(this.talk[this.iNow]);
				
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
		},2000);
	}
}

	ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
	

