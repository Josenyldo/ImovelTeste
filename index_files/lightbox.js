!function(t,i){"function"==typeof define&&define.amd?define(["jquery"],i):"object"==typeof exports?module.exports=i(require("jquery")):t.lightbox=i(t.jQuery)}(this,function(b){function t(t){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=b.extend({},this.constructor.defaults),this.option(t)}return t.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1},t.prototype.option=function(t){b.extend(this.options,t)},t.prototype.imageCountLabel=function(t,i){return this.options.albumLabel.replace(/%1/g,t).replace(/%2/g,i)},t.prototype.init=function(){var t=this;b(document).ready(function(){t.enable(),t.build()})},t.prototype.enable=function(){var i=this;b("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(t){return i.start(b(t.currentTarget)),!1})},t.prototype.build=function(){if(!(0<b("#lightbox").length)){var i=this;b('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(b("body")),this.$lightbox=b("#lightbox"),this.$overlay=b("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.$image=this.$lightbox.find(".lb-image"),this.$nav=this.$lightbox.find(".lb-nav"),this.containerPadding={top:parseInt(this.$container.css("padding-top"),10),right:parseInt(this.$container.css("padding-right"),10),bottom:parseInt(this.$container.css("padding-bottom"),10),left:parseInt(this.$container.css("padding-left"),10)},this.imageBorderWidth={top:parseInt(this.$image.css("border-top-width"),10),right:parseInt(this.$image.css("border-right-width"),10),bottom:parseInt(this.$image.css("border-bottom-width"),10),left:parseInt(this.$image.css("border-left-width"),10)},this.$overlay.hide().on("click",function(){return i.end(),!1}),this.$lightbox.hide().on("click",function(t){"lightbox"===b(t.target).attr("id")&&i.end()}),this.$outerContainer.on("click",function(t){return"lightbox"===b(t.target).attr("id")&&i.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return 0===i.currentImageIndex?i.changeImage(i.album.length-1):i.changeImage(i.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return i.currentImageIndex===i.album.length-1?i.changeImage(0):i.changeImage(i.currentImageIndex+1),!1}),this.$nav.on("mousedown",function(t){3===t.which&&(i.$nav.css("pointer-events","none"),i.$lightbox.one("contextmenu",function(){setTimeout(function(){this.$nav.css("pointer-events","auto")}.bind(i),0)}))}),this.$lightbox.find(".lb-loader, .lb-close").on("click",function(){return i.end(),!1})}},t.prototype.start=function(t){var i=this,e=b(window);e.on("resize",b.proxy(this.sizeOverlay,this)),this.sizeOverlay(),this.album=[];var n=0;function a(t){i.album.push({alt:t.attr("data-alt"),link:t.attr("href"),title:t.attr("data-title")||t.attr("title")})}var o,s=t.attr("data-lightbox");if(s){o=b(t.prop("tagName")+'[data-lightbox="'+s+'"]');for(var h=0;h<o.length;h=++h)a(b(o[h])),o[h]===t[0]&&(n=h)}else if("lightbox"===t.attr("rel"))a(t);else{o=b(t.prop("tagName")+'[rel="'+t.attr("rel")+'"]');for(var r=0;r<o.length;r=++r)a(b(o[r])),o[r]===t[0]&&(n=r)}var l=e.scrollTop()+this.options.positionFromTop,d=e.scrollLeft();this.$lightbox.css({top:l+"px",left:d+"px"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&b("body").addClass("lb-disable-scrolling"),this.changeImage(n)},t.prototype.changeImage=function(s){var h=this,r=this.album[s].link,l=r.split(".").slice(-1)[0],d=this.$lightbox.find(".lb-image");this.disableKeyboardNav(),this.$overlay.fadeIn(this.options.fadeDuration),b(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var g=new Image;g.onload=function(){var t,i,e,n,a,o;d.attr({alt:h.album[s].alt,src:r}),b(g),d.width(g.width),d.height(g.height),o=b(window).width(),a=b(window).height(),n=o-h.containerPadding.left-h.containerPadding.right-h.imageBorderWidth.left-h.imageBorderWidth.right-20,e=a-h.containerPadding.top-h.containerPadding.bottom-h.imageBorderWidth.top-h.imageBorderWidth.bottom-h.options.positionFromTop-70,"svg"===l&&(0!==g.width&&0!==g.height||(d.width(n),d.height(e))),h.options.fitImagesInViewport&&(h.options.maxWidth&&h.options.maxWidth<n&&(n=h.options.maxWidth),h.options.maxHeight&&h.options.maxHeight<e&&(e=h.options.maxHeight),(g.width>n||g.height>e)&&(g.width/n>g.height/e?(i=n,t=parseInt(g.height/(g.width/i),10)):(t=e,i=parseInt(g.width/(g.height/t),10)),d.width(i),d.height(t))),h.sizeContainer(d.width(),d.height())},g.src=this.album[s].link,this.currentImageIndex=s},t.prototype.sizeOverlay=function(){var t=this;setTimeout(function(){t.$overlay.width(b(document).width()).height(b(document).height())},0)},t.prototype.sizeContainer=function(t,i){var e=this,n=this.$outerContainer.outerWidth(),a=this.$outerContainer.outerHeight(),o=t+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,s=i+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;function h(){e.$lightbox.find(".lb-dataContainer").width(o),e.$lightbox.find(".lb-prevLink").height(s),e.$lightbox.find(".lb-nextLink").height(s),e.showImage()}n!==o||a!==s?this.$outerContainer.animate({width:o,height:s},this.options.resizeDuration,"swing",function(){h()}):h()},t.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide(),this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},t.prototype.updateNav=function(){var t=!1;try{document.createEvent("TouchEvent"),t=!!this.options.alwaysShowNavOnTouchDevices}catch(t){}this.$lightbox.find(".lb-nav").show(),1<this.album.length&&(this.options.wrapAround?(t&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(0<this.currentImageIndex&&(this.$lightbox.find(".lb-prev").show(),t&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),t&&this.$lightbox.find(".lb-next").css("opacity","1"))))},t.prototype.updateDetails=function(){var t=this;if(void 0!==this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title){var i=this.$lightbox.find(".lb-caption");this.options.sanitizeTitle?i.text(this.album[this.currentImageIndex].title):i.html(this.album[this.currentImageIndex].title),i.fadeIn("fast")}if(1<this.album.length&&this.options.showImageNumberLabel){var e=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(".lb-number").text(e).fadeIn("fast")}else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return t.sizeOverlay()})},t.prototype.preloadNeighboringImages=function(){this.album.length>this.currentImageIndex+1&&((new Image).src=this.album[this.currentImageIndex+1].link);0<this.currentImageIndex&&((new Image).src=this.album[this.currentImageIndex-1].link)},t.prototype.enableKeyboardNav=function(){b(document).on("keyup.keyboard",b.proxy(this.keyboardAction,this))},t.prototype.disableKeyboardNav=function(){b(document).off(".keyboard")},t.prototype.keyboardAction=function(t){var i=t.keyCode;27===i?this.end():37===i?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&1<this.album.length&&this.changeImage(this.album.length-1):39===i&&(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&1<this.album.length&&this.changeImage(0))},t.prototype.end=function(){this.disableKeyboardNav(),b(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),this.options.disableScrolling&&b("body").removeClass("lb-disable-scrolling")},new t});