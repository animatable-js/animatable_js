class i{constructor(i){this.callback=i,this.isDisposed=!1,this.id=requestAnimationFrame(this.handle=this.handle.bind(this))}handle(i){var s;if(this.isDisposed)return;const t=i-(null!==(s=this.previousElapsed)&&void 0!==s?s:i);this.previousElapsed=i,this.callback(t),this.id=requestAnimationFrame(this.handle)}dispose(){this.isDisposed=!0,cancelAnimationFrame(this.id)}}export{i as Ticker};
//# sourceMappingURL=index.js.map