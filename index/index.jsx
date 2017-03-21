import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class IndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			words:[
				{word:'发展',type:'lt-important'},
				{word:'改革',type:'lt-important'},
				{word:'开放',type:'lt-important'},
				{word:'生态',type:'lt-important'},
				{word:'创新',type:'lt-important'},
				{word:'扶贫',type:'lt-important'}
			]
		};
		this.doc = document;
		this.viewW = this.doc.documentElement.clientWidth;
		this.viewH = this.doc.documentElement.clientHeight;
		this.importantWords = ['发展','改革','开放','生态','创新','扶贫'];
		this.words = ['民族','两岸','全面','开放','国家','军队','生态','地区','干部','群众','精神','国防','市场','环境','人民','加强','深化','战略','强军','科技','落实','法治','管理','文明','协同','公平','依法治国','中国梦'];

	}

	render() {

		var mainStyle = {
			background:'url(./assets/images/index-bg.jpg) no-repeat center top',
			backgroundSize:'cover'

		};
		var maskStyle = {
			background:'url(./assets/images/mask-bg.png) no-repeat center top',
			backgroundSize:'cover'
		}

		var circleStyle = {
			background:'url(./assets/images/circle.png) no-repeat center top',
			backgroundSize:'contain'
		}

		return (
			<div className='lt-index-main-ui lt-full' style={mainStyle}>
				<div className='lt-index-mask lt-full' style={maskStyle}>
					<div className='lt-circle' style={circleStyle}>
						<span ref='lt-point'></span>
					</div>
					<div className='lt-word-img'>
						<img src='./assets/images/gpc.png'/>
					</div>
					{this.state.words.map((item,i)=>{
						return <div onAnimationEnd={this.animationEnd.bind(this,i)} className={item.type} style={{top:this.r(10,this.viewH-50),WebkitAnimationDuration:this.r(3,item.type==='lt-usral'?6:3)+'s',WebkitAnimationDelay:this.r(1,40)+'s'}} key={i}>{item.word}</div>
					})}
				</div>
			</div>
		);
	}


	animationEnd(i){
		/*this.state.words.splice(i,1);
		 this.forceUpdate();*/
	}


	componentDidMount() {
		this.startAnimation();

		this.words.forEach((item,i)=>{
			this.state.words.push({
				type:'lt-usral',
				word:item
			})
		})
		this.forceUpdate();

	}

	r(m, n) {
		return (m + Math.random() * (n - m));
	}

	startAnimation(){
		this.starting = true;
		this.startAngle = 0;
		var point = this.refs['lt-point'];
		var life = 20;
		var iNow = 0 ;
		var render = ()=>{
			this.startAngle++;
			if(this.startAngle >=360){
				this.startAngle = 0;
			}
			if(this.startAngle<=100){
				point.style.opacity = this.startAngle / 100;
			}
			if(this.startAngle<=60){
				point.style.opacity =0;
			}
			if(this.startAngle>=300){
				point.style.opacity = (360 - this.startAngle) / 60;
			}
			point.style.WebkitTransform = 'rotate('+this.startAngle+'deg)';

			if(iNow>life){
				iNow = 0;
				life = this.r(20,30)|0;
			}
			iNow++;
			this.props.currentPage === 0 && window.webkitRequestAnimationFrame(render);
		}
		window.webkitRequestAnimationFrame(render);
	}

	createWords(type){
		var word= this.importantWords[(Math.random()*this.importantWords.length)|0];
		this.state.words.push({word,type:type});
		this.forceUpdate();
	}


}
export default PubCom(IndexApp);