import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin && injectTapEventPlugin();

import './assets/css/index.css';
export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			talkObj:{
				date:'3月4日',
				member:[
					{name:'国务院总理李克强',img:'',id:1},
					{name:'傅莹(十二届全国人大五次会议发言人)',img:'',id:2},
					{name:'王国庆(全国政协十二届五次会议发言人)',img:'',id:3},
					{name:'陈吉宁（环境保护部部长）',img:'',id:4},
					{name:'王军(国家税务局局长)',img:'',id:5},
					{name:'陈政高（住房和城乡建设部部长）',img:'',id:6}
				]
			}
		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}
	render() {
		
		return (
			<div className='zmiti-main-ui'>
				<section className='zmiti-date'><span>{this.state.talkObj.date}</span></section>
				<section className='zmiti-member'>
					{this.state.talkObj.member[0]+'邀请你和'+this.state.talkObj.member[1].name+' 、'}
					{this.state.talkObj.member.filter((item,i)=>{
						return i > 1;
					}).map((item,i)=>{
						console.log(i)
						return <span key={i}>{i>= this.state.talkObj.member.length - 3 ? item.name: item.name+' 、'}</span>
					})}
					<span>等加入群聊</span>
				</section>
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

	componentWillMount() {
		
		
	}
}

	ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
	

